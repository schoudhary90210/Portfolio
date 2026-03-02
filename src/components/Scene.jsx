import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import TradingFloor from './TradingFloor'
import Effects from './Effects'

const DEFAULT_CAM = { x: 12, y: 14, z: 12 }
const DEFAULT_TARGET = { x: 0, y: 0, z: 0 }

export default function Scene({
  selectedProject,
  onSelectProject,
  onOpenAbout,
}) {
  const controlsRef = useRef()
  const { camera } = useThree()
  const tweenRef = useRef(null)

  useEffect(() => {
    if (tweenRef.current) tweenRef.current.kill()

    if (selectedProject) {
      if (controlsRef.current) controlsRef.current.enabled = false

      const pos = selectedProject.terminalPos
      const tl = gsap.timeline()

      tl.to(camera.position, {
        x: pos.x + 2,
        y: 5,
        z: pos.z + 5,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0)

      if (controlsRef.current) {
        tl.to(controlsRef.current.target, {
          x: pos.x,
          y: 1,
          z: pos.z,
          duration: 1.2,
          ease: 'power2.inOut',
          onUpdate: () => controlsRef.current.update(),
        }, 0)
      }

      tweenRef.current = tl
    } else {
      if (controlsRef.current) controlsRef.current.enabled = true

      const tl = gsap.timeline()

      tl.to(camera.position, {
        x: DEFAULT_CAM.x,
        y: DEFAULT_CAM.y,
        z: DEFAULT_CAM.z,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0)

      if (controlsRef.current) {
        tl.to(controlsRef.current.target, {
          x: DEFAULT_TARGET.x,
          y: DEFAULT_TARGET.y,
          z: DEFAULT_TARGET.z,
          duration: 1.2,
          ease: 'power2.inOut',
          onUpdate: () => controlsRef.current.update(),
        }, 0)
      }

      tweenRef.current = tl
    }

    return () => {
      if (tweenRef.current) tweenRef.current.kill()
    }
  }, [selectedProject, camera])

  const handleSelectTerminal = (project, pos) => {
    onSelectProject({ ...project, terminalPos: pos })
  }

  return (
    <>
      {/* Dark green-tinted background */}
      <color attach="background" args={['#050806']} />

      {/* Fog — distant objects fade into darkness */}
      <fog attach="fog" args={['#050806', 15, 40]} />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={0.3}
        minDistance={8}
        maxDistance={35}
        enableDamping
        dampingFactor={0.05}
        enablePan={false}
      />

      {/* === LIGHTING === */}

      {/* Ambient base */}
      <ambientLight intensity={0.5} color="#1a2a1a" />

      {/* Hemisphere light — sky/ground fill */}
      <hemisphereLight args={['#1a3a2a', '#0a0a0a', 0.6]} />

      {/* Directional fill from above-right */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.5}
        color="#ffffff"
      />

      {/* Overhead amber — warm ceiling fluorescents */}
      <pointLight
        position={[0, 7, 0]}
        intensity={30}
        color="#f59e0b"
        distance={40}
        decay={2}
      />

      {/* Fill lights from sides — illuminate walls */}
      <pointLight
        position={[-7, 5, 0]}
        intensity={8}
        color="#1a3a2a"
        distance={28}
        decay={2}
      />
      <pointLight
        position={[7, 5, 0]}
        intensity={6}
        color="#1a2a3a"
        distance={28}
        decay={2}
      />

      {/* Dramatic overhead spot */}
      <spotLight
        position={[0, 7.5, 0]}
        angle={0.8}
        penumbra={0.9}
        intensity={14}
        color="#1a1008"
        distance={30}
        decay={2}
      />

      <TradingFloor
        onSelectProject={handleSelectTerminal}
        onOpenAbout={onOpenAbout}
      />

      <Effects />
    </>
  )
}
