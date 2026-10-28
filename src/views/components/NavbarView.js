/**
 * @file NavbarView.js
 * @description Barra de navegación comercial clara, en español y 100% adaptada a celulares.
 */

import { ServiceCatalogModel } from "../../models/ServiceCatalogModel.js";

export class NavbarView {
  static render() {
    const metadata = ServiceCatalogModel.getAgencyMetadata();

    return `
      <header class="sticky top-0 z-40 w-full bg-[#0d1117]/95 backdrop-blur-md border-b border-white/[0.08]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <!-- Identidad de Marca -->
<a href="#inicio" class="group flex items-center gap-3 focus:outline-none">
  <!-- El Contenedor del Logo de Nexus -->
  <div class="relative w-10 h-10 shrink-0 flex items-center justify-center">
    <!-- El logo oficial "N" de Nexus sin bordes extraños -->
    <img 
      src="/favicon.png" 
      alt="Nexus Code Systems" 
      class="w-9 h-9 object-contain transform group-hover:scale-105 transition-transform duration-300"
    />
    <!-- El pequeño indicador de origen -->
    <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#d4af37] border-2 border-[#161c26]"></span>
  </div>

  <!-- El Texto de Marca -->
  <div class="flex flex-col">
    <span class="font-display font-bold text-base sm:text-lg text-[#f8fafc] tracking-tight whitespace-nowrap leading-none">
      NEXUS CODE <span class="text-[#3b82f6]">SYSTEMS</span>
    </span>
    <span class="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-300/90 mt-1.5 whitespace-nowrap leading-none flex items-center gap-1">
      AREQUIPA, PERÚ
    </span>
  </div>
</a>

          <!-- Enlaces de Navegación en Escritorio -->
          <nav aria-label="Navegación Principal" class="hidden lg:flex items-center gap-8">
            <a href="#demos" class="font-body text-sm md:text-base font-medium text-slate-300 hover:text-[#f8fafc] transition-colors whitespace-nowrap">
              Demos en Vivo
            </a>
            <a href="#planes" class="font-body text-sm md:text-base font-medium text-slate-300 hover:text-[#f8fafc] transition-colors whitespace-nowrap">
              Planes y Precios
            </a>
            <a href="#soluciones" class="font-body text-sm md:text-base font-medium text-slate-300 hover:text-[#f8fafc] transition-colors whitespace-nowrap">
              Soluciones
            </a>
            <a href="#seguridad" class="font-body text-sm md:text-base font-medium text-slate-300 hover:text-[#f8fafc] transition-colors whitespace-nowrap">
              Seguridad y Confianza
            </a>
          </nav>

          <!-- Botón Directo a WhatsApp en Escritorio -->
          <div class="hidden lg:flex items-center gap-3">
            <a
              href="${metadata.whatsappDefaultUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-[#f8fafc] font-body text-sm font-semibold transition-all shadow-sm whitespace-nowrap flex items-center gap-2"
            >
              <span>Cotizar por WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <!-- Botón de Menú para Celulares -->
          <button
            type="button"
            id="mobile-menu-toggle"
            aria-expanded="false"
            aria-controls="mobile-navigation-drawer"
            aria-label="Abrir menú de navegación"
            class="lg:hidden p-2.5 rounded-lg bg-[#161c26] border border-white/[0.08] text-slate-200 hover:text-white hover:border-white/20 transition-colors"
          >
            <svg id="icon-menu-open" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h12" />
            </svg>
            <svg id="icon-menu-close" class="w-6 h-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Menú Desplegable en Celulares -->
        <div
          id="mobile-navigation-drawer"
          class="hidden lg:hidden bg-[#161c26] border-b border-white/[0.08] px-4 pt-3 pb-6 space-y-4"
        >
          <div class="flex flex-col space-y-1.5">
            <a href="#demos" data-mobile-link class="px-3 py-2.5 rounded-md font-body text-base font-medium text-slate-200 hover:bg-white/[0.04]">
              Proyectos y Demos Interactivas
            </a>
            <a href="#planes" data-mobile-link class="px-3 py-2.5 rounded-md font-body text-base font-medium text-slate-200 hover:bg-white/[0.04]">
              Planes Claros en Soles (S/)
            </a>
            <a href="#soluciones" data-mobile-link class="px-3 py-2.5 rounded-md font-body text-base font-medium text-slate-200 hover:bg-white/[0.04]">
              ¿Qué incluye tu sistema?
            </a>
            <a href="#seguridad" data-mobile-link class="px-3 py-2.5 rounded-md font-body text-base font-medium text-slate-200 hover:bg-white/[0.04]">
              Seguridad y Confianza
            </a>
          </div>

          <div class="pt-3 border-t border-white/[0.08] flex flex-col gap-3">
            <a
              href="${metadata.whatsappDefaultUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-3 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-[#f8fafc] font-body text-sm font-semibold text-center"
            >
              Cotizar por WhatsApp (+51 961 712 546)
            </a>
          </div>
        </div>
      </header>
    `;
  }
}
