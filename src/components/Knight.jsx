import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Shared armor material props */
const ARMOR = {
  color: '#1a2a1a',
  emissive: '#4ade80',
  emissiveIntensity: 0.15,
  metalness: 0.8,
  roughness: 0.3,
}

export default function Knight() {
  const groupRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()
  const bladeRef = useRef()
  const capeRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime

    /* Hover bob */
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.03
    }

    /* Eye flicker */
    const eyeGlow = 3.0 + Math.sin(t * 2) * 1.0
    if (leftEyeRef.current) leftEyeRef.current.material.emissiveIntensity = eyeGlow
    if (rightEyeRef.current) rightEyeRef.current.material.emissiveIntensity = eyeGlow

    /* Sword pulse */
    if (bladeRef.current) {
      bladeRef.current.material.emissiveIntensity = 1.5 + Math.sin(t * 1.5) * 0.5
    }

    /* Cape opacity pulse */
    if (capeRef.current) {
      capeRef.current.material.opacity = 0.55 + Math.sin(t * 0.8) * 0.15
    }
  })

  return (
    <group
      ref={groupRef}
      position={[-4, 0, -4.5]}
      rotation={[0, Math.PI / 7, 0]}
      scale={[1.3, 1.3, 1.3]}
    >
      {/* ===== HEAD — low poly helmet ===== */}
      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[0.22, 8, 6]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>

      {/* Helmet crest */}
      <mesh position={[0, 3.1, 0]}>
        <coneGeometry args={[0.08, 0.3, 4]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>

      {/* ===== VISOR / EYES ===== */}
      <mesh ref={leftEyeRef} position={[-0.08, 2.82, 0.18]}>
        <boxGeometry args={[0.06, 0.02, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#4ade80"
          emissiveIntensity={3.0}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.08, 2.82, 0.18]}>
        <boxGeometry args={[0.06, 0.02, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#4ade80"
          emissiveIntensity={3.0}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>

      {/* ===== NECK ===== */}
      <mesh position={[0, 2.55, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 6]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>

      {/* ===== TORSO — chest plate ===== */}
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.25]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>

      {/* ===== SHOULDER PAULDRONS ===== */}
      <mesh position={[-0.35, 2.4, 0]} scale={[1, 0.7, 1]}>
        <sphereGeometry args={[0.18, 6, 4]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>
      <mesh position={[0.35, 2.4, 0]} scale={[1, 0.7, 1]}>
        <sphereGeometry args={[0.18, 6, 4]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>

      {/* ===== ARMS ===== */}
      {/* Left arm */}
      <mesh position={[-0.35, 1.7, 0]} rotation={[0.05, 0, 0.1]}>
        <cylinderGeometry args={[0.08, 0.07, 0.6, 6]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>
      {/* Right arm — angled forward (holding sword) */}
      <mesh position={[0.35, 1.7, 0.05]} rotation={[0.15, 0, -0.1]}>
        <cylinderGeometry args={[0.08, 0.07, 0.6, 6]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>

      {/* ===== GAUNTLETS ===== */}
      <mesh position={[-0.38, 1.35, 0]}>
        <sphereGeometry args={[0.09, 6, 4]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>
      <mesh position={[0.38, 1.35, 0.08]}>
        <sphereGeometry args={[0.09, 6, 4]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>

      {/* ===== SWORD (right hand) ===== */}
      <group position={[0.38, 1.1, 0.08]} rotation={[0.1, 0, 0]}>
        {/* Handle */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.2, 4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.5} />
        </mesh>
        {/* Crossguard */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.2, 0.03, 0.03]} />
          <meshStandardMaterial {...ARMOR} emissiveIntensity={0.3} />
        </mesh>
        {/* Blade — GLOWS */}
        <mesh ref={bladeRef} position={[0, -0.55, 0]}>
          <boxGeometry args={[0.04, 1.0, 0.015]} />
          <meshStandardMaterial
            color="#1a3a1a"
            emissive="#4ade80"
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* ===== WAIST ===== */}
      <mesh position={[0, 1.65, 0]}>
        <cylinderGeometry args={[0.2, 0.15, 0.2, 6]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>
      {/* Belt */}
      <mesh position={[0, 1.65, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.28]} />
        <meshStandardMaterial {...ARMOR} emissiveIntensity={0.25} />
      </mesh>

      {/* ===== LEGS ===== */}
      <mesh position={[-0.15, 1.1, 0]}>
        <cylinderGeometry args={[0.09, 0.08, 0.7, 6]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>
      <mesh position={[0.15, 1.1, 0]}>
        <cylinderGeometry args={[0.09, 0.08, 0.7, 6]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>

      {/* ===== BOOTS ===== */}
      <mesh position={[-0.15, 0.7, 0.03]}>
        <boxGeometry args={[0.12, 0.15, 0.2]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>
      <mesh position={[0.15, 0.7, 0.03]}>
        <boxGeometry args={[0.12, 0.15, 0.2]} />
        <meshStandardMaterial {...ARMOR} />
      </mesh>

      {/* ===== CAPE ===== */}
      <mesh ref={capeRef} position={[0, 2.0, -0.2]} rotation={[0.15, 0, 0]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial
          color="#0a1a0f"
          emissive="#4ade80"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* ===== PEDESTAL ===== */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.15, 8]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#4ade80"
          emissiveIntensity={0.1}
          metalness={0.5}
          roughness={0.6}
        />
      </mesh>

      {/* ===== LIGHTING ===== */}
      <pointLight
        position={[0, 4, 0]}
        intensity={1.5}
        color="#4ade80"
        distance={6}
        decay={2}
      />
      <spotLight
        position={[0, 4.5, 1.5]}
        target-position={[0, 2.5, 0]}
        angle={Math.PI / 6}
        penumbra={0.8}
        intensity={0.5}
        color="#ffffff"
        distance={8}
        decay={2}
      />
    </group>
  )
}
