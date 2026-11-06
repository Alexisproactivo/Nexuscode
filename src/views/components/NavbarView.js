/**
 * @file NavbarView.js
 * @description Barra de navegación flotante tipo vidrio: se oculta al bajar, aparece al subir,
 * con barra de progreso de lectura y menú móvil a pantalla completa.
 */

import { ServiceCatalogModel } from '../../models/ServiceCatalogModel.js';

export class NavbarView {
  static render() {
    const metadata = ServiceCatalogModel.getAgencyMetadata();
    const links = [
      { href: '#demos', label: 'Demos en Vivo', mobile: 'Proyectos y Demos' },
      { href: '#planes', label: 'Planes', mobile: 'Planes en Soles (S/)' },
      { href: '#soluciones', label: 'Soluciones', mobile: '¿Qué incluye tu sistema?' },
      { href: '#seguridad', label: 'Confianza', mobile: 'Seguridad y Equipo' }
    ];

    return `
      <header id="nx-header" class="fixed top-0 inset-x-0 z-50 border-b border-transparent">
        <div id="nx-progress" class="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-300 via-blue-500 to-violet-500"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

          <a href="#inicio" class="group flex items-center gap-3 focus:outline-none" data-cursor-hover>
            <div class="relative w-10 h-10 shrink-0 grid place-items-center">
              <span class="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <img src="/favicon.png" alt="Nexus Code Systems" class="relative w-9 h-9 object-contain transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
            </div>
            <div class="flex flex-col">
              <span class="font-display font-bold text-base sm:text-lg tracking-tight whitespace-nowrap leading-none">
                NEXUS<span class="text-gradient">CODE</span> <span class="font-medium text-slate-300">SYSTEMS</span>
              </span>
              <span class="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/70 mt-1.5 leading-none">
                Arequipa · Perú
              </span>
            </div>
          </a>

          <nav aria-label="Navegación Principal" class="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] backdrop-blur-md">
            ${links
              .map(
                (l) => `
              <a href="${l.href}" class="nav-link px-4 py-2 rounded-full font-body text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors whitespace-nowrap">
                ${l.label}
              </a>`
              )
              .join('')}
          </nav>

          <div class="hidden lg:flex items-center gap-3">
            <a
              href="${metadata.whatsappDefaultUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="magnetic btn-primary px-5 py-2.5 rounded-full font-body text-sm font-semibold whitespace-nowrap flex items-center gap-2"
            >
              <span class="live-dot w-2 h-2 rounded-full bg-emerald-300"></span>
              <span>Cotizar por WhatsApp</span>
            </a>
          </div>

          <button
            type="button"
            id="mobile-menu-toggle"
            aria-expanded="false"
            aria-controls="mobile-navigation-drawer"
            aria-label="Abrir menú de navegación"
            class="lg:hidden relative z-50 p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-200"
          >
            <svg id="icon-menu-open" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h10" />
            </svg>
            <svg id="icon-menu-close" class="w-6 h-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Menú móvil a pantalla completa -->
      <div
        id="mobile-navigation-drawer"
        class="hidden lg:hidden fixed inset-0 z-[45] bg-[#05070d]/95 backdrop-blur-xl px-6 pt-28 pb-10 flex-col justify-between"
      >
        <div class="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <nav class="relative flex flex-col gap-2">
          ${links
            .map(
              (l, i) => `
            <a href="${l.href}" data-mobile-link class="mobile-link flex items-baseline gap-4 py-3 border-b border-white/[0.06]">
              <span class="font-mono text-xs text-cyan-300/70">0${i + 1}</span>
              <span class="font-display text-3xl font-bold tracking-tight">${l.mobile}</span>
            </a>`
            )
            .join('')}
        </nav>
        <a
          href="${metadata.whatsappDefaultUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="mobile-link relative btn-primary w-full py-4 rounded-2xl font-body text-base font-semibold text-center"
        >
          Cotizar por WhatsApp (${metadata.phoneDisplay})
        </a>
      </div>
    `;
  }
}
