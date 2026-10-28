/**
 * @file PortfolioView.js
 * @description Sección "Proyectos y Demos Interactivas" con enlaces funcionales
 * a las demos en vivo de MJ Barber, Barbali y Zheymar Studio Color & Academy.
 */

import { ServiceCatalogModel } from '../../models/ServiceCatalogModel.js';

export class PortfolioView {
  static render() {
    const cases = ServiceCatalogModel.getPortfolioDemos();

    const cardsHtml = cases
      .map(
        (item) => `
          <article class="nexus-card nexus-card-amber rounded-xl p-6 sm:p-8 flex flex-col justify-between reveal-on-scroll">
            <div>
              <!-- Ubicación en Arequipa -->
              <div class="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-white/[0.08]">
                <span class="font-mono text-xs sm:text-sm uppercase tracking-wider text-amber-300/90">
                  📍 ${item.location}
                </span>
              </div>

              <!-- Rubro y Nombre del Negocio -->
              <div class="mb-4">
                <span class="font-mono text-xs uppercase tracking-wider text-slate-400 block mb-1">
                  ${item.category}
                </span>
                <h3 class="text-xl sm:text-2xl font-display font-bold text-[#f8fafc]">
                  ${item.name}
                </h3>
              </div>

              <!-- Beneficio Principal en Español Claro -->
              <p class="text-sm md:text-base font-body leading-relaxed text-slate-300 mb-6">
                ${item.benefit}
              </p>

              <!-- Puntos Clave de la Demo -->
              <ul class="space-y-2 mb-8">
                ${item.highlights
                  .map(
                    (point) => `
                      <li class="flex items-center gap-2.5 text-sm font-body text-slate-200">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0"></span>
                        <span>${point}</span>
                      </li>
                    `
                  )
                  .join('')}
              </ul>
            </div>

            <!-- Botón Visible: [ Abrir Demo en Vivo ↗ ] -->
            <div class="pt-5 border-t border-white/[0.08]">
              <a
                href="${item.demoUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full py-3.5 px-5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-[#f8fafc] font-body text-sm md:text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Abrir Demo en Vivo</span>
                <span aria-hidden="true" class="font-mono text-base leading-none">↗</span>
              </a>
            </div>
          </article>
        `
      )
      .join('');

    return `
      <section id="demos" class="py-20 sm:py-28 border-t border-white/[0.08] bg-[#0d1117]/70">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Encabezado de Sección -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 reveal-on-scroll">
            <div>
              <div class="inline-flex items-center gap-2 mb-3">
                <span class="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                <span class="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90">
                  CASOS REALES EN AREQUIPA
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-[#f8fafc]">
                Proyectos y Demos Interactivas
              </h2>
            </div>

            <p class="text-base sm:text-lg font-body font-normal text-slate-300 max-w-2xl leading-relaxed">
              Prueba directamente desde tu teléfono las plataformas que ya están utilizando negocios en la ciudad.
            </p>
          </div>

          <!-- Grilla de 3 Casos Reales -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            ${cardsHtml}
          </div>

        </div>
      </section>
    `;
  }
}
