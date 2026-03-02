import { useState, useRef, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function AmbientAudio() {
  const [playing, setPlaying] = useState(false)
  const howlRef = useRef(null)
  const loadedRef = useRef(false)
  const failedRef = useRef(false)

  const toggle = useCallback(() => {
    /* If audio already failed to load, just toggle icon */
    if (failedRef.current) {
      setPlaying((p) => !p)
      return
    }

    if (!loadedRef.current) {
      /* Lazy-load Howler only on first click */
      import('howler')
        .then(({ Howl }) => {
          const h = new Howl({
            src: ['/audio/ambient.mp3'],
            loop: true,
            volume: 0.3,
            onloaderror: () => {
              failedRef.current = true
              setPlaying(true)
            },
          })
          howlRef.current = h
          loadedRef.current = true
          h.play()
          setPlaying(true)
        })
        .catch(() => {
          failedRef.current = true
          setPlaying((p) => !p)
        })
      return
    }

    const h = howlRef.current
    if (!h) {
      setPlaying((p) => !p)
      return
    }

    if (playing) {
      h.pause()
      setPlaying(false)
    } else {
      h.play()
      setPlaying(true)
    }
  }, [playing])

  return (
    <button className="audio-toggle" onClick={toggle} title="Toggle ambient audio">
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  )
}
