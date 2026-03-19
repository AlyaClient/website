import { useState } from "preact/hooks";
import { createPortal } from "preact/compat";

const screenshots = [
  { src: "/image/homescreen.png", alt: "Home screen" },
  { src: "/image/ingame.png", alt: "In-game" },
  { src: "/image/ui.png", alt: "UI" },
];

export function ScreenshotGallery() {
  const [active, setActive] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const close = () => { setActive(null); setZoomed(false); };

  return (
    <>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 1.5rem;">
        {screenshots.map(({ src, alt }) => (
          <div
            key={src}
            onClick={() => { setActive(src); setZoomed(false); }}
            style="position: relative; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); cursor: zoom-in;"
          >
            <img
              src={src}
              alt={alt}
              style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: blur(18px); transform: scale(1.1); opacity: 0.5; z-index: 0;"
            />
            <img
              src={src}
              alt={alt}
              style="position: relative; width: 100%; display: block; object-fit: contain; z-index: 1;"
            />
          </div>
        ))}
      </div>

      {active && createPortal(
        <div
          onClick={zoomed ? () => setZoomed(false) : close}
          style={`position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.92); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); overflow: ${zoomed ? "auto" : "hidden"};`}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            style="position: fixed; top: 1.25rem; right: 1.25rem; width: 2.25rem; height: 2.25rem; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10000;"
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={active}
            onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
            style={`border-radius: 8px; box-shadow: 0 0 100px rgba(0,0,0,0.9); object-fit: contain; transition: all 0.2s ease; cursor: ${zoomed ? "zoom-out" : "zoom-in"}; ${zoomed ? "max-width: none; max-height: none; width: 200%; height: auto;" : "max-width: 90vw; max-height: 90vh;"}`}
          />
        </div>,
        document.body
      )}
    </>
  );
}
