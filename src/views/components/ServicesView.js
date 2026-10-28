/**
 * @file ServicesView.js
 * @description Presenta las 4 soluciones comerciales de Nexus Code Systems
 * explicadas con beneficios directos para el dueño de negocio.
 */

import { ServiceCatalogModel } from '../../models/ServiceCatalogModel.js';

export class ServicesView {
  static render() {
    const services = ServiceCatalogModel.getServices();

    const cardsHtml = services
      .map(
        (service) => `
          <article class="nexus-card rounded-xl p-6 sm:p-8 flex flex-col justify-between reveal-on-scroll">
            <div>
              <div class="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.08]">
                <span class="font-mono text-xs sm:text-sm uppercase tracking-wider text-amber-300/90">
                  ${service.tag}
                </span>
              </div>

              <h3 class="text-lg sm:text-xl font-display font-bold text-[#f8fafc] mb-3">
                ${service.title}
              </h3>

              <p class="text-sm md:text-base font-body leading-relaxed text-slate-300 mb-6">
                ${service.description}
              </p>

              <ul class="space-y-2.5">
                ${service.benefits
                  .map(
                    (benefit) => `
                      <li class="flex items-start gap-2.5 text-sm md:text-base font-body leading-relaxed text-slate-200">
                        <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0"></span>
                        <span>${benefit}</span>
                      </li>
                    `
                  )
                  .join('')}
              </ul>
            </div>
          </article>
        `
      )
      .join('');

    return `
      <section id="soluciones" class="py-20 sm:py-28 border-t border-white/[0.08]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 reveal-on-scroll">
            <div>
              <div class="inline-flex items-center gap-2 mb-3">
                <span class="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                <span class="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90">
                  HERRAMIENTAS QUE HACEN CRECER TU NEGOCIO
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-[#f8fafc]">
                ¿Cómo te ayudamos a vender más y trabajar mejor?
              </h2>
            </div>

            <p class="text-base sm:text-lg font-body font-normal text-slate-300 max-w-2xl leading-relaxed">
              Cada sistema está pensado para ahorrarte horas de trabajo manual, ordenar tus citas y proyectar una imagen profesional ante tus clientes.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            ${cardsHtml}
          </div>

        </div>
      </section>
    `;
  }
}
