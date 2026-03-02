import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import TickerTape from './components/TickerTape'
import ProjectOverlay from './components/ProjectOverlay'
import AboutOverlay from './components/AboutOverlay'
import AmbientAudio from './components/AmbientAudio'
import './styles/overlays.css'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const handleLoadComplete = useCallback(() => setLoading(false), [])

  const handleSelectProject = useCallback((project) => {
    setAboutOpen(false)
    setSelectedProject(project)
    setPanelOpen(true)
  }, [])

  const handleCloseProject = useCallback(() => {
    setPanelOpen(false)
    setTimeout(() => setSelectedProject(null), 500)
  }, [])

  const handleOpenAbout = useCallback(() => {
    setPanelOpen(false)
    setSelectedProject(null)
    setAboutOpen(true)
  }, [])

  const handleCloseAbout = useCallback(() => setAboutOpen(false), [])

  /* Home resets everything — closes panels, camera returns to default */
  const handleHome = useCallback(() => {
    setPanelOpen(false)
    setAboutOpen(false)
    setTimeout(() => setSelectedProject(null), 100)
  }, [])

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      <div className="canvas-container">
        <Canvas
          camera={{
            position: [12, 14, 12],
            fov: 25,
            near: 0.1,
            far: 200,
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <Scene
            selectedProject={panelOpen ? selectedProject : null}
            onSelectProject={handleSelectProject}
            onOpenAbout={handleOpenAbout}
          />
        </Canvas>
      </div>

      {!loading && (
        <>
          <Header
            onOpenAbout={handleOpenAbout}
            onHome={handleHome}
          />
          <TickerTape />

          <ProjectOverlay
            project={selectedProject}
            isOpen={panelOpen}
            onClose={handleCloseProject}
          />

          <AboutOverlay
            isOpen={aboutOpen}
            onClose={handleCloseAbout}
          />

          <AmbientAudio />
        </>
      )}
    </>
  )
}
