'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const baseBlue = new THREE.Color("#e0e0e0"); // left sphere: bright white-gray
const flashBlue = new THREE.Color("#ffffff").multiplyScalar(3.0);
const baseRed = new THREE.Color("#888888");  // right sphere: mid-gray
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

function generateWormhole(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colorBlue = new THREE.Color("#cccccc"); // light gray
  const colorRed = new THREE.Color("#555555");   // dark gray
  const colorWhite = new THREE.Color("#ffffff");

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 2;
    const isBeam = Math.random() > 0.85; // Only 15% particles form the beam (much more subtle)

    let r = 0;
    if (isBeam) {
      r = Math.random() * 0.02; // Razor thin beam
    } else {
      // Subtler funnel curve
      r = 0.05 + Math.pow(Math.abs(x), 2.0) * radius * 0.85;
    }

    const theta = Math.random() * Math.PI * 2;
    positions[i * 3] = x;
    positions[i * 3 + 1] = r * Math.cos(theta) + (Math.random() - 0.5) * 0.1;
    positions[i * 3 + 2] = r * Math.sin(theta) + (Math.random() - 0.5) * 0.1;

    const blend = (x + 1) / 2;
    const c = colorBlue.clone().lerp(colorRed, blend);

    const distFromCenter = Math.abs(x);
    const whiteMix = Math.max(0, 1.0 - distFromCenter * 8.0);
    c.lerp(colorWhite, whiteMix);

    if (isBeam) {
      c.multiplyScalar(1.2);
    } else {
      // Darken the outer funnel significantly so it remains ghostly and almost invisible
      c.multiplyScalar(0.4);
    }

    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  return { positions, colors };
}

function generateLightningRing(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const initialPositions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    // A ring with some slight thickness and Z-spread
    const r = radius * (1.0 + (Math.random() - 0.5) * 0.05);
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    const z = (Math.random() - 0.5) * 0.1;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    initialPositions[i * 3] = x;
    initialPositions[i * 3 + 1] = y;
    initialPositions[i * 3 + 2] = z;
  }
  return { positions, initialPositions };
}

export function EntangledParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const baseRotation = useRef(0);
  const blueSphereRef = useRef<THREE.Points>(null);
  const redSphereRef = useRef<THREE.Points>(null);
  const whiteCoreRef = useRef<THREE.Points>(null);
  const blueRingRef = useRef<THREE.Points>(null);
  const redRingRef = useRef<THREE.Points>(null);

  const particleCount = 37500; // Increased density by 1.5x (from 25000)
  const ringParticleCount = 1500;
  const radius = 1.3;
  const offsetDistance = 3.3; // Increased gap even more safely

  const { bluePositions, blueColors } = useMemo(() => {
    const pos = generateLumpySphere(particleCount, radius, 0.15);
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      col[i] = baseBlue.r;
      col[i + 1] = baseBlue.g;
      col[i + 2] = baseBlue.b;
    }
    return { bluePositions: pos, blueColors: col };
  }, []);

  const { redPositions, redColors } = useMemo(() => {
    const pos = generateLumpySphere(particleCount, radius, 0.15);
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      col[i] = baseRed.r;
      col[i + 1] = baseRed.g;
      col[i + 2] = baseRed.b;
    }
    return { redPositions: pos, redColors: col };
  }, []);

  const { positions: blueRingPositions, initialPositions: blueRingInit } = useMemo(() => generateLightningRing(ringParticleCount, radius * 1.05), []);
  const { positions: redRingPositions, initialPositions: redRingInit } = useMemo(() => generateLightningRing(ringParticleCount, radius * 1.05), []);

  const { positions: corePositions, colors: coreColors } = useMemo(() => generateWormhole(6000, radius), []);

  const smoothedScroll = useRef(0);

  // Shared Random Flash State Timer for Entanglement
  const nextFlash = useRef(Math.random() * 1.0);
  const flashDuration = useRef(0.05 + Math.random() * 0.15);

  useFrame((state, delta) => {
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const targetScroll = Math.min(1, scrollY / 1800);
    // Slower lerp for that "buttery" feel the user liked before
    smoothedScroll.current += (targetScroll - smoothedScroll.current) * 0.08;
    const scroll = smoothedScroll.current;

    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // 1. Unwaveringly Continuous "Buttery" Ambient Rotation & Landing
      const currentY = groupRef.current.rotation.y;

      // The ambient rotation naturally slows down as you reach the top, so it doesn't fight the lock
      const speedFactor = Math.min(1, scroll * 5.0); // 0 at exactly top, 1 when scroll > 0.2
      baseRotation.current += delta * 0.15 * speedFactor;

      // Continuous magnetic locking to the nearest perfect side-by-side view (multiple of PI)
      const lockZone = 0.08; // Kick in the magnetism when very close to top
      const magnetStrength = Math.max(0, 1.0 - (scroll / lockZone));

      if (magnetStrength > 0) {
        // Determine the mathematically closest locking angle based on where the base rotation naturally is
        const targetLockY = Math.round(baseRotation.current / Math.PI) * Math.PI;
        // Apply a gentle, mathematically continuous pulling force directly to the base rotation
        // This ensures absolutely zero hard-snapping or discontinuous velocity jumps.
        baseRotation.current += (targetLockY - baseRotation.current) * delta * 4.0 * magnetStrength;
      }

      // Final target angle is simply our (potentially magnetized) base rotation + strictly scroll displacement
      const rotTargetY = baseRotation.current + (scroll * 2.5);

      // True shortest-path modulo (handling JS negative modulus issues)
      let diffY = (rotTargetY - currentY) % (Math.PI * 2);
      if (diffY > Math.PI) diffY -= Math.PI * 2;
      else if (diffY < -Math.PI) diffY += Math.PI * 2;

      // A single, unbroken lerp step. No 'if/else' changes to lerp speed, guaranteeing silky smooth response.
      groupRef.current.rotation.y += diffY * 0.15;

      const rotTargetX = Math.sin(t * 0.2) * 0.05 * (scroll > 0.01 ? 1 : 0);
      groupRef.current.rotation.x += (rotTargetX - groupRef.current.rotation.x) * 0.1;
      // groupRef.current.position.z = scroll * 0.7; // REMOVED: Locks size from growing on scroll

      // 1. Premium Mouse Parallax (Smoothly follows mouse)
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.4 - 0.2;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * delta * 2.0;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * delta * 2.0;

      // 2. Organic Breathing (Subtle pulsing scale)
      const breath = 1.0 + Math.sin(t * 1.5) * 0.012; // Much smoother and slower breathing
      groupRef.current.scale.set(breath, breath, breath);
    }

    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    // REMOVED: scroll pulling, locking spheres precisely in place so their size and gap remain absolutely constant
    const bx = -offsetDistance;
    const rx = offsetDistance;

    // Random "Chis Chis" Communication Flash Logic
    // Both interval and duration are completely random to create an organic, unpredictable data-burst effect.
    // Use a single synchronized state for true entanglement!
    let isFlashing = false;
    if (t > nextFlash.current) {
      isFlashing = true;
      if (t > nextFlash.current + flashDuration.current) {
        // Flash completely finished. Schedule next one!
        nextFlash.current = t + 0.2 + Math.random() * 1.6; // Random delay off (0.2s to 1.8s)
        flashDuration.current = 0.05 + Math.random() * 0.15; // Random flash duration (0.05s to 0.20s)
      }
    }

    // Helper to abruptly flash a rotating sector of the sphere
    const updateFlash = (
      sphereRef: React.RefObject<THREE.Points | null>,
      positions: Float32Array,
      baseColor: THREE.Color,
      isFlashing: boolean,
      time: number
    ) => {
      if (!sphereRef.current) return;
      const colors = sphereRef.current.geometry.attributes.color;
      if (!colors) return;

      // Rotating sector logic in WORLD space so both spheres look identical visually
      const angle = time * 8.0;
      const worldDir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);

      // Convert world direction down to local space so the visual flash doesn't rotate with the sphere
      const invQuat = sphereRef.current.quaternion.clone().invert();
      worldDir.applyQuaternion(invQuat);

      const dx = worldDir.x;
      const dy = worldDir.y;
      const dz = worldDir.z;

      for (let i = 0; i < particleCount; i++) {
        const px = positions[i * 3];
        const py = positions[i * 3 + 1];
        const pz = positions[i * 3 + 2];

        // Find particles in a rotating sector/cone area mapping 3D coords
        const dot = (px * dx + py * dy + pz * dz) / radius;
        const inSector = dot > 0.4; // Select a "slice" of the sphere

        // Flash part of the sphere in a rotating motion
        const shouldSpark = inSector && isFlashing;

        if (shouldSpark) {
          // Blinding white flash
          colors.array[i * 3] = flashBlue.r;
          colors.array[i * 3 + 1] = flashBlue.g;
          colors.array[i * 3 + 2] = flashBlue.b;
        } else {
          // Extremely fast decay back to base color after the flash
          const r = colors.array[i * 3];
          if (Math.abs(r - baseColor.r) > 0.01) {
            colors.array[i * 3] -= (r - baseColor.r) * 0.25;
            colors.array[i * 3 + 1] -= (colors.array[i * 3 + 1] - baseColor.g) * 0.25;
            colors.array[i * 3 + 2] -= (colors.array[i * 3 + 2] - baseColor.b) * 0.25;
          }
        }
      }
      colors.needsUpdate = true;
    };

    const updateRing = (
      ringRef: React.RefObject<THREE.Points | null>,
      initialPos: Float32Array,
      isFlashing: boolean,
      time: number
    ) => {
      if (!ringRef.current) return;
      const positions = ringRef.current.geometry.attributes.position;
      const mat = ringRef.current.material as THREE.PointsMaterial;
      if (!positions || !mat) return;

      if (isFlashing) {
        mat.opacity = 1.0;
        // High-energy electrical jitter
        for (let i = 0; i < ringParticleCount; i++) {
          const noiseX = (Math.random() - 0.5) * 0.15;
          const noiseY = (Math.random() - 0.5) * 0.15;
          const noiseZ = (Math.random() - 0.5) * 0.15;

          positions.array[i * 3] = initialPos[i * 3] + noiseX;
          positions.array[i * 3 + 1] = initialPos[i * 3 + 1] + noiseY;
          positions.array[i * 3 + 2] = initialPos[i * 3 + 2] + noiseZ;
        }
        positions.needsUpdate = true;
      } else {
        // Fade out
        mat.opacity *= 0.85;
        if (mat.opacity < 0.01) mat.opacity = 0;
      }
    };

    if (blueSphereRef.current) {
      blueSphereRef.current.position.x = bx;
      blueSphereRef.current.rotation.x += delta * 0.07;
      blueSphereRef.current.rotation.y += delta * 0.1;
      updateFlash(blueSphereRef, bluePositions, baseBlue, isFlashing, t);
    }

    if (redSphereRef.current) {
      redSphereRef.current.position.x = rx;
      redSphereRef.current.rotation.x -= delta * 0.07;
      redSphereRef.current.rotation.y -= delta * 0.1;
      updateFlash(redSphereRef, redPositions, baseRed, isFlashing, t);
    }

    if (whiteCoreRef.current) {
      // Dynamically stretch the tunnel to bridge the exact gap between spheres
      const distance = rx - bx;
      // Since normal X is -1 to 1, distance / 2 perfectly maps to full distance
      whiteCoreRef.current.scale.set(distance / 2, 1, 1);

      // Make the wormhole spin to look like a high-energy data vortex
      whiteCoreRef.current.rotation.x += delta * 0.35;

      const mat = whiteCoreRef.current.material as THREE.PointsMaterial;
      // Bridge flashes noticeably but naturally when transferring
      if (mat) {
        mat.opacity = isFlashing ? 0.8 : 0.4;
        mat.size = isFlashing ? 0.035 : 0.02;
        mat.color.setRGB(
          isFlashing ? 1.5 : 1.0,
          isFlashing ? 1.5 : 1.0,
          isFlashing ? 1.5 : 1.0
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.45, 0]}>
      {/* Dynamic Wormhole / Laser connecting tunnel */}
      <points ref={whiteCoreRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={6000} args={[corePositions, 3]} />
          <bufferAttribute attach="attributes-color" count={6000} args={[coreColors, 3]} />
        </bufferGeometry>
        <PointMaterial vertexColors transparent size={0.02} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.6} />
      </points>

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

      {/* Lightning Rings */}
      <points ref={blueRingRef} position={[-offsetDistance, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={ringParticleCount} args={[blueRingPositions, 3]} />
        </bufferGeometry>
        <PointMaterial color="#ffffff" transparent size={0.04} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0} />
      </points>

      <points ref={redRingRef} position={[offsetDistance, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={ringParticleCount} args={[redRingPositions, 3]} />
        </bufferGeometry>
        <PointMaterial color="#ffffff" transparent size={0.04} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0} />
      </points>
    </group>
  );
}
