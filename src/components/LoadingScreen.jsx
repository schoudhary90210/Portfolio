import { useEffect, useRef, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [barGrow, setBarGrow] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const firedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  function finish() {
    if (firedRef.current) return
    firedRef.current = true
    onCompleteRef.current()
  }

  useEffect(() => {
    /* Start bar animation after one frame */
    const t1 = setTimeout(() => setBarGrow(true), 50)

    /* After 3s, begin fade out */
    const t2 = setTimeout(() => setFadeOut(true), 3000)

    /* After fade completes (3.6s), unmount */
    const t3 = setTimeout(() => finish(), 3600)

    /* Safety fallback at 5s */
    const t4 = setTimeout(() => finish(), 5000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`ls ${fadeOut ? 'ls--fade' : ''}`}>
      <div className="ls-inner">
        <div className="ls-title">SCHOUDHARY CAPITAL</div>
        <div className="ls-sub">EST. 2006 | QUANT TRADING</div>
        <div className="ls-bar-wrap">
          <div className={`ls-bar ${barGrow ? 'ls-bar--full' : ''}`} />
        </div>
      </div>
    </div>
  )
}
