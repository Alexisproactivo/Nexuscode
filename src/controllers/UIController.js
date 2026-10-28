/**
 * @file UIController.js
 * @description Controlador MVC de Interfaz de Usuario:
 * - Apertura y cierre de modales `<dialog>` con `showModal()` y fallback de Light-Dismiss (`closedby="any"`)
 * - Pre-selección contextual de Plan (Plan A / Plan B) o Servicio al abrir el modal de contacto
 * - Control del menú móvil responsivo
 * - Filtro interactivo de casos del portafolio (MJ Barber, Barbali, Zheymar Studio Color)
 * - Observador de intersección (`IntersectionObserver`) para animaciones sutiles al hacer scroll
 */

export class UIController {
  static init() {
    UIController.setupDialogs();
    UIController.setupMobileMenu();
    UIController.setupPortfolioFilter();
    UIController.setupScrollReveal();
  }

  /**
   * Configura todos los `<dialog>` nativos (Contacto y Legales),
   * garantizando apertura con `showModal()` y fallback para navegadores sin `closedBy`.
   */
  static setupDialogs() {
    const contactDialog = document.getElementById('contact-lead-dialog');
    const privacyDialog = document.getElementById('legal-privacy-dialog');
    const termsDialog = document.getElementById('legal-terms-dialog');

    const allDialogs = [contactDialog, privacyDialog, termsDialog].filter(Boolean);

    // Fallback obligatorio para navegadores que aún no implementan HTMLDialogElement.prototype.closedBy
    allDialogs.forEach((dialog) => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        dialog.addEventListener('click', (event) => {
          if (event.target !== dialog) return;
          const rect = dialog.getBoundingClientRect();
          const isDialogContent =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;

          if (isDialogContent) return;
          dialog.close();
        });
      }
    });

    // Botones que abren el modal de Contacto con pre-carga contextual
    const openContactButtons = document.querySelectorAll('[data-open-contact]');
    openContactButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!contactDialog) return;

        const presetPlan = btn.getAttribute('data-plan');
        const presetService = btn.getAttribute('data-service');

        const planSelect = document.getElementById('lead-selectedPlan');
        const serviceSelect = document.getElementById('lead-servicePillar');
        const detailsTextarea = document.getElementById('lead-projectDetails');

        if (presetPlan && planSelect) {
          planSelect.value = presetPlan;
        }

        if (presetService && serviceSelect) {
          // Si coincide con una opción del select la selecciona; si es un caso de estudio, pre-llena el detalle
          const matchingOption = Array.from(serviceSelect.options).find(
            (opt) => opt.value === presetService
          );
          if (matchingOption) {
            serviceSelect.value = presetService;
          } else if (detailsTextarea && !detailsTextarea.value.trim()) {
            detailsTextarea.value = `Me interesa una plataforma con enfoque similar a: ${presetService}. `;
          }
        }

        // Cerrar drawer móvil si estaba abierto
        UIController.closeMobileMenu();

        if (!contactDialog.open) {
          contactDialog.showModal();
        }
      });
    });

    // Botones que abren los modales Legales (Privacidad / Términos)
    const openLegalButtons = document.querySelectorAll('[data-open-legal]');
    openLegalButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-open-legal');
        const targetDialog = type === 'privacy' ? privacyDialog : termsDialog;
        if (targetDialog && !targetDialog.open) {
          targetDialog.showModal();
        }
      });
    });

    // Botones de cierre explícito dentro de los modales
    const closeButtons = document.querySelectorAll('[data-close-dialog]');
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const dialogId = btn.getAttribute('data-close-dialog');
        const dialog = document.getElementById(dialogId);
        if (dialog && dialog.open) {
          dialog.close();
        }
      });
    });
  }

  /**
   * Gestiona la apertura/cierre del menú móvil responsivo.
   */
  static setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-navigation-drawer');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        UIController.closeMobileMenu();
      } else {
        UIController.openMobileMenu();
      }
    });

    const mobileLinks = drawer.querySelectorAll('[data-mobile-link]');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        UIController.closeMobileMenu();
      });
    });
  }

  static openMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-navigation-drawer');
    const iconOpen = document.getElementById('icon-menu-open');
    const iconClose = document.getElementById('icon-menu-close');

    if (!toggleBtn || !drawer) return;
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.remove('hidden');
    iconOpen?.classList.add('hidden');
    iconClose?.classList.remove('hidden');
  }

  static closeMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-navigation-drawer');
    const iconOpen = document.getElementById('icon-menu-open');
    const iconClose = document.getElementById('icon-menu-close');

    if (!toggleBtn || !drawer) return;
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.add('hidden');
    iconOpen?.classList.remove('hidden');
    iconClose?.classList.add('hidden');
  }

  /**
   * Permite destacar o filtrar dinámicamente las tarjetas del portafolio
   * (MJ Barber, Barbali, Zheymar Studio Color).
   */
  static setupPortfolioFilter() {
    const tabs = document.querySelectorAll('[data-portfolio-tab]');
    const cards = document.querySelectorAll('[data-portfolio-card]');
    if (!tabs.length || !cards.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-portfolio-tab');

        // Actualizar estado de pestañas
        tabs.forEach((t) => {
          const isActive = t === tab;
          t.setAttribute('aria-selected', isActive ? 'true' : 'false');
          t.className = `portfolio-tab-btn px-4 py-2 rounded-lg font-mono text-xs sm:text-sm uppercase tracking-wider transition-all border ${
            isActive
              ? 'bg-[#3b82f6] text-[#f8fafc] border-[#3b82f6]'
              : 'bg-[#161c26] text-slate-300 border-white/[0.08] hover:border-white/20'
          }`;
        });

        // Mostrar u otorgar foco al caso seleccionado
        cards.forEach((card) => {
          const cardId = card.getAttribute('data-portfolio-card');
          if (targetId === 'all') {
            card.classList.remove('hidden', 'lg:col-span-3');
            card.classList.add('ring-0');
          } else if (cardId === targetId) {
            card.classList.remove('hidden');
            card.classList.add('ring-1', 'ring-[#d4af37]/60');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /**
   * Activa la aparición progresiva de bloques al hacer scroll.
   */
  static setupScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }
}
