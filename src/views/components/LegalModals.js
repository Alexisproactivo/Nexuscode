/**
 * @file LegalModals.js
 * @description Modales accesibles en español claro:
 * 1. "Política de Privacidad" (garantizando el cuidado de los datos según la Ley N° 29733 de Perú).
 * 2. "Términos del Servicio" (reglas claras de atención, pagos y soporte).
 */

export class LegalModals {
  static render() {
    return `
      <!-- MODAL 1: POLÍTICA DE PRIVACIDAD -->
      <dialog
        id="legal-privacy-dialog"
        closedby="any"
        aria-labelledby="privacy-dialog-title"
        class="nexus-dialog"
      >
        <div class="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-white/[0.08]">
            <div>
              <span class="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90 block mb-1">
                LEY DE PROTECCIÓN DE DATOS PERSONALES N° 29733 — PERÚ
              </span>
              <h2 id="privacy-dialog-title" class="text-xl sm:text-2xl font-display font-bold text-[#f8fafc]">
                Política de Privacidad
              </h2>
            </div>
            <button
              type="button"
              data-close-dialog="legal-privacy-dialog"
              aria-label="Cerrar Política de Privacidad"
              class="p-2 rounded-lg bg-[#0d1117] border border-white/[0.08] text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div class="space-y-4 text-sm md:text-base font-body leading-relaxed text-slate-300">
            <p>
              <strong class="text-[#f8fafc]">1. Responsables del Cuidado de tus Datos:</strong>
              Nexus Code Systems, con sede en Arequipa, Perú, dirigida por los desarrolladores responsables <strong class="text-[#f8fafc]">Rodrigo Apaza Valle</strong> y <strong class="text-[#f8fafc]">Alex Darwin Colque</strong>, respeta y protege la privacidad de cada cliente y negocio que nos contacta.
            </p>
            <p>
              <strong class="text-[#f8fafc]">2. Cumplimiento de la Ley Peruana N° 29733:</strong>
              Tratamos tu información personal en estricto cumplimiento de la Ley N° 29733 (Ley de Protección de Datos Personales del Perú) y las normas de mensajería comercial de WhatsApp / Meta.
            </p>
            <p>
              <strong class="text-[#f8fafc]">3. ¿Para qué usamos los datos que nos brindas?:</strong>
              El nombre, teléfono celular y datos de tu local se utilizan únicamente para enviarte la cotización solicitada, mostrarte demos reales y brindarte soporte sobre tu página o sistema web.
            </p>
            <p>
              <strong class="text-[#f8fafc]">4. Privacidad Total de tu Negocio:</strong>
              Nunca vendemos, alquilamos ni compartimos tu número de teléfono, tu lista de clientes ni los reportes de tus ganancias diarias con terceros.
            </p>
            <p>
              <strong class="text-[#f8fafc]">5. Contacto Oficial para Consultas:</strong>
              Puedes solicitar la actualización o eliminación de tus datos de contacto en cualquier momento escribiendo al correo oficial <strong class="text-[#f8fafc]">nexuscode.systems1@gmail.com</strong> o a nuestro WhatsApp comercial <strong class="text-[#f8fafc]">+51 961 712 546</strong>.
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-white/[0.08] flex justify-end">
            <button
              type="button"
              data-close-dialog="legal-privacy-dialog"
              class="px-5 py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-[#f8fafc] font-body text-sm font-semibold"
            >
              Entendido y Cerrar
            </button>
          </div>
        </div>
      </dialog>

      <!-- MODAL 2: TÉRMINOS DEL SERVICIO -->
      <dialog
        id="legal-terms-dialog"
        closedby="any"
        aria-labelledby="terms-dialog-title"
        class="nexus-dialog"
      >
        <div class="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          <div class="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-white/[0.08]">
            <div>
              <span class="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-300/90 block mb-1">
                REGLAS CLARAS DE ATENCIÓN Y SOPORTE
              </span>
              <h2 id="terms-dialog-title" class="text-xl sm:text-2xl font-display font-bold text-[#f8fafc]">
                Términos del Servicio
              </h2>
            </div>
            <button
              type="button"
              data-close-dialog="legal-terms-dialog"
              aria-label="Cerrar Términos del Servicio"
              class="p-2 rounded-lg bg-[#0d1117] border border-white/[0.08] text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div class="space-y-4 text-sm md:text-base font-body leading-relaxed text-slate-300">
            <p>
              <strong class="text-[#f8fafc]">1. Servicios Ofrecidos:</strong>
              Nexus Code Systems desarrolla páginas web ágiles prediseñadas (Plan B) y sistemas web exclusivos a medida (Plan A) para negocios en Arequipa y todo el Perú.
            </p>
            <p>
              <strong class="text-[#f8fafc]">2. Condiciones de Pago y Plazos:</strong>
              • En el <strong>Plan B (S/ 300)</strong>, el proyecto inicia con S/ 100 de anticipo y los S/ 200 restantes se abonan contra la entrega final verificada (plazo de 3 a 5 días hábiles).<br />
              • En el <strong>Plan A (Desde S/ 1,200 a S/ 1,500+)</strong>, el pago se realiza en 3 partes: S/ 200 al firmar el contrato, S/ 300 al aprobar la maqueta inicial y el saldo final al entregar el sistema funcionando al 100% (plazo de 10 a 20 días hábiles).
            </p>
            <p>
              <strong class="text-[#f8fafc]">3. Soporte Técnico y Mantenimiento:</strong>
              Ambos planes cuentan con 1 año completo de soporte técnico y asesoría directa por nuestros desarrolladores responsables. El alojamiento web y mantenimiento continuo posterior tiene una tarifa transparente de S/ 30 al mes o S/ 300 al año.
            </p>
            <p>
              <strong class="text-[#f8fafc]">4. Propiedad de la Información del Cliente:</strong>
              El cliente es único dueño de su marca, fotografías, catálogo de precios, cartera de clientes y registros de ventas generados en su plataforma.
            </p>
            <p>
              <strong class="text-[#f8fafc]">5. Canales Oficiales de Atención:</strong>
              Toda coordinación oficial se realiza mediante el correo <strong class="text-[#f8fafc]">nexuscode.systems1@gmail.com</strong> y el número de WhatsApp <strong class="text-[#f8fafc]">+51 961 712 546</strong> en Arequipa, Perú.
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-white/[0.08] flex justify-end">
            <button
              type="button"
              data-close-dialog="legal-terms-dialog"
              class="px-5 py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-[#f8fafc] font-body text-sm font-semibold"
            >
              Cerrar Términos
            </button>
          </div>
        </div>
      </dialog>
    `;
  }
}
