import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'
import Terminal, { ABOUT_POSITION } from './Terminal'
import Knight from './Knight'
import { projects } from '../data/projects'

/* Shared wall material params */
const WALL_COLOR = '#0f1210'
const WALL_PROPS = { roughness: 0.9, metalness: 0.05 }
const TRIM_COLOR = '#1a1a1a'

export default function TradingFloor({ onSelectProject, onOpenAbout }) {
  const aboutLightRef = useRef()
  const aboutLight2Ref = useRef()
  const signLightRef = useRef()
  const arrowLightRef = useRef()
  const [aboutHovered, setAboutHovered] = useState(false)

  /* Arrow-shaped sign geometry */
  const arrowGeom = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0.3)
    shape.lineTo(1.2, 0.3)
    shape.lineTo(1.2, 0.5)
    shape.lineTo(1.7, 0)
    shape.lineTo(1.2, -0.5)
    shape.lineTo(1.2, -0.3)
    shape.lineTo(0, -0.3)
    shape.closePath()
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.08,
      bevelEnabled: false,
    })
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    /* Pulse the about door lights */
    if (aboutLightRef.current) {
      const base = aboutHovered ? 6 : 3
      aboutLightRef.current.intensity = base + Math.sin(t * 2.5) * 1.5
    }
    if (aboutLight2Ref.current) {
      const base = aboutHovered ? 4 : 2
      aboutLight2Ref.current.intensity = base + Math.sin(t * 3.0 + 1) * 1.0
    }

    /* Subtle flicker on the wall sign light */
    if (signLightRef.current) {
      const flicker = Math.sin(t * 3) * 0.4 + Math.sin(t * 7.3) * 0.15
      signLightRef.current.intensity = 12 + flicker
    }

    /* Arrow sign light pulse */
    if (arrowLightRef.current) {
      arrowLightRef.current.intensity = 1.5 + Math.sin(t * 2) * 0.5
    }
  })

  return (
    <group>
      {/* ============================================================
          FLOOR — Reflective surface
          ============================================================ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[30, 30]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={0.3}
          color="#151515"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Fine grid */}
      <gridHelper
        args={[30, 30, '#2a2a2a', '#222222']}
        position={[0, 0.002, 0]}
      />

      {/* Large grid for depth perception */}
      <gridHelper
        args={[30, 6, '#333333', '#333333']}
        position={[0, 0.003, 0]}
      />

      {/* ============================================================
          WALLS — Back + Left (open front + right for camera)
          ============================================================ */}

      {/* BACK WALL */}
      <mesh position={[0, 4, -6]} rotation={[0, 0, 0]}>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial color={WALL_COLOR} {...WALL_PROPS} />
      </mesh>

      {/* Back wall baseboard trim */}
      <mesh position={[0, 0.05, -5.95]}>
        <boxGeometry args={[30, 0.1, 0.1]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Back wall horizontal detail lines */}
      <mesh position={[0, 2.0, -5.98]}>
        <boxGeometry args={[30, 0.02, 0.02]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[0, 5.0, -5.98]}>
        <boxGeometry args={[30, 0.02, 0.02]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[0, 6.5, -5.98]}>
        <boxGeometry args={[30, 0.02, 0.02]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.8} />
      </mesh>

      {/* LEFT WALL */}
      <mesh position={[-8, 4, -1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#111111" {...WALL_PROPS} />
      </mesh>

      {/* Left wall baseboard trim */}
      <mesh position={[-7.95, 0.05, -1]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.1, 0.1]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Left wall horizontal detail */}
      <mesh position={[-7.98, 3.0, -1]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.02, 0.02]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.8} />
      </mesh>

      {/* EXIT sign on left wall */}
      <mesh position={[-7.96, 6.8, -4]}>
        <planeGeometry args={[0.6, 0.2]} />
        <meshStandardMaterial
          color="#330000"
          emissive="#ff0000"
          emissiveIntensity={0.5}
          roughness={0.9}
        />
      </mesh>
      <Text
        position={[-7.95, 6.8, -4]}
        fontSize={0.1}
        color="#ff3333"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        EXIT
      </Text>

      {/* ============================================================
          CEILING — Partial, over the back area
          ============================================================ */}
      <mesh position={[0, 8, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} metalness={0.0} side={THREE.DoubleSide} />
      </mesh>

      {/* Fluorescent light fixtures on ceiling */}
      <mesh position={[-3, 7.95, -2]}>
        <boxGeometry args={[2.5, 0.05, 0.3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#ffffff"
          emissiveIntensity={0.1}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[3, 7.95, -2]}>
        <boxGeometry args={[2.5, 0.05, 0.3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#ffffff"
          emissiveIntensity={0.1}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0, 7.95, 1]}>
        <boxGeometry args={[2.5, 0.05, 0.3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#ffffff"
          emissiveIntensity={0.08}
          roughness={0.5}
        />
      </mesh>

      {/* ============================================================
          PHANTOM KNIGHT
          ============================================================ */}
      <Knight />

      {/* ============================================================
          6 TERMINAL WORKSTATIONS
          ============================================================ */}
      {projects.map((project, i) => (
        <Terminal
          key={project.id}
          project={project}
          index={i}
          onClick={onSelectProject}
        />
      ))}

      {/* ============================================================
          WALL SIGN — "SCHOUDHARY CAPITAL" on back wall
          ============================================================ */}

      {/* Glow halo layer */}
      <Text
        position={[0, 4.2, -5.94]}
        fontSize={0.5}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.08}
        outlineColor="#4ade80"
        outlineBlur={0.1}
        fillOpacity={0}
        letterSpacing={0.15}
      >
        SCHOUDHARY CAPITAL
      </Text>

      {/* Main title — crisp */}
      <Text
        position={[0, 4.2, -5.93]}
        fontSize={0.5}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#2ae870"
        outlineBlur={0.02}
        letterSpacing={0.15}
      >
        SCHOUDHARY CAPITAL
      </Text>

      {/* Decorative line */}
      <Text
        position={[0, 3.85, -5.94]}
        fontSize={0.06}
        color="#1a3a2a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.3}
      >
        {'= = = = = = = = = = = = = = = = = = = = = = = = = = ='}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 3.65, -5.94]}
        fontSize={0.13}
        color="#5a8a6a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.25}
      >
        EST. 2006  |  QUANT TRADING
      </Text>

      {/* Sign glow — strong green */}
      <pointLight
        ref={signLightRef}
        position={[0, 4.2, -4.5]}
        intensity={12}
        color="#4ade80"
        distance={12}
        decay={2}
      />

      {/* Secondary sign glow */}
      <pointLight
        position={[0, 5.5, -5]}
        intensity={5}
        color="#4ade80"
        distance={10}
        decay={2}
      />

      {/* ============================================================
          PROJECTS ARROW SIGN — left side, angled inward
          ============================================================ */}
      <group position={[-6.5, 0, 0]} rotation={[0, Math.PI / 6, 0]}>
        {/* Signpost pole */}
        <mesh position={[0.85, 0.75, 0.04]}>
          <cylinderGeometry args={[0.04, 0.04, 1.5, 8]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.7} metalness={0.3} />
        </mesh>

        {/* Arrow-shaped sign */}
        <mesh geometry={arrowGeom} position={[0, 1.5, 0]}>
          <meshStandardMaterial
            color="#1a3a1a"
            emissive="#4ade80"
            emissiveIntensity={0.6}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Sign text on front face — big white with green glow */}
        <Text
          position={[0.6, 1.5, 0.09]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          outlineWidth={0.01}
          outlineColor="#4ade80"
          outlineBlur={0.03}
          letterSpacing={0.12}
        >
          PROJECTS
        </Text>

        {/* Sign light */}
        <pointLight
          ref={arrowLightRef}
          position={[0.85, 2.0, 0.5]}
          intensity={1.5}
          color="#4ade80"
          distance={5}
          decay={2}
        />
      </group>

      {/* ============================================================
          ABOUT ME DOOR — right side, angled inward
          ============================================================ */}
      <group
        position={[7.5, 0, 0]}
        rotation={[0, -Math.PI / 6, 0]}
        onClick={(e) => {
          e.stopPropagation()
          if (onOpenAbout) onOpenAbout()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setAboutHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setAboutHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        {/* Door frame */}
        <mesh position={[0, 2.4, 0]}>
          <boxGeometry args={[3.0, 4.8, 0.25]} />
          <meshStandardMaterial
            color="#0e150e"
            roughness={0.85}
            metalness={0.1}
          />
        </mesh>

        {/* Door inner panel */}
        <mesh position={[0, 2.4, 0.08]}>
          <boxGeometry args={[2.6, 4.4, 0.06]} />
          <meshStandardMaterial
            color="#0a100a"
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>

        {/* Door handle */}
        <mesh position={[0.9, 2.2, 0.2]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={1.0}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Door label — ABOUT ME */}
        <Text
          position={[0, 3.6, 0.14]}
          fontSize={0.35}
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#4ade80"
          outlineBlur={0.04}
          letterSpacing={0.15}
        >
          ABOUT ME
        </Text>

        {/* Sub-label */}
        <Text
          position={[0, 3.1, 0.14]}
          fontSize={0.1}
          color="#5a8a6a"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          CLICK TO ENTER
        </Text>

        {/* White overhead light #1 */}
        <pointLight
          position={[0, 5.5, 0.8]}
          intensity={2.0}
          color="#ffffff"
          distance={8}
          decay={2}
        />

        {/* White overhead light #2 */}
        <pointLight
          ref={aboutLight2Ref}
          position={[0, 4.0, 1.5]}
          intensity={2.0}
          color="#ffffff"
          distance={6}
          decay={2}
        />

        {/* Amber glow — pulsing */}
        <pointLight
          ref={aboutLightRef}
          position={[0, 3.0, 1.5]}
          intensity={3}
          color="#f59e0b"
          distance={7}
          decay={2}
        />

        {/* Green accent glow */}
        <pointLight
          position={[0, 4.0, 0.3]}
          intensity={2.5}
          color="#4ade80"
          distance={5}
          decay={2}
        />
      </group>
    </group>
  )
}
