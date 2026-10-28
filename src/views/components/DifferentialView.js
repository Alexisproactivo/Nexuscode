/**
 * @file DifferentialView.js
 * @description Sección "Seguridad y Confianza Explicada en Sencillo"
 * y bloque humano y profesional "Desarrolladores Responsables en Arequipa"
 * (Rodrigo Apaza Valle y Alex Darwin Colque) con fotos verticales 4:5 y fallback elegante.
 */

import { ServiceCatalogModel } from '../../models/ServiceCatalogModel.js';

export class DifferentialView {
  static render() {
    const securityBlocks = ServiceCatalogModel.getSecurityPillars();
    const metadata = ServiceCatalogModel.getAgencyMetadata();

    const securityCardsHtml = securityBlocks
      .map(
        (block) => `
          <article class="nexus-card rounded-xl p-6 sm:p-8 flex flex-col justify-between reveal-on-scroll">
            <div>
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
                <span class="font-mono text-xs sm:text-sm uppercase tracking-wider text-amber-300/90">
                  GARANTÍA ${block.number}
                </span>
                <span class="font-mono text-xs text-emerald-400">
                  ✓ 100% PROTEGIDO
                </span>
              </div>

              <h3 class="text-lg sm:text-xl font-display font-bold text-[#f8fafc] mb-3">
                ${block.title}
              </h3>

              <p class="text-sm md:text-base font-body leading-relaxed text-slate-300">
                ${block.description}
              </p>
            </div>
          </article>
        `
      )
      .join('');

    const foundersHtml = metadata.founders
      .map((founder) => {
        const isRodrigo = founder.id === 'rodrigo';

        // Contraluz difuso sutil (15% a 25% de opacidad): Azul cobalto (#3b82f6) para Rodrigo, Bronce/Ámbar (#d4af37) para Alex
        const haloStyle = isRodrigo
          ? 'background: radial-gradient(circle at 20% 25%, rgba(59, 130, 246, 0.20), transparent 70%);'
          : 'background: radial-gradient(circle at 20% 25%, rgba(212, 175, 55, 0.18), transparent 70%);';

        const roleColorClass = isRodrigo ? 'text-[#3b82f6]' : 'text-[#d4af37]';
        const fallbackBorderClass = isRodrigo
          ? 'border-[#3b82f6]/30 text-[#3b82f6]'
          : 'border-[#d4af37]/30 text-[#d4af37]';

        return `
          <article
            class="group relative overflow-hidden bg-[#161c26] rounded-2xl border border-white/[0.08] hover:border-white/[0.18] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            <!-- Contraluz difuso trasero muy sutil (15%-25% opacidad) -->
            <div
              class="pointer-events-none absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              style="${haloStyle}"
              aria-hidden="true"
            ></div>

            <div class="relative z-10 flex flex-col sm:flex-row items-start gap-6">
              
              <!-- Contenedor de Foto Vertical (Proporción 4:5 -> w-28 h-36 sm:w-32 sm:h-40) -->
              <div class="relative w-28 h-36 sm:w-32 sm:h-40 rounded-xl overflow-hidden shrink-0 bg-gradient-to-b from-[#1e2634] to-[#0d1117] border border-white/[0.1] shadow-md">
                <!-- Fallback satinado con inicial ("R" o "A") siempre listo detrás o al fallar carga -->
                <div
                  data-founder-fallback="${founder.id}"
                  class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1b2331] via-[#131923] to-[#0d1117] select-none"
                >
                  <div class="w-12 h-12 rounded-full border ${fallbackBorderClass} bg-white/[0.03] flex items-center justify-center">
                    <span class="font-display text-2xl font-bold tracking-tight text-white">
                      ${founder.initial}
                    </span>
                  </div>
                </div>

                <!-- Fotografía del Socio (/rodrigo.jpg y /alex.jpg desde carpeta public/) -->
                <img
                  src="${founder.photoUrl}"
                  alt="Fotografía de ${founder.name}"
                  loading="lazy"
                  onload="this.style.opacity='1'; if(this.previousElementSibling) this.previousElementSibling.style.display='none';"
                  onerror="this.style.display='none'; if(this.previousElementSibling) this.previousElementSibling.style.display='flex';"
                  style="opacity: 0;"
                  class="relative z-10 w-28 h-36 sm:w-32 sm:h-40 rounded-xl object-cover object-center transition-opacity duration-300"
                />
              </div>

              <!-- Información Humana y Profesional del Socio -->
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-display font-bold text-white leading-snug">
                  ${founder.name}
                </h3>

                <p class="font-mono text-xs uppercase tracking-wider ${roleColorClass} mt-1.5 mb-3.5">
                  ${founder.role}
                </p>

                <p class="text-sm md:text-base font-body leading-relaxed text-[#cbd5e1]">
                  ${founder.description}
                </p>
              </div>

            </div>
          </article>
        `;
      })
      .join('');

    return `
      <section id="seguridad" class="py-20 sm:py-28 border-t border-white/[0.08] bg-[#0d1117]/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Encabezado de Seguridad y Confianza -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 reveal-on-scroll">
            <div>
              <div class="inline-flex items-center gap-2 mb-3">
                <span class="w-2 h-2 rounded-full bg-[#3b82f6]"></span>
                <span class="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90">
                  TRANQUILIDAD TOTAL PARA TU NEGOCIO
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-[#f8fafc]">
                Seguridad y Confianza Explicada en Sencillo
              </h2>
            </div>

            <p class="text-base sm:text-lg font-body font-normal text-slate-300 max-w-2xl leading-relaxed">
              Sabemos que tu negocio es el fruto de tu esfuerzo. Por eso cuidamos tu información y tus ingresos diarios con tres compromisos claros.
            </p>
          </div>

          <!-- 3 Bloques de Tranquilidad -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
            ${securityCardsHtml}
          </div>

          <!-- Sección Socios Fundadores: Desarrolladores Responsables en Arequipa -->
          <div id="equipo" class="pt-14 border-t border-white/[0.08] reveal-on-scroll">
            <div class="max-w-3xl mb-10">
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-white">
                Desarrolladores Responsables en Arequipa
              </h2>
              <p class="mt-3 text-base sm:text-lg font-body font-normal text-[#cbd5e1] leading-relaxed">
                Hablas directamente con quienes construyen y dan soporte a tu plataforma, con trato cercano y asesoría paso a paso.
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              ${foundersHtml}
            </div>
          </div>

        </div>
      </section>
    `;
  }
}
