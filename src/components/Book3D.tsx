import { useState } from 'react';

/**
 * Book3D — an interactive premium hardcover portfolio in the hero.
 *
 * Model: a stack of leaves hinged at the left spine.
 *   `open` = current spread index:
 *     0        → closed, front cover facing the viewer (book centred)
 *     1..4     → open two-page spreads (verso + photo recto)
 *     N (5)    → closed, outside back cover facing the viewer (book centred);
 *                the back cover is the BACK FACE of the last page's leaf, so
 *                page 4 ↔ back cover is one continuous turn with no blank
 *                sheet in between
 *
 * Geometry notes (these fix real bugs — keep them):
 *  - Each leaf's two faces are separated by ±0.8px translateZ. Coplanar faces
 *    z-fight on some GPUs, which bleeds a mirrored image of the hidden face
 *    (the "mirrored cover on the left page" artifact) — the offset kills it
 *    and doubles as physical page thickness.
 *  - The whole book (.bk-float) is pointer-events:none. The book is a 3D
 *    object tilted toward the viewer; in a preserve-3d context its transparent
 *    wrappers hit-test IN FRONT of flat buttons and swallow clicks (the "right
 *    edge does nothing" bug). The click zones instead float at translateZ(300px),
 *    well in front of any leaf, so both halves always receive clicks.
 *  - The stage is absolutely positioned so its 2×-book width never widens the
 *    hero's right grid column (which used to squeeze the headline text).
 *  - The board's visible face is cream: while the last leaf turns, whatever
 *    peeks behind it must read as paper, not a black flash.
 */

type Leaf =
  | { kind: 'front' }
  | { kind: 'page'; src: string; alt: string };

/* The back cover is NOT a separate leaf: it is the back face of the last
   printed page's leaf, exactly like a hardcover glued to the final sheet.
   Turning page 4 therefore lands directly on the outside back cover — there
   is no intermediate blank sheet to expose (the old separate back-cover leaf
   flashed the cream board as a "blank page" in both directions). */
const LEAVES: Leaf[] = [
  { kind: 'front' },
  { kind: 'page', src: '/images/book/page1.jpg', alt: 'Adv. Shailendra Yadav addressing a panel session' },
  { kind: 'page', src: '/images/book/page2.jpg', alt: 'Adv. Shailendra Yadav greeting a senior dignitary' },
  { kind: 'page', src: '/images/book/page3.jpg', alt: 'Felicitation with a senior member of the tax bar' },
  { kind: 'page', src: '/images/book/page4.jpg', alt: 'Adv. Shailendra Yadav speaking at a litigation seminar' },
];

/* open ∈ 0..N: 0 = closed front, 1..N-1 = spreads, N = closed back cover */
const N = LEAVES.length;
const LOGO = '/images/book/logo_book.png';

/* Plain paper verso — deliberately quiet so photo pages carry the spread */
function Endpaper() {
  return (
    <div className="bk-endpaper">
      <span className="bk-endpaper__frame" />
      <img src={LOGO} alt="" className="bk-endpaper__wm" />
    </div>
  );
}

/* Premium title page revealed opposite Page 1 */
function TitlePage() {
  return (
    <div className="bk-title">
      <img src={LOGO} alt="Adv. Shailendra Yadav emblem" className="bk-title__logo" />
      <span className="bk-title__rule" />
      <h3 className="bk-title__name">Adv. Shailendra Yadav</h3>
      <span className="bk-title__sub">TAX CONSULTANT &amp; GST LITIGATION EXPERT</span>
      <span className="bk-title__meta">A Professional Portfolio</span>
    </div>
  );
}

/* Full-bleed portrait cover: the photograph IS the cover; the identity block
   sits in the bottom band over a readability gradient, well below his face. */
function FrontCover() {
  return (
    <div className="bk-cover bk-cover--front">
      <img
        className="bk-cover__bg"
        src="/images/book/cover_full.jpg"
        alt="Portrait of Advocate Shailendra Yadav speaking at a professional seminar"
      />
      <span className="bk-cover__grad" />
      <img src={LOGO} alt="Adv. Shailendra Yadav emblem" className="bk-cover__logo" />
      <div className="bk-cover__text">
        <span className="bk-cover__kicker">Advocate&nbsp;·&nbsp;Since&nbsp;2002</span>
        <h3 className="bk-cover__name">Adv. Shailendra<br />Yadav</h3>
        <span className="bk-cover__rule" />
        <span className="bk-cover__subtitle">TAX CONSULTANT &amp; GST LITIGATION EXPERT</span>
      </div>
    </div>
  );
}

/* Outside back cover — a clean branded closed board */
function BackCover() {
  return (
    <div className="bk-cover bk-cover--back">
      <div className="bk-back__inner">
        <img src={LOGO} alt="Adv. Shailendra Yadav emblem" className="bk-back__logo" />
        <span className="bk-cover__rule" style={{ margin: '0 auto' }} />
        <p className="bk-back__blurb">
          Twenty-four years of decisive GST litigation and tax counsel — representing clients
          across India before Departmental Authorities, High Courts and the GST Appellate Tribunal.
        </p>
      </div>
      <div className="bk-back__footer">
        <span className="bk-back__firm">S.&nbsp;Yadav&nbsp;&amp;&nbsp;Co.</span>
        <span className="bk-back__barcode" aria-hidden="true" />
        <span className="bk-back__meta">Datia · Madhya Pradesh</span>
      </div>
    </div>
  );
}

function PhotoPage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bk-photopage">
      <img src={src} alt={alt} />
    </div>
  );
}

function FrontFace({ leaf }: { leaf: Leaf }) {
  if (leaf.kind === 'front') return <FrontCover />;
  return <PhotoPage src={leaf.src} alt={leaf.alt} />;
}

function BackFace({ index }: { index: number }) {
  if (index === 0) return <TitlePage />;             /* inside of the front cover */
  if (index === N - 1) return <BackCover />;          /* hardcover glued to the last page */
  return <Endpaper />;
}

export default function Book3D() {
  const [open, setOpen] = useState(0);

  const next = () => setOpen((o) => Math.min(o + 1, N));
  const prev = () => setOpen((o) => Math.max(o - 1, 0));

  const isClosed = open === 0 || open === N;
  const stageTransform =
    open === 0
      ? 'translateX(calc(-25% + var(--bk-shift)))'
      : open === N
        ? 'translateX(calc(25% + var(--bk-shift)))'
        : 'translateX(0%)';
  const covered = open === N;

  /* Board/spine/foredge sit behind the page stack. When the final leaf turns
     (page 4 → back cover) they hide INSTANTLY — they are fully covered by
     that leaf at the moment of the click, so nothing pops, and the right half
     empties like a cover lifting off a desk instead of exposing a blank
     cream sheet. On the way back they reappear only AFTER the returning leaf
     has landed over them. */
  const backdropStyle: React.CSSProperties = {
    opacity: covered ? 0 : 1,
    transition: covered ? 'opacity 0.12s ease' : 'opacity 0.25s ease 1.05s',
  };

  return (
    <div className={`bk-scene ${isClosed ? 'is-closed' : ''}`} aria-label="Interactive professional portfolio book">
      <div className="bk-stage" style={{ transform: stageTransform }}>
        <div className="bk-float">
          <div className="bk-book">
            <div className="bk-board" style={backdropStyle} />
            <div className="bk-spine" style={backdropStyle} />

            {LEAVES.map((leaf, i) => {
              const turned = i < open;
              const baseZ = ((N - 1) / 2 - i) * 1.8;
              return (
                <div
                  key={i}
                  className="bk-leaf"
                  style={{
                    transform: `rotateY(${turned ? -180 : 0}deg) translateZ(${baseZ}px)`,
                    zIndex: turned ? i : N - 1 - i,
                  }}
                >
                  <div className="bk-leaf__face bk-leaf__front">
                    <FrontFace leaf={leaf} />
                  </div>
                  <div className="bk-leaf__face bk-leaf__back">
                    <BackFace index={i} />
                  </div>
                </div>
              );
            })}

            <div className="bk-foredge" style={backdropStyle} />
          </div>
        </div>

        {/* Click zones: right half → next page, left half → previous page */}
        <button className="bk-zone bk-zone--prev" onClick={prev} disabled={open === 0} aria-label="Previous page" />
        <button className="bk-zone bk-zone--next" onClick={next} disabled={open === N} aria-label="Next page" />
      </div>

      <style>{`
        .bk-scene {
          position: relative;
          width: 100%;
          --bk-w: min(330px, 26vw);
          --bk-h: calc(var(--bk-w) / 0.71);
          --bk-shift: 46px;   /* rightward push, applied in closed states only */
          height: calc(var(--bk-h) + 6rem);
          perspective: 2600px;
          perspective-origin: 50% 44%;
        }

        /* Absolutely positioned so the 2×-width stage never widens the hero
           column (that squeeze was breaking the headline layout). Centred on
           the column; the open spread must stay inside the viewport, so the
           extra size + right shift happen only while the book is closed. */
        .bk-stage {
          position: absolute;
          top: 3rem;
          left: 50%;
          margin-left: calc(-1 * var(--bk-w));
          width: calc(2 * var(--bk-w));
          height: var(--bk-h);
          transform-style: preserve-3d;
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bk-float {
          position: absolute;
          right: 0; top: 0;
          width: var(--bk-w);
          height: var(--bk-h);
          transform-style: preserve-3d;
          animation: bkFloat 7s ease-in-out infinite;
          will-change: transform;
          pointer-events: none; /* the 3D book must never swallow clicks */
        }
        @keyframes bkFloat {
          0%, 100% { transform: translateY(-8px) rotate(-0.3deg); }
          50%      { transform: translateY(10px) rotate(0.3deg); }
        }

        .bk-book {
          position: relative;
          width: 100%; height: 100%;
          transform-style: preserve-3d;
          transform: rotateX(4deg) rotateY(-12deg);
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Closed (front or back cover): larger and more dramatically tilted */
        .bk-scene.is-closed .bk-book {
          transform: rotateX(6deg) rotateY(-24deg) scale(1.16);
        }

        /* Back board: cream face (anything glimpsed mid-turn must read as
           paper, never a black flash), dark hardcover rim via inset shadow. */
        .bk-board {
          position: absolute; inset: 0;
          transform: translateZ(-11px);
          border-radius: 3px 7px 7px 3px;
          background: #f0e9da;
          box-shadow:
            inset 0 0 0 3px #241a0e,
            0 36px 64px rgba(7, 23, 21, 0.42);
        }
        .bk-spine {
          position: absolute; left: 0; top: 0;
          width: 22px; height: 100%;
          transform: translateX(-11px) rotateY(90deg);
          transform-origin: left center;
          background: linear-gradient(90deg, #0f0b07, #3a2c18 45%, #241a0e);
          border-radius: 3px;
          box-shadow: inset 0 0 8px rgba(0,0,0,0.6);
        }

        .bk-leaf {
          position: absolute; inset: 0;
          transform-origin: left center;
          transform-style: preserve-3d;
          transition: transform 1.25s cubic-bezier(0.45, 0.05, 0.2, 1);
          will-change: transform;
        }
        /* ±0.8px face separation = page thickness + kills z-fighting mirror bleed */
        .bk-leaf__face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          border-radius: 2px 5px 5px 2px;
          box-shadow: 0 10px 22px rgba(7, 23, 21, 0.15);
        }
        .bk-leaf__front {
          background: #fbfaf7;
          transform: translateZ(0.8px);
        }
        .bk-leaf__back {
          background: #f4efe4;
          transform: rotateY(180deg) translateZ(0.8px);
        }

        .bk-foredge {
          position: absolute; top: 3px; right: 0;
          width: 11px; height: calc(100% - 6px);
          transform: translateX(11px) rotateY(90deg);
          transform-origin: left center;
          background: repeating-linear-gradient(
            to right,
            #efe8d8 0px, #efe8d8 1px, #d8cdb6 1px, #d8cdb6 2.4px
          );
          border-radius: 2px;
          /* opacity transition comes inline (direction-aware, with the board) */
        }

        /* ---------- Endpaper ---------- */
        .bk-endpaper {
          position: absolute; inset: 0;
          background:
            radial-gradient(120% 90% at 0% 50%, rgba(179,134,59,0.06), transparent 55%),
            #f6f1e6;
          display: flex; align-items: center; justify-content: center;
        }
        .bk-endpaper__frame {
          position: absolute; inset: 7%;
          border: 1px solid rgba(179,134,59,0.22);
          border-radius: 2px;
        }
        .bk-endpaper__wm { width: 34%; opacity: 0.08; filter: grayscale(0.3); }

        /* ---------- Title page ---------- */
        .bk-title {
          position: absolute; inset: 0;
          background: radial-gradient(120% 80% at 50% 30%, #ffffff, #f6f1e6 100%);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.65rem; padding: 12%;
        }
        .bk-title__logo { width: 38%; max-width: 140px; filter: drop-shadow(0 4px 8px rgba(7,23,21,0.12)); }
        .bk-title__rule { width: 44px; height: 2px; background: linear-gradient(90deg, transparent, var(--accent-gold), transparent); }
        .bk-title__name {
          font-family: var(--font-serif); font-weight: 400;
          font-size: clamp(0.95rem, 1.5vw, 1.4rem);
          color: #24303b; text-align: center; line-height: 1.2;
        }
        .bk-title__sub {
          font-family: var(--font-sans); font-size: 0.55rem; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--text-muted);
          text-align: center;
        }
        .bk-title__meta {
          font-family: var(--font-serif); font-style: italic;
          font-size: 0.7rem; color: var(--accent-gold); margin-top: 0.25rem;
        }

        /* ---------- Covers ---------- */
        .bk-cover {
          position: absolute; inset: 0;
          background: radial-gradient(130% 80% at 50% 0%, #ffffff 0%, #fbfaf7 45%, #f2ece0 100%);
          display: flex; flex-direction: column;
          border-left: 3px solid rgba(179,134,59,0.35);
        }
        .bk-cover__kicker {
          font-family: var(--font-sans); font-size: 0.5rem; font-weight: 700;
          letter-spacing: 0.32em; text-transform: uppercase; color: var(--accent-gold);
        }
        .bk-cover__rule {
          display: block; width: 38px; height: 2px;
          background: linear-gradient(90deg, var(--accent-gold), rgba(179,134,59,0.2));
        }

        /* Full-bleed portrait: photo fills the cover; face sits in the upper
           quarter of the crop, so the text band never touches it. */
        .bk-cover__bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: 50% 0%;
          filter: saturate(1.03) contrast(1.02);
        }
        /* Readability gradient confined to the bottom band of the cover */
        .bk-cover__grad {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(9, 14, 18, 0.95) 0%,
            rgba(9, 14, 18, 0.72) 18%,
            rgba(9, 14, 18, 0.28) 30%,
            transparent 40%
          );
        }
        .bk-cover--front .bk-cover__logo {
          position: absolute; top: 4%; left: 5.5%;
          width: clamp(36px, 14%, 56px); height: auto;
          filter: drop-shadow(0 3px 8px rgba(0,0,0,0.45));
          z-index: 2;
        }
        .bk-cover__text {
          position: absolute; left: 0; right: 0; bottom: 0;
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 0.4rem;
          padding: 0 clamp(0.9rem, 1.8vw, 1.4rem) clamp(0.9rem, 1.6vw, 1.3rem);
          z-index: 2;
        }
        .bk-cover--front .bk-cover__kicker {
          color: #e2bc72;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }
        .bk-cover__name {
          font-family: var(--font-serif); font-weight: 400; line-height: 1.04;
          margin: 0;
          font-size: clamp(1.35rem, 2.6vw, 2.05rem); letter-spacing: 0.01em;
          background: linear-gradient(160deg, #f0d296 0%, #d9ab5c 38%, #f6e3b0 62%, #c8964a 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.55));
        }
        .bk-cover__subtitle {
          font-family: var(--font-sans); font-size: 0.58rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(248, 245, 238, 0.94);
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

        .bk-cover--back {
          padding: clamp(1.4rem, 2.6vw, 2.2rem) clamp(1.1rem, 2vw, 1.7rem);
          align-items: center; justify-content: space-between; text-align: center;
          border-left: none; border-right: 3px solid rgba(179,134,59,0.35);
        }
        .bk-back__inner {
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
          margin-top: auto;
        }
        .bk-back__logo { width: 40%; max-width: 140px; filter: drop-shadow(0 4px 8px rgba(7,23,21,0.14)); }
        .bk-back__blurb {
          font-family: var(--font-serif); font-style: italic;
          font-size: 0.72rem; line-height: 1.8; color: var(--text-secondary);
          max-width: 84%; margin: 0 auto;
        }
        .bk-back__footer {
          margin-top: auto; width: 100%;
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
        }
        .bk-back__firm { font-family: var(--font-serif); font-size: 0.85rem; color: #24303b; letter-spacing: 0.04em; }
        .bk-back__barcode {
          width: 64px; height: 17px;
          background: repeating-linear-gradient(90deg, #1a1510 0 1px, transparent 1px 2px, #1a1510 2px 4px, transparent 4px 5.5px);
          opacity: 0.7;
        }
        .bk-back__meta {
          font-family: var(--font-sans); font-size: 0.5rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--text-muted);
        }

        /* ---------- Photo pages ---------- */
        .bk-photopage {
          position: absolute; inset: 0; background: #fbfaf7;
          padding: 6px;
        }
        .bk-photopage img {
          width: 100%; height: 100%; object-fit: cover; border-radius: 1px;
          box-shadow: inset 0 0 0 1px rgba(7,23,21,0.06);
        }

        /* ---------- Click zones ---------- */
        .bk-zone {
          position: absolute; top: 0; height: 100%;
          border: none; background: transparent; padding: 0;
          cursor: pointer;
          pointer-events: auto;
          /* Float well in front of every leaf in the 3D context so the tilted
             book can never hit-test above the zones. */
          transform: translateZ(300px);
        }
        .bk-zone--prev { left: 0; width: 50%; }
        .bk-zone--next { right: 0; width: 50%; }
        .bk-zone:disabled { cursor: default; }

        @media (prefers-reduced-motion: reduce) {
          .bk-float { animation: none; }
        }

        @media (max-width: 1160px) { .bk-scene { --bk-w: min(310px, 25vw); --bk-shift: 36px; } }
        @media (max-width: 1024px) { .bk-scene { --bk-w: min(280px, 26vw); --bk-shift: 24px; } }
        @media (max-width: 900px)  { .bk-scene { --bk-w: min(320px, 40vw); --bk-shift: 0px; } }
        @media (max-width: 768px)  { .bk-scene { --bk-w: min(280px, 42vw); --bk-shift: 0px; } }
        @media (max-width: 480px)  {
          .bk-scene { --bk-w: min(200px, 45vw); --bk-shift: 0px; }
          .bk-book { transform: rotateX(5deg) rotateY(-14deg); }
          .bk-scene.is-closed .bk-book { transform: rotateX(6deg) rotateY(-20deg) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
