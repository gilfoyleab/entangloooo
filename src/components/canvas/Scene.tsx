'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { EntangledParticles } from './EntangledParticles';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function DriftingStars() {
  const groupRef = useRef<THREE.Group>(null);
  const baseRotation = useRef(0);
  const smoothedScroll = useRef(0);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      const targetScroll = Math.min(1, scrollY / 2500);
      smoothedScroll.current += (targetScroll - smoothedScroll.current) * 0.05;
      const scroll = smoothedScroll.current;
      const t = state.clock.elapsedTime;

      // 1. Dynamic Snap-to-Home: Ensure stars are perfectly oriented at the very top (scroll=0)
      const homeSnap = Math.min(1, scroll * 15);
      groupRef.current.rotation.z = ((-t * 0.04) - (scroll * 1.0)) * homeSnap; 
      
      // 2. Ultra-smooth Orbit/Pivot
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.04 * homeSnap;
      groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.04 * homeSnap;

      // 3. Depth Parallax (Minor zoom effect on scroll)
      groupRef.current.position.z = -scroll * 40;

      // 4. Pointer Reaction (Subtle background parallax following mouse)
      const targetX = state.pointer.x * 4.0;
      const targetY = state.pointer.y * 4.0;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * delta * 0.8;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * delta * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Increased the number of uniform stars from 1500 to 4500 */}
      <Stars radius={100} depth={50} count={4500} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

function DynamicEffects() {
  const bloomRef = useRef<any>(null);
  
  useFrame((state) => {
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scroll = Math.min(1, scrollY / 2000);
    const t = state.clock.elapsedTime;
    
    // 1. Dynamic Camera FOV Zoom (Warp effect)
    // Smoothly interpolate FOV for a "premium" feel
    if (state.camera instanceof THREE.PerspectiveCamera) {
      const targetFov = 45 + scroll * 12;
      state.camera.fov += (targetFov - state.camera.fov) * 0.05;
      state.camera.updateProjectionMatrix();
    }

    // 2. Pulsing Bloom Intensity (Breathing effect)
    if (bloomRef.current) {
      bloomRef.current.intensity = 1.4 + Math.sin(t * 1.2) * 0.5;
    }
  });

  return (
    <EffectComposer>
      <Bloom 
        ref={bloomRef} 
        luminanceThreshold={0.15} 
        luminanceSmoothing={0.9} 
        height={300} 
        intensity={1.5} 
      />
    </EffectComposer>
  );
}

export function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020205]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#020205']} />

        <Suspense fallback={null}>
          <DriftingStars />
          <ambientLight intensity={0.5} />

          <EntangledParticles />

          <DynamicEffects />
        </Suspense>
      </Canvas>
    </div>
  );
}
