/**
 * @file ContactController.js
 * @description Controlador MVC para la validación del formulario de prospectos,
 * sincronización de accesibilidad (`aria-invalid` con `:user-invalid`),
 * sanitización mediante `ContactLeadModel` y apertura de WhatsApp con URI codificada.
 */

import { ContactLeadModel } from '../models/ContactLeadModel.js';

export class ContactController {
  static init() {
    const form = document.getElementById('nexus-contact-form');
    if (!form) return;

    // Restringir el input telefónico a dígitos numéricos en tiempo real
    const phoneInput = document.getElementById('lead-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/\D/g, '').slice(0, 9);
        if (e.target.value !== cleaned) {
          e.target.value = cleaned;
        }
      });
    }

    // Sincronizar aria-invalid con :user-invalid y fallback WeakMap para navegadores antiguos
    ContactController.setupUserInvalidSync(form);

    // Manejo del envío del formulario
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      ContactController.handleSubmit(form);
    });
  }

  /**
   * Sincroniza `aria-invalid` con el estado visual `:user-invalid`
   * e incluye fallback para motores sin soporte de `:user-invalid`.
   * @param {HTMLFormElement} form
   */
  static setupUserInvalidSync(form) {
    const dirtyState = new WeakMap();
    const supportsUserInvalid =
      typeof CSS !== 'undefined' && CSS.supports && CSS.supports('selector(:user-invalid)');

    const syncAria = (el) => {
      if (!el || typeof el.checkValidity !== 'function') return;
      if (supportsUserInvalid) {
        const isUserInvalid = el.matches(':user-invalid');
        el.setAttribute('aria-invalid', isUserInvalid ? 'true' : 'false');
      } else {
        const isValid = el.checkValidity();
        el.classList.toggle('user-invalid-fallback', !isValid);
        el.classList.toggle('user-valid-fallback', isValid);
        el.setAttribute('aria-invalid', !isValid ? 'true' : 'false');
      }
    };

    form.addEventListener(
      'blur',
      (e) => {
        const input = e.target;
        if (!input || !input.checkValidity) return;
        const state = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
        state.hasBlurred = true;
        dirtyState.set(input, state);
        syncAria(input);
      },
      true
    );

    form.addEventListener('input', (e) => {
      const input = e.target;
      if (!input || !input.checkValidity) return;
      const state = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
      state.hasInteracted = true;
      dirtyState.set(input, state);
      if (input.hasAttribute('aria-invalid') || state.hasBlurred) {
        syncAria(input);
      }
    });
  }

  /**
   * Procesa los datos del formulario a través del Modelo `ContactLeadModel`.
   * @param {HTMLFormElement} form
   */
  static handleSubmit(form) {
    const formData = new FormData(form);
    const rawPayload = {
      fullName: formData.get('fullName') || '',
      businessName: formData.get('businessName') || '',
      phone: formData.get('phone') || '',
      selectedPlan: formData.get('selectedPlan') || '',
      servicePillar: formData.get('servicePillar') || '',
      projectDetails: formData.get('projectDetails') || ''
    };

    const leadModel = new ContactLeadModel(rawPayload);
    const validation = leadModel.validate();

    const feedbackBox = document.getElementById('contact-form-feedback');

    if (!validation.isValid) {
      // Marcar campos inválidos y enfocar el primero con error
      const firstErrorFieldKey = Object.keys(validation.errors)[0];
      const firstErrorMessage = validation.errors[firstErrorFieldKey];

      if (feedbackBox) {
        feedbackBox.className =
          'p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 font-body text-xs sm:text-sm flex items-center gap-2';
        feedbackBox.textContent = `Verifica los datos: ${firstErrorMessage}`;
      }

      const targetInput = form.querySelector(`[name="${firstErrorFieldKey}"]`);
      if (targetInput) {
        targetInput.classList.add('user-invalid-fallback');
        targetInput.setAttribute('aria-invalid', 'true');
        targetInput.focus();
      }
      return;
    }

    // Éxito: Limpiar alertas, generar URI codificada hacia WhatsApp y abrir en nueva pestaña segura
    if (feedbackBox) {
      feedbackBox.className =
        'p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-body text-xs sm:text-sm flex items-center gap-2';
      feedbackBox.textContent =
        'Solicitud validada y sanitizada. Abriendo canal directo con Dirección Técnica en WhatsApp...';
    }

    const whatsappUrl = leadModel.toWhatsAppDeepLink();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Cerrar modal suavemente después de 900ms y reiniciar estado
    setTimeout(() => {
      const dialog = document.getElementById('contact-lead-dialog');
      if (dialog && dialog.open) {
        dialog.close();
      }
      form.reset();
      if (feedbackBox) {
        feedbackBox.className = 'hidden';
      }
    }, 900);
  }
}
