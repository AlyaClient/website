import { useEffect, useRef } from "preact/hooks";

export function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId = 0;

    const resizeCanvas = () => {
      canvas.width = globalThis.innerWidth;
      canvas.height = globalThis.innerHeight;
    };
    resizeCanvas();

    globalThis.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl");

    const run = async () => {
      if (!gl) return;

      const [vertexSource, fragmentSource] = await Promise.all([
        fetch("/shaders/shader.vert").then((response) =>
          response.text()
        ),
        fetch("/shaders/shader.frag").then((response) =>
          response.text()
        ),
      ]);

      const compileShader = (shaderType: number, shaderSource: string) => {
        const shader = gl.createShader(shaderType)!;
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        return shader;
      };

      const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

      const program = gl.createProgram()!;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );

      const positionAttributeLocation = gl.getAttribLocation(
        program,
        "aPosition",
      );
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0,
      );

      const timeUniformLocation = gl.getUniformLocation(program, "time");
      const resolutionUniformLocation = gl.getUniformLocation(
        program,
        "resolution",
      );

      const startTime = performance.now();

      const renderFrame = () => {
        const elapsedSeconds = (performance.now() - startTime) / 1000;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform1f(timeUniformLocation, elapsedSeconds);
        gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationFrameId = requestAnimationFrame(renderFrame);
      };

      renderFrame();
    };

    run();

    return () => {
      globalThis.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style="z-index: 0; position: fixed; inset: 0; width: 100%; height: 100%;"
      />
      <div style="z-index: 1; position: fixed; inset: 0; background: rgba(0,0,0,0.55); pointer-events: none;" />
    </>
  );
}
