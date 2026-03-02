import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import TerminalScreen from './TerminalScreen'

/* Terminal positions: 3x2 grid layout */
export const TERMINAL_POSITIONS = [
  { x: -3.5, z: -2 },   // T-01
  { x: 0,    z: -2 },   // T-02
  { x: 3.5,  z: -2 },   // T-03
  { x: -3.5, z: 2 },    // T-04
  { x: 0,    z: 2 },    // T-05
  { x: 3.5,  z: 2 },    // T-06
]

/* "About me" door position — closer to terminals */
export const ABOUT_POSITION = { x: 5.5, z: 0 }

export default function Terminal({ project, index, onClick }) {
  const groupRef = useRef()
  const monitorRef = useRef()
  const lightRef = useRef()
  const [hovered, setHovered] = useState(false)

  const pos = TERMINAL_POSITIONS[index]
  const color = project.color

  useFrame((state) => {
    if (!monitorRef.current || !lightRef.current) return
    const t = state.clock.elapsedTime

    /* Glow pulse — each terminal offset by index */
    const pulse = 0.9 + Math.sin(t * 1.8 + index * 1.2) * 0.25
    monitorRef.current.material.emissiveIntensity = hovered ? 1.5 : pulse

    /* Light intensity pulse */
    lightRef.current.intensity = hovered ? 6 : 3.5 + Math.sin(t * 1.8 + index * 1.2) * 1.0
  })

  return (
    <group
      ref={groupRef}
      position={[pos.x, 0, pos.z]}
      onClick={(e) => {
        e.stopPropagation()
        onClick(project, pos)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'default'
      }}
    >
      {/* Colored light pool on the floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Desk base */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.6, 0.7, 1.0]} />
        <meshStandardMaterial
          color="#2a2520"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Keyboard area */}
      <mesh position={[0, 0.71, 0.2]}>
        <boxGeometry args={[0.8, 0.02, 0.3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Monitor bezel */}
      <mesh position={[0, 1.25, -0.2]}>
        <boxGeometry args={[1.3, 0.9, 0.1]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Monitor screen (emissive) */}
      <mesh ref={monitorRef} position={[0, 1.25, -0.14]}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshStandardMaterial
          color="#050505"
          emissive={color}
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* Screen text overlay */}
      <TerminalScreen
        project={project}
        position={[0, 1.25, -0.135]}
        color={color}
      />

      {/* Monitor stand */}
      <mesh position={[0, 0.82, -0.2]}>
        <boxGeometry args={[0.15, 0.14, 0.08]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Chair (simple cylinder + back) */}
      <mesh position={[0, 0.3, 0.9]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.15, 0.9]}>
        <cylinderGeometry args={[0.03, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Monitor glow light — brighter, wider */}
      <pointLight
        ref={lightRef}
        position={[0, 1.3, 0.4]}
        intensity={2.5}
        color={color}
        distance={7}
        decay={2}
      />
    </group>
  )
}
