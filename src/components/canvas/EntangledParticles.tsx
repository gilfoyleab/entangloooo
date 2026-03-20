'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const baseBlue = new THREE.Color("#00d2ff");
const flashBlue = new THREE.Color("#ffffff").multiplyScalar(3.0);
const baseRed = new THREE.Color("#ff1a66");
const flashRed = new THREE.Color("#ffffff").multiplyScalar(3.0);

function generateLumpySphere(count: number, radius: number, noiseAmp: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const noise = Math.sin(theta * 6) * Math.cos(phi * 6) * noiseAmp;
    const r = radius + noise + (Math.random() * 0.1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

export function EntangledParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const blueSphereRef = useRef<THREE.Points>(null);
  const redSphereRef = useRef<THREE.Points>(null);
  const whiteCoreRef = useRef<THREE.Points>(null);

  const particleCount = 25000;
  const radius = 1.3;
  const offsetDistance = 0.9;

  const { bluePositions, blueColors } = useMemo(() => {
    const pos = generateLumpySphere(particleCount, radius, 0.15);
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      col[i] = baseBlue.r;
      col[i+1] = baseBlue.g;
      col[i+2] = baseBlue.b;
    }
    return { bluePositions: pos, blueColors: col };
  }, []);

  const { redPositions, redColors } = useMemo(() => {
    const pos = generateLumpySphere(particleCount, radius, 0.15);
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      col[i] = baseRed.r;
      col[i+1] = baseRed.g;
      col[i+2] = baseRed.b;
    }
    return { redPositions: pos, redColors: col };
  }, []);

  const corePositions = useMemo(() => generateLumpySphere(20000, radius * 1.4, 0.1), []);

  useFrame((state, delta) => {
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scroll = Math.min(1, scrollY / 1500);
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (0.08 + scroll * 0.1);
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;
      groupRef.current.position.z = scroll * 0.7;
    }

    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const pullAmount = isMobile ? 0.5 : 2.2;
    const bx = -(offsetDistance + scroll * pullAmount);
    const rx = (offsetDistance + scroll * pullAmount);

    // Generate virtual signals with a 2-3 second delay burst logic
    const cycleLength = 2.8; 
    const travelTime = 1.0;  

    const time1 = t;
    const cycle1Id = Math.floor(time1 / cycleLength);
    const cycle1 = time1 - cycle1Id * cycleLength;

    let p1 = -10; 
    if (cycle1 < travelTime) p1 = cycle1 / travelTime;

    // Golden angle rotation to ensure a completely new side is traversed each cycle
    const theta1 = cycle1Id * 137.5 * (Math.PI / 180);
    const localSxB = THREE.MathUtils.lerp(-radius, radius, p1);

    const time2 = t + cycleLength / 2;
    const cycle2Id = Math.floor(time2 / cycleLength);
    const cycle2 = time2 - cycle2Id * cycleLength;
    
    let p2 = -10;
    if (cycle2 < travelTime) p2 = cycle2 / travelTime;

    const theta2 = cycle2Id * 137.5 * (Math.PI / 180) + Math.PI;
    const localSxR = THREE.MathUtils.lerp(-radius, radius, p2);

    // Helper to update colors locally for ONE signal
    const updateSphereColors = (
      sphereRef: React.RefObject<THREE.Points | null>, 
      positions: Float32Array, 
      baseColor: THREE.Color, 
      flashColor: THREE.Color, 
      localSx: number,
      theta: number
    ) => {
       if (!sphereRef.current) return;
       const colors = sphereRef.current.geometry.attributes.color;
       if (!colors) return;

       // Calculate surface-hugging Y and Z coordinates strictly in local spherical space
       const rSq = radius * radius;
       const R = (localSx * localSx <= rSq) ? Math.sqrt(rSq - localSx * localSx) : 0;
       const curY = R * Math.cos(theta);
       const curZ = R * Math.sin(theta);

       for (let i = 0; i < particleCount; i++) {
          const px = positions[i*3];
          const py = positions[i*3+1];
          const pz = positions[i*3+2];
          
          // Check 3D distance strictly to the local signal
          const d = (px - localSx)**2 + (py - curY)**2 + (pz - curZ)**2;
          
          let intensity = 0;
          if (d < 0.1) intensity = (0.1 - d) * 15.0; 
          
          if (intensity > 0) {
             const intenseTarget = Math.min(1.0, intensity);
             colors.array[i*3] = baseColor.r + (flashColor.r - baseColor.r) * intenseTarget;
             colors.array[i*3+1] = baseColor.g + (flashColor.g - baseColor.g) * intenseTarget;
             colors.array[i*3+2] = baseColor.b + (flashColor.b - baseColor.b) * intenseTarget;
          } else {
             const r = colors.array[i*3];
             // Smoothly decay back to base color to leave a data trail
             if (Math.abs(r - baseColor.r) > 0.01) {
                colors.array[i*3] -= (r - baseColor.r) * 0.06;
                colors.array[i*3+1] -= (colors.array[i*3+1] - baseColor.g) * 0.06;
                colors.array[i*3+2] -= (colors.array[i*3+2] - baseColor.b) * 0.06;
             }
          }
       }
       colors.needsUpdate = true;
    }

    if (blueSphereRef.current) {
      blueSphereRef.current.position.x = bx;
      blueSphereRef.current.rotation.x += delta * 0.1;
      blueSphereRef.current.rotation.y += delta * 0.15;
      updateSphereColors(blueSphereRef, bluePositions, baseBlue, flashBlue, localSxB, theta1);
    }

    if (redSphereRef.current) {
      redSphereRef.current.position.x = rx;
      redSphereRef.current.rotation.x -= delta * 0.1;
      redSphereRef.current.rotation.y -= delta * 0.15;
      updateSphereColors(redSphereRef, redPositions, baseRed, flashRed, localSxR, theta2);
    }

    if (whiteCoreRef.current) {
      const coreScale = Math.max(0, 1 - scroll * 1.5);
      whiteCoreRef.current.scale.set(coreScale * 1.2, coreScale * 0.8, coreScale * 0.8);
      const mat = whiteCoreRef.current.material as THREE.PointsMaterial;
      if (mat) mat.opacity = 0.6 * coreScale;
      whiteCoreRef.current.rotation.z += delta * 0.05;
      whiteCoreRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Central Dense White Overlap/Core */}
      <Points ref={whiteCoreRef} positions={corePositions} scale={[1.2, 0.8, 0.8]}>
        <PointMaterial transparent color="#ffffff" size={0.012} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.6} />
      </Points>

      {/* Blue / Cyan Particle Sphere */}
      <points ref={blueSphereRef} position={[-offsetDistance, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} args={[bluePositions, 3]} />
          <bufferAttribute attach="attributes-color" count={particleCount} args={[blueColors, 3]} />
        </bufferGeometry>
        <PointMaterial vertexColors transparent size={0.015} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.8} />
      </points>

      {/* Red / Magenta Particle Sphere */}
      <points ref={redSphereRef} position={[offsetDistance, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} args={[redPositions, 3]} />
          <bufferAttribute attach="attributes-color" count={particleCount} args={[redColors, 3]} />
        </bufferGeometry>
        <PointMaterial vertexColors transparent size={0.015} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.8} />
      </points>
    </group>
  );
}
