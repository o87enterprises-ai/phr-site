"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF } from "@react-three/drei";
import { useRef, useMemo, useEffect, Suspense } from "react";
import * as THREE from "three";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";

const BRAND = {
  charcoal: "#111111",
  lime: "#CFFF04",
};

type ProgressRef = { current: number };

function smoothstep(x: number, a: number, b: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/* ------------------------------------------------------------------ */
/* Procedural toolbox                                                  */
/* ------------------------------------------------------------------ */
function Toolbox({ progress }: { progress: ProgressRef }) {
  const drawerRefs = useRef<Array<THREE.Group | null>>([]);

  useFrame(() => {
    const p = progress.current;
    drawerRefs.current.forEach((g, i) => {
      if (!g) return;
      const t = smoothstep(p, 0.12 + i * 0.05, 0.42 + i * 0.05);
      g.position.z = t * (0.75 + i * 0.15);
    });
  });

  return (
    <group position={[0, -0.4, 0]}>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.2, 1.4, 1.2]} />
        <meshStandardMaterial color={BRAND.charcoal} metalness={0.55} roughness={0.35} />
      </mesh>

      <mesh position={[0, 1.41, 0]}>
        <boxGeometry args={[2.22, 0.025, 1.22]} />
        <meshStandardMaterial color={BRAND.lime} metalness={0.9} roughness={0.15} />
      </mesh>

      <mesh position={[0, 1.56, 0]}>
        <torusGeometry args={[0.28, 0.035, 12, 32, Math.PI]} />
        <meshStandardMaterial color={BRAND.charcoal} metalness={0.7} roughness={0.25} />
      </mesh>

      {([[-0.9, 0.4], [0.9, 0.4], [-0.9, -0.4], [0.9, -0.4]] as [number, number][]).map(
        ([x, z], i) => (
          <mesh key={i} position={[x, 0.04, z]}>
            <cylinderGeometry args={[0.07, 0.07, 0.08, 16]} />
            <meshStandardMaterial color={BRAND.charcoal} metalness={0.3} roughness={0.8} />
          </mesh>
        )
      )}

      {[0, 1, 2].map((i) => {
        const y = 1.02 - i * 0.36;
        return (
          <group
            key={i}
            ref={(el) => {
              drawerRefs.current[i] = el;
            }}
            position={[0, y, 0]}
          >
            <mesh>
              <boxGeometry args={[1.95, 0.32, 1.0]} />
              <meshStandardMaterial color={BRAND.charcoal} metalness={0.4} roughness={0.55} />
            </mesh>
            <mesh position={[0, 0, 0.51]}>
              <boxGeometry args={[2.0, 0.34, 0.04]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.02, 0.54]}>
              <boxGeometry args={[0.55, 0.05, 0.03]} />
              <meshStandardMaterial color={BRAND.lime} metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Flying tool                                                         */
/* ------------------------------------------------------------------ */
function FlyingTool({
  url,
  target,
  progress,
  delay,
  baseScale = 1,
}: {
  url: string;
  target: [number, number, number];
  progress: ProgressRef;
  delay: number;
  baseScale?: number;
}) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(), [scene]);
  const wrapperRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = 1.2 / maxDim;
    clone.scale.setScalar(s);
    const center = box.getCenter(new THREE.Vector3());
    clone.position.set(-center.x * s, -center.y * s, -center.z * s);
  }, [clone]);

  useFrame((_, delta) => {
    if (!wrapperRef.current) return;
    const p = progress.current;
    const t = smoothstep(p, 0.42 + delay, 0.78 + delay);

    const start = new THREE.Vector3(0, 1.2, 0);
    const tgt = new THREE.Vector3(...target);
    wrapperRef.current.position.lerpVectors(start, tgt, t);

    wrapperRef.current.rotation.x = (1 - t) * Math.PI * 0.6;
    wrapperRef.current.rotation.y += delta * 0.25 * t;
    wrapperRef.current.rotation.z = t * 0.15;

    wrapperRef.current.scale.setScalar(t * baseScale);
    wrapperRef.current.visible = t > 0.01;
  });

  return (
    <group ref={wrapperRef}>
      <primitive object={clone} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Climax multi-tool                                                   */
/* ------------------------------------------------------------------ */
function ClimaxTool({ progress }: { progress: ProgressRef }) {
  const { scene } = useGLTF("/models/rigged_multi_tool_animated.glb");
  const clone = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = 2.2 / maxDim;
    clone.scale.setScalar(s);
    const center = box.getCenter(new THREE.Vector3());
    clone.position.set(-center.x * s, -center.y * s, -center.z * s);
    readyRef.current = true;
  }, [clone]);

  useFrame((_, delta) => {
    if (!groupRef.current || !readyRef.current) return;
    const p = progress.current;
    const s = smoothstep(p, 0.78, 0.98);
    const t = smoothstep(p, 0.82, 1.0);
    groupRef.current.scale.setScalar(s * 1.2);
    groupRef.current.rotation.y += delta * 0.4 * t;
    groupRef.current.rotation.z = (1 - s) * 0.4;
    groupRef.current.visible = s > 0.01;
  });

  return (
    <group ref={groupRef}>
      <primitive object={clone} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */
function Scene({ progress }: { progress: ProgressRef }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <directionalLight position={[-4, 3, -3]} intensity={0.5} color={BRAND.lime} />
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <Toolbox progress={progress} />
        <FlyingTool
          url="/models/tools__series_of_combination_wrench_tools.glb"
          target={[-2.0, 1.6, 0.4]}
          progress={progress}
          delay={0.0}
          baseScale={0.9}
        />
        <FlyingTool
          url="/models/tools__monkey_tool.glb"
          target={[2.0, 1.7, -0.3]}
          progress={progress}
          delay={0.05}
          baseScale={0.9}
        />
        <FlyingTool
          url="/models/tool_-_boltcutter.glb"
          target={[0, 2.3, -0.8]}
          progress={progress}
          delay={0.1}
          baseScale={0.85}
        />
        <ClimaxTool progress={progress} />
      </Suspense>

      <ContactShadows
        position={[0, -0.4, 0]}
        opacity={0.45}
        scale={10}
        blur={2.5}
        far={4}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Export                                                              */
/* ------------------------------------------------------------------ */
export const ThreeScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  const opacity = useTransform(scrollYProgress, [0, 0.03, 0.92, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full pointer-events-none">
      <motion.div style={{ opacity }} className="sticky top-0 h-screen w-full">
        <Canvas
          camera={{ position: [0, 1.2, 6.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          className="pointer-events-auto"
        >
          <Scene progress={progressRef} />
        </Canvas>
      </motion.div>
    </div>
  );
};

useGLTF.preload("/models/tools__series_of_combination_wrench_tools.glb");
useGLTF.preload("/models/tools__monkey_tool.glb");
useGLTF.preload("/models/tool_-_boltcutter.glb");
useGLTF.preload("/models/rigged_multi_tool_animated.glb");
