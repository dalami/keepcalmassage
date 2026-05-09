// =============================================
//  VIKO TEMPLATE — APP  (fixes: fichaViko + botones alineados)
// =============================================

function L(key, fallback) {
  return (CONFIG.labels && CONFIG.labels[key] != null)
    ? CONFIG.labels[key]
    : fallback;
}

function applyColors() {
  const r = document.documentElement.style;
  r.setProperty('--acento',      CONFIG.acento      || '#7A9E87');
  r.setProperty('--acento-lite', CONFIG.acentoClaro || '#F8EDE8');

  if (CONFIG.tema === 'oscuro') {
    r.setProperty('--white',  '#1A1814');
    r.setProperty('--cream',  '#2D2B26');
    r.setProperty('--black',  '#FAFAF7');
    r.setProperty('--muted',  '#9A9590');
    r.setProperty('--border', 'rgba(255,255,255,0.1)');
    document.body.classList.add('tema-oscuro');
  }
}

function waUrl(mensaje) {
  const tel = CONFIG.whatsapp.toString().replace(/\D/g,'');
  return `https://api.whatsapp.com/send?phone=${tel}&text=${encodeURIComponent(mensaje)}`;
}

function setupSEO() {
  document.getElementById('page-title').textContent = `${CONFIG.nombre} — ${CONFIG.rubro}`;

  const setMeta = (sel, attr, val) => {
    let el = document.querySelector(sel);
    if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
    el.setAttribute(attr, val);
  };

  setMeta('meta[name="description"]',        'content', CONFIG.tagline);
  setMeta('meta[property="og:title"]',       'content', `${CONFIG.nombre} — ${CONFIG.rubro}`);
  setMeta('meta[property="og:description"]', 'content', CONFIG.tagline);
  setMeta('meta[property="og:image"]',       'content', CONFIG.heroImage || '');
  setMeta('meta[property="og:type"]',        'content', 'website');
  setMeta('meta[name="robots"]',             'content', 'index, follow');
  setMeta('meta[name="theme-color"]',        'content', CONFIG.acento);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": CONFIG.nombre,
    "description": CONFIG.descripcion?.trim(),
    "image": CONFIG.heroImage,
    "address": { "@type": "PostalAddress", "addressLocality": CONFIG.ubicacion || '' },
    "telephone": `+${CONFIG.whatsapp}`,
    "url": window.location.href,
    "sameAs": [
      CONFIG.instagram ? `https://instagram.com/${CONFIG.instagram}` : null,
      CONFIG.web || null
    ].filter(Boolean)
  };
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(schema);
  document.head.appendChild(s);
}

function buildNav() {
  document.getElementById('nav-logo').textContent = CONFIG.nombre;

  const navGaleria   = document.getElementById('nav-galeria-link');
  const navProductos = document.getElementById('nav-productos-link');
  const navNosotros  = document.getElementById('nav-nosotros-link');
  const navContacto  = document.getElementById('nav-contacto-link');

  if (navGaleria)   navGaleria.textContent   = L('navGaleria',  'Galería');
  if (navProductos) navProductos.textContent = L('navProductos','Productos');
  if (navNosotros)  navNosotros.textContent  = L('navNosotros', 'Nosotros');
  if (navContacto)  navContacto.textContent  = L('navContacto', 'Contactar');

  if ((!CONFIG.productos || CONFIG.productos.length === 0) && navProductos) {
    navProductos.parentElement.style.display = 'none';
  }

  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
  });
}

function buildHero() {
  const bg = document.getElementById('hero-bg');
  if (CONFIG.heroImage) {
    bg.style.backgroundImage = `url('${CONFIG.heroImage}')`;
    const img = new Image();
    img.onload = () => bg.classList.add('loaded');
    img.src = CONFIG.heroImage;
  }

  document.getElementById('hero-badge').textContent = CONFIG.rubro;

  const palabras = CONFIG.nombre.split(' ');
  document.getElementById('hero-title').innerHTML =
    `<em>${palabras[0]}</em> ${palabras.slice(1).join(' ')}`;

  document.getElementById('hero-tagline').textContent = CONFIG.tagline;

  const meta = document.getElementById('hero-meta');
  if (CONFIG.ubicacion) {
    meta.innerHTML += `<span class="hero-meta-item">📍 ${CONFIG.ubicacion}</span>`;
  }
  if (CONFIG.envios) {
    meta.innerHTML += `<span class="hero-meta-item">${L('cardEnvios','🚚 Envíos a todo el país')}</span>`;
  }
  if (CONFIG.desde) {
    meta.innerHTML += `<span class="hero-meta-item">📅 Desde ${CONFIG.desde}</span>`;
  }

  const waMsg = `Hola ${CONFIG.nombre}! Vi tu página y me gustaría consultar. 😊`;
  const btnPrimario   = document.getElementById('hero-btn-primario');
  const btnSecundario = document.getElementById('hero-btn-secundario');

  if (btnPrimario) {
    btnPrimario.href        = waUrl(waMsg);
    btnPrimario.textContent = L('heroBtnPrimario', '💬 Consultar ahora');
  }
  if (btnSecundario) {
    btnSecundario.textContent = L('heroBtnSecundario', 'Ver galería →');
  }
}

function buildGaleria() {
  const sec  = document.getElementById('galeria');
  const grid = document.getElementById('galeria-grid');

  if (!CONFIG.galeria || CONFIG.galeria.length === 0) {
    sec.style.display = 'none';
    return;
  }

  const labelEl  = sec.querySelector('.section-label');
  const tituloEl = sec.querySelector('.section-title');
  if (labelEl)  labelEl.textContent  = L('galeriaLabel',  'Galería');
  if (tituloEl) tituloEl.textContent = L('galeriaTitulo', 'Lo que hacemos');

  grid.innerHTML = CONFIG.galeria.map((item, i) => `
    <div class="galeria-item fade-up" onclick="openLightbox(${i})">
      <img src="${item.src}" alt="${item.titulo || ''}" loading="lazy">
      ${item.titulo ? `
      <div class="galeria-caption">
        <div class="galeria-caption-title">${item.titulo}</div>
        ${item.desc ? `<div class="galeria-caption-desc">${item.desc}</div>` : ''}
      </div>` : ''}
    </div>
  `).join('');
}

function buildProductos() {
  const sec = document.getElementById('productos');
  if (!CONFIG.productos || CONFIG.productos.length === 0) {
    sec.style.display = 'none';
    return;
  }

  const labelEl  = sec.querySelector('.section-label');
  const tituloEl = sec.querySelector('.section-title');
  const ctaTexto = sec.querySelector('.productos-cta p');

  if (labelEl)  labelEl.textContent  = L('productosLabel',  'Productos & Servicios');
  if (tituloEl) tituloEl.textContent = L('productosTitulo', 'Lo que ofrecemos');
  if (ctaTexto) ctaTexto.textContent = L('productosCTA',    '¿Querés hacer un pedido o consultar disponibilidad?');

  const waMsg = nombre => `Hola ${CONFIG.nombre}! Me interesa: ${nombre}. ¿Podés darme más info?`;

  document.getElementById('productos-grid').innerHTML = CONFIG.productos.map(p => `
    <div class="producto-card fade-up">
      ${p.badge ? `<span class="producto-badge">${p.badge}</span>` : ''}
      <div class="producto-nombre">${p.nombre}</div>
      <div class="producto-desc">${p.desc}</div>
      ${p.precio ? `<div class="producto-precio">${p.precio}</div>` : ''}
      <div class="producto-footer">
        <a class="producto-wa-btn" href="${waUrl(waMsg(p.nombre))}" target="_blank">
          💬 Consultar
        </a>
      </div>
    </div>
  `).join('');
}

function buildNosotros() {
  const sec = document.getElementById('nosotros');
  if (!CONFIG.historia) {
    sec.style.display = 'none';
    return;
  }

  const labelEl  = sec.querySelector('.section-label');
  const tituloEl = sec.querySelector('.section-title');
  if (labelEl)  labelEl.textContent  = L('nosotrosLabel',  'Nuestra historia');
  if (tituloEl) tituloEl.textContent = L('nosotrosTitulo', CONFIG.nombre);

  if (CONFIG.historiaImagen) {
    document.getElementById('nosotros-img').src = CONFIG.historiaImagen;
    document.getElementById('nosotros-img').alt = CONFIG.nombre;
  } else {
    document.querySelector('.nosotros-img-wrap').style.display = 'none';
    document.querySelector('.nosotros-inner').style.gridTemplateColumns = '1fr';
  }

  const badge = document.getElementById('nosotros-badge-float');
  if (CONFIG.desde) {
    const años = new Date().getFullYear() - parseInt(CONFIG.desde);
    badge.innerHTML = `${años}+<span>años</span>`;
  } else {
    badge.style.display = 'none';
  }

  document.getElementById('nosotros-desc').textContent = CONFIG.historia.trim();

  const stats = document.getElementById('nosotros-stats');
  const items = [];
  if (CONFIG.desde)       items.push({ num: `${new Date().getFullYear() - parseInt(CONFIG.desde)}+`, lbl: 'Años de experiencia' });
  if (CONFIG.galeria)     items.push({ num: `${CONFIG.galeria.length}`, lbl: 'Trabajos en galería' });
  if (CONFIG.testimonios) items.push({ num: `${CONFIG.testimonios.length * 10}+`, lbl: 'Clientes felices' });

  stats.innerHTML = items.map(s => `
    <div class="nosotros-stat">
      <span class="num">${s.num}</span>
      <span class="lbl">${s.lbl}</span>
    </div>
  `).join('');
}

function buildTestimonios() {
  const sec = document.getElementById('testimonios');
  if (!CONFIG.testimonios || CONFIG.testimonios.length === 0) {
    sec.style.display = 'none';
    return;
  }

  const labelEl  = sec.querySelector('.section-label');
  const tituloEl = sec.querySelector('.section-title');
  if (labelEl)  labelEl.textContent  = L('testimoniosLabel',  'Testimonios');
  if (tituloEl) tituloEl.textContent = L('testimoniosTitulo', 'Lo que dicen nuestros clientes');

  document.getElementById('testimonios-grid').innerHTML = CONFIG.testimonios.map(t => `
    <div class="testimonio-card fade-up">
      <div class="testimonio-estrellas">${'★'.repeat(t.estrellas || 5)}</div>
      <p class="testimonio-texto">${t.texto}</p>
      <div class="testimonio-autor">
        <div class="testimonio-avatar">${t.nombre[0]}</div>
        <div>
          <div class="testimonio-nombre">${t.nombre}</div>
          ${t.ciudad ? `<div class="testimonio-ciudad">📍 ${t.ciudad}</div>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function buildContacto() {
  const sec = document.getElementById('contacto');

  const labelEl  = sec.querySelector('.section-label');
  const tituloEl = sec.querySelector('.section-title');
  if (labelEl)  labelEl.textContent  = L('contactoLabel',  'Contacto');
  if (tituloEl) tituloEl.textContent = L('contactoTitulo', '¿Hablamos?');

  document.getElementById('contacto-desc').textContent =
    L('contactoDesc', 'Escribinos por WhatsApp o Instagram. Respondemos rápido.');

  const waMsg = `Hola ${CONFIG.nombre}! Vi tu página y quiero consultar.`;

  const btns = document.getElementById('contacto-btns');
  btns.innerHTML = `
    <a class="contact-btn wa" href="${waUrl(waMsg)}" target="_blank">
      ${L('btnWhatsapp', '💬 Escribir por WhatsApp')}
    </a>
    <a class="contact-btn ig" href="https://instagram.com/${CONFIG.instagram}" target="_blank">
      ${L('btnInstagram', '📷 Seguinos en Instagram')}
    </a>
    ${CONFIG.email ? `<a class="contact-btn em" href="mailto:${CONFIG.email}">✉️ ${CONFIG.email}</a>` : ''}
    ${CONFIG.web   ? `<a class="contact-btn web" href="${CONFIG.web}" target="_blank">🌐 Visitar web</a>` : ''}
  `;

  document.getElementById('contacto-card-logo').textContent = CONFIG.nombre;
  document.getElementById('contacto-card-info').innerHTML = `
    ${CONFIG.ubicacion ? `📍 ${CONFIG.ubicacion}<br>` : ''}
    ${CONFIG.envios ? `${L('cardEnvios','🚚 Envíos a todo el país')}<br>` : ''}
    📷 @${CONFIG.instagram}
  `;

  // fichaViko: usa CONFIG.fichaViko (definido en config.js por emprendedor)
  const vikoLink = document.getElementById('contacto-viko-link');
  if (vikoLink) vikoLink.href = CONFIG.fichaViko || 'https://viko.com.ar';
}

function buildFooter() {
  document.getElementById('footer-logo').textContent = CONFIG.nombre;
  document.getElementById('footer-copy').textContent =
    `© ${new Date().getFullYear()} ${CONFIG.nombre} · ${CONFIG.rubro}`;
}

let lightboxIndex = 0;

function openLightbox(idx) {
  lightboxIndex = idx;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightbox() {
  const item = CONFIG.galeria[lightboxIndex];
  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-caption').textContent =
    [item.titulo, item.desc].filter(Boolean).join(' · ');
}

function lightboxPrev(e) {
  e.stopPropagation();
  lightboxIndex = (lightboxIndex - 1 + CONFIG.galeria.length) % CONFIG.galeria.length;
  renderLightbox();
}

function lightboxNext(e) {
  e.stopPropagation();
  lightboxIndex = (lightboxIndex + 1) % CONFIG.galeria.length;
  renderLightbox();
}

function observeFadeUp() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') lightboxNext(e);
  if (e.key === 'ArrowLeft')  lightboxPrev(e);
});

applyColors();
setupSEO();
buildNav();
buildHero();
buildGaleria();
buildProductos();
buildNosotros();
buildTestimonios();
buildContacto();
buildFooter();

requestAnimationFrame(() => setTimeout(observeFadeUp, 100));