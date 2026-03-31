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
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const containerReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasReference.current;
    const container = containerReference.current;
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

  const containerStyle = variant === "primary"
    ? {
        position: "relative" as const,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        background: "#7c3aed",
        boxShadow: "0 0 24px rgba(124,58,237,0.35)",
        cursor: "pointer",
        userSelect: "none" as const,
      }
    : {
        position: "relative" as const,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        background: "rgba(124,58,237,0.12)",
        border: "1px solid rgba(168,85,247,0.3)",
        cursor: "pointer",
        userSelect: "none" as const,
      };

  const buttonContent = (
    <div ref={containerReference} style={containerStyle}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "12px", overflow: "hidden", pointerEvents: "none" }}>
        <canvas
          ref={canvasReference}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25, mixBlendMode: "overlay" }}
        />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 10,
          fontFamily: "'SF', sans-serif",
          fontWeight: 500,
          fontSize: "0.875rem",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          padding: "0.625rem 1.75rem",
          color: variant === "primary" ? "#fff" : "rgba(216,180,254,0.9)",
        }}
      >
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", textDecoration: "none" }}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      style={{ display: "inline-block", border: "none", background: "transparent", padding: 0, cursor: "pointer" }}
      type="button"
    >
      {buttonContent}
    </button>
  );
}
