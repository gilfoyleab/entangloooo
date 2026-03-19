'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const COLOR_CYAN = "#00d2ff";
const COLOR_MAGENTA = "#ff1a66";

// A glowing, turbulent cosmic core
function CosmicCore({ position, color, reverse }: { position: [number, number, number], color: string, reverse?: boolean }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * (reverse ? -0.4 : 0.4);
      ref.current.rotation.y += delta * (reverse ? -0.6 : 0.6);
      ref.current.rotation.z += delta * 0.2;
      
      // Heartbeat pulse over time
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + (reverse ? Math.PI : 0)) * 0.08;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={3} position={position}>
      <group ref={ref}>
        {/* Intense solid inner core */}
        <Sphere args={[1.2, 64, 64]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} toneMapped={false} />
        </Sphere>
        
        {/* Outer chaotic wireframe sphere */}
        <Sphere args={[1.5, 32, 32]}>
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={2} 
            wireframe 
            transparent 
            opacity={0.5} 
            blending={THREE.AdditiveBlending}
            toneMapped={false} 
          />
        </Sphere>

        {/* Secondary tilted wireframe core */}
        <Sphere args={[1.8, 24, 24]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial 
            color="#ffffff" 
            emissive={color} 
            emissiveIntensity={1.5} 
            wireframe 
            transparent 
            opacity={0.3} 
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </Sphere>
      </group>
    </Float>
  );
}

// Generates the entangled connections between the two cosmos
function Connections() {
  const linesCount = 80;
  const curves = useMemo(() => {
    return Array.from({ length: linesCount }).map(() => {
      // Start near the left core, end near the right core
      const start = new THREE.Vector3(-3.5 + (Math.random()-0.5), (Math.random()-0.5)*2, (Math.random()-0.5)*2);
      const end = new THREE.Vector3(3.5 + (Math.random()-0.5), (Math.random()-0.5)*2, (Math.random()-0.5)*2);
      
      // Chaotic control points in the middle
      const mid1 = new THREE.Vector3(-1.5, (Math.random()-0.5)*6, (Math.random()-0.5)*6);
      const mid2 = new THREE.Vector3(1.5, (Math.random()-0.5)*6, (Math.random()-0.5)*6);
      
      return new THREE.CatmullRomCurve3([start, mid1, mid2, end]);
    });
  }, []);

  return (
    <group>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 100, 0.01 + Math.random()*0.02, 4, false]} />
          <meshBasicMaterial 
            color={Math.random() > 0.5 ? COLOR_CYAN : COLOR_MAGENTA} 
            transparent 
            opacity={0.15 + Math.random() * 0.25} 
            blending={THREE.AdditiveBlending} 
            toneMapped={false}
          />
        </mesh>
      ))}
      <EnergyPulses curves={curves} />
    </group>
  );
}

// Shimmering light pulses traveling along the curves
function EnergyPulses({ curves }: { curves: THREE.Curve<THREE.Vector3>[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  
  const properties = useMemo(() => curves.map(() => ({
    progress: Math.random(),
    speed: 0.1 + Math.random() * 0.4,
    direction: Math.random() > 0.5 ? 1 : -1
  })), [curves]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < curves.length; i++) {
        const prop = properties[i];
        prop.progress = (prop.progress + prop.speed * prop.direction * delta) % 1;
        if (prop.progress < 0) prop.progress += 1; // Wrap around for negative direction

        const pos = curves[i].getPoint(prop.progress);
        dummy.position.copy(pos);
        
        // Pulse gets bigger in the middle of the entanglement
        const scale = 1 + Math.sin(prop.progress * Math.PI) * 2;
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        
        meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, curves.length]}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshBasicMaterial color="#ffffff" toneMapped={false} />
    </instancedMesh>
  );
}

// Background swirling dusty particles
function CosmicDust() {
    const count = 15000;
    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        const radius = 25;
        for(let i=0; i<count; i++) {
            p[i*3] = (Math.random() - 0.5) * radius;
            p[i*3+1] = (Math.random() - 0.5) * radius;
            p[i*3+2] = (Math.random() - 0.5) * radius * 0.5; // Flatter z-depth
        }
        return p;
    }, []);

    const colors = useMemo(() => {
        const c = new Float32Array(count * 3);
        const color1 = new THREE.Color(COLOR_CYAN);
        const color2 = new THREE.Color(COLOR_MAGENTA);
        for(let i=0; i<count; i++) {
            // Mix colors based on random position
            const mixed = Math.random() > 0.5 ? color1 : color2;
            mixed.toArray(c, i * 3);
        }
        return c;
    }, []);

    const ref = useRef<THREE.Points>(null);
    useFrame((_, delta) => {
        if(ref.current) {
            ref.current.rotation.y += delta * 0.03;
            ref.current.rotation.z -= delta * 0.01;
        }
    });

    return (
        <Points ref={ref} positions={positions} colors={colors}>
            <PointMaterial 
                transparent 
                vertexColors 
                size={0.06} 
                sizeAttenuation 
                depthWrite={false} 
                blending={THREE.AdditiveBlending} 
                opacity={0.4}
            />
        </Points>
    );
}

export function EntangledParticles() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Very slow majestic wobble of the entire entangled system
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <CosmicCore position={[-3.5, 0, 0]} color={COLOR_CYAN} />
      <CosmicCore position={[3.5, 0, 0]} color={COLOR_MAGENTA} reverse />
      <Connections />
      <CosmicDust />
    </group>
  );
}
