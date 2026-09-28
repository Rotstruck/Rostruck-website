from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / ".env")

import base64
import logging
import os
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
import jwt
from bson import ObjectId
from fastapi import (APIRouter, Depends, FastAPI, File, Form, HTTPException,
                     Request, Response, UploadFile)
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger("rotstruck")
logging.basicConfig(level=logging.INFO)

JWT_ALGORITHM = "HS256"


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def pub(doc: dict) -> dict:
    doc = dict(doc)
    doc["id"] = str(doc.pop("_id"))
    doc.pop("password_hash", None)
    return doc


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return pub(user)


class LoginBody(BaseModel):
    email: str
    password: str


MAX_ATTEMPTS = 5
LOCKOUT_MINUTES = 15


@api_router.post("/auth/login")
async def login(body: LoginBody, request: Request, response: Response):
    email = body.email.lower().strip()
    identifier = f"{request.client.host}:{email}"
    attempts = await db.login_attempts.find_one({"identifier": identifier})
    if attempts and attempts.get("count", 0) >= MAX_ATTEMPTS:
        locked_until = attempts.get("locked_until")
        if locked_until and datetime.fromisoformat(locked_until) > datetime.now(timezone.utc):
            raise HTTPException(status_code=429, detail="Too many failed attempts. Try again later.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password_hash"]):
        count = (attempts.get("count", 0) if attempts else 0) + 1
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$set": {
                "count": count,
                "locked_until": (datetime.now(timezone.utc) + timedelta(minutes=LOCKOUT_MINUTES)).isoformat(),
            }},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    token = create_access_token(str(user["_id"]), email)
    response.set_cookie(
        key="access_token", value=token, httponly=True, secure=True,
        samesite="none", max_age=43200, path="/",
    )
    return pub(user)


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"ok": True}


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


MAX_FILE_BYTES = 2 * 1024 * 1024


@api_router.post("/enquiries")
async def create_enquiry(
    full_name: str = Form(...),
    email: str = Form(...),
    company: str = Form(""),
    phone: str = Form(""),
    industry: str = Form(""),
    service: str = Form(""),
    description: str = Form(...),
    budget: str = Form(""),
    timeline: str = Form(""),
    file: Optional[UploadFile] = File(None),
):
    if len(full_name.strip()) < 2:
        raise HTTPException(status_code=422, detail="Full name is required")
    if "@" not in email:
        raise HTTPException(status_code=422, detail="A valid email is required")
    if len(description.strip()) < 10:
        raise HTTPException(status_code=422, detail="Please describe your project (min 10 characters)")
    doc = {
        "full_name": full_name.strip(),
        "email": email.strip().lower(),
        "company": company.strip(),
        "phone": phone.strip(),
        "industry": industry,
        "service": service,
        "description": description.strip(),
        "budget": budget,
        "timeline": timeline,
        "read": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    if file and file.filename:
        data = await file.read()
        if len(data) > MAX_FILE_BYTES:
            raise HTTPException(status_code=422, detail="File too large (max 2 MB)")
        doc["file_name"] = file.filename
        doc["file_type"] = file.content_type or "application/octet-stream"
        doc["file_data"] = base64.b64encode(data).decode("ascii")
    result = await db.enquiries.insert_one(doc)
    logger.info("New enquiry %s from %s", result.inserted_id, doc["email"])
    return {"ok": True, "id": str(result.inserted_id)}


@api_router.get("/enquiries")
async def list_enquiries(user: dict = Depends(get_current_user)):
    cursor = db.enquiries.find({}, {"file_data": 0}).sort("created_at", -1).limit(500)
    return [pub(doc) async for doc in cursor]


@api_router.patch("/enquiries/{enquiry_id}")
async def mark_enquiry(enquiry_id: str, body: dict, user: dict = Depends(get_current_user)):
    await db.enquiries.update_one({"_id": ObjectId(enquiry_id)}, {"$set": {"read": bool(body.get("read"))}})
    return {"ok": True}


@api_router.get("/enquiries/{enquiry_id}/file")
async def enquiry_file(enquiry_id: str, user: dict = Depends(get_current_user)):
    doc = await db.enquiries.find_one({"_id": ObjectId(enquiry_id)})
    if not doc or "file_data" not in doc:
        raise HTTPException(status_code=404, detail="No file attached")
    return Response(
        content=base64.b64decode(doc["file_data"]),
        media_type=doc.get("file_type", "application/octet-stream"),
        headers={"Content-Disposition": f'attachment; filename="{doc.get("file_name", "file")}"'},
    )


@api_router.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def seed_admin():
    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Rotstruck Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.enquiries.create_index("created_at")
    await seed_admin()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
