(function () {
  const storageKey = "portfolioShaderState";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) {
    return;
  }

  function getShaderState() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) || "null");
      if (
        saved &&
        Number.isFinite(saved.startedAt) &&
        Number.isFinite(saved.seedX) &&
        Number.isFinite(saved.seedY)
      ) {
        return saved;
      }
    } catch (error) {
      // If storage is unavailable, the shader still works with a fresh state.
    }

    const state = {
      startedAt: Date.now() - Math.random() * 180000,
      seedX: Math.random() * 200 - 100,
      seedY: Math.random() * 200 - 100
    };

    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      // Private browsing or locked-down storage should not block rendering.
    }

    return state;
  }

  const shaderState = getShaderState();

  const canvas = document.createElement("canvas");
  canvas.className = "shader-background";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
    premultipliedAlpha: true,
    stencil: false
  });

  if (!gl) {
    canvas.remove();
    return;
  }

  const vertexSource = `
    attribute vec2 a_position;

    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision mediump float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_seed;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;

      for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p = mat2(1.6, 1.2, -1.2, 1.6) * p;
        amplitude *= 0.52;
      }

      return value;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
      vec2 p = (uv - 0.5) * aspect;
      vec2 seed = u_seed * 0.013;

      float t = u_time * 0.05;
      vec2 flow = vec2(
        fbm(p * 1.8 + seed + vec2(t, -t * 0.7)),
        fbm(p * 1.8 - seed + vec2(-t * 0.8, t))
      );

      float field = fbm(p * 2.35 + flow * 1.8 + seed * 0.7 + vec2(t * 0.65, -t * 0.4));
      float slowField = fbm(p * 0.95 - flow * 1.2 - seed * 0.45 + vec2(-t * 0.25, t * 0.3));

      float glow = smoothstep(0.36, 0.9, field);
      float ember = smoothstep(0.58, 1.0, slowField) * 0.42;
      float vignette = smoothstep(0.95, 0.18, length(p));

      vec3 black = vec3(0, 0, 0);
      vec3 deepRed = vec3(0.259, 0.012, 0.012);
      vec3 warmRed = vec3(0.32, 0.12, 0.18);

      vec3 color = mix(black, deepRed, glow * 0.48);
      color = mix(color, warmRed, ember * 0.16);
      color *= 0.94 + vignette * 0.22;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

  if (!vertexShader || !fragmentShader) {
    canvas.remove();
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    canvas.remove();
    return;
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const seedLocation = gl.getUniformLocation(program, "u_seed");

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  let width = 0;
  let height = 0;
  let rafId = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const nextWidth = Math.floor(window.innerWidth * dpr);
    const nextHeight = Math.floor(window.innerHeight * dpr);

    if (nextWidth === width && nextHeight === height) {
      return;
    }

    width = nextWidth;
    height = nextHeight;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  }

  function render() {
    resize();
    gl.uniform2f(resolutionLocation, width, height);
    gl.uniform1f(timeLocation, (Date.now() - shaderState.startedAt) / 1000);
    gl.uniform2f(seedLocation, shaderState.seedX, shaderState.seedY);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    rafId = requestAnimationFrame(render);
  }

  function startRendering() {
    if (!rafId) {
      rafId = requestAnimationFrame(render);
    }
  }

  function stopRendering() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopRendering();
    } else {
      startRendering();
    }
  });

  window.addEventListener("resize", resize);
  startRendering();
})();
