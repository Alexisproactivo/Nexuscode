/**
 * @file MotionController.js
 * @description Toda la coreografía de animación de la web:
 * - Scroll suave (Lenis) sincronizado con GSAP ScrollTrigger
 * - Preloader + intro cinematográfica del Hero
 * - Palabra rotativa del titular
 * - Revelado de títulos palabra por palabra y tarjetas en cascada
 * - Contadores numéricos, scroll horizontal de servicios
 * - Tarjetas con inclinación 3D, botones magnéticos, cursor personalizado
 * Respeta prefers-reduced-motion.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

export class MotionController {
  /**
   * @param {{ hero3d: ReturnType<typeof import('../views/components/HeroCanvas3D.js').HeroCanvas3D.mount> }} deps
   */
  static init({ hero3d } = {}) {
    this.hero3d = hero3d;
    this.reduced = reduceMotion();

    this.setupSmoothScroll();
    this.setupHeader();
    this.setupWordRotator();
    this.setupHeroScroll();
    this.setupSectionReveals();
    this.setupCounters();
    this.setupHorizontalServices();
    this.setupCardSpotlight();
    this.setupTilt();
    this.setupMagnetic();
    this.setupCursor();
    this.setupDemoPreviews();
    this.setupFinale();

    this.runPreloader().then(() => this.playIntro());

    // Recalcular tras cargar fuentes e imágenes
    window.addEventListener('load', () => ScrollTrigger.refresh());
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }

  /* ---------------------------------------------------------------- */
  static setupSmoothScroll() {
    if (this.reduced) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    this.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Enlaces internos con scroll suave
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: id === '#inicio' ? 0 : -20, duration: 1.6 });
      });
    });

    // Pausar scroll cuando hay un modal abierto
    document.querySelectorAll('dialog').forEach((d) => {
      new MutationObserver(() => (d.open ? lenis.stop() : lenis.start())).observe(d, { attributes: true, attributeFilter: ['open'] });
    });
  }

  /* ---------------------------------------------------------------- */
  static runPreloader() {
    const pre = document.getElementById('nx-preloader');
    const count = document.getElementById('pl-count');
    if (!pre) return Promise.resolve();
    if (this.reduced) {
      pre.remove();
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const counter = { v: 0 };
      gsap
        .timeline({ onComplete: () => { pre.remove(); resolve(); } })
        .to(counter, {
          v: 100,
          duration: 1.7,
          ease: 'power2.inOut',
          onUpdate: () => count && (count.textContent = Math.round(counter.v))
        })
        .to(pre.querySelector('.pl-logo'), { scale: 1.6, opacity: 0, duration: 0.6, ease: 'power3.in' }, '+=0.1')
        .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=0.25');
      // Empezar a ensamblar la N mientras la cortina sube
      gsap.delayedCall(1.9, () => this.hero3d?.assemble());
    });
  }

  static playIntro() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    if (this.reduced) return;

    gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .from('#nx-header', { yPercent: -100, opacity: 0, duration: 1.2, clearProps: 'transform,opacity' })
      .from('.hero-title .line-inner', { yPercent: 115, rotate: 3, duration: 1.4, stagger: 0.12 }, '<0.1')
      .from('.hero-badge', { y: 20, opacity: 0, filter: 'blur(8px)', duration: 1, stagger: 0.08 }, '<0.2')
      .from('.hero-sub', { y: 30, opacity: 0, duration: 1.2 }, '<0.3')
      .from('.hero-cta > *', { y: 30, opacity: 0, scale: 0.94, duration: 1.1, stagger: 0.1 }, '<0.15')
      .from('.hero-founders', { y: 20, opacity: 0, duration: 1 }, '<0.2')
      .from('.scroll-cue', { opacity: 0, duration: 1 }, '<0.3');
  }

  /* ---------------------------------------------------------------- */
  static setupHeader() {
    const header = document.getElementById('nx-header');
    const progress = document.getElementById('nx-progress');
    if (!header) return;

    let lastY = 0;
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        header.classList.toggle('is-scrolled', y > 30);
        const drawerOpen = document.getElementById('mobile-menu-toggle')?.getAttribute('aria-expanded') === 'true';
        header.classList.toggle('is-hidden', !drawerOpen && y > 500 && y > lastY);
        lastY = y;
        if (progress) progress.style.transform = `scaleX(${self.progress})`;
      }
    });
  }

  /* ---------------------------------------------------------------- */
  static setupWordRotator() {
    const rotator = document.querySelector('[data-rotator]');
    if (!rotator) return;
    const words = [...rotator.children];
    if (words.length < 2) return;
    gsap.set(words.slice(1), { yPercent: 110, opacity: 0 });
    if (this.reduced) return;

    let i = 0;
    const cycle = () => {
      const current = words[i];
      i = (i + 1) % words.length;
      const next = words[i];
      gsap
        .timeline()
        .to(current, { yPercent: -110, opacity: 0, rotateX: 60, duration: 0.8, ease: 'expo.in' })
        .fromTo(next, { yPercent: 110, opacity: 0, rotateX: -60 }, { yPercent: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'expo.out' }, '-=0.25');
    };
    gsap.delayedCall(4.5, function loop() {
      cycle();
      gsap.delayedCall(2.8, loop);
    });
  }

  /* ---------------------------------------------------------------- */
  static setupHeroScroll() {
    const hero = document.getElementById('hero');
    if (!hero || this.reduced) return;

    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => this.hero3d?.setScatter(self.progress * 1.6)
    });

    gsap.to('#hero .max-w-3xl', {
      yPercent: -25,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
    });

    // El marquee se inclina según la velocidad del scroll
    const marquee = document.querySelector('.marquee');
    if (marquee) {
      const skewTo = gsap.quickTo(marquee, 'skewX', { duration: 0.5, ease: 'power3' });
      ScrollTrigger.create({
        onUpdate: (self) => skewTo(gsap.utils.clamp(-12, 12, self.getVelocity() / -250))
      });
    }
  }

  /* ---------------------------------------------------------------- */
  /** Envuelve cada palabra de un título en máscaras para revelarlas una a una. */
  static splitWords(el) {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    const wrap = (inner) => {
      const mask = document.createElement('span');
      mask.className = 'inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]';
      const w = document.createElement('span');
      w.className = 'split-word inline-block';
      if (typeof inner === 'string') w.textContent = inner;
      else w.appendChild(inner);
      mask.appendChild(w);
      return mask;
    };
    [...el.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(' '));
          else frag.appendChild(wrap(part));
        });
        node.replaceWith(frag);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const placeholder = document.createComment('');
        node.replaceWith(placeholder);
        placeholder.replaceWith(wrap(node));
      }
    });
  }

  static setupSectionReveals() {
    if (this.reduced) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    document.querySelectorAll('.split-title').forEach((title) => {
      this.splitWords(title);
      gsap.from(title.querySelectorAll('.split-word'), {
        yPercent: 110,
        rotate: 4,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: title, start: 'top 85%' }
      });
    });

    document.querySelectorAll('.section-head').forEach((head) => {
      const items = [...head.querySelectorAll('.kicker, p')];
      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: head, start: 'top 85%' }
      });
    });

    // Tarjetas en cascada
    const cardGroups = ['.demo-card', '.plan-card', '.trust-card', '.founder-card'];
    cardGroups.forEach((sel) => {
      gsap.set(sel, { opacity: 0 });
      ScrollTrigger.batch(sel, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 90, opacity: 0, rotateX: 12, transformOrigin: '50% 100%' },
            { y: 0, opacity: 1, rotateX: 0, duration: 1.3, ease: 'expo.out', stagger: 0.14, clearProps: 'transform' }
          )
      });
    });

    // Lista de beneficios de los planes
    document.querySelectorAll('.plan-card').forEach((card) => {
      gsap.from(card.querySelectorAll('.plan-feature'), {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 60%' }
      });
    });

    // Estadísticas
    gsap.from('.stat-item', {
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' }
    });

    // Fallback para cualquier .reveal-on-scroll restante
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => el.classList.add('is-visible') });
    });
  }

  /* ---------------------------------------------------------------- */
  static setupCounters() {
    document.querySelectorAll('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count);
      const thousands = el.dataset.format === 'thousands';
      const fmt = (v) => (thousands ? Math.round(v).toLocaleString('en-US') : Math.round(v));
      if (this.reduced) return;
      const obj = { v: 0 };
      el.textContent = fmt(0);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(obj, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => (el.textContent = fmt(obj.v)) })
      });
    });
  }

  /* ---------------------------------------------------------------- */
  static setupHorizontalServices() {
    const pin = document.querySelector('.h-scroll-pin');
    const track = document.querySelector('.h-scroll-track');
    if (!pin || !track || this.reduced) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const cards = track.children;
      const counter = document.querySelector('.h-scroll-counter');
      const bar = document.querySelector('.h-scroll-bar');
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + track.getBoundingClientRect().left);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar) bar.style.transform = `scaleX(${self.progress})`;
            if (counter) counter.textContent = String(Math.min(cards.length, Math.floor(self.progress * cards.length) + 1)).padStart(2, '0');
          }
        }
      });

      // Cada tarjeta gira levemente al entrar por la derecha
      [...cards].forEach((card) => {
        gsap.from(card, {
          rotateY: -18,
          opacity: 0.3,
          scale: 0.92,
          ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 100%', end: 'left 55%', scrub: true }
        });
      });
    });

    mm.add('(max-width: 1023px)', () => {
      gsap.from('.service-card', {
        y: 70,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: track, start: 'top 85%' }
      });
    });
  }

  /* ---------------------------------------------------------------- */
  static setupCardSpotlight() {
    document.querySelectorAll('.nx-card, .nx-spin-border').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  static setupTilt() {
    if (this.reduced || isTouch()) return;
    document.querySelectorAll('.tilt-card').forEach((card) => {
      const rx = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3' });
      const ry = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3' });
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 9);
        rx(-py * 9);
      });
      card.addEventListener('pointerleave', () => {
        rx(0);
        ry(0);
      });
    });
  }

  static setupMagnetic() {
    if (this.reduced || isTouch()) return;
    document.querySelectorAll('.magnetic').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.3);
        y((e.clientY - r.top - r.height / 2) * 0.4);
      });
      el.addEventListener('pointerleave', () => {
        x(0);
        y(0);
      });
    });
  }

  static setupCursor() {
    const ring = document.querySelector('.nx-cursor');
    const dot = document.querySelector('.nx-cursor-dot');
    if (!ring || !dot) return;
    if (isTouch() || this.reduced) {
      ring.remove();
      dot.remove();
      return;
    }
    gsap.set([ring, dot], { opacity: 0 });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    const dx = gsap.quickTo(dot, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
    window.addEventListener('pointermove', (e) => {
      gsap.to([ring, dot], { opacity: 1, duration: 0.3, overwrite: 'auto' });
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    });
    document.addEventListener('pointerleave', () => gsap.to([ring, dot], { opacity: 0, duration: 0.3 }));
    document.addEventListener('pointerover', (e) => {
      const hit = e.target.closest('a, button, [data-cursor-hover], select, input, textarea');
      ring.classList.toggle('is-hover', !!hit);
    });
  }

  /* ---------------------------------------------------------------- */
  /** Carga las demos reales dentro de los marcos de navegador solo cuando se acercan. */
  static setupDemoPreviews() {
    const frames = document.querySelectorAll('.browser-viewport iframe[data-src]');
    if (!frames.length) return;
    const load = (f) => {
      if (f.src) return;
      f.addEventListener('load', () => f.classList.add('is-loaded'), { once: true });
      f.src = f.dataset.src;
    };
    if (!('IntersectionObserver' in window)) return frames.forEach(load);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            load(en.target);
            io.unobserve(en.target);
          }
        }),
      { rootMargin: '400px 0px' }
    );
    frames.forEach((f) => io.observe(f));
  }

  /* ---------------------------------------------------------------- */
  static setupFinale() {
    const section = document.getElementById('cta-final');
    if (!section || this.reduced) return;

    gsap.from('.cta-title .line-inner', {
      yPercent: 115,
      duration: 1.4,
      ease: 'expo.out',
      stagger: 0.15,
      scrollTrigger: { trigger: section, start: 'top 70%' }
    });
    gsap.from(['.cta-kicker', '.cta-sub', '.cta-buttons > *'], {
      y: 30,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: section, start: 'top 65%' }
    });

    const glow = section.querySelector('.cta-glow');
    if (glow && !isTouch()) {
      const gx = gsap.quickTo(glow, 'x', { duration: 1.2, ease: 'power3' });
      const gy = gsap.quickTo(glow, 'y', { duration: 1.2, ease: 'power3' });
      section.addEventListener('pointermove', (e) => {
        const r = section.getBoundingClientRect();
        gx((e.clientX - r.left - r.width / 2) * 0.4);
        gy((e.clientY - r.top - r.height / 2) * 0.4);
      });
    }
    gsap.fromTo(glow, { scale: 0.6, opacity: 0.4 }, { scale: 1.1, opacity: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'center center', scrub: true } });

    gsap.from('.footer-giant', {
      yPercent: 40,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.footer-giant', start: 'top bottom', end: 'bottom 90%', scrub: true }
    });
  }
}
