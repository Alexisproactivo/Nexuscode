/**
 * @file DifferentialView.js
 * @description "Seguridad y Confianza" (3 garantías con iconos animados)
 * y "Desarrolladores Responsables en Arequipa" (Rodrigo y Alex) con fotos 4:5 y efecto de luz.
 */

import { ServiceCatalogModel } from '../../models/ServiceCatalogModel.js';

const SHIELD_ICONS = [
  '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 118 0v3"/><circle cx="12" cy="15.5" r="1.5"/>',
  '<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  '<path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z"/><path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>'
];

export class DifferentialView {
  static render() {
    const securityBlocks = ServiceCatalogModel.getSecurityPillars();
    const metadata = ServiceCatalogModel.getAgencyMetadata();

    const securityCardsHtml = securityBlocks
      .map(
        (block, i) => `
          <article class="trust-card nx-card p-7 sm:p-9">
            <div class="flex items-center justify-between mb-8">
              <div class="relative grid place-items-center w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-300/20">
                <svg class="w-7 h-7 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${SHIELD_ICONS[i % 3]}</svg>
              </div>
              <span class="font-mono text-[11px] tracking-[0.15em] text-emerald-300/90 flex items-center gap-2">
                <span class="live-dot w-1.5 h-1.5 rounded-full bg-emerald-400"></span> PROTEGIDO
              </span>
            </div>
            <span class="font-mono text-xs text-slate-500">GARANTÍA ${block.number}</span>
            <h3 class="mt-2 font-display text-xl sm:text-2xl font-bold tracking-tight">${block.title}</h3>
            <p class="mt-4 text-sm sm:text-base leading-relaxed text-slate-400">${block.description}</p>
          </article>
        `
      )
      .join('');

    const foundersHtml = metadata.founders
      .map((founder) => {
        const isRodrigo = founder.id === 'rodrigo';
        const grad = isRodrigo ? 'from-cyan-400 to-blue-600' : 'from-blue-500 to-violet-600';
        const roleColor = isRodrigo ? 'text-cyan-300' : 'text-violet-300';

        return `
          <article class="founder-card nx-card tilt-card group p-5 sm:p-6 overflow-hidden">
            <div class="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div class="relative w-full sm:w-44 shrink-0 aspect-[4/5] rounded-2xl overflow-hidden">
                <div class="absolute -inset-1 bg-gradient-to-br ${grad} opacity-60 blur-xl group-hover:opacity-90 transition-opacity duration-700"></div>
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-br ${grad} p-[1.5px]">
                  <div class="relative w-full h-full rounded-[calc(1rem-1px)] overflow-hidden bg-[#0a0e18]">
                    <div class="absolute inset-0 grid place-items-center font-display text-6xl font-bold text-white/20">${founder.initial}</div>
                    <img src="${founder.photoUrl}" alt="Fotografía de ${founder.name}" loading="lazy"
                      onerror="this.style.display='none'"
                      class="relative w-full h-full object-cover object-center scale-105 grayscale-[35%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                    <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </div>
              </div>

              <div class="flex-1 min-w-0 sm:pt-2">
                <p class="font-mono text-[11px] uppercase tracking-[0.18em] ${roleColor}">${founder.role}</p>
                <h3 class="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight leading-tight">${founder.name}</h3>
                <p class="mt-4 text-sm sm:text-base leading-relaxed text-slate-400">${founder.description}</p>
                <div class="mt-6 flex items-center gap-2 font-mono text-xs text-slate-500">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Disponible para asesorarte · Arequipa
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    return `
      <section id="seguridad" class="relative py-24 sm:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="section-head grid lg:grid-cols-12 gap-6 items-end mb-16">
            <div class="lg:col-span-7">
              <span class="kicker inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-emerald-300/80">
                <span class="w-8 h-px bg-emerald-300/60"></span> Tranquilidad total para tu negocio
              </span>
              <h2 class="split-title mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.02]">
                Tu negocio, <span class="text-gradient">blindado.</span>
              </h2>
            </div>
            <p class="lg:col-span-5 text-base sm:text-lg text-slate-400 leading-relaxed">
              Sabemos que tu negocio es el fruto de tu esfuerzo. Por eso cuidamos tu información y tus ingresos diarios con tres compromisos claros.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-28">
            ${securityCardsHtml}
          </div>

          <div id="equipo">
            <div class="section-head max-w-3xl mb-14">
              <span class="kicker inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                <span class="w-8 h-px bg-cyan-300/60"></span> El equipo
              </span>
              <h2 class="split-title mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.02]">
                Hablas directo con <span class="text-gradient">quien lo construye.</span>
              </h2>
              <p class="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed">
                Desarrolladores responsables en Arequipa, con trato cercano y asesoría paso a paso. Sin intermediarios.
              </p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" style="perspective: 1400px">
              ${foundersHtml}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
