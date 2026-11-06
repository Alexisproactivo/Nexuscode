/**
 * @file HeroCanvas3D.js
 * @description Escena 3D del Hero: miles de partículas que vuelan desde el espacio
 * y se ensamblan formando la "N" de nodos del logo de Nexus Code Systems.
 * - Reacciona al mouse (las partículas se apartan como un campo magnético)
 * - Al hacer scroll, la N "explota" en polvo de estrellas (setScatter)
 * - Respeta prefers-reduced-motion y pausa cuando no está visible
 */

import * as THREE from 'three';

const VERTEX_SHADER = /* glsl */ `
  attribute vec3 aStart;
  attribute float aDelay;
  attribute float aSize;
  attribute vec3 aColor;

  uniform float uProgress;
  uniform float uTime;
  uniform float uScatter;
  uniform float uPixelRatio;
  uniform vec2 uMouse;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float p = clamp((uProgress - aDelay * 0.45) / 0.55, 0.0, 1.0);
    p = 1.0 - pow(1.0 - p, 3.0);

    vec3 pos = mix(aStart, position, p);

    // Respiración orgánica
    pos += vec3(
      sin(uTime * 0.9 + aDelay * 40.0),
      cos(uTime * 0.7 + aDelay * 31.0),
      sin(uTime * 0.6 + aDelay * 23.0)
    ) * (0.025 + (1.0 - p) * 0.25);

    // Dispersión al hacer scroll
    pos += normalize(aStart + 0.001) * uScatter * (1.5 + aDelay * 5.0);

    // Campo magnético del mouse
    vec2 d = pos.xy - uMouse;
    float dist = length(d);
    float force = smoothstep(1.1, 0.0, dist);
    pos.xy += normalize(d + 0.0001) * force * 0.55;
    pos.z += force * 0.9;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (32.0 / -mvPosition.z) * (1.0 + force * 0.8);

    vColor = mix(aColor, vec3(1.0), force * 0.6);
    vAlpha = (0.35 + p * 0.65) * (1.0 - clamp(uScatter * 0.6, 0.0, 0.85));
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a = pow(a, 1.7);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

export class HeroCanvas3D {
  /**
   * @param {string} containerId
   * @returns {{ setScatter(v:number):void, assemble():void, destroy():void } | null}
   */
  static mount(containerId = 'hero-3d-stage') {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.innerWidth < 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      container.classList.add('hero-3d-fallback');
      return null;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    // ---------- Forma de la "N" con nodos (como el logo) ----------
    const W = 1.15; // medio ancho
    const H = 1.4; // media altura
    const nodes = [
      new THREE.Vector3(-W, H, 0),
      new THREE.Vector3(W, H, 0),
      new THREE.Vector3(-W, -H, 0),
      new THREE.Vector3(W, -H, 0)
    ];
    const strokes = [
      [nodes[2], nodes[0]], // vertical izquierda
      [nodes[0], nodes[3]], // diagonal
      [nodes[3], nodes[1]] // vertical derecha
    ];

    const COUNT = isSmall ? 2200 : 4200;
    const STROKE_SHARE = 0.64;
    const NODE_SHARE = 0.13;

    const positions = new Float32Array(COUNT * 3);
    const starts = new Float32Array(COUNT * 3);
    const delays = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const cyan = new THREE.Color('#22d3ee');
    const blue = new THREE.Color('#3b82f6');
    const ice = new THREE.Color('#e0f7ff');
    const violet = new THREE.Color('#8b5cf6');
    const tmp = new THREE.Color();

    const randomInSphere = (r) => {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const rr = r * Math.cbrt(Math.random());
      return new THREE.Vector3(rr * Math.sin(phi) * Math.cos(theta), rr * Math.sin(phi) * Math.sin(theta), rr * Math.cos(phi));
    };

    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT;
      let target;
      let kind;

      if (t < STROKE_SHARE) {
        // Partículas a lo largo de los trazos (tubo luminoso)
        const s = strokes[i % 3];
        const k = Math.random();
        target = new THREE.Vector3().lerpVectors(s[0], s[1], k);
        const jitter = randomInSphere(0.09);
        target.add(jitter);
        kind = 'stroke';
      } else if (t < STROKE_SHARE + NODE_SHARE) {
        // Nodos esféricos en las 4 esquinas
        const n = nodes[i % 4];
        const shell = randomInSphere(0.26);
        target = n.clone().add(shell);
        kind = 'node';
      } else {
        // Polvo cósmico ambiental
        target = randomInSphere(5.5);
        target.z -= 1.5;
        kind = 'dust';
      }

      positions.set([target.x, target.y, target.z], i * 3);

      const start = randomInSphere(9);
      starts.set([start.x, start.y, start.z], i * 3);

      delays[i] = Math.random();

      if (kind === 'stroke') {
        sizes[i] = 2.2 + Math.random() * 2.2;
        tmp.copy(cyan).lerp(blue, Math.random());
      } else if (kind === 'node') {
        sizes[i] = 1.8 + Math.random() * 2.4;
        tmp.copy(ice).lerp(cyan, 0.35 + Math.random() * 0.6);
      } else {
        sizes[i] = 0.8 + Math.random() * 1.6;
        tmp.copy(blue).lerp(violet, Math.random() * 0.7);
      }
      colors.set([tmp.r, tmp.g, tmp.b], i * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aStart', new THREE.BufferAttribute(starts, 3));
    geometry.setAttribute('aDelay', new THREE.BufferAttribute(delays, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const uniforms = {
      uProgress: { value: prefersReducedMotion ? 1 : 0 },
      uTime: { value: 0 },
      uScatter: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uMouse: { value: new THREE.Vector2(99, 99) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    root.add(points);

    // ---------- Líneas de energía que recorren la N ----------
    const linePts = [nodes[2], nodes[0], nodes[3], nodes[1]];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const nLine = new THREE.Line(lineGeo, lineMat);
    root.add(nLine);

    // Pulso de energía viajando por el trazo
    const pulseGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    root.add(pulse);
    const curve = new THREE.CatmullRomCurve3(linePts, false, 'catmullrom', 0);

    // ---------- Anillos orbitales ----------
    const makeRing = (radius, color, opacity, rx, ry) => {
      const g = new THREE.TorusGeometry(radius, 0.004, 8, 180);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending });
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.set(rx, ry, 0);
      root.add(mesh);
      return mesh;
    };
    const ring1 = makeRing(2.35, 0x22d3ee, 0.35, Math.PI / 2.3, 0.3);
    const ring2 = makeRing(2.75, 0x8b5cf6, 0.22, Math.PI / 1.8, -0.5);
    const ring3 = makeRing(3.2, 0x3b82f6, 0.12, Math.PI / 2.1, 0.9);

    // Satélites en los anillos
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sat1 = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), satMat);
    const sat2 = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 10), satMat);
    ring1.add(sat1);
    ring2.add(sat2);

    // ---------- Layout responsivo ----------
    let viewHalfW = 1;
    let viewHalfH = 1;
    const layout = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';

      viewHalfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      viewHalfW = viewHalfH * camera.aspect;

      if (w >= 1024) {
        root.position.set(viewHalfW * 0.48, 0, 0);
        root.scale.setScalar(1);
      } else {
        root.position.set(viewHalfW * 0.35, viewHalfH * 0.3, -2);
        root.scale.setScalar(0.9);
      }
    };
    layout();
    window.addEventListener('resize', layout);

    // ---------- Interacción ----------
    let pointerX = 0;
    let pointerY = 0;
    let hasPointer = false;
    const mouseWorld = new THREE.Vector2(99, 99);

    const onPointer = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width) return;
      pointerX = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = -((clientY - rect.top) / rect.height) * 2 + 1;
      hasPointer = true;
    };
    const handlePointerMove = (e) => onPointer(e.clientX, e.clientY);
    const handleTouch = (e) => e.touches?.[0] && onPointer(e.touches[0].clientX, e.touches[0].clientY);
    const handleLeave = () => (hasPointer = false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    document.addEventListener('pointerleave', handleLeave);

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => (isVisible = e.isIntersecting)), {
      threshold: 0
    });
    observer.observe(container);

    // ---------- Animación de ensamblaje ----------
    let assembleStart = null;
    const ASSEMBLE_DURATION = 3.2;
    const assemble = () => {
      if (prefersReducedMotion) return;
      assembleStart = performance.now();
    };

    const clock = new THREE.Clock();
    let rafId = null;
    const speed = prefersReducedMotion ? 0.15 : 1;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      uniforms.uTime.value = t * speed;

      if (assembleStart !== null) {
        const k = Math.min(1, (performance.now() - assembleStart) / (ASSEMBLE_DURATION * 1000));
        uniforms.uProgress.value = k;
        if (k >= 1) assembleStart = null;
      }

      const ready = uniforms.uProgress.value;
      lineMat.opacity = Math.max(0, (ready - 0.75) * 4) * 0.55 * (1 - Math.min(1, uniforms.uScatter.value));
      pulseMat.opacity = lineMat.opacity * 1.6;
      pulse.position.copy(curve.getPointAt((t * 0.22 * speed) % 1));

      // Mouse → coordenadas del mundo, relativas al grupo
      const targetMx = hasPointer ? (pointerX * viewHalfW - root.position.x) / root.scale.x : 99;
      const targetMy = hasPointer ? (pointerY * viewHalfH - root.position.y) / root.scale.y : 99;
      if (hasPointer && mouseWorld.x > 50) mouseWorld.set(targetMx, targetMy);
      mouseWorld.x += (targetMx - mouseWorld.x) * 0.12;
      mouseWorld.y += (targetMy - mouseWorld.y) * 0.12;
      uniforms.uMouse.value.copy(mouseWorld);

      // Rotación sutil siguiendo el puntero
      const ry = (hasPointer ? pointerX : Math.sin(t * 0.3) * 0.4) * 0.35;
      const rx = (hasPointer ? -pointerY : Math.cos(t * 0.25) * 0.3) * 0.22;
      points.rotation.y += (ry - points.rotation.y) * 0.05;
      points.rotation.x += (rx - points.rotation.x) * 0.05;
      nLine.rotation.copy(points.rotation);
      pulse.parent === root && pulse.position.applyEuler(points.rotation);

      ring1.rotation.z = t * 0.25 * speed;
      ring2.rotation.z = -t * 0.18 * speed;
      ring3.rotation.z = t * 0.1 * speed;
      sat1.position.set(Math.cos(t * 0.9) * 2.35, Math.sin(t * 0.9) * 2.35, 0);
      sat2.position.set(Math.cos(-t * 0.6 + 2) * 2.75, Math.sin(-t * 0.6 + 2) * 2.75, 0);

      renderer.render(scene, camera);
    };
    tick();

    return {
      assemble,
      setScatter(v) {
        uniforms.uScatter.value = v;
        root.rotation.z = v * 0.4;
      },
      destroy() {
        cancelAnimationFrame(rafId);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('touchmove', handleTouch);
        window.removeEventListener('resize', layout);
        document.removeEventListener('pointerleave', handleLeave);
        observer.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      }
    };
  }
}
