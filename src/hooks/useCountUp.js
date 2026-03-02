import { useState, useEffect, useRef } from 'react';

export function useCountUp(target, duration = 1500, shouldStart = false, decimals = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!shouldStart || typeof target !== 'number') return;

    setValue(0);
    startRef.current = null;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      setValue(easeOutExpo(progress) * target);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, shouldStart, decimals]);

  if (typeof target !== 'number') return target;
  return Number(value.toFixed(decimals));
}
