'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate very dense points on a lumpy sphere surface
function generateLumpySphere(count: number, radius: number, noiseAmp: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    
    // Add 3D noise/lumps to the surface
    const noise = Math.sin(theta * 6) * Math.cos(phi * 6) * noiseAmp;
    const r = radius + noise + (Math.random() * 0.1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

export function EntangledParticles({ scrollProgress }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const blueSphereRef = useRef<THREE.Points>(null);
  const redSphereRef = useRef<THREE.Points>(null);
  const whiteCoreRef = useRef<THREE.Points>(null);

  const particleCount = 25000; 
  // Scaled down to match macrocosmos proportions better
  const radius = 1.3; 
  const offsetDistance = 0.9;
  
  const bluePositions = useMemo(() => generateLumpySphere(particleCount, radius, 0.15), []);
  const redPositions = useMemo(() => generateLumpySphere(particleCount, radius, 0.15), []);
  
  // The central bright overlapping structure
  const corePositions = useMemo(() => generateLumpySphere(20000, radius * 1.4, 0.1), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Very slow majestic rotation of the whole entangled mass
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (blueSphereRef.current) {
      blueSphereRef.current.rotation.x += delta * 0.1;
      blueSphereRef.current.rotation.y += delta * 0.15;
    }
    if (redSphereRef.current) {
      redSphereRef.current.rotation.x -= delta * 0.1;
      redSphereRef.current.rotation.y -= delta * 0.15;
    }
    if (whiteCoreRef.current) {
      whiteCoreRef.current.rotation.z += delta * 0.05;
      whiteCoreRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      
      {/* Central Dense White Overlap/Core */}
      <Points ref={whiteCoreRef} positions={corePositions} scale={[1.2, 0.8, 0.8]}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>

      {/* Blue / Cyan Entangled Particle Sphere (Left) */}
      <Points ref={blueSphereRef} positions={bluePositions} position={[-offsetDistance, 0, 0]}>
        <PointMaterial
          transparent
          color="#00d2ff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>

      {/* Red / Magenta Entangled Particle Sphere (Right) */}
      <Points ref={redSphereRef} positions={redPositions} position={[offsetDistance, 0, 0]}>
        <PointMaterial
          transparent
          color="#ff1a66"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>

    </group>
  );
}
