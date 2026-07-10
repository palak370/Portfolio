import { useEffect, useRef, useState } from 'react';

/**
 * PhotoStack — scroll-driven pile of photographs (Core Philosophy card).
 *
 * Entrance: as the user scrolls the About section, each photo tosses in from
 * below and settles on top of the pile — landings are monotonic (each photo
 * lands exactly once) and serialized by a short lock.
 *
 * Cycling: once the pile is settled, clicking the top photograph picks it up,
 * carries it aside and tucks it under the pile; every other print slides up
 * one slot. Poses (rotation/offset) belong to SLOTS, not photos, so the pile's
 * organic look stays stable while photos rotate through it. Infinite loop.
 */

const PHOTOS = [
  { src: '/images/about/stack1.jpg', alt: 'Tax practitioners conference hall' },
  { src: '/images/about/stack2.jpg', alt: 'Assembled advocates at a bar association meet' },
  { src: '/images/about/stack3.jpg', alt: 'Felicitation moment at a tax seminar' },
  { src: '/images/about/stack4.jpg', alt: 'Adv. Shailendra Yadav at his chambers' },
];

const N = PHOTOS.length;

/* Deterministic organic poses per SLOT, bottom (0) → top (N-1) */
const ROT = [-3.2, 2.6, -1.9, 2.2];
const DX = [-8, 10, -5, 4];
const DY = [5, -6, 4, -4];

export default function PhotoStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [landed, setLanded] = useState(0);
  const [settled, setSettled] = useState<boolean[]>(Array(N).fill(false));
  const [offset, setOffset] = useState(0);       // clicks so far; slot(i) = (i + offset) % N
  const [cycling, setCycling] = useState<number | null>(null);
  const [sunk, setSunk] = useState(false);       // cycling photo dropped below the pile yet?
  const landedRef = useRef(0);
  const targetRef = useRef(1);
  const busyRef = useRef(false);
  const offsetRef = useRef(0);
  const cyclingRef = useRef<number | null>(null);
  const settledCountRef = useRef(0);
  const settledFlagsRef = useRef<boolean[]>(Array(N).fill(false));
  const pendingRef = useRef(0);                  // clicks made mid-flight, run afterwards

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      landedRef.current = N;
      settledCountRef.current = N;
      setLanded(N);
      setSettled(Array(N).fill(true));
      return;
    }

    const settleNext = () => {
      if (busyRef.current) return;
      if (landedRef.current >= targetRef.current) return;
      busyRef.current = true;
      landedRef.current += 1;
      setLanded(landedRef.current);
      window.setTimeout(() => {
        busyRef.current = false;
        settleNext();
      }, 460);
    };

    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.55)));
      const want = Math.max(1, Math.min(N, 1 + Math.floor(p * N)));
      if (want > targetRef.current) targetRef.current = want;
      settleNext();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const slot = (i: number) => (i + offset) % N;
  const topIdx = (N - 1 - (offset % N) + N) % N;
  const pileReady = cycling === null && settled.every(Boolean);

  /* Refs (not state) drive the cycle logic so rapid clicks never read stale
     values; clicks that arrive mid-flight are queued, not dropped. */
  const cycle = () => {
    if (settledCountRef.current < N) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      offsetRef.current += 1;
      setOffset(offsetRef.current);
      return;
    }
    if (cyclingRef.current !== null) {
      pendingRef.current = Math.min(pendingRef.current + 1, N - 1);
      return;
    }
    const t = (N - 1 - (offsetRef.current % N) + N) % N;
    cyclingRef.current = t;
    setCycling(t);
    setSunk(false);
    offsetRef.current += 1;
    setOffset(offsetRef.current);
    /* mid-flight, the carried photo drops beneath the pile */
    window.setTimeout(() => setSunk(true), 360);
    /* watchdog: a missed animationend must never freeze the pile */
    window.setTimeout(() => {
      if (cyclingRef.current === t) finishCycle();
    }, 1400);
  };

  const finishCycle = () => {
    cyclingRef.current = null;
    setCycling(null);
    setSunk(false);
    if (pendingRef.current > 0) {
      pendingRef.current -= 1;
      window.setTimeout(cycle, 40);
    }
  };

  const onAnimEnd = (i: number, name: string) => {
    if (name === 'pstackLand') {
      if (!settledFlagsRef.current[i]) {
        settledFlagsRef.current[i] = true;
        settledCountRef.current += 1;
        setSettled((prev) => {
          const nx = [...prev];
          nx[i] = true;
          return nx;
        });
      }
    } else if (name === 'pstackCycle' && cyclingRef.current === i) {
      finishCycle();
    }
  };

  return (
    <div
      className="pstack"
      ref={wrapRef}
      role="button"
      tabIndex={0}
      aria-label="Photograph pile — activate to bring the next photograph to the top"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          cycle();
        }
      }}
    >
      {PHOTOS.map((p, i) => {
        const s = slot(i);
        const isCycling = cycling === i;
        const style: React.CSSProperties = {
          zIndex: isCycling ? (sunk ? 1 : N + 2) : s + 1,
          ['--rot' as string]: `${ROT[s]}deg`,
          ['--dx' as string]: `${DX[s]}px`,
          ['--dy' as string]: `${DY[s]}px`,
        };
        if (isCycling) {
          /* pose it is picked up FROM (the top slot) */
          (style as Record<string, string | number>)['--prot'] = `${ROT[N - 1]}deg`;
          (style as Record<string, string | number>)['--pdx'] = `${DX[N - 1]}px`;
          (style as Record<string, string | number>)['--pdy'] = `${DY[N - 1]}px`;
        }
        return (
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            className={[
              'pstack__ph',
              i < landed ? 'is-landed' : '',
              settled[i] ? 'is-settled' : '',
              isCycling ? 'is-cycling' : '',
              pileReady && i === topIdx ? 'is-top' : '',
            ].join(' ')}
            style={style}
            onClick={cycle}
            onAnimationEnd={(e) => onAnimEnd(i, e.animationName)}
          />
        );
      })}

      <style>{`
        .pstack {
          position: relative;
          width: 100%;
          height: 300px;
          margin-bottom: 1.5rem;
          animation: pstackFloat 8s ease-in-out infinite;
          outline: none;
        }
        @keyframes pstackFloat {
          0%, 100% { transform: translateY(-3px); }
          50%      { transform: translateY(4px); }
        }

        .pstack__ph {
          position: absolute;
          top: 50%; left: 50%;
          width: min(86%, 420px);
          aspect-ratio: 1.45;
          object-fit: cover;
          border: 5px solid #fffdf8;
          border-radius: 6px;
          box-shadow: 0 16px 32px rgba(7, 23, 21, 0.22), 0 3px 8px rgba(7, 23, 21, 0.12);
          transform: translate(-50%, -50%) translateY(140%) rotate(calc(var(--rot) + 9deg));
          opacity: 0;
        }
        .pstack__ph.is-landed {
          animation: pstackLand 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes pstackLand {
          0% {
            transform: translate(-50%, -50%) translateY(140%) rotate(calc(var(--rot) + 9deg)) scale(1.06);
            opacity: 0.35;
          }
          72% {
            transform: translate(-50%, -50%) translate(var(--dx), calc(var(--dy) - 7px)) rotate(calc(var(--rot) - 1.4deg)) scale(1.015);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(1);
            opacity: 1;
          }
        }

        /* Once settled, the entrance animation is released so the print can
           glide between slot poses when the pile cycles. */
        .pstack__ph.is-settled {
          animation: none;
          opacity: 1;
          transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) rotate(var(--rot));
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pstack__ph.is-top { cursor: pointer; }

        /* Picked up, carried aside, tucked under the pile */
        .pstack__ph.is-cycling {
          animation: pstackCycle 0.85s cubic-bezier(0.45, 0.05, 0.25, 1) forwards;
          transition: none;
          cursor: default;
        }
        @keyframes pstackCycle {
          0% {
            transform: translate(-50%, -50%) translate(var(--pdx), var(--pdy)) rotate(var(--prot)) scale(1);
          }
          45% {
            transform: translate(-50%, -50%) translate(calc(var(--pdx) + 44%), calc(var(--pdy) - 15%)) rotate(calc(var(--prot) + 7deg)) scale(1.05);
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pstack { animation: none; }
          .pstack__ph.is-landed, .pstack__ph.is-cycling {
            animation: none;
            opacity: 1;
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) rotate(var(--rot));
          }
          .pstack__ph.is-settled { transition: none; }
        }

        @media (max-width: 576px) {
          .pstack { height: 230px; }
          .pstack__ph { width: min(90%, 340px); }
        }
      `}</style>
    </div>
  );
}
