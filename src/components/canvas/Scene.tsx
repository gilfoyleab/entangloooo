'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';
import { EntangledParticles } from './EntangledParticles';
import { Suspense } from 'react';

export function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#020205] cursor-move">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 60 }} 
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#020205', 10, 30]} />
        <color attach="background" args={['#020205']} />
        
        <Suspense fallback={null}>
          <Stars radius={150} depth={50} count={10000} factor={6} saturation={1} fade speed={2} />
          <ambientLight intensity={0.5} />
          
          <spotLight position={[-10, 10, 10]} intensity={500} color="#00d2ff" penumbra={1} decay={2} distance={50} />
          <spotLight position={[10, -10, 10]} intensity={500} color="#ff1a66" penumbra={1} decay={2} distance={50} />
          
          <EntangledParticles />
          
          <OrbitControls 
            enableZoom={true} 
            maxDistance={25}
            minDistance={5}
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.8} 
            maxPolarAngle={Math.PI / 1.5} 
            minPolarAngle={Math.PI / 3} 
          />

          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.05} mipmapBlur intensity={2.5} radius={0.8} />
            <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.003, 0.003)} />
            <Noise opacity={0.06} />
            <Vignette eskil={false} offset={0.1} darkness={1.2} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-40 text-sm tracking-[0.2em] font-light">
        DRAG TO EXPLORE THE COSMOS
      </div>
    </div>
  );
}
