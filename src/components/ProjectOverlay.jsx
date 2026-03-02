import { useEffect, useCallback } from 'react'
import { useCountUp } from '../hooks/useCountUp'

function StatItem({ stat, isOpen }) {
  const val = useCountUp(
    stat.isText ? 0 : stat.value,
    1400,
    isOpen,
    stat.decimals || 0
  )

  if (stat.isText) {
    return (
      <div className="po-stat">
        <div className="po-stat-value" style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.6s' }}>
          {stat.value}
        </div>
        <div className="po-stat-label">{stat.label}</div>
      </div>
    )
  }

  return (
    <div className="po-stat">
      <div className="po-stat-value">
        {stat.prefix || ''}{val}{stat.suffix || ''}
      </div>
      <div className="po-stat-label">{stat.label}</div>
    </div>
  )
}

export default function ProjectOverlay({ project, isOpen, onClose }) {
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape' && isOpen) onClose() },
    [isOpen, onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  if (!project) return null

  const style = { '--panel-accent': project.color }

  return (
    <>
      <div
        className={`overlay-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      <div className={`project-overlay ${isOpen ? 'open' : ''}`} style={style}>
        <button className="po-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="po-tag">
          {project.terminal}
          <span className="po-dot" style={{ background: project.color }} />
        </div>

        <h2 className="po-name">{project.name}</h2>
        <div className="po-subtitle">{project.stack?.join(' · ')}</div>
        <div className="po-divider" />

        <p className="po-desc">{project.fullDesc}</p>

        {project.stats?.length > 0 && (
          <div className="po-stats">
            {project.stats.map((stat, i) => (
              <StatItem key={i} stat={stat} isOpen={isOpen} />
            ))}
          </div>
        )}

        <div className="po-stack-label">Stack</div>
        <div className="po-stack">
          {project.stack?.map((tech) => (
            <span key={tech} className="po-stack-tag">{tech}</span>
          ))}
        </div>

        <div className="po-divider" />

        <div className="po-links">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="po-link">
              GitHub
            </a>
          )}
          {project.links?.devpost && (
            <a href={project.links.devpost} target="_blank" rel="noopener noreferrer" className="po-link">
              Devpost
            </a>
          )}
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="po-link">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </>
  )
}
