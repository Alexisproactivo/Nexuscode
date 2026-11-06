/**
 * @file ServicesView.js
 * @description Las 4 soluciones comerciales. En escritorio la sección se “ancla”
 * y las tarjetas se deslizan en horizontal al hacer scroll (GSAP ScrollTrigger).
 */

import { ServiceCatalogModel } from '../../models/ServiceCatalogModel.js';

const ICONS = [
  // Calendario / citas
  '<path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/><path d="M9 15l2 2 4-4"/>',
  // Caja / ventas
  '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-6"/><path d="M17 8h3v3"/>',
  // Página / pantalla
  '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 9h6M7 12h10"/>',
  // A medida / engranajes
  '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>'
];

export class ServicesView {
  static render() {
    const services = ServiceCatalogModel.getServices();

    const cardsHtml = services
      .map(
        (service, i) => `
          <article class="service-card nx-card p-7 sm:p-10 lg:p-8 flex flex-col overflow-hidden">
            <div class="flex items-start justify-between gap-4 mb-10 lg:mb-6">
              <div class="relative grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-white/10">
                <svg class="w-7 h-7 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[i % ICONS.length]}</svg>
                <span class="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-xl -z-10"></span>
              </div>
              <span class="service-index" aria-hidden="true">0${i + 1}</span>
            </div>

            <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/80">${service.tag}</span>
            <h3 class="mt-3 font-display text-2xl sm:text-3xl lg:text-[1.65rem] font-bold tracking-tight leading-tight">${service.title}</h3>
            <p class="mt-4 text-sm sm:text-base leading-relaxed text-slate-400">${service.description}</p>

            <ul class="mt-8 lg:mt-6 pt-6 lg:pt-5 border-t border-white/[0.07] space-y-3.5 lg:space-y-2.5">
              ${service.benefits
                .map(
                  (b) => `
                <li class="flex items-start gap-3 text-sm sm:text-[15px] leading-relaxed text-slate-200">
                  <span class="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-cyan-400/15 text-cyan-300 shrink-0">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span>${b}</span>
                </li>`
                )
                .join('')}
            </ul>

            <button type="button" data-open-contact data-service="${service.title}"
              class="group mt-auto pt-8 lg:pt-6 self-start flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white">
              Quiero esta solución
              <span class="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </button>
          </article>
        `
      )
      .join('');

    return `
      <section id="soluciones" class="relative overflow-hidden">
        <div class="h-scroll-pin lg:min-h-screen lg:flex lg:flex-col lg:justify-center py-24 sm:py-32 lg:pt-24 lg:pb-10">
          <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div class="section-head flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-8">
              <div>
                <span class="kicker inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                  <span class="w-8 h-px bg-cyan-300/60"></span> Herramientas que hacen crecer tu negocio
                </span>
                <h2 class="split-title mt-5 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-[-0.03em] leading-[1.02] max-w-3xl">
                  Vende más y <span class="text-gradient">trabaja menos.</span>
                </h2>
              </div>
              <div class="flex items-center gap-4">
                <p class="text-base text-slate-400 max-w-sm leading-relaxed">
                  Cada sistema te ahorra horas de trabajo manual, ordena tus citas y proyecta una imagen profesional.
                </p>
                <div class="hidden lg:flex items-center gap-3 font-mono text-xs text-slate-500">
                  <span class="h-scroll-counter text-cyan-300">01</span>
                  <span class="relative w-24 h-px bg-white/10"><span class="h-scroll-bar absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-cyan-300"></span></span>
                  <span>0${services.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            <div class="h-scroll-track grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-0 lg:pr-[10vw]">
              ${cardsHtml}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
