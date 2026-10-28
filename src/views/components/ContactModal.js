/**
 * @file ContactModal.js
 * @description Modal de contacto claro y en español, conectado a WhatsApp (+51 961712546).
 */

export class ContactModal {
  static render() {
    return `
      <dialog
        id="contact-lead-dialog"
        closedby="any"
        aria-labelledby="contact-dialog-title"
        class="nexus-dialog"
      >
        <div class="p-6 sm:p-8">
          <!-- Cabecera del Modal -->
          <div class="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-white/[0.08]">
            <div>
              <span class="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90 block mb-1">
                ATENCIÓN DIRECTA EN AREQUIPA Y PERÚ
              </span>
              <h2 id="contact-dialog-title" class="text-xl sm:text-2xl font-display font-bold text-[#f8fafc] tracking-tight">
                Cotiza tu Plataforma por WhatsApp
              </h2>
            </div>

            <button
              type="button"
              data-close-dialog="contact-lead-dialog"
              aria-label="Cerrar ventana de contacto"
              class="p-2 rounded-lg bg-[#0d1117] border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20 transition-colors"
            >
              ✕
            </button>
          </div>

          <!-- Formulario Claro en Español -->
          <form id="nexus-contact-form" novalidate class="space-y-5">
            
            <!-- Fila 1: Nombre y Negocio -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="nexus-field">
                <label for="lead-fullName" class="block font-body text-xs sm:text-sm font-semibold text-slate-200 mb-1">
                  Tu Nombre y Apellido <span class="text-amber-300">*</span>
                </label>
                <span id="hint-fullName" class="block font-mono text-[11px] text-slate-400 mb-1.5">
                  ¿Con quién tenemos el gusto?
                </span>
                <input
                  type="text"
                  id="lead-fullName"
                  name="fullName"
                  required
                  minlength="3"
                  maxlength="80"
                  autocomplete="name"
                  placeholder="Ej. Carlos Mendoza"
                  aria-describedby="hint-fullName"
                  aria-errormessage="err-fullName"
                  class="nexus-input w-full px-3.5 py-2.5 rounded-lg bg-[#0d1117] border border-white/[0.12] text-[#f8fafc] placeholder-slate-500 font-body text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                />
                <div id="err-fullName" class="nexus-error-msg items-center gap-1.5 mt-1.5 text-xs font-body text-red-400">
                  <span aria-hidden="true">✕</span>
                  <span>Por favor ingresa tu nombre y apellido.</span>
                </div>
              </div>

              <div class="nexus-field">
                <label for="lead-businessName" class="block font-body text-xs sm:text-sm font-semibold text-slate-200 mb-1">
                  Nombre de tu Negocio o Rubro <span class="text-amber-300">*</span>
                </label>
                <span id="hint-businessName" class="block font-mono text-[11px] text-slate-400 mb-1.5">
                  Ej. Barbería, Salón, Clínica, Tienda
                </span>
                <input
                  type="text"
                  id="lead-businessName"
                  name="businessName"
                  required
                  minlength="2"
                  maxlength="80"
                  autocomplete="organization"
                  placeholder="Ej. Barbería Imperial"
                  aria-describedby="hint-businessName"
                  aria-errormessage="err-businessName"
                  class="nexus-input w-full px-3.5 py-2.5 rounded-lg bg-[#0d1117] border border-white/[0.12] text-[#f8fafc] placeholder-slate-500 font-body text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                />
                <div id="err-businessName" class="nexus-error-msg items-center gap-1.5 mt-1.5 text-xs font-body text-red-400">
                  <span aria-hidden="true">✕</span>
                  <span>Indica el nombre de tu negocio o actividad.</span>
                </div>
              </div>
            </div>

            <!-- Fila 2: Celular y Plan -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="nexus-field">
                <label for="lead-phone" class="block font-body text-xs sm:text-sm font-semibold text-slate-200 mb-1">
                  Tu Celular / WhatsApp <span class="text-amber-300">*</span>
                </label>
                <span id="hint-phone" class="block font-mono text-[11px] text-slate-400 mb-1.5">
                  9 dígitos (Ejemplo: 961712546)
                </span>
                <div class="relative flex items-center">
                  <span class="px-3 py-2.5 rounded-l-lg bg-[#161c26] border border-r-0 border-white/[0.12] font-mono text-xs text-amber-300/90 select-none">
                    +51
                  </span>
                  <input
                    type="tel"
                    id="lead-phone"
                    name="phone"
                    inputmode="numeric"
                    required
                    pattern="9[0-9]{8}"
                    maxlength="9"
                    autocomplete="tel-national"
                    placeholder="961712546"
                    aria-describedby="hint-phone"
                    aria-errormessage="err-phone"
                    class="nexus-input w-full px-3.5 py-2.5 rounded-r-lg bg-[#0d1117] border border-white/[0.12] text-[#f8fafc] placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                  />
                </div>
                <div id="err-phone" class="nexus-error-msg items-center gap-1.5 mt-1.5 text-xs font-body text-red-400">
                  <span aria-hidden="true">✕</span>
                  <span>Ingresa un celular válido de 9 dígitos.</span>
                </div>
              </div>

              <div class="nexus-field">
                <label for="lead-selectedPlan" class="block font-body text-xs sm:text-sm font-semibold text-slate-200 mb-1">
                  Plan de Interés
                </label>
                <span id="hint-plan" class="block font-mono text-[11px] text-slate-400 mb-1.5">
                  Elige el que mejor se ajuste a tu local
                </span>
                <select
                  id="lead-selectedPlan"
                  name="selectedPlan"
                  aria-describedby="hint-plan"
                  class="w-full px-3.5 py-2.5 rounded-lg bg-[#0d1117] border border-white/[0.12] text-[#f8fafc] font-body text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                >
                  <option value="PLAN B — Página Ágil y Prediseñada (S/ 300)">Plan B — Página Ágil y Prediseñada (S/ 300)</option>
                  <option value="PLAN A — Sistema Exclusivo a Medida">Plan A — Sistema Exclusivo a Medida (S/ 1,200 - S/ 1,500+)</option>
                  <option value="Deseo orientación para elegir el plan ideal">Deseo orientación para elegir mi plan</option>
                </select>
              </div>
            </div>

            <!-- Fila 3: Qué necesitas -->
            <div class="nexus-field">
              <label for="lead-projectDetails" class="block font-body text-xs sm:text-sm font-semibold text-slate-200 mb-1">
                ¿Qué te gustaría implementar en tu negocio? <span class="text-amber-300">*</span>
              </label>
              <span id="hint-details" class="block font-mono text-[11px] text-slate-400 mb-1.5">
                Cuéntanos brevemente qué servicios ofreces o qué demo te gustó más
              </span>
              <textarea
                id="lead-projectDetails"
                name="projectDetails"
                rows="3"
                required
                minlength="8"
                maxlength="500"
                placeholder="Ej. Tengo una barbería en Arequipa y me gustaría el sistema de citas 24/7 con cierre de caja diaria como la demo de MJ Barber..."
                aria-describedby="hint-details"
                aria-errormessage="err-details"
                class="nexus-input w-full px-3.5 py-2.5 rounded-lg bg-[#0d1117] border border-white/[0.12] text-[#f8fafc] placeholder-slate-500 font-body text-sm focus:outline-none focus:border-[#3b82f6] transition-colors resize-none"
              ></textarea>
              <div id="err-details" class="nexus-error-msg items-center gap-1.5 mt-1.5 text-xs font-body text-red-400">
                <span aria-hidden="true">✕</span>
                <span>Cuéntanos brevemente lo que necesitas (mínimo 8 letras).</span>
              </div>
            </div>

            <!-- Mensaje de Estado -->
            <div
              id="contact-form-feedback"
              role="status"
              aria-live="polite"
              class="hidden p-3.5 rounded-lg font-body text-xs sm:text-sm"
            ></div>

            <!-- Botón de Envío Directo a WhatsApp -->
            <div class="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p class="font-body text-xs text-slate-400 leading-relaxed">
                Tus datos están protegidos según nuestra
                <button type="button" data-open-legal="privacy" class="text-[#3b82f6] hover:underline">Política de Privacidad</button>
                (Ley N° 29733 — Perú).
              </p>

              <button
                type="submit"
                class="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-[#f8fafc] font-body text-sm font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
              >
                <span>Enviar a WhatsApp (+51 961 712 546)</span>
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </form>
        </div>
      </dialog>
    `;
  }
}
