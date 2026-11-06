/**
 * @file PortfolioView.js
 * @description "Proyectos y Demos Interactivas": cada caso real se muestra dentro de un
 * marco de navegador con la web REAL cargándose en vivo (iframe diferido),
 * inclinación 3D y brillo que sigue al mouse.
 */

import { ServiceCatalogModel } from '../../models/ServiceCatalogModel.js';

export class PortfolioView {
  static render() {
    const cases = ServiceCatalogModel.getPortfolioDemos();
    const accents = ['from-cyan-400 to-blue-500', 'from-blue-500 to-violet-500', 'from-violet-500 to-fuchsia-500'];

    const cardsHtml = cases
      .map((item, i) => {
        const host = item.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
        return `
          <article class="demo-card nx-card tilt-card p-4 sm:p-5 flex flex-col" data-portfolio-card="${item.id}">
            <!-- Marco de navegador con la demo en vivo -->
            <a href="${item.demoUrl}" target="_blank" rel="noopener noreferrer" class="browser-frame block" data-cursor-hover aria-label="Abrir demo en vivo de ${item.name}">
              <div class="flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-[#28c840]"></span>
                <span class="ml-2 flex-1 truncate px-3 py-1 rounded-md bg-black/30 font-mono text-[10px] text-slate-400">🔒 ${host}</span>
              </div>
              <div class="browser-viewport">
                <div class="absolute inset-0 grid place-items-center">
                  <span class="font-display text-3xl font-bold text-white/10 text-center px-6">${item.name}</span>
                </div>
                <iframe data-src="${item.demoUrl}" title="Vista previa de ${item.name}" loading="lazy" tabindex="-1" sandbox="allow-scripts allow-same-origin"></iframe>
                <div class="viewport-overlay">
                  <span class="px-5 py-2.5 rounded-full bg-white text-[#05070d] font-semibold text-sm shadow-xl">Abrir demo en vivo ↗</span>
                </div>
              </div>
            </a>

            <div class="flex-1 flex flex-col pt-6 px-1 sm:px-2" style="transform: translateZ(30px)">
              <div class="flex items-center justify-between gap-3 mb-3">
                <span class="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">${item.category}</span>
                <span class="font-mono text-xs text-slate-600">0${i + 1}</span>
              </div>
              <h3 class="font-display text-2xl sm:text-[1.75rem] font-bold tracking-tight">${item.name}</h3>
              <p class="mt-1.5 font-mono text-[11px] text-cyan-300/80">📍 ${item.location}</p>
              <p class="mt-4 text-sm leading-relaxed text-slate-300">${item.benefit}</p>

              <div class="mt-5 flex flex-wrap gap-2">
                ${item.highlights
                  .map((h) => `<span class="px-3 py-1.5 rounded-full text-xs bg-white/[0.04] border border-white/[0.08] text-slate-200">${h}</span>`)
                  .join('')}
              </div>

              <a href="${item.demoUrl}" target="_blank" rel="noopener noreferrer"
                 class="group mt-auto pt-6 flex items-center justify-between gap-3 font-semibold text-sm">
                <span class="relative">
                  Abrir Demo en Vivo
                  <span class="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r ${accents[i % 3]} transition-transform duration-500 group-hover:scale-x-100"></span>
                </span>
                <span class="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br ${accents[i % 3]} text-white transition-transform duration-500 group-hover:rotate-45">↗</span>
              </a>
            </div>
          </article>
        `;
      })
      .join('');

    return `
      <section id="demos" class="relative py-24 sm:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="section-head grid lg:grid-cols-12 gap-6 items-end mb-16">
            <div class="lg:col-span-7">
              <span class="kicker inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                <span class="w-8 h-px bg-cyan-300/60"></span> Casos reales en Arequipa
              </span>
              <h2 class="split-title mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.02]">
                Proyectos que ya están <span class="text-gradient">facturando.</span>
              </h2>
            </div>
            <p class="lg:col-span-5 text-base sm:text-lg text-slate-400 leading-relaxed">
              No son maquetas: son plataformas reales que negocios de la ciudad usan hoy. Pásales el mouse para verlas en vivo, o ábrelas desde tu celular.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" style="perspective: 1200px">
            ${cardsHtml}
          </div>
        </div>
      </section>
    `;
  }
}
