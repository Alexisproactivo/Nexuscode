/**
 * @file PricingPlansView.js
 * @description Sección "Planes Claros y a tu Medida" con precios transparentes en Soles (S/).
 * - Plan A: Sistema Exclusivo a Medida (Desde S/ 1,200 a S/ 1,500+)
 * - Plan B: Página Ágil y Prediseñada (S/ 300 — Pago Único de Instalación, Tarjeta Recomendada)
 */

import { ServiceCatalogModel } from '../../models/ServiceCatalogModel.js';
import { ContactLeadModel } from '../../models/ContactLeadModel.js';

export class PricingPlansView {
  static render() {
    const plans = ServiceCatalogModel.getPricingPlans();

    const plansHtml = plans
      .map((plan) => {
        const whatsappLink = ContactLeadModel.createDirectWhatsAppLink(plan.whatsappMessage);

        return `
          <article
            class="nexus-card rounded-2xl p-6 sm:p-9 flex flex-col justify-between relative reveal-on-scroll ${
              plan.isRecommended
                ? 'border-[#d4af37]/70 ring-1 ring-[#d4af37]/40 shadow-[0_0_45px_-15px_rgba(212,175,55,0.25)]'
                : 'border-white/[0.1]'
            }"
          >
            <div>
              <!-- Etiqueta Superior del Plan -->
              <div class="flex flex-wrap items-center justify-between gap-2 mb-5 pb-4 border-b border-white/[0.08]">
                <span class="font-mono text-xs sm:text-sm uppercase tracking-wider text-amber-300/90 font-semibold">
                  ${plan.badge}
                </span>
                <span class="px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider font-semibold ${
                  plan.isRecommended
                    ? 'bg-[#d4af37] text-[#0d1117]'
                    : 'bg-[#0d1117] text-slate-300 border border-white/[0.1]'
                }">
                  ${plan.recommendedTag}
                </span>
              </div>

              <!-- Nombre del Plan -->
              <h3 class="text-xl sm:text-2xl font-display font-bold text-[#f8fafc] mb-3">
                ${plan.title}
              </h3>

              <!-- Precio Destacado en Soles -->
              <div class="mb-6 p-4 rounded-xl bg-[#0d1117] border border-white/[0.08]">
                <div class="font-mono text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
                  ${plan.priceMain}
                </div>
                <div class="font-body text-xs sm:text-sm text-amber-300/90 mt-1">
                  ${plan.priceNote}
                </div>
              </div>

              <!-- Modalidad de Pago Transparente -->
              <div class="mb-6 p-4 rounded-xl bg-[#0d1117]/70 border border-white/[0.06]">
                <span class="block font-display text-sm font-semibold text-[#f8fafc] mb-2.5">
                  💳 ${plan.paymentScheduleTitle}
                </span>
                <ul class="space-y-2">
                  ${plan.paymentSteps
                    .map(
                      (step) => `
                        <li class="flex items-start gap-2 text-sm font-body text-slate-300 leading-relaxed">
                          <span class="text-amber-300 font-bold">•</span>
                          <span>${step}</span>
                        </li>
                      `
                    )
                    .join('')}
                </ul>
              </div>

              <!-- Plazo de Entrega y Para Quién Es -->
              <div class="space-y-3 mb-6 pb-6 border-b border-white/[0.08]">
                <div class="flex items-center justify-between text-sm">
                  <span class="font-body text-slate-400">⏱️ Plazo de entrega:</span>
                  <span class="font-mono text-xs sm:text-sm text-amber-300/90 font-semibold">${plan.deliveryTime}</span>
                </div>
                <p class="text-sm md:text-base font-body text-slate-300 leading-relaxed">
                  <strong class="text-[#f8fafc] font-semibold">Para quién es:</strong> ${plan.idealFor}
                </p>
              </div>

              <!-- Qué Incluye -->
              <div class="mb-8">
                <span class="block font-display text-sm sm:text-base font-semibold text-[#f8fafc] mb-3.5">
                  Qué incluye este plan:
                </span>
                <ul class="space-y-3">
                  ${plan.includes
                    .map(
                      (feature) => `
                        <li class="flex items-start gap-3 text-sm md:text-base font-body text-slate-200 leading-relaxed">
                          <svg class="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>${feature}</span>
                        </li>
                      `
                    )
                    .join('')}
                </ul>
              </div>
            </div>

            <!-- Botón de Acción a WhatsApp -->
            <div class="space-y-2.5">
              <a
                href="${whatsappLink}"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full py-4 px-5 rounded-xl font-body text-sm md:text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                  plan.isRecommended
                    ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-[#f8fafc] shadow-lg'
                    : 'bg-[#0d1117] hover:bg-[#3b82f6] text-[#f8fafc] border border-white/[0.14] hover:border-[#3b82f6]'
                }"
              >
                <span>${plan.ctaText}</span>
                <span aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                data-open-contact
                data-plan="${plan.title}"
                class="w-full py-2.5 px-4 rounded-lg font-body text-xs sm:text-sm text-slate-400 hover:text-slate-200 transition-colors text-center"
              >
                O déjanos los datos de tu negocio en el formulario →
              </button>
            </div>
          </article>
        `;
      })
      .join('');

    return `
      <section id="planes" class="py-20 sm:py-28 border-t border-white/[0.08]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Cabecera de Sección -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 reveal-on-scroll">
            <div>
              <div class="inline-flex items-center gap-2 mb-3">
                <span class="w-2 h-2 rounded-full bg-[#3b82f6]"></span>
                <span class="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90">
                  INVERSIÓN TRANSPARENTE EN SOLES (S/)
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-[#f8fafc]">
                Planes Claros y a tu Medida
              </h2>
            </div>

            <p class="text-base sm:text-lg font-body font-normal text-slate-300 max-w-2xl leading-relaxed">
              Elige la solución que mejor se adapte a la etapa actual de tu negocio. Sin costos ocultos ni sorpresas.
            </p>
          </div>

          <!-- Malla de 2 Columnas Comparativas: Plan A y Plan B -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            ${plansHtml}
          </div>

        </div>
      </section>
    `;
  }
}
