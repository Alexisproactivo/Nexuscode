/**
 * @file ContactLeadModel.js
 * @description Modelo para solicitudes comerciales de clientes en Perú.
 * Limpia textos de caracteres extraños y valida celulares peruanos de 9 dígitos.
 */

export class ContactLeadModel {
  /**
   * Número oficial de WhatsApp comercial de Nexus Code Systems (+51 961712546)
   */
  static WHATSAPP_CORPORATE_NUMBER = '51967149366';

  /**
   * Genera un enlace directo a WhatsApp con un mensaje claro en español.
   * @param {string} customMessage
   * @returns {string}
   */
  static createDirectWhatsAppLink(
    customMessage = 'Hola Nexus Code Systems, vi su página web y deseo información para digitalizar mi negocio.'
  ) {
    return `https://wa.me/${ContactLeadModel.WHATSAPP_CORPORATE_NUMBER}?text=${encodeURIComponent(customMessage)}`;
  }

  /**
   * @param {Object} rawData
   * @param {string} rawData.fullName
   * @param {string} rawData.businessName
   * @param {string} rawData.phone
   * @param {string} rawData.selectedPlan
   * @param {string} rawData.servicePillar
   * @param {string} rawData.projectDetails
   */
  constructor(rawData = {}) {
    this.fullName = ContactLeadModel.cleanText(rawData.fullName || '', 80);
    this.businessName = ContactLeadModel.cleanText(rawData.businessName || '', 80);
    this.phone = ContactLeadModel.normalizePeruvianPhone(rawData.phone || '');
    this.selectedPlan = ContactLeadModel.cleanText(
      rawData.selectedPlan || 'Plan B - Página Ágil y Prediseñada (S/ 300)',
      100
    );
    this.servicePillar = ContactLeadModel.cleanText(
      rawData.servicePillar || 'Sistema de Citas 24/7 y Control de Caja',
      100
    );
    this.projectDetails = ContactLeadModel.cleanText(rawData.projectDetails || '', 500);
  }

  /**
   * Limpia el texto evitando etiquetas o enlaces maliciosos.
   * @param {string} input
   * @param {number} maxLength
   * @returns {string}
   */
  static cleanText(input, maxLength = 250) {
    if (typeof input !== 'string') return '';

    return input
      .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/(?:javascript|data|vbscript)\s*:/gi, '')
      .replace(/[<>"'`]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, maxLength);
  }

  /**
   * Extrae únicamente los 9 dígitos del celular peruano.
   * @param {string} rawPhone
   * @returns {string}
   */
  static normalizePeruvianPhone(rawPhone) {
    if (typeof rawPhone !== 'string') return '';
    let digits = rawPhone.replace(/\D/g, '');
    if (digits.startsWith('51') && digits.length === 11) {
      digits = digits.slice(2);
    }
    return digits.slice(0, 9);
  }

  /**
   * Verifica que sea un número móvil válido en Perú (9 dígitos empezando con 9).
   * @param {string} phone
   * @returns {boolean}
   */
  static isValidPeruvianPhone(phone) {
    const clean = ContactLeadModel.normalizePeruvianPhone(phone);
    return /^9\d{8}$/.test(clean);
  }

  /**
   * Valida todos los campos del formulario y devuelve mensajes claros.
   */
  validate() {
    const errors = {};

    if (!this.fullName || this.fullName.length < 3) {
      errors.fullName = 'Por favor escribe tu nombre y apellido.';
    }

    if (!this.businessName || this.businessName.length < 2) {
      errors.businessName = 'Por favor indica el nombre de tu negocio o rubro.';
    }

    if (!ContactLeadModel.isValidPeruvianPhone(this.phone)) {
      errors.phone = 'Ingresa un celular válido de 9 dígitos (ejemplo: 961712546).';
    }

    if (!this.projectDetails || this.projectDetails.length < 8) {
      errors.projectDetails = 'Cuéntanos brevemente qué necesitas para tu negocio.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Construye el enlace de WhatsApp listo para enviar a +51 961712546.
   * @returns {string}
   */
  toWhatsAppDeepLink() {
    const lines = [
      'Hola *Nexus Code Systems*, deseo cotizar una plataforma para mi negocio:',
      '',
      `• *Nombre:* ${this.fullName}`,
      `• *Negocio / Rubro:* ${this.businessName}`,
      `• *Mi Celular:* +51 ${this.phone}`,
      `• *Plan elegido:* ${this.selectedPlan}`,
      `• *Tipo de sistema:* ${this.servicePillar}`,
      '',
      `*Lo que necesito:*`,
      `${this.projectDetails}`
    ];

    return `https://wa.me/${ContactLeadModel.WHATSAPP_CORPORATE_NUMBER}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
  }
}
