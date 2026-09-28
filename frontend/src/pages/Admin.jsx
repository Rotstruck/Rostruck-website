import { useCallback, useEffect, useState } from "react";
import { Download, Loader2, LogOut, MailOpen, Mail } from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import Logo from "@/components/Logo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-purple-400/70";

export default function Admin() {
  const [user, setUser] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [enquiries, setEnquiries] = useState([]);

  const loadEnquiries = useCallback(async () => {
    const res = await fetch(`${API}/enquiries`, { credentials: "include" });
    if (res.ok) setEnquiries(await res.json());
  }, []);

  useEffect(() => {
    fetch(`${API}/auth/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => {
        setUser(u || null);
        if (u) loadEnquiries();
      })
      .catch(() => setUser(null));
  }, [loadEnquiries]);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(typeof d.detail === "string" ? d.detail : "Login failed");
      }
      setUser(await res.json());
      loadEnquiries();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
  };

  const toggleRead = async (enq) => {
    await fetch(`${API}/enquiries/${enq.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ read: !enq.read }),
    });
    setEnquiries((list) => list.map((e) => (e.id === enq.id ? { ...e, read: !e.read } : e)));
  };

  const downloadFile = async (enq) => {
    const res = await fetch(`${API}/enquiries/${enq.id}/file`, { credentials: "include" });
    if (!res.ok) return toast.error("Could not download file");
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = enq.file_name || "attachment";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
      <Seo title="Admin — ROTSTRUCK" description="Rotstruck admin" />
      {user === undefined ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-purple-500" aria-label="Loading" />
        </div>
      ) : !user ? (
        <div className="mx-auto max-w-md">
          <div className="glass-panel rounded-3xl p-8" data-testid="admin-login-panel">
            <Logo compact />
            <h1 className="mt-6 font-display text-2xl font-bold">Admin sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">View project enquiries from the contact form.</p>
            <form onSubmit={login} className="mt-6 space-y-4">
              <div>
                <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium">Email</label>
                <input id="admin-email" type="email" data-testid="admin-email-input" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
              </div>
              <div>
                <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium">Password</label>
                <input id="admin-password" type="password" data-testid="admin-password-input" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
              </div>
              {error && <p className="text-sm text-red-500 dark:text-red-400" data-testid="admin-login-error" role="alert">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                data-testid="admin-login-btn"
                className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div data-testid="admin-enquiries-panel">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold">Project enquiries</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {enquiries.filter((e) => !e.read).length} unread · {enquiries.length} total
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              data-testid="admin-logout-btn"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-purple-400/60"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
            </button>
          </div>

          {enquiries.length === 0 ? (
            <p className="glass-panel mt-8 rounded-2xl p-10 text-center text-muted-foreground" data-testid="admin-empty">
              No enquiries yet. New contact form submissions will appear here.
            </p>
          ) : (
            <ul className="mt-8 space-y-4" data-testid="admin-enquiries-list">
              {enquiries.map((enq) => (
                <li
                  key={enq.id}
                  data-testid={`enquiry-${enq.id}`}
                  className={`glass-panel rounded-2xl p-6 transition-opacity ${enq.read ? "opacity-60" : ""}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-bold">{enq.full_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {enq.email}
                        {enq.company ? ` · ${enq.company}` : ""}
                        {enq.phone ? ` · ${enq.phone}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {enq.file_name && (
                        <button
                          type="button"
                          onClick={() => downloadFile(enq)}
                          data-testid={`enquiry-file-${enq.id}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-purple-400/60"
                        >
                          <Download className="h-3.5 w-3.5" aria-hidden="true" /> {enq.file_name}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleRead(enq)}
                        data-testid={`enquiry-read-${enq.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-purple-400/60"
                      >
                        {enq.read ? <Mail className="h-3.5 w-3.5" aria-hidden="true" /> : <MailOpen className="h-3.5 w-3.5" aria-hidden="true" />}
                        {enq.read ? "Mark unread" : "Mark read"}
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                    {[enq.industry, enq.service, enq.budget, enq.timeline].filter(Boolean).map((chip) => (
                      <span key={chip} className="rounded-full bg-purple-500/10 px-2.5 py-0.5 font-medium text-foreground/75">{chip}</span>
                    ))}
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/85">{enq.description}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {new Date(enq.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
