import { useEffect, useCallback } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

const experience = [
  {
    date: 'DEC 2025\n– JAN 26',
    org: 'UNDP',
    role: 'Independent Research Consultant',
    desc: 'Built Python pipeline processing $2B+ OECD development finance data across 50+ countries.',
  },
  {
    date: 'JUN 2025\n– AUG 25',
    org: 'MD Anderson Cancer Center',
    role: 'Bioinformatics Intern',
    desc: 'Containerized NetMHCstabpan. Reduced 2.5hr setup to <15min. Adopted by 3+ research teams.',
  },
  {
    date: 'MAY 2023\n– AUG 23',
    org: 'Qatar Computing Research Institute',
    role: 'ML Research',
    desc: 'Time-series classification on astronomical light curves. 14% accuracy improvement. 120+ transit candidates from 50k+ observations.',
  },
]

const coursework = [
  'Stochastic Processes', 'Real Analysis', 'Numerical Methods',
  'Theory of Computation', 'Computer Systems', 'DSA', 'Probability',
]

const skills = [
  'Python', 'C', 'C++', 'Java', 'SQL', 'PyTorch', 'sklearn',
  'NumPy', 'pandas', 'ONNX', 'Docker', 'FastAPI', 'AWS', 'Linux',
]

export default function AboutOverlay({ isOpen, onClose }) {
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape' && isOpen) onClose() },
    [isOpen, onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <div
      className={`about-backdrop ${isOpen ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="about-panel">
        <button className="about-close" onClick={onClose}>ESC</button>

        <h2 className="about-name">Siddhant Choudhary</h2>
        <p className="about-title">
          CS + Mathematics @ University of Wisconsin-Madison<br />
          Class of 2027 | GPA 3.7/4.0
        </p>

        {/* Experience */}
        <div className="about-section">
          <span className="about-section-label">Experience</span>
          <div className="about-section-line" />
        </div>
        {experience.map((exp, i) => (
          <div key={i} className="about-exp">
            <div className="about-exp-date" style={{ whiteSpace: 'pre-line' }}>{exp.date}</div>
            <div>
              <div className="about-exp-org">{exp.org}</div>
              <div className="about-exp-role">{exp.role}</div>
              <div className="about-exp-desc">{exp.desc}</div>
            </div>
          </div>
        ))}

        {/* Coursework */}
        <div className="about-section">
          <span className="about-section-label">Coursework</span>
          <div className="about-section-line" />
        </div>
        <div className="about-tags">
          {coursework.map((c) => <span key={c} className="about-tag">{c}</span>)}
        </div>

        {/* Skills */}
        <div className="about-section">
          <span className="about-section-label">Skills</span>
          <div className="about-section-line" />
        </div>
        <div className="about-tags">
          {skills.map((s) => <span key={s} className="about-tag">{s}</span>)}
        </div>

        {/* Connect */}
        <div className="about-section">
          <span className="about-section-label">Connect</span>
          <div className="about-section-line" />
        </div>
        <div className="about-links">
          <a href="https://github.com/schoudhary90210" target="_blank" rel="noopener noreferrer" className="about-link">
            <Github size={13} /> GitHub
          </a>
          <a href="https://linkedin.com/in/siddhantchoudhary-" target="_blank" rel="noopener noreferrer" className="about-link">
            <Linkedin size={13} /> LinkedIn
          </a>
          <a href="mailto:csiddhant12@gmail.com" className="about-link">
            <Mail size={13} /> csiddhant12@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
