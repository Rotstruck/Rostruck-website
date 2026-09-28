import { Component, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";
import { Macbook, Phone } from "@/components/Mockups";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
const webglOk = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

class GLBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Particles({ count, dark }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 4;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.62;
      arr[i * 3 + 2] = r * Math.cos(p) * 0.7;
    }
    return arr;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={dark ? "#a78bfa" : "#7c3aed"}
        transparent
        opacity={dark ? 0.7 : 0.32}
        sizeAttenuation
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

function Gem({ dark, pulseRef }) {
  const gem = useRef();
  const wire = useRef();
  useFrame((state, dt) => {
    const g = gem.current;
    if (!g) return;
    g.rotation.y += dt * 0.22;
    pulseRef.current *= Math.pow(0.05, dt);
    g.material.emissiveIntensity = (dark ? 1.05 : 0.55) + pulseRef.current * 2.6;
    g.scale.setScalar(1 + pulseRef.current * 0.18);
    if (wire.current) wire.current.rotation.y -= dt * 0.1;
  });
  return (
    <group position={[0.15, 0.85, 0]}>
      <mesh
        ref={gem}
        onClick={(e) => {
          e.stopPropagation();
          pulseRef.current = 1;
        }}
      >
        <octahedronGeometry args={[1.02, 0]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#a855f7"
          emissiveIntensity={1}
          metalness={0.55}
          roughness={0.22}
          flatShading
        />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.42, 0]} />
        <meshBasicMaterial color={dark ? "#a78bfa" : "#7c3aed"} wireframe transparent opacity={dark ? 0.2 : 0.28} />
      </mesh>
    </group>
  );
}

const SCREEN_BARS = [
  [-0.82, 1.22, 0.5], [-0.2, 1.22, 0.62], [0.48, 1.22, 0.42],
  [-0.82, 0.98, 0.66], [-0.05, 0.98, 0.5],
  [-0.82, 0.74, 0.38], [-0.34, 0.74, 0.58],
];
const CHART_BARS = [0.22, 0.4, 0.32, 0.55, 0.44, 0.68];

function Laptop3D({ dark }) {
  const body = dark ? "#191930" : "#c9ccdd";
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 0.09, 1.6]} />
        <meshStandardMaterial color={body} metalness={0.7} roughness={0.35} />
      </mesh>
      <group position={[0, 0.05, -0.76]} rotation={[-0.3, 0, 0]}>
        <mesh position={[0, 0.82, 0]}>
          <boxGeometry args={[2.5, 1.6, 0.06]} />
          <meshStandardMaterial color={dark ? "#0e0e24" : "#e7e9f4"} metalness={0.4} roughness={0.45} />
        </mesh>
        {SCREEN_BARS.map(([x, y, w], i) => (
          <mesh key={i} position={[x + w / 2, y, 0.035]}>
            <planeGeometry args={[w, 0.055]} />
            <meshBasicMaterial color={i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#6366f1" : "#475569"} transparent opacity={0.95} />
          </mesh>
        ))}
        {CHART_BARS.map((h, i) => (
          <mesh key={`c${i}`} position={[0.28 + i * 0.16, 0.28 + h / 2, 0.035]}>
            <planeGeometry args={[0.09, h]} />
            <meshBasicMaterial color={i === 5 ? "#2dd4bf" : "#8b5cf6"} transparent opacity={0.9} />
          </mesh>
        ))}
        <mesh position={[-0.7, 0.42, 0.035]}>
          <circleGeometry args={[0.16, 24]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function Phone3D({ dark }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.72, 1.45, 0.07]} />
        <meshStandardMaterial color={dark ? "#191930" : "#c9ccdd"} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.42, 0.04]}>
        <planeGeometry args={[0.4, 0.05]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      {[0.2, 0.05, -0.1].map((y, i) => (
        <mesh key={i} position={[-0.06, y, 0.04]}>
          <planeGeometry args={[0.5 - i * 0.12, 0.04]} />
          <meshBasicMaterial color={i === 1 ? "#2dd4bf" : "#6366f1"} transparent opacity={0.9} />
        </mesh>
      ))}
      <mesh position={[0, -0.42, 0.04]}>
        <circleGeometry args={[0.13, 20]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function GlassCard({ position, rotation, dark, size = [0.85, 0.5] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial color={dark ? "#a78bfa" : "#7c3aed"} transparent opacity={dark ? 0.12 : 0.18} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Rig({ dark }) {
  const rig = useRef();
  const pulseRef = useRef(0);
  const scroll = useRef(0);
  useEffect(() => {
    const fn = () => {
      scroll.current = window.scrollY;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useFrame((state, dt) => {
    if (!rig.current) return;
    const damp = 1 - Math.pow(0.0008, dt);
    rig.current.rotation.y += (state.pointer.x * 0.2 - rig.current.rotation.y) * damp;
    rig.current.rotation.x += (-state.pointer.y * 0.1 - rig.current.rotation.x) * damp;
    rig.current.position.y += (Math.min(scroll.current, 700) * 0.0011 - rig.current.position.y) * damp;
  });
  return (
    <group ref={rig}>
      <Float speed={1.1} rotationIntensity={0.22} floatIntensity={0.85}>
        <Gem dark={dark} pulseRef={pulseRef} />
      </Float>
      <Float speed={1.4} rotationIntensity={0.16} floatIntensity={0.7}>
        <group position={[-1.7, -0.75, -0.6]} rotation={[0, 0.42, 0]} scale={0.92}>
          <Laptop3D dark={dark} />
        </group>
      </Float>
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1}>
        <group position={[1.7, -0.7, 1.1]} rotation={[0, -0.45, 0]}>
          <Phone3D dark={dark} />
        </group>
      </Float>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
        <GlassCard dark={dark} position={[-2.3, 1.5, -1.2]} rotation={[0.1, 0.5, 0.06]} />
      </Float>
      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={1.1}>
        <GlassCard dark={dark} position={[2.5, 1.7, -0.8]} rotation={[-0.08, -0.55, -0.05]} size={[0.7, 0.42]} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.9}>
        <GlassCard dark={dark} position={[0.4, -1.35, 0.9]} rotation={[0.15, 0.2, 0]} size={[0.6, 0.36]} />
      </Float>
      <mesh position={[0, -1.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 2.4, 64]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={dark ? 0.18 : 0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -1.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.7, 3.4, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={dark ? 0.07 : 0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function HeroFallback({ dark }) {
  return (
    <div className="relative h-[400px] sm:h-[460px]" data-testid="hero-fallback" aria-hidden="true">
      <div className={`absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${dark ? "bg-purple-600/30" : "bg-purple-400/25"}`} />
      <div className="absolute left-1/2 top-[10%] -translate-x-1/2 animate-float">
        <div className="h-20 w-20 rotate-45 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_60px_rgba(168,85,247,0.55)]" />
      </div>
      <Macbook variant="dashboard" className="absolute bottom-[6%] left-1/2 w-[74%] max-w-md -translate-x-1/2" />
      <Phone variant="patient" className="absolute bottom-0 right-[4%] w-24 animate-float-soft" />
    </div>
  );
}

export default function HeroScene() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [config] = useState(() => ({
    reduced: reducedMotion(),
    mobile: isMobile(),
    supported: webglOk(),
  }));
  const holder = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (config.mobile || config.reduced || !config.supported) {
    return <HeroFallback dark={dark} />;
  }

  return (
    <div ref={holder} className="relative h-[420px] lg:h-[560px]" data-testid="hero-3d-scene" aria-hidden="true">
      <GLBoundary fallback={<HeroFallback dark={dark} />}>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.35, 7.4], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          frameloop={visible ? "always" : "never"}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={dark ? 0.45 : 1.05} />
          <pointLight position={[3, 3, 3]} intensity={dark ? 42 : 15} color="#a855f7" distance={16} />
          <pointLight position={[-4, 1, -2]} intensity={dark ? 20 : 7} color="#3b82f6" distance={15} />
          <directionalLight position={[-3, 4, -4]} intensity={dark ? 1.5 : 0.9} color="#60a5fa" />
          <Rig dark={dark} />
          <Particles dark={dark} count={220} />
        </Canvas>
      </GLBoundary>
    </div>
  );
}
