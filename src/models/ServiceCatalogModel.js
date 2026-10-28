/**
 * @file ServiceCatalogModel.js
 * @description Datos comerciales en español claro, orientados a dueños de negocios en Arequipa y todo el Perú.
 */

export class ServiceCatalogModel {
  /**
   * Datos de confianza del Hero y de la Agencia
   */
  static getAgencyMetadata() {
    return {
      name: "Nexus Code Systems",
      city: "Arequipa, Perú",
      email: "nexuscode.systems1@gmail.com",
      phoneDisplay: "+51 967 149 366",
      phoneRaw: "51967149366",
      whatsappDefaultUrl:
        "https://wa.me/51967149366?text=" +
        encodeURIComponent(
          "Hola Nexus Code Systems, vi su página web y quiero cotizar un sistema para mi negocio.",
        ),
      trustBadges: [
        {
          icon: "",
          text: "Carga instantánea (menos de 1 segundo)",
        },
        {
          icon: "",
          text: "100% adaptado a pantallas de celular",
        },
        {
          icon: "",
          text: "Ingeniería de software local desde Arequipa",
        },
      ],
      founders: [
        {
          id: "rodrigo",
          name: "Rodrigo Apaza Valle",
          role: "SOCIO FUNDADOR & ARQUITECTO DE SOFTWARE",
          photoUrl: "/rodrigo.jpg",
          initial: "R",
          accentHex: "#3b82f6",
          description:
            "Especialista en plataformas comerciales rápidas, sistemas de reservas automatizadas y paneles de control fáciles de usar desde cualquier celular.",
        },
        {
          id: "alex",
          name: "Alex Darwin Colque",
          role: "SOCIO FUNDADOR & INGENIERO DE SISTEMAS",
          photoUrl: "/alex.jpg",
          initial: "A",
          accentHex: "#d4af37",
          description:
            "Especialista en automatización de negocios, catálogos dinámicos con cierre de caja diaria y puesta en marcha segura para empresas locales.",
        },
      ],
    };
  }

  /**
   * 4 Soluciones Comerciales (Explicadas con beneficios claros de negocio)
   */
  static getServices() {
    return [
      {
        id: "citas-automaticas",
        tag: "AHORRA TIEMPO EN RECEPCIÓN",
        title: "Recepcionista Automático de Citas 24/7",
        description:
          "Tus clientes eligen el servicio, ven los horarios libres y reservan desde su celular a cualquier hora del día, sin que tengas que dejar de atender para responder mensajes.",
        benefits: [
          "El cliente escoge servicio, profesional y hora disponible en segundos",
          "Te llega el resumen listo a tu WhatsApp para confirmar con un toque",
          "Evita cruces de horarios, confusiones y clientes que se van a la competencia",
        ],
      },
      {
        id: "catalogo-y-caja",
        tag: "CONTROL DE VENTAS DIARIAS",
        title: "Catálogos con Precios en Soles y Caja Diaria",
        description:
          "Muestra tus servicios o productos con fotos reales y precios claros. Además, cuenta con un panel privado para registrar cada atención y saber exactamente cuánto ganaste en el día.",
        benefits: [
          "Lista de precios ordenada y fácil de leer en cualquier teléfono",
          'Botón privado "Finalizar atención" para sumar tus ingresos del día con un clic',
          "Cero comisiones por venta: todo el dinero entra directo a tu negocio",
        ],
      },
      {
        id: "paginas-comerciales",
        tag: "MÁS CLIENTES EN TU LOCAL",
        title: "Páginas Web Comerciales que Dan Confianza",
        description:
          "Haz que tu negocio destaque en Arequipa con una página moderna que abre en menos de 1 segundo, muestra tus mejores trabajos y guía a los clientes hasta la puerta de tu local.",
        benefits: [
          "Mapa interactivo con Google Maps para que te ubiquen sin perderse",
          "Diseño elegante con tu propio logo, colores y fotografías reales",
          "Abre al instante incluso con datos móviles en cualquier celular",
        ],
      },
      {
        id: "sistemas-a-medida",
        tag: "PARA NEGOCIOS EN EXPANSIÓN",
        title: "Sistemas Web a Medida para tu Operación",
        description:
          "Si tienes una clínica, academia, ferretería o cadena con necesidades especiales, construimos el sistema exacto que tu empresa necesita para organizar su inventario, personal o sucursales.",
        benefits: [
          "Funciones creadas desde cero según tu forma de trabajar",
          "Accesos privados para dueño, encargados o colaboradores",
          "Preparado para crecer a medida que abras nuevos locales o servicios",
        ],
      },
    ];
  }

  /**
   * 3 Casos de Estudio Reales con Demos en Vivo en Netlify
   */
  static getPortfolioDemos() {
    return [
      {
        id: "mj-barber",
        name: "MJ Barber",
        location: "Calle Nueva 104, Cercado de Arequipa",
        category: "Barbería Clásica y Cuidado Masculino",
        benefit:
          "Catálogo de 7 servicios con precios en Soles, selector de citas 24/7 y panel de caja para calcular ingresos diarios con un solo clic.",
        highlights: [
          "7 servicios en Soles (S/)",
          "Selector de citas 24/7",
          "Cálculo de caja diaria en 1 clic",
        ],
        demoUrl: "https://mjbarber.netlify.app/",
      },
      {
        id: "barbali",
        name: "Barbali",
        location: "Av. Lambramani 169, Arequipa",
        category: "Estética Masculina y Afeitado Tradicional",
        benefit:
          "Agenda digital de 9 servicios oficiales, selección de barbero disponible y pedidos de confirmación directos al WhatsApp del salón sin intermediarios.",
        highlights: [
          "Agenda de 9 servicios oficiales",
          "Elección de barbero disponible",
          "Confirmación directa por WhatsApp",
        ],
        demoUrl: "https://barbali-arequipa.netlify.app/",
      },
      {
        id: "zheymar-studio",
        name: "Zheymar Studio Color & Academy",
        location: "Umacollo, Arequipa",
        category: "Estudio de Colorimetría y Academia Capilar",
        benefit:
          "Integración de catálogo para reservas de salón y módulo educativo para captar alumnas en sus cursos de colorimetría básica y avanzada con respaldo de 4.8 estrellas en Google.",
        highlights: [
          "Reservas de salón + Academia",
          "Captación de alumnas para cursos",
          "Respaldo de 4.8 ★ en Google",
        ],
        demoUrl: "https://zheymar-studio-color.netlify.app/",
      },
    ];
  }

  /**
   * Planes Comerciales Transparentes con Precios en Soles (Plan A y Plan B)
   */
  static getPricingPlans() {
    return [
      {
        id: "plan-a",
        badge: "MÁXIMA ESCALABILIDAD",
        recommendedTag: "A MEDIDA PARA EMPRESAS",
        isRecommended: false,
        title: "PLAN A — Sistema Exclusivo a Medida",
        priceMain: "Desde S/ 1,200 a S/ 1,500+",
        priceNote: "Según módulos y funciones requeridas",
        paymentScheduleTitle: "Modalidad de Pago en 3 Partes:",
        paymentSteps: [
          "1.er Pago: S/ 200 al firmar el contrato e iniciar el proyecto.",
          "2.º Pago: S/ 300 al aprobar la maqueta y funcionamiento inicial.",
          "3.er Pago: Saldo final al entregar tu web activa y funcionando al 100%.",
        ],
        deliveryTime: "De 10 a 20 días hábiles",
        idealFor:
          "Clínicas, cadenas de salones, ferreterías con amplio inventario o empresas que necesitan flujos y módulos personalizados.",
        includes: [
          "Diseño exclusivo desde cero con la identidad de tu marca.",
          "Módulos avanzados según tu operación (citas complejas, catálogos extensos, control de stock).",
          "1 AÑO COMPLETO de soporte digital, servidor y dominio web (.com) incluidos.",
          "Mantenimiento posterior accesible (S/ 30 al mes o S/ 300 al año).",
          "Seguridad total: Nadie puede ver tus ganancias ni alterar tu sistema.",
        ],
        ctaText: "Cotizar Plan A a Medida",
        whatsappMessage:
          "Hola Nexus Code Systems, me interesa cotizar el *PLAN A (Sistema Exclusivo a Medida)* para mi empresa.",
      },
      {
        id: "plan-b",
        badge: "DESPEGUE RÁPIDO",
        recommendedTag: "MÁS VENDIDO · RECOMENDADO",
        isRecommended: true,
        title: "PLAN B — Página Ágil y Prediseñada",
        priceMain: "S/ 300",
        priceNote: "Pago Único de Instalación",
        paymentScheduleTitle: "Modalidad de Pago:",
        paymentSteps: [
          "S/ 100 de anticipo para arrancar.",
          "S/ 200 restantes contra entrega final.",
        ],
        deliveryTime: "De 3 a 5 días hábiles",
        idealFor:
          "Barberías, estilistas independientes y locales que quieren digitalizarse ya sin gastar de más.",
        includes: [
          "Plataforma lista con tu logo, fotos reales, colores y catálogo de precios.",
          "Sistema de agendamiento 24/7 conectado directo a tu WhatsApp.",
          'Panel privado del dueño con botón "Finalizar atención" para ver tus ganancias diarias.',
          "Ubicación exacta con Google Maps para que nuevos clientes te encuentren.",
          "1 AÑO GRATIS de soporte técnico y asesoría directa por desarrolladores de CERTUS.",
          "Alojamiento web activo: S/ 30 al mes o S/ 300 al año (con opción de URL rápida de inicio).",
        ],
        ctaText: "Solicitar Plan B (S/ 300) Ahora",
        whatsappMessage:
          "Hola Nexus Code Systems, me interesa el *PLAN B (Página Ágil y Prediseñada de S/ 300)* para mi negocio. Quisiera ver cómo empezar.",
      },
    ];
  }

  /**
   * 3 Bloques de Seguridad y Confianza explicados en sencillo
   */
  static getSecurityPillars() {
    return [
      {
        number: "01",
        title: "Tus Cuentas Claras y Privadas",
        description:
          "El módulo de caja y reportes diarios es exclusivo para ti. Solo tú tienes acceso a tus números: nadie ajeno puede ver cuánto vendes al día.",
      },
      {
        number: "02",
        title: "Protección Contra Errores y Spam",
        description:
          "Tus formularios de citas y pedidos están blindados para evitar mensajes falsos, enlaces raros o intentos de alterar tus precios y servicios.",
      },
      {
        number: "03",
        title: "Propiedad de tu Información",
        description:
          "La lista de tus clientes, números de teléfono e historial de citas son 100% de tu negocio. Nunca se comparten con terceros ni se pierden.",
      },
    ];
  }
}
