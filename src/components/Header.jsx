import { Github, Linkedin, Mail } from 'lucide-react'

export default function Header({ onOpenAbout, onHome }) {
  return (
    <header className="site-header">
      <div className="header-left">
        <button className="header-home" onClick={onHome} title="Home">
          <div className="header-logo">SC</div>
          <div className="header-dot" />
          <span className="header-title">SCHOUDHARY CAPITAL</span>
        </button>
      </div>

      <div className="header-right">
        <a href="https://github.com/schoudhary90210" target="_blank" rel="noopener noreferrer" className="header-btn" aria-label="GitHub">
          <Github size={22} />
        </a>
        <a href="https://linkedin.com/in/siddhantchoudhary-" target="_blank" rel="noopener noreferrer" className="header-btn" aria-label="LinkedIn">
          <Linkedin size={22} />
        </a>
        <a href="mailto:csiddhant12@gmail.com" className="header-btn" aria-label="Email">
          <Mail size={22} />
        </a>
        <button className="header-about-btn" onClick={onOpenAbout}>
          ABOUT
        </button>
      </div>
    </header>
  )
}
