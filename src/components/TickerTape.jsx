const TICKER =
  'OOS SHARPE 0.80 \u2191  \u25C6  F1 97.9%  \u25C6  6.0M OPS/SEC  \u25C6  CAGR 18.4%  \u25C6  KELLY CRITERION  \u25C6  CADENCE LIVE  \u25C6  TRACTION TOP-5 QUALCOMM  \u25C6  ALLOC O(1)  \u25C6  UNDP $2B+ PIPELINE  \u25C6  120+ EXOPLANET CANDIDATES  \u25C6  UW-MADISON CS+MATH 3.7 GPA  \u25C6  '

export default function TickerTape() {
  return (
    <div className="ticker-tape">
      <div className="ticker-track">
        <span className="ticker-text">{TICKER}</span>
        <span className="ticker-text">{TICKER}</span>
      </div>
    </div>
  )
}
