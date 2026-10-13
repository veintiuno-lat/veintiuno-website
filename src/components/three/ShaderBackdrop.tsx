import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeroAurora } from "@/components/motion";

// Domain-warped fbm noise in brand colours. Raw WebGL (no three.js) so every hero can afford it.
const frag = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;
  float t = uTime * 0.05;
  vec2 m = (uMouse - 0.5) * 0.35;
  vec2 q = vec2(fbm(p * 1.6 + t + m), fbm(p * 1.6 - t + 4.7));
  vec2 r = vec2(fbm(p * 2.0 + 3.0 * q + vec2(1.7, 9.2) + 0.6 * t), fbm(p * 2.0 + 3.0 * q + vec2(8.3, 2.8) - 0.4 * t));
  float f = fbm(p * 1.4 + 2.5 * r);

  vec3 ink = vec3(0.027, 0.027, 0.04);
  vec3 ember = vec3(0.45, 0.17, 0.02);
  vec3 orange = vec3(0.97, 0.58, 0.10);
  vec3 gold = vec3(1.0, 0.85, 0.24);

  vec3 col = mix(ink, ember, smoothstep(0.25, 0.75, f));
  col = mix(col, orange, smoothstep(0.55, 0.95, f * length(q)) * 0.9);
  col = mix(col, gold, smoothstep(0.75, 1.0, f * r.x) * 0.5);
  // Fade into page background at the bottom and edges
  col *= smoothstep(0.0, 0.55, uv.y) * (1.0 - 0.35 * length(p * vec2(0.7, 1.0)));
  col = mix(ink, col, uIntensity);
  gl_FragColor = vec4(col, 1.0);
}`;

const vert = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

interface ShaderBackdropProps {
  className?: string;
  intensity?: number;
}

export default function ShaderBackdrop({ className, intensity = 0.85 }: ShaderBackdropProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    if (navigator.webdriver) return setFallback(true);
    const gl = el.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return setFallback(true);
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    gl.uniform1f(gl.getUniformLocation(prog, "uIntensity"), intensity);

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    // Render at half resolution: it's a soft gradient, nobody can tell, GPU says thanks.
    const resize = () => {
      // Fixed 0.6× of CSS pixels regardless of DPR: on retina this is ~3× fewer pixels than before
      // and the soft gradient looks identical.
      const s = 0.6;
      el.width = Math.max(1, el.clientWidth * s);
      el.height = Math.max(1, el.clientHeight * s);
      gl.viewport(0, 0, el.width, el.height);
      gl.uniform2f(uRes, el.width, el.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    let raf = 0;
    let last = 0;
    const start = performance.now();
    const draw = (now: number) => {
      // 30fps is plenty for a slow-moving fluid and halves GPU work, leaving headroom for scrolling.
      if (visible && now - last >= 32) {
        last = now;
        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;
        gl.uniform1f(uTime, reduce ? 12 : (now - start) / 1000);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
    };
  }, [reduce, intensity]);

  return (
    <div aria-hidden='true' className={cn("absolute inset-0 overflow-hidden bg-ink-950", className)}>
      {/* Aurora only when the shader can't run (prerender / no WebGL) — never animating hidden underneath */}
      {fallback && <HeroAurora variant='dark' intensity='subtle' />}
      <canvas ref={canvas} className='absolute inset-0 h-full w-full' />
    </div>
  );
}
