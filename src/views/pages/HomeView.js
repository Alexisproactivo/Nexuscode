/**
 * @file HomeView.js
 * @description Ensamblador principal de la página comercial de Nexus Code Systems (Arequipa, Perú).
 * 100% en español claro, enfocado en beneficios reales para dueños de negocio.
 */

import { ServiceCatalogModel } from '../../models/ServiceCatalogModel.js';
import { NavbarView } from '../components/NavbarView.js';
import { PortfolioView } from '../components/PortfolioView.js';
import { PricingPlansView } from '../components/PricingPlansView.js';
import { ServicesView } from '../components/ServicesView.js';
import { DifferentialView } from '../components/DifferentialView.js';
import { ContactModal } from '../components/ContactModal.js';
import { LegalModals } from '../components/LegalModals.js';

export class HomeView {
  /**
   * Inserta datos estructurados de negocio local en el <head> de forma silenciosa para buscadores.
   */
  static injectSchemaOrg() {
    const existingScript = document.getElementById('nexus-schema-jsonld');
    if (existingScript) existingScript.remove();

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Nexus Code Systems',
      description:
        'Desarrollamos recepcionistas automáticos de citas 24/7, catálogos con control de caja diaria y sistemas web a medida en Arequipa, Perú.',
      email: 'nexuscode.systems1@gmail.com',
      telephone: '+51967149366',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Arequipa',
        addressRegion: 'Arequipa',
        addressCountry: 'PE'
      },
      founders: [
        { '@type': 'Person', name: 'Rodrigo Apaza Valle' },
        { '@type': 'Person', name: 'Alex Darwin Colque' }
      ]
    };

    const script = document.createElement('script');
    script.id = 'nexus-schema-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);
  }


  /**
   * Renderiza toda la plataforma comercial.
   */
  static render() {
    const metadata = ServiceCatalogModel.getAgencyMetadata();

    const badgesHtml = metadata.trustBadges
      .map(
        (badge) => `
          <div class="hero-badge inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md font-mono text-[11px] sm:text-xs text-slate-300">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]"></span>
            <span>${badge.text}</span>
          </div>`
      )
      .join('');

    const marqueeWords = [
      'Reservas 24/7',
      'Caja diaria en 1 clic',
      'Carga en menos de 1 segundo',
      'Pedidos directo a WhatsApp',
      'Hecho en Arequipa',
      'Diseño a tu medida',
      'Google Maps integrado',
      '100% celular'
    ];
    const marqueeItem = (w) => `
      <span class="flex items-center gap-12 font-display text-2xl sm:text-4xl font-bold tracking-tight whitespace-nowrap">
        <span class="${Math.random() > 0.5 ? 'text-outline' : 'text-slate-200'}">${w}</span>
        <svg class="w-6 h-6 text-cyan-300 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/></svg>
      </span>`;
    const marqueeTrack = marqueeWords.map(marqueeItem).join('');

    const stats = [
      { value: 1, prefix: '<', suffix: 's', label: 'Tiempo de carga en celular' },
      { value: 24, suffix: '/7', label: 'Tus clientes reservan solos' },
      { value: 300, prefix: 'S/ ', suffix: '', label: 'Arranca con tu web lista' },
      { value: 5, suffix: ' días', label: 'Entrega del Plan B' }
    ];
    const statsHtml = stats
      .map(
        (s) => `
          <div class="stat-item relative p-6 sm:p-8 ${'border-white/[0.07]'}">
            <div class="font-display text-4xl sm:text-6xl font-bold tracking-tight">
              <span class="text-gradient">${s.prefix || ''}<span data-count="${s.value}">${s.value}</span>${s.suffix}</span>
            </div>
            <p class="mt-3 font-body text-sm text-slate-400">${s.label}</p>
          </div>`
      )
      .join('');

    return `
      <div class="relative min-h-screen flex flex-col overflow-x-clip">

        ${NavbarView.render()}

        <main id="inicio" class="flex-grow">

          <!-- ======================= HERO ======================= -->
          <section id="hero" class="relative min-h-[100svh] flex items-center overflow-hidden">
            <!-- Ambiente -->
            <div class="absolute inset-0 nx-grid-bg"></div>
            <div class="nx-aurora w-[42rem] h-[42rem] -top-40 -left-40 bg-cyan-500/30"></div>
            <div class="nx-aurora w-[36rem] h-[36rem] top-1/3 -right-40 bg-violet-600/30" style="animation-delay:-6s"></div>
            <div class="nx-aurora w-[28rem] h-[28rem] -bottom-40 left-1/3 bg-blue-600/25" style="animation-delay:-12s"></div>

            <!-- Escena 3D de partículas formando la N -->
            <div id="hero-3d-stage" class="absolute inset-0 opacity-45 lg:opacity-100" aria-hidden="true"></div>
            <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070d] to-transparent pointer-events-none"></div>

            <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 pointer-events-none">
              <div class="max-w-3xl pointer-events-auto">

                <div class="flex flex-wrap items-center gap-2 mb-8">
                  ${badgesHtml}
                </div>

                <h1 class="hero-title font-display font-bold tracking-[-0.035em] leading-[0.98] text-[2.7rem] sm:text-6xl lg:text-[5.4rem]">
                  <span class="line-mask"><span class="line-inner">Sistemas web</span></span>
                  <span class="line-mask"><span class="line-inner">que hacen que</span></span>
                  <span class="line-mask"><span class="line-inner">tu negocio
                    <span class="word-rotator" data-rotator>
                      <span class="text-gradient">facture más.</span>
                      <span class="text-gradient">venda 24/7.</span>
                      <span class="text-gradient">brille online.</span>
                      <span class="text-gradient">crezca ya.</span>
                    </span>
                  </span></span>
                </h1>

                <p class="hero-sub mt-8 text-base md:text-lg text-slate-300/90 max-w-xl leading-relaxed">
                  Recepcionistas automáticos de citas 24/7, catálogos con control de caja diaria y sistemas a medida para que dejes de perder horas contestando WhatsApp. Código rápido, seguro y sin plantillas lentas.
                </p>

                <div class="hero-cta mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a href="#demos" class="magnetic btn-primary group px-7 py-4 rounded-full font-semibold text-sm md:text-base flex items-center justify-center gap-3">
                    <span>Ver Demos en Vivo</span>
                    <span class="grid place-items-center w-7 h-7 rounded-full bg-white/20 transition-transform duration-500 group-hover:rotate-90">↓</span>
                  </a>
                  <a href="${metadata.whatsappDefaultUrl}" target="_blank" rel="noopener noreferrer" class="magnetic btn-ghost px-7 py-4 rounded-full font-semibold text-sm md:text-base flex items-center justify-center gap-2">
                    <span>Cotizar por WhatsApp</span>
                    <span class="text-cyan-300">↗</span>
                  </a>
                </div>

                <div class="hero-founders mt-12 flex items-center gap-4">
                  <div class="flex -space-x-3">
                    <img src="/rodrigo.jpg" alt="" class="w-11 h-11 rounded-full object-cover border-2 border-[#05070d] ring-1 ring-cyan-300/40" onerror="this.style.display='none'" />
                    <img src="/alex.jpg" alt="" class="w-11 h-11 rounded-full object-cover border-2 border-[#05070d] ring-1 ring-violet-400/40" onerror="this.style.display='none'" />
                  </div>
                  <div class="font-mono text-xs leading-relaxed text-slate-400">
                    <span class="text-slate-200">Rodrigo Apaza & Alex Colque</span><br />
                    Atención directa en Arequipa y todo el Perú
                  </div>
                </div>
              </div>
            </div>

            <!-- Indicador de scroll -->
            <a href="#demos" class="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-slate-500">
              DESLIZA
              <span class="block w-px h-12 bg-white/10 overflow-hidden"><span class="block w-full h-1/2 bg-gradient-to-b from-transparent to-cyan-300"></span></span>
            </a>
          </section>

          <!-- ======================= MARQUEE ======================= -->
          <section class="relative py-10 border-y border-white/[0.06] bg-white/[0.015] -rotate-1 scale-[1.03]">
            <div class="marquee"><div class="marquee-track">${marqueeTrack}</div><div class="marquee-track" aria-hidden="true">${marqueeTrack}</div></div>
          </section>

          <!-- ======================= STATS ======================= -->
          <section class="relative py-20 sm:py-28">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="stats-grid grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.07] rounded-3xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                ${statsHtml}
              </div>
            </div>
          </section>

          ${PortfolioView.render()}

          ${ServicesView.render()}

          ${PricingPlansView.render()}

          ${DifferentialView.render()}

          <!-- ======================= CTA FINAL ======================= -->
          <section id="cta-final" class="relative py-28 sm:py-40 overflow-hidden">
            <div class="absolute inset-0 nx-grid-bg opacity-60"></div>
            <div class="cta-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.25),rgba(139,92,246,0.12)_40%,transparent_70%)]"></div>

            <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span class="cta-kicker inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] font-mono text-xs tracking-[0.2em] text-cyan-200">
                <span class="live-dot w-2 h-2 rounded-full bg-emerald-400"></span>
                IMPULSA TU LOCAL HOY MISMO
              </span>
              <h2 class="cta-title mt-8 font-display font-bold tracking-[-0.04em] leading-[0.95] text-5xl sm:text-7xl lg:text-[7.5rem]">
                <span class="line-mask"><span class="line-inner">¿Agenda llena?</span></span>
                <span class="line-mask"><span class="line-inner text-gradient">¿Cuentas claras?</span></span>
              </h2>
              <p class="cta-sub mt-8 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Escríbenos a nuestro WhatsApp comercial. Te asesoramos sin compromiso para elegir entre el Plan B de S/ 300 o un Sistema Exclusivo a Medida (Plan A).
              </p>
              <div class="cta-buttons mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="${metadata.whatsappDefaultUrl}" target="_blank" rel="noopener noreferrer" class="magnetic btn-primary w-full sm:w-auto px-9 py-5 rounded-full font-semibold text-base">
                  Hablar por WhatsApp (${metadata.phoneDisplay}) ↗
                </a>
                <button type="button" data-open-contact class="magnetic btn-ghost w-full sm:w-auto px-9 py-5 rounded-full font-semibold text-base">
                  Llenar Formulario Rápido
                </button>
              </div>
            </div>
          </section>
        </main>

        <!-- ======================= FOOTER ======================= -->
        <footer class="relative border-t border-white/[0.07] pt-16 pb-10 overflow-hidden">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
              <div class="md:col-span-5 space-y-4">
                <div class="flex items-center gap-3">
                  <img src="/favicon.png" alt="" class="w-9 h-9 object-contain" />
                  <span class="font-display font-bold text-lg tracking-tight">Nexus Code Systems</span>
                </div>
                <p class="text-sm text-slate-400 max-w-md leading-relaxed">
                  Desarrolladores responsables: <strong class="text-slate-100">Rodrigo Apaza Valle</strong> & <strong class="text-slate-100">Alex Darwin Colque</strong>. Ingeniería de software desde Arequipa, Perú.
                </p>
                <div class="space-y-1.5 font-mono text-xs sm:text-sm text-slate-400">
                  <div>Correo: <a href="mailto:${metadata.email}" class="text-cyan-300 hover:underline">${metadata.email}</a></div>
                  <div>WhatsApp: <a href="${metadata.whatsappDefaultUrl}" target="_blank" rel="noopener noreferrer" class="text-cyan-300 hover:underline">${metadata.phoneDisplay}</a></div>
                </div>
              </div>

              <div class="md:col-span-4 space-y-3">
                <span class="block font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/70">Demos en Vivo</span>
                <ul class="space-y-2.5 text-sm text-slate-300">
                  <li><a href="https://mjbarber.netlify.app/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">MJ Barber ↗</a></li>
                  <li><a href="https://barbali-arequipa.netlify.app/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Barbali Arequipa ↗</a></li>
                  <li><a href="https://zheymar-studio-color.netlify.app/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Zheymar Studio Color ↗</a></li>
                  <li><a href="#planes" class="hover:text-white transition-colors">Planes A y B en Soles</a></li>
                </ul>
              </div>

              <div class="md:col-span-3 space-y-3">
                <span class="block font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/70">Legal</span>
                <ul class="space-y-2.5 text-sm text-slate-300">
                  <li><button type="button" data-open-legal="privacy" class="hover:text-white underline underline-offset-4 decoration-white/20 transition-colors text-left">Política de Privacidad</button></li>
                  <li><button type="button" data-open-legal="terms" class="hover:text-white underline underline-offset-4 decoration-white/20 transition-colors text-left">Términos del Servicio</button></li>
                </ul>
              </div>
            </div>

            <div class="footer-giant select-none font-display font-bold tracking-[-0.06em] leading-none text-[18vw] lg:text-[13rem] text-center text-outline opacity-60" aria-hidden="true">
              NEXUSCODE
            </div>

            <div class="pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 text-center">
              <span>© ${new Date().getFullYear()} Nexus Code Systems — Arequipa, Perú.</span>
              <span>Hecho con código propio, sin plantillas.</span>
            </div>
          </div>
        </footer>

        <!-- WhatsApp flotante -->
        <a href="${metadata.whatsappDefaultUrl}" target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"
           class="wa-float fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#25d366] grid place-items-center shadow-[0_10px_40px_-5px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform">
          <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.7.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.4.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 01-4.8-1.32l-.35-.2-3.56.93.95-3.47-.22-.36a9.42 9.42 0 01-1.45-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 012.76 6.68c0 5.2-4.24 9.43-9.44 9.43m8.04-17.47A11.3 11.3 0 0012.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.33 11.33 0 005.37 1.37h.01c6.26 0 11.36-5.1 11.37-11.37 0-3.03-1.18-5.89-3.33-8.03"/></svg>
        </a>

        ${ContactModal.render()}
        ${LegalModals.render()}
      </div>
    `;
  }
}
