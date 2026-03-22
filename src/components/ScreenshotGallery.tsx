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
      <div class="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-6">
        {screenshots.map(({ src, alt }) => (
          <div
            key={src}
            onClick={() => { setActive(src); setZoomed(false); }}
            class="relative rounded-[10px] overflow-hidden border border-white/[0.08] cursor-zoom-in"
          >
            <img
              src={src}
              alt={alt}
              class="absolute inset-0 w-full h-full object-cover blur-[18px] scale-110 opacity-50 z-0"
            />
            <img
              src={src}
              alt={alt}
              class="relative w-full block object-contain z-[1]"
            />
          </div>
        ))}
      </div>

      {active && createPortal(
        <div
          onClick={zoomed ? () => setZoomed(false) : close}
          class={`fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center backdrop-blur-sm ${zoomed ? "overflow-auto" : "overflow-hidden"}`}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            class="fixed top-5 right-5 w-9 h-9 rounded-full border border-white/15 bg-white/[0.08] text-white/70 text-base cursor-pointer flex items-center justify-center z-[10000]"
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={active}
            onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
            class={`rounded-lg shadow-[0_0_100px_rgba(0,0,0,0.9)] object-contain transition-all duration-200 ${
              zoomed
                ? "max-w-none max-h-none w-[200%] h-auto cursor-zoom-out"
                : "max-w-[90vw] max-h-[90vh] cursor-zoom-in"
            }`}
          />
        </div>,
        document.body
      )}
    </>
  );
}
