/**
 * @file HeroCanvas3D.js
 * @description Escena 3D procedural elegante y ligera con Three.js.
 * Gira suavemente al mover el mouse en computadora o deslizar el dedo en el celular.
 * Libre de etiquetas o textos técnicos encima.
 */

import * as THREE from 'three';

export class HeroCanvas3D {
  /**
   * Monta la estructura geométrica interactiva en el contenedor indicado.
   * @param {string} containerId
   */
  static mount(containerId = 'hero-3d-stage') {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.1);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      container.innerHTML = '';
      return null;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const structureGroup = new THREE.Group();
    scene.add(structureGroup);

    // 1. Esfera geométrica externa en azul índigo (#3b82f6)
    const outerGeo = new THREE.IcosahedronGeometry(1.95, 1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.52
    });
    const outerWireframe = new THREE.LineSegments(outerEdges, outerMat);
    structureGroup.add(outerWireframe);

    // 2. Figura central octaedral en tono dorado artesanal (#d4af37)
    const innerGeo = new THREE.OctahedronGeometry(1.08, 0);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.85
    });
    const innerWireframe = new THREE.LineSegments(innerEdges, innerMat);
    structureGroup.add(innerWireframe);

    // 3. Aro orbital sutil
    const ringGeo = new THREE.RingGeometry(2.3, 2.33, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 2.5;
    orbitalRing.rotation.y = Math.PI / 7;
    structureGroup.add(orbitalRing);

    // 4. Puntos luminosos en los vértices
    const nodePositions = [];
    const posAttr = outerGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      nodePositions.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
    }

    const extraPoints = 40;
    for (let i = 0; i < extraPoints; i++) {
      const theta = (i / extraPoints) * Math.PI * 2;
      const phi = Math.acos(2 * ((i * 0.6180339887) % 1) - 1);
      const radius = 2.22 + (i % 3) * 0.2;
      nodePositions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.055,
      transparent: true,
      opacity: 0.9
    });
    const nodePoints = new THREE.Points(particlesGeo, particlesMat);
    structureGroup.add(nodePoints);

    // Respuesta suave al movimiento del mouse o toque táctil en celulares
    let pointerX = 0;
    let pointerY = 0;

    const updateCoordinates = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const relX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const relY = -((clientY - rect.top) / rect.height) * 2 + 1;
      pointerX = Math.max(-1, Math.min(1, relX));
      pointerY = Math.max(-1, Math.min(1, relY));
    };

    const handlePointerMove = (e) => updateCoordinates(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 500;
      const newH = container.clientHeight || 420;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId = null;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const speedFactor = prefersReducedMotion ? 0.15 : 1;

      outerWireframe.rotation.y = elapsed * 0.18 * speedFactor;
      outerWireframe.rotation.x = Math.sin(elapsed * 0.25) * 0.12 * speedFactor;

      innerWireframe.rotation.y = -elapsed * 0.3 * speedFactor;
      innerWireframe.rotation.z = elapsed * 0.2 * speedFactor;

      nodePoints.rotation.y = elapsed * 0.18 * speedFactor;
      orbitalRing.rotation.z = elapsed * 0.14 * speedFactor;

      const targetY = pointerX * 0.5;
      const targetX = -pointerY * 0.35;

      structureGroup.rotation.y += (targetY - structureGroup.rotation.y) * 0.05;
      structureGroup.rotation.x += (targetX - structureGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return {
      destroy() {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('resize', handleResize);
        observer.disconnect();
        renderer.dispose();
      }
    };
  }
}
