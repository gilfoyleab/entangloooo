'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { EntangledParticles } from './EntangledParticles';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function DriftingStars() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Rotate the star sphere negatively on X axis so stars in front move UP.
      groupRef.current.rotation.x -= delta * 0.0125; 
      groupRef.current.rotation.y += delta * 0.005;  // Slight drift sideways
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
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

          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
