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
      telephone: '+51961712546',
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

    const trustBadgesHtml = metadata.trustBadges
      .map(
        (badge) => `
          <div class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#161c26] border border-white/[0.08] font-mono text-xs sm:text-sm text-amber-300/95">
            <span aria-hidden="true">${badge.icon}</span>
            <span>${badge.text}</span>
          </div>
        `
      )
      .join('');

    return `
      <div class="min-h-screen flex flex-col bg-[#0d1117] text-[#f8fafc] bg-architectural-grid overflow-x-hidden">
        
        <!-- 1. Barra de Navegación -->
        ${NavbarView.render()}

        <!-- 2. HERO SECTION (Impacto visual y comercial sin palabras técnicas raras) -->
        <main id="inicio" class="flex-grow">
          <section class="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <!-- Métricas de confianza en la cabecera -->
              <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8">
                ${trustBadgesHtml}
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                
                <!-- Columna Izquierda: Titular, Subtítulo y Botones de Acción (7 columnas) -->
                <div class="lg:col-span-7 space-y-6">
                  
                  <!-- Titular Principal -->
                  <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.12] text-[#f8fafc]">
                    Sistemas web y plataformas digitales hechas para que tu negocio <span class="text-[#3b82f6]">facture más.</span>
                  </h1>

                  <!-- Subtítulo Persuasivo -->
                  <p class="text-base md:text-lg font-body font-normal text-slate-300 max-w-2xl leading-relaxed">
                    Desarrollamos recepcionistas automáticos de citas 24/7, catálogos con control de caja diaria y sistemas a medida para que no pierdas horas contestando WhatsApp. Código rápido, seguro y sin plantillas lentas.
                  </p>

                  <!-- Botones de Acción (CTA) -->
                  <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <a
                      href="#demos"
                      class="px-6 py-4 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-[#f8fafc] font-body text-sm md:text-base font-semibold transition-all shadow-lg flex items-center justify-center gap-2 text-center"
                    >
                      <span>Ver Demos en Vivo</span>
                      <span aria-hidden="true">↓</span>
                    </a>

                    <a
                      href="${metadata.whatsappDefaultUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-6 py-4 rounded-xl bg-[#161c26] hover:bg-white/[0.08] text-[#f8fafc] border border-[#d4af37]/50 hover:border-[#d4af37] font-body text-sm md:text-base font-semibold transition-all flex items-center justify-center gap-2 text-center"
                    >
                      <span>Cotizar por WhatsApp</span>
                      <span aria-hidden="true" class="text-amber-300">↗</span>
                    </a>
                  </div>

                  <!-- Respaldo Local -->
                  <div class="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs sm:text-sm text-slate-400">
                    <span>Por Rodrigo Apaza Valle & Alex Darwin Colque</span>
                    <span class="hidden sm:inline text-slate-600">•</span>
                    <span class="text-amber-300/90">Atención directa en Arequipa y todo el Perú</span>
                  </div>
                </div>

                <!-- Columna Derecha: Estructura 3D Interactiva Limpia (Sin textos técnicos encima) -->
                <div class="lg:col-span-5">
                  <div class="nexus-card rounded-2xl p-3 sm:p-4 relative overflow-hidden">
                    <div
                      id="hero-3d-stage"
                      class="w-full h-[300px] sm:h-[380px] rounded-xl bg-[#0d1117]/70 relative cursor-grab active:cursor-grabbing"
                      aria-label="Figura geométrica tridimensional interactiva de Nexus Code Systems"
                    ></div>
                  </div>
                </div>

              </div>

            </div>
          </section>

          <!-- 3. CASOS DE ESTUDIO REALES (DEMOS EN VIVO FUNCIONALES) -->
          ${PortfolioView.render()}

          <!-- 4. PLANES COMERCIALES TRANSPARENTES (CON PRECIOS EN SOLES) -->
          ${PricingPlansView.render()}

          <!-- 5. SOLUCIONES PARA TU NEGOCIO -->
          ${ServicesView.render()}

          <!-- 6. SEGURIDAD Y CONFIANZA EXPLICADA EN SENCILLO + DESARROLLADORES RESPONSABLES -->
          ${DifferentialView.render()}

          <!-- 7. LLAMADO A LA ACCIÓN FINAL -->
          <section class="py-16 sm:py-24 border-t border-white/[0.08]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="nexus-card rounded-2xl p-7 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 reveal-on-scroll">
                <div class="space-y-3 max-w-2xl">
                  <span class="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90">
                    IMPULSA TU LOCAL HOY MISMO
                  </span>
                  <h2 class="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-[#f8fafc]">
                    ¿Listo para tener tu agenda llena y tus cuentas claras?
                  </h2>
                  <p class="text-sm md:text-base font-body leading-relaxed text-slate-300">
                    Escríbenos directamente a nuestro WhatsApp comercial. Te asesoramos sin compromiso para elegir entre el Plan B de S/ 300 o un Sistema Exclusivo a Medida (Plan A).
                  </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
                  <a
                    href="${metadata.whatsappDefaultUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-6 py-4 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-[#f8fafc] font-body text-sm md:text-base font-semibold transition-colors text-center whitespace-nowrap shadow-lg"
                  >
                    Hablar por WhatsApp (+51 967 149 366) ↗
                  </a>
                  <button
                    type="button"
                    data-open-contact
                    class="px-6 py-4 rounded-xl bg-[#0d1117] hover:bg-white/[0.06] text-slate-200 border border-white/[0.12] font-body text-sm md:text-base font-medium transition-colors text-center whitespace-nowrap"
                  >
                    Llenar Formulario Rápido
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <!-- 8. PIE DE PÁGINA CON DATOS CORPORATIVOS Y CUMPLIMIENTO LEGAL (META / WHATSAPP) -->
        <footer class="bg-[#0d1117] border-t border-white/[0.08] py-12">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/[0.08]">
              
              <!-- Identidad y Desarrolladores -->
              <div class="md:col-span-5 space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded bg-[#161c26] border border-white/[0.12] flex items-center justify-center font-mono text-xs font-bold text-[#f8fafc]">
                    NX
                  </div>
                  <span class="font-display font-bold text-lg text-[#f8fafc] tracking-tight">
                    Nexus Code Systems | Arequipa, Perú
                  </span>
                </div>
                <p class="text-sm md:text-base font-body leading-relaxed text-slate-300 max-w-md">
                  Desarrolladores responsables: <strong class="text-[#f8fafc]">Rodrigo Apaza Valle</strong> & <strong class="text-[#f8fafc]">Alex Darwin Colque</strong>.
                </p>
                <div class="space-y-1 pt-1 font-mono text-xs sm:text-sm text-slate-300">
                  <div>
                    Correo oficial:
                    <a href="mailto:nexuscode.systems1@gmail.com" class="text-amber-300 hover:underline">
                      nexuscode.systems1@gmail.com
                    </a>
                  </div>
                  <div>
                    WhatsApp comercial:
                    <a
                      href="${metadata.whatsappDefaultUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-amber-300 hover:underline"
                    >
                      +51  967149366
                    </a>
                  </div>
                </div>
              </div>

              <!-- Accesos Rápidos -->
              <div class="md:col-span-4 space-y-2.5">
                <span class="block text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90">
                  Navegación y Demos en Vivo
                </span>
                <ul class="space-y-2 text-sm md:text-base font-body text-slate-300">
                  <li>
                    <a href="https://mjbarber.netlify.app/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
                      Demo en Vivo: MJ Barber ↗
                    </a>
                  </li>
                  <li>
                    <a href="https://barbali-arequipa.netlify.app/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
                      Demo en Vivo: Barbali Arequipa ↗
                    </a>
                  </li>
                  <li>
                    <a href="https://zheymar-studio-color.netlify.app/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
                      Demo en Vivo: Zheymar Studio Color ↗
                    </a>
                  </li>
                  <li>
                    <a href="#planes" class="hover:text-white transition-colors">
                      Ver Planes (Plan A y Plan B en Soles)
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Enlaces Legales (Cumplimiento Meta y Ley Peruana) -->
              <div class="md:col-span-3 space-y-2.5">
                <span class="block text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90">
                  Información Legal
                </span>
                <ul class="space-y-2.5 text-sm md:text-base font-body text-slate-300">
                  <li>
                    <button
                      type="button"
                      data-open-legal="privacy"
                      class="hover:text-white underline underline-offset-4 transition-colors text-left"
                    >
                      Política de Privacidad
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      data-open-legal="terms"
                      class="hover:text-white underline underline-offset-4 transition-colors text-left"
                    >
                      Términos del Servicio
                    </button>
                  </li>
                  <li>
                    <a
                      href="${metadata.whatsappDefaultUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[#3b82f6] hover:underline font-medium inline-block pt-1"
                    >
                      Escribir a WhatsApp ↗
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 text-center sm:text-left">
              <span>© ${new Date().getFullYear()} Nexus Code Systems — Arequipa, Perú. Todos los derechos reservados.</span>
              <span>Desarrollado por Rodrigo Apaza Valle & Alex Darwin Colque</span>
            </div>
          </div>
        </footer>

        <!-- 9. Modales Accesibles en Español -->
        ${ContactModal.render()}
        ${LegalModals.render()}

      </div>
    `;
  }
}
