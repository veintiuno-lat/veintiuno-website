import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { GlobePoint, GlobeProps } from "./types";

const DEG = Math.PI / 180;
const R = 1;

/** lat/lng → unit vector, with (0,0) facing +z (the camera). */
function toVec(lat: number, lng: number, r = R) {
  return new THREE.Vector3(
    r * Math.cos(lat * DEG) * Math.sin(lng * DEG),
    r * Math.sin(lat * DEG),
    r * Math.cos(lat * DEG) * Math.cos(lng * DEG)
  );
}

let landCache: Promise<Float32Array> | null = null;
function loadLand() {
  landCache ??= fetch("/geo/land-points.json")
    .then((r) => r.json())
    .then((arr: number[]) => {
      const pos = new Float32Array((arr.length / 2) * 3);
      for (let i = 0; i < arr.length; i += 2) {
        const v = toVec(arr[i], arr[i + 1]);
        pos.set([v.x, v.y, v.z], (i / 2) * 3);
      }
      return pos;
    });
  return landCache;
}

// ---------- Land dots ----------
const dotVert = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vFacing;
  varying float vLatAm;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize((modelViewMatrix * vec4(position, 0.0)).xyz);
    vFacing = n.z;
    // Latin America highlight: rough lat/lng box (south of 33N, west of 30W)
    float lat = asin(position.y);
    float lng = atan(position.x, position.z);
    vLatAm = step(lat, 0.58) * step(-1.05, lat) * step(lng, -0.52) * step(-2.1, lng);
    gl_PointSize = uSize * uPixelRatio * (1.0 + vLatAm * 0.35) * (2.8 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const dotFrag = /* glsl */ `
  varying float vFacing;
  varying float vLatAm;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    float fade = smoothstep(-0.15, 0.55, vFacing);
    vec3 base = mix(vec3(0.42, 0.42, 0.5), vec3(0.97, 0.58, 0.1), vLatAm);
    gl_FragColor = vec4(base, fade * (0.45 + vLatAm * 0.5));
  }
`;

function LandDots() {
  const [pos, setPos] = useState<Float32Array | null>(null);
  const dpr = useThree((s) => s.viewport.dpr);
  useEffect(() => {
    let alive = true;
    loadLand().then((p) => alive && setPos(p));
    return () => {
      alive = false;
    };
  }, []);
  const uniforms = useMemo(
    () => ({ uSize: { value: 2.4 }, uPixelRatio: { value: dpr } }),
    [dpr]
  );
  if (!pos) return null;
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[pos, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={dotVert}
        fragmentShader={dotFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

// ---------- Atmosphere ----------
const atmoVert = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const atmoFrag = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    // Back faces of a slightly bigger sphere: strongest at the globe's limb, 0 at the outer edge.
    float i = pow(smoothstep(0.0, 0.5, -dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
    gl_FragColor = vec4(0.97, 0.58, 0.1, 1.0) * i * 0.9;
  }
`;

function Atmosphere() {
  return (
    <mesh scale={1.14}>
      <sphereGeometry args={[R, 64, 64]} />
      <shaderMaterial
        vertexShader={atmoVert}
        fragmentShader={atmoFrag}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// ---------- Arcs with travelling light ----------
const arcVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const arcFrag = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  varying vec2 vUv;
  void main() {
    float t = fract(uTime * 0.25 + uOffset);
    float head = smoothstep(t - 0.18, t, vUv.x) * (1.0 - step(t, vUv.x));
    float base = 0.12;
    vec3 col = mix(vec3(0.97, 0.58, 0.1), vec3(1.0, 0.85, 0.45), head);
    gl_FragColor = vec4(col, base + head * 0.9);
  }
`;

function Arc({ a, b, offset, time }: { a: GlobePoint; b: GlobePoint; offset: number; time: { value: number } }) {
  const geom = useMemo(() => {
    const va = toVec(a.lat, a.lng);
    const vb = toVec(b.lat, b.lng);
    const dist = va.distanceTo(vb);
    const mid = va.clone().add(vb).multiplyScalar(0.5).normalize().multiplyScalar(R + dist * 0.45);
    const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
    return new THREE.TubeGeometry(curve, 48, 0.0035, 5, false);
  }, [a, b]);
  // uTime is one object shared by every arc (updated once per frame in Scene)
  const uniforms = useMemo(() => ({ uTime: time, uOffset: { value: offset } }), [time, offset]);
  return (
    <mesh geometry={geom}>
      <shaderMaterial
        vertexShader={arcVert}
        fragmentShader={arcFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/** Connect each point to its nearest neighbour(s) → a "network" of communities. */
function buildArcs(points: GlobePoint[], k = 2) {
  const seen = new Set<string>();
  const arcs: [GlobePoint, GlobePoint][] = [];
  points.forEach((p) => {
    const vp = toVec(p.lat, p.lng);
    points
      .filter((q) => q.id !== p.id)
      .map((q) => ({ q, d: vp.distanceTo(toVec(q.lat, q.lng)) }))
      .filter((x) => x.d > 0.02)
      .sort((x, y) => x.d - y.d)
      .slice(0, k)
      .forEach(({ q }) => {
        const key = [p.id, q.id].sort().join("|");
        if (!seen.has(key)) {
          seen.add(key);
          arcs.push([p, q]);
        }
      });
  });
  return arcs;
}

// ---------- Markers ----------
function Marker({
  p,
  active,
  onHover,
  onSelect,
  showLabel,
}: {
  p: GlobePoint;
  active: boolean;
  onHover: (id: string | null) => void;
  onSelect?: (p: GlobePoint) => void;
  showLabel: boolean;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => toVec(p.lat, p.lng, R * 1.004), [p]);
  const quat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()),
    [pos]
  );
  const seed = useMemo(() => (p.lat * 13.37 + p.lng * 7.1) % 1, [p]);
  useFrame((s) => {
    if (!ring.current) return;
    const t = (s.clock.elapsedTime * 0.6 + seed + 1) % 1;
    ring.current.scale.setScalar(1 + t * 3.2);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.7;
  });
  const size = 0.014 * (active ? 1.7 : 1) * Math.min(1.8, 1 + ((p.weight ?? 1) - 1) * 0.25);

  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <circleGeometry args={[size, 24]} />
        <meshBasicMaterial color={active ? "#FFE7A3" : "#F7931A"} toneMapped={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[size * 0.9, size * 1.15, 32]} />
        <meshBasicMaterial color='#F7931A' transparent depthWrite={false} toneMapped={false} />
      </mesh>
      {/* Generous invisible hit area */}
      <mesh
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          onHover(p.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "";
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect?.(p);
        }}
      >
        <circleGeometry args={[0.05, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {showLabel && (
        <Html center distanceFactor={2.4} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
          <div className='-translate-y-9 whitespace-nowrap rounded-full border border-white/10 bg-ink-900/90 px-3 py-1.5 text-[13px] font-medium text-white shadow-glow backdrop-blur-md'>
            {p.label}
            {p.sublabel && <span className='ml-2 text-gray-400'>{p.sublabel}</span>}
          </div>
        </Html>
      )}
    </group>
  );
}

// ---------- Rotating rig: drag, auto-rotate, focus ----------
function Rig({
  children,
  focus,
  autoRotate,
  interactive,
}: {
  children: React.ReactNode;
  focus?: { lat: number; lng: number } | null;
  autoRotate: boolean;
  interactive: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: -8 * DEG, y: 72 * DEG }); // default: LatAm facing camera
  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const idleAt = useRef(0);
  const { gl, clock } = useThree();

  // "Home" orientation: the focused place, or LatAm. Idle motion sways around it.
  const home = useRef({ x: -8 * DEG, y: 72 * DEG });
  useEffect(() => {
    home.current = focus ? { x: focus.lat * DEG, y: -focus.lng * DEG } : { x: -8 * DEG, y: 72 * DEG };
    target.current = { ...home.current };
    idleAt.current = clock.elapsedTime + 1.5;
  }, [focus, clock]);

  useEffect(() => {
    if (!interactive) return;
    const el = gl.domElement;
    const down = (e: PointerEvent) => {
      drag.current = { x: e.clientX, y: e.clientY, tx: target.current.x, ty: target.current.y };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag.current) return;
      const dx = (e.clientX - drag.current.x) / el.clientWidth;
      const dy = (e.clientY - drag.current.y) / el.clientHeight;
      target.current.y = drag.current.ty + dx * Math.PI * 1.4;
      target.current.x = THREE.MathUtils.clamp(drag.current.tx + dy * Math.PI, -1.2, 1.2);
    };
    const up = () => {
      drag.current = null;
      idleAt.current = clock.elapsedTime + 5;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, clock, interactive]);

  useFrame((s, delta) => {
    const g = group.current;
    if (!g) return;
    if (!drag.current && s.clock.elapsedTime > idleAt.current) {
      // Ease back home, then sway gently so the region of interest never leaves view.
      const sway = autoRotate ? Math.sin((s.clock.elapsedTime - idleAt.current) * 0.25) * 0.45 : 0;
      target.current.y += (home.current.y + sway - target.current.y) * Math.min(1, delta * 1.5);
      target.current.x += (home.current.x - target.current.x) * Math.min(1, delta * 1.5);
    }
    const k = 1 - Math.pow(0.0015, delta); // frame-rate independent damping
    g.rotation.x += (target.current.x - g.rotation.x) * k;
    g.rotation.y += (target.current.y - g.rotation.y) * k;
  });

  return <group ref={group}>{children}</group>;
}

function Scene({ points, onSelect, focus, selectedId, autoRotate = true, interactive = true, arcs = true }: GlobeProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const arcPairs = useMemo(() => (arcs ? buildArcs(points) : []), [points, arcs]);
  const arcTime = useMemo(() => ({ value: 0 }), []);
  useFrame((s) => {
    arcTime.value = s.clock.elapsedTime;
  });

  return (
    <Rig focus={focus} autoRotate={autoRotate && !hovered} interactive={interactive}>
      <mesh>
        <sphereGeometry args={[R * 0.995, 64, 64]} />
        <meshBasicMaterial color='#0b0b10' />
      </mesh>
      <LandDots />
      <Atmosphere />
      {arcPairs.map(([a, b], i) => (
        <Arc key={`${a.id}-${b.id}`} a={a} b={b} offset={(i * 0.137) % 1} time={arcTime} />
      ))}
      {points.map((p) => (
        <Marker
          key={p.id}
          p={p}
          active={p.id === selectedId || p.id === hovered}
          showLabel={p.id === hovered || p.id === selectedId}
          onHover={setHovered}
          onSelect={onSelect}
        />
      ))}
    </Rig>
  );
}

export default function GlobeScene(props: GlobeProps & { paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      // "demand" while off screen: one initial frame (compiles shaders early), then idle until visible
      frameloop={props.paused ? "demand" : "always"}
      camera={{ position: [0, 0, 3.55], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: props.interactive === false ? "auto" : "pan-y" }}
      onPointerMissed={() => (document.body.style.cursor = "")}
    >
      <Scene {...props} />
    </Canvas>
  );
}
