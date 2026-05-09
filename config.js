// =============================================================
//  VIKO TEMPLATE — CONFIGURACIÓN DEL EMPRENDIMIENTO
//  Este es el ÚNICO archivo que editás para cada emprendedor.
//  El resto (index.html, style.css, app.js) NO se toca nunca.
//
//  IMÁGENES:
//  - Subí las fotos a la carpeta /img/
//  - Referencialas como "img/mi-foto.jpg"
//  - O usá links externos: "https://..."
//
//  COLORES:
//  - Usá colores HEX: "#C4664A"
//  - El color de acento se aplica en botones, badges y detalles
// =============================================================

const CONFIG = {

  // ── IDENTIDAD ──────────────────────────────────────────────
  nombre:      "KeepCalmassage",
  rubro:       "Masajes",
  tagline:     "Masajes Relajantes y descontracturantes.",
  descripcion: `
    Tu momento de pausa empieza acá.
    Masajes relajantes y descontracturantes diseñados para aliviar tensiones,
    reducir el estrés y regalarte bienestar.
    Desconectá del ritmo diario y volvé a sentirte bien.
  `,
  ubicacion: "Pinamar, Buenos Aires",
  envios:    false,
  // desde: "2022",  // año de inicio — descomentá si querés mostrar antigüedad

  // ── ETIQUETAS — acá cambiás todos los textos del sitio ─────
  //
  //  Cada campo tiene un valor por defecto si lo dejás en null.
  //  Cambiá solo los que necesitás personalizar.
  //
  labels: {
    // NAV
    navProductos:   "Servicios",    // link en el menú → default "Productos"
    navNosotros:    "Quién soy",    // link en el menú → default "Nosotros"
    navGaleria:     "Galería",      // link en el menú → default "Galería"
    navContacto:    "Contactar",    // botón CTA del nav → default "Contactar"

    // SECCIÓN GALERÍA
    galeriaLabel:   "Galería",      // badge pequeño arriba → default "Galería"
    galeriaTitulo:  "Lo que hago", // título grande → default "Lo que hacemos"

    // SECCIÓN PRODUCTOS / SERVICIOS
    productosLabel:  "Servicios",   // badge pequeño arriba → default "Productos & Servicios"
    productosTitulo: "Lo que ofrezco", // título grande → default "Lo que ofrecemos"
    productosCTA:    "¿Querés reservar un turno o consultar disponibilidad?", // texto antes del botón

    // SECCIÓN NOSOTROS / QUIEN SOY
    nosotrosLabel:  "Sobre mí",     // badge pequeño → default "Nuestra historia"
    nosotrosTitulo: "Mi historia",  // título grande → default (nombre del negocio)

    // SECCIÓN TESTIMONIOS
    testimoniosLabel:  "Testimonios",                  // badge → default "Testimonios"
    testimoniosTitulo: "Lo que dicen mis clientes",    // título → default "Lo que dicen nuestros clientes"

    // SECCIÓN CONTACTO
    contactoLabel: "Contacto",      // badge → default "Contacto"
    contactoTitulo: "¿Hablamos?",   // título → default "¿Hablamos?"
    contactoDesc:  "Escribime por WhatsApp o Instagram. Respondo rápido.", // descripción

    // BOTONES DE CONTACTO
    btnWhatsapp:  "💬 Escribirme por WhatsApp",  // default "💬 Escribir por WhatsApp"
    btnInstagram: "📷 Seguime en Instagram",     // default "📷 Seguinos en Instagram"

    // HERO
    heroBtnPrimario:   "💬 Consultar ahora",   // botón principal → default "💬 Consultar ahora"
    heroBtnSecundario: "Ver galería →",         // botón secundario → default "Ver galería →"

    // TARJETA DE CONTACTO (parte derecha del contacto)
    cardEnvios: "🚚 Envíos a todo el país",     // solo se muestra si envios: true
  },

  // ── COLORES ────────────────────────────────────────────────
  acento:      "#7A9E87",   // color principal (botones, badges, detalles)
  acentoClaro: "#F0F5F2",   // versión suave del acento (fondos)
  tema:        "claro",     // "claro" | "oscuro"

  // ── CONTACTO ───────────────────────────────────────────────
  whatsapp:  "5492254616264",  // sin + ni espacios
  instagram: "keepcalmassage", // sin @
  email:     null,             // "mail@ejemplo.com" o null
  web:       null,             // "https://miweb.com" o null

  // ── VIKO ───────────────────────────────────────────────────
  fichaViko: "https://viko.com.ar?emp=9",

  // ── HERO ───────────────────────────────────────────────────
  heroImage: "img/kc2.jpeg",

  // ── GALERÍA (hasta 12 fotos) ────────────────────────────────
  galeria: [
    { src: "img/kc1.jpeg", titulo: "Masaje en camilla",    desc: "Descontracturante, Relajante" },
    { src: "img/kc4.jpeg", titulo: "Masaje en Silla",      desc: "Espalda baja, alta, cuello y cabeza" },
    { src: "img/kc8.jpeg", titulo: "Masaje en Silla",      desc: "Clientes felices" },
    { src: "img/xc3.jpeg", titulo: "Sesión personalizada", desc: null },
    { src: "img/kc7.jpeg", titulo: "Masaje en Silla",      desc: "Una experiencia única" },
  ],

  // ── SERVICIOS / PRODUCTOS ───────────────────────────────────
  productos: [
    {
      nombre: "Masaje en camilla — cuerpo completo",
      desc:   "Incluye piedras calientes y presión personalizada según lo que necesite cada persona: más suave o más profunda, para relajar tensiones.",
      badge:  null,
    },
    {
      nombre: "Masaje en silla ergonómica",
      desc:   "Para espalda baja, alta, cuello y cabeza. La posición en la silla genera un estiramiento natural en la zona lumbar desde el primer momento.",
      badge:  null,
    },
    {
      nombre: "Drenaje linfático",
      desc:   "Masaje suave que estimula el sistema linfático para eliminar toxinas y líquidos. Se realiza en camilla, con posibilidad de elegir la zona a trabajar.",
      badge:  null,
    },
  ],

  // ── SOBRE MÍ / NOSOTROS ─────────────────────────────────────
  historia: `
    Este espacio nace con el objetivo de brindar bienestar, equilibrio y alivio corporal.
    A través de técnicas de masaje enfocadas en la relajación y liberación de tensiones,
    cada sesión está pensada para ayudarte a desconectar del estrés diario
    y reconectar con tu cuerpo en un ambiente cálido y armonioso.
  `,
  historiaImagen: "img/kc2.jpeg",

  // ── TESTIMONIOS (hasta 6) ───────────────────────────────────
  testimonios: [
    { nombre: "Martina G.", ciudad: "Pinamar",       texto: "Salí completamente relajada. Las manos son mágicas, y el ambiente muy cálido. Ya saqué turno para la próxima.", estrellas: 5 },
    { nombre: "Roberto P.", ciudad: "Buenos Aires",   texto: "Fui con contractura y salí nuevo. Super recomendable, muy profesional y atento.", estrellas: 5 },
    { nombre: "Lucía M.",   ciudad: "Mar del Plata",  texto: "El drenaje linfático fue increíble, lo noté desde el mismo día. Vuelvo siempre que estoy en Pinamar.", estrellas: 5 },
  ],

  // ── REDES EXTRA (opcional) ──────────────────────────────────
  facebook: null,
  tiktok:   null,
};
