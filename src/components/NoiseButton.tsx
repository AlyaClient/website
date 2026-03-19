import { type ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";

interface NoiseButtonProps {
  children: ComponentChildren;
  href?: string;
  variant?: "primary" | "secondary";
}

export function NoiseButton(
  { children, href, variant = "primary" }: NoiseButtonProps,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationId = 0;

    const paintNoise = () => {
      const context = canvas.getContext("2d");
      if (!context || canvas.width === 0 || canvas.height === 0) return;
      const imageData = context.createImageData(canvas.width, canvas.height);
      for (let index = 0; index < imageData.data.length; index += 4) {
        const noiseValue = Math.floor(Math.random() * 255);
        imageData.data[index] = noiseValue;
        imageData.data[index + 1] = noiseValue;
        imageData.data[index + 2] = noiseValue;
        imageData.data[index + 3] = 28;
      }
      context.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(paintNoise);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (container.offsetWidth > 0 && container.offsetHeight > 0) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        paintNoise();
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  const buttonStyle = variant === "primary"
    ? { background: "#7c3aed" }
    : {
      background: "rgba(124,58,237,0.12)",
      border: "1px solid rgba(168,85,247,0.35)",
    };

  const inner = (
    <div
      ref={containerRef}
      class="relative rounded-xl cursor-pointer select-none group"
      style={{ ...buttonStyle, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      <div class="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <canvas
          ref={canvasRef}
          class="absolute inset-0 w-full h-full"
          style="opacity: 0.25; mix-blend-mode: overlay;"
        />
      </div>
      <div
        class="relative font-medium tracking-wide"
        style={{
          zIndex: 10,
          color: variant === "primary" ? "#fff" : "rgba(216,180,254,0.9)",
          fontSize: "0.875rem",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          padding: "0.625rem 1.75rem",
        }}
      >
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} style="display: inline-block; text-decoration: none;">
        {inner}
      </a>
    );
  }

  return (
    <button
      style="display: inline-block; border: none; background: transparent; padding: 0; cursor: pointer;"
      type="button"
    >
      {inner}
    </button>
  );
}
