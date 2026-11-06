/**
 * @file PricingPlansView.js
 * @description "Planes claros y a tu medida" con precios en Soles (S/).
 * El plan recomendado tiene borde de energía giratorio; los precios se “cuentan” al aparecer.
 */

import { ServiceCatalogModel } from '../../models/ServiceCatalogModel.js';
import { ContactLeadModel } from '../../models/ContactLeadModel.js';

export class PricingPlansView {
  /** Convierte "S/ 1,200" en un número animable sin perder el texto alrededor. */
  static animatablePrice(text) {
    return text.replace(/S\/\s?([\d,]+)/g, (_, n) => `S/&nbsp;<span data-count="${n.replace(/,/g, '')}" data-format="thousands">${n}</span>`);
  }

  static render() {
    // Plan B (recomendado) primero: es el que más se vende
    const plans = [...ServiceCatalogModel.getPricingPlans()].sort((a, b) => Number(b.isRecommended) - Number(a.isRecommended));

    const plansHtml = plans
      .map((plan) => {
        const whatsappLink = ContactLeadModel.createDirectWhatsAppLink(plan.whatsappMessage);
        const rec = plan.isRecommended;
        const [planCode, planName] = plan.title.split(' — ');

        return `
          <article class="plan-card tilt-card ${rec ? 'nx-spin-border shadow-[0_40px_120px_-40px_rgba(34,211,238,0.45)]' : 'nx-card'} rounded-[1.25rem] p-7 sm:p-10 flex flex-col">

            <div class="flex flex-wrap items-center justify-between gap-3 mb-8">
              <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">${plan.badge}</span>
              <span class="px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] font-semibold ${
                rec ? 'bg-gradient-to-r from-cyan-300 to-blue-400 text-[#05070d] shadow-[0_0_25px_rgba(34,211,238,0.5)]' : 'bg-white/[0.05] text-slate-300 border border-white/10'
              }">${rec ? '★ ' : ''}${plan.recommendedTag}</span>
            </div>

            <span class="font-mono text-sm text-cyan-300">${planCode}</span>
            <h3 class="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight">${planName || plan.title}</h3>

            <div class="mt-8 pb-8 border-b border-white/[0.07]">
              <div class="font-display font-bold tracking-[-0.03em] leading-none ${rec ? 'text-6xl sm:text-7xl' : 'text-4xl sm:text-5xl'}">
                <span class="${rec ? 'text-gradient' : ''}">${PricingPlansView.animatablePrice(plan.priceMain)}</span>
              </div>
              <div class="mt-3 text-sm text-slate-400">${plan.priceNote}</div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4 py-8 border-b border-white/[0.07]">
              <div>
                <span class="block font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-2">⏱ Entrega</span>
                <span class="font-semibold text-slate-100">${plan.deliveryTime}</span>
              </div>
              <div>
                <span class="block font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-2">💳 ${plan.paymentScheduleTitle.replace(':', '')}</span>
                <ul class="space-y-1">
                  ${plan.paymentSteps.map((s) => `<li class="text-sm text-slate-300 leading-snug">${s}</li>`).join('')}
                </ul>
              </div>
            </div>

            <p class="pt-8 text-sm sm:text-base text-slate-300 leading-relaxed">
              <strong class="text-white font-semibold">Ideal para:</strong> ${plan.idealFor}
            </p>

            <ul class="mt-8 space-y-3.5 mb-10">
              ${plan.includes
                .map(
                  (feature) => `
                <li class="plan-feature flex items-start gap-3 text-sm sm:text-[15px] leading-relaxed text-slate-200">
                  <span class="mt-0.5 grid place-items-center w-5 h-5 rounded-full ${rec ? 'bg-gradient-to-br from-cyan-300 to-blue-500 text-[#05070d]' : 'bg-white/10 text-cyan-300'} shrink-0">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span>${feature}</span>
                </li>`
                )
                .join('')}
            </ul>

            <div class="mt-auto space-y-3">
              <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer"
                 class="magnetic ${rec ? 'btn-primary' : 'btn-ghost'} w-full py-4 px-6 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2">
                <span>${plan.ctaText}</span><span aria-hidden="true">↗</span>
              </a>
              <button type="button" data-open-contact data-plan="${plan.title}"
                class="w-full py-2 text-xs sm:text-sm text-slate-500 hover:text-slate-200 transition-colors">
                O déjanos los datos de tu negocio en el formulario →
              </button>
            </div>
          </article>
        `;
      })
      .join('');

    return `
      <section id="planes" class="relative py-24 sm:py-32 overflow-hidden">
        <div class="nx-aurora w-[40rem] h-[40rem] top-20 left-1/2 -translate-x-1/2 bg-blue-600/15"></div>
        <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="section-head text-center max-w-3xl mx-auto mb-16">
            <span class="kicker inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">
              <span class="w-8 h-px bg-cyan-300/60"></span> Inversión transparente en Soles <span class="w-8 h-px bg-cyan-300/60"></span>
            </span>
            <h2 class="split-title mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.02]">
              Planes claros, <span class="text-gradient">sin sorpresas.</span>
            </h2>
            <p class="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed">
              Elige la solución que mejor se adapte a la etapa actual de tu negocio. Sin costos ocultos.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch" style="perspective: 1400px">
            ${plansHtml}
          </div>
        </div>
      </section>
    `;
  }
}
