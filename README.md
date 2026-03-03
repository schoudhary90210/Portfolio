<div align="center">

```
███████╗ ██████╗██╗  ██╗ ██████╗ ██╗   ██╗██████╗ ██╗  ██╗ █████╗ ██████╗ ██╗   ██╗
██╔════╝██╔════╝██║  ██║██╔═══██╗██║   ██║██╔══██╗██║  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝
███████╗██║     ███████║██║   ██║██║   ██║██║  ██║███████║███████║██████╔╝ ╚████╔╝
╚════██║██║     ██╔══██║██║   ██║██║   ██║██║  ██║██╔══██║██╔══██║██╔══██╗  ╚██╔╝
███████║╚██████╗██║  ██║╚██████╔╝╚██████╔╝██████╔╝██║  ██║██║  ██║██║  ██║   ██║
╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
                            C A P I T A L
```

### A 3D Quant Trading Floor Portfolio

[![Live Demo](https://img.shields.io/badge/LIVE-siddhantchoudhary.vercel.app-4ade80?style=for-the-badge&logo=vercel&logoColor=white)](https://siddhant-choudhary.vercel.app)
[![Built With](https://img.shields.io/badge/Built_With-React_Three_Fiber-61dafb?style=for-the-badge&logo=threedotjs&logoColor=white)](https://docs.pmnd.rs/react-three-fiber)

</div>

---

<div align="center">
<strong>An isometric 3D trading floor from the 1990s.</strong><br>
<em>6 Bloomberg terminal workstations. Dark room. Green phosphor glow. A phantom knight standing guard.</em>
</div>

---

## The Scene

```
  ┌──────────────────────────────────────────────────────┐
  │              SCHOUDHARY CAPITAL                       │  <- Neon wall sign
  │           EST. 2006 | QUANT TRADING                   │
  ├──────────────────────────────────────────────────────┤
  │                                                      │
  │   ⚔️ KNIGHT    [T-01]    [T-02]    [T-03]           │  <- 6 terminals
  │                                                      │
  │   🏹 PROJECTS  [T-04]    [T-05]    [T-06]  🚪 ABOUT │
  │       SIGN                                    DOOR   │
  │                                                      │
  └──────────────────────────────────────────────────────┘
           ↑ isometric camera looking down from here
```

Each terminal is a clickable workstation that opens a project detail panel with stats, tech stack, and links. The phantom knight sentinel hovers in the corner with glowing green eyes and a pulsing emerald blade.

## Features

- **Reflective floor** with dual-layer grid and monitor light pools
- **Room environment** — back wall, left wall, partial ceiling, fluorescent fixtures, EXIT sign
- **Bloom post-processing** — all emissive elements glow through the darkness
- **GSAP camera animation** — smooth zoom-in when clicking a terminal
- **Loading screen** — boot sequence with animated progress bar
- **Ticker tape** — scrolling stats bar at the bottom
- **Ambient audio toggle** — speaker icon, bottom-right
- **Fog + vignette** — cinematic depth falloff

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + Vite |
| 3D Engine | Three.js via React Three Fiber |
| 3D Helpers | @react-three/drei (Text, OrbitControls, MeshReflectorMaterial) |
| Post-Processing | @react-three/postprocessing (Bloom, Vignette, Noise) |
| Animation | GSAP (camera tweens) |
| Audio | Howler.js (lazy-loaded) |
| Icons | Lucide React |
| Deploy | Vercel |

## Projects on Display

| Terminal | Project | Highlight |
|----------|---------|-----------|
| T-01 | **Quant Backtest Engine** | 0.80 OOS Sharpe, 18.4% CAGR, 50k Monte Carlo paths |
| T-02 | **Cadence** | Speech fluency analysis, 97.9% F1, wav2vec2 + GCP |
| T-03 | **TRACTION** | Crop disease detection, 94% accuracy, Qualcomm Edge AI Top 5 |
| T-04 | **Custom MemAlloc** | Thread-safe C allocator, 6M+ ops/sec, ARM64 |
| T-05 | **Bio-Intel Agent** | Serverless health pipeline, FastAPI + GPT-4 |
| T-06 | **NetMHCstabpan Docker** | Containerized peptide-MHC prediction, 90% setup reduction |

## Run Locally

```bash
git clone https://github.com/schoudhary90210/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Build

```bash
npm run build    # outputs to dist/
```

## Architecture

```
src/
├── App.jsx                 # Canvas + HTML overlay orchestration
├── components/
│   ├── Scene.jsx           # Lighting, controls, camera animation
│   ├── TradingFloor.jsx    # Room geometry, walls, ceiling, signs
│   ├── Terminal.jsx         # Workstation (desk + monitor + glow)
│   ├── TerminalScreen.jsx   # 3D text on monitor screens
│   ├── Knight.jsx           # Phantom knight sentinel
│   ├── Effects.jsx          # Bloom, Vignette, Noise
│   ├── ProjectOverlay.jsx   # Slide-in project detail panel
│   ├── AboutOverlay.jsx     # Full-screen about me overlay
│   ├── Header.jsx           # Top navigation bar
│   ├── TickerTape.jsx       # Scrolling stats ticker
│   ├── LoadingScreen.jsx    # Boot sequence
│   └── AmbientAudio.jsx     # Audio toggle
├── data/projects.js         # 6 project definitions
├── hooks/useCountUp.js      # Animated stat counter
└── styles/overlays.css      # All HTML overlay styles
```

---

<div align="center">

**Siddhant Choudhary**<br>
CS + Mathematics @ UW-Madison

[![GitHub](https://img.shields.io/badge/GitHub-schoudhary90210-181717?style=flat-square&logo=github)](https://github.com/schoudhary90210)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-siddhantchoudhary-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/siddhantchoudhary-)
[![Email](https://img.shields.io/badge/Email-csiddhant12@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:csiddhant12@gmail.com)

</div>
