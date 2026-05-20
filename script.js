/* ═══════════════════════════════════════════════════════════
   TEMPLATE ENGINE  –  reads SITE from config.js, builds DOM
   ═══════════════════════════════════════════════════════════ */

// ── helpers ──────────────────────────────────────────────────
const h = (tag, attrs = {}, ...children) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v);
  }
  for (const child of children.flat()) {
    if (child == null) continue;
    el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return el;
};

const spicyEmoji = n => n ? ' ' + '🌶️'.repeat(n) : '';

// ── section builders ─────────────────────────────────────────

function buildHeader(brand, nav) {
  const phoneSvgPath = 'M162-120q-18 0-30-12t-12-30v-162q0-13 9-23.5t23-14.5l138-28q14-2 28.5 2.5T342-374l94 94q38-22 72-48.5t65-57.5q33-32 60.5-66.5T681-524l-97-98q-8-8-11-19t-1-27l26-140q2-13 13-22.5t25-9.5h162q18 0 30 12t12 30q0 125-54.5 247T631-329Q531-229 409-174.5T162-120Z';
  return [
    h('a', { class: 'logo', href: '#' }, brand.name),
    h('nav', {},
      h('ul', {},
        ...nav.map(item => h('li', {}, h('a', { href: item.href }, item.label)))
      )
    ),
    h('a', { class: 'phone-link', href: brand.phone.href },
      h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 -960 960 960' },
        h('path', { d: phoneSvgPath })
      ),
      h('span', { class: 'label' }, 'Telefon'),
      h('span', {}, brand.phone.display)
    ),
  ];
}

function buildHero(hero) {
  return [
    h('h1', {}, hero.heading),
    h('div', { class: 'u-underline' }),
    h('p', {}, hero.body),
    h('a', { class: 'btn', href: hero.cta.href }, hero.cta.label),
  ];
}

function buildHours(hours) {
  const dl = h('dl', { class: 'hours-list' },
    ...hours.map(row =>
      h('div', { class: 'hours-list', style: 'display:flex;justify-content:space-between;gap:40px;padding:8px 0;font-size:16px' },
        h('dt', {}, row.days),
        h('dd', {}, row.time)
      )
    )
  );
  return [
    h('div', { class: 'hours-card' },
      h('h2', {}, 'Öppettider'),
      h('div', { class: 'u-underline-white' }),
      dl
    )
  ];
}

function buildMenuImages(images) {
  return [
    h('div', { class: 'section-header' }, h('h2', {}, 'Meny')),
    h('div', { class: 'menu-images-inner' },
      ...images.map(img => h('img', { src: img.src, alt: img.alt, loading: 'lazy' }))
    ),
  ];
}

function buildExtraSides(extra) {
  const half = Math.ceil(extra.items.length / 2);
  const col = items => h('div', {},
    ...items.map(item => {
      const el = h('div', { class: 'extra-item' },
        h('strong', {}, item.name), ` — ${item.price}`
      );
      if (item.note) el.appendChild(h('small', {}, item.note));
      return el;
    })
  );
  return [
    h('div', { class: 'extra-card' },
      h('h3', {}, extra.title),
      h('div', { class: 'extra-underline' }),
      h('div', { class: 'extra-grid' },
        col(extra.items.slice(0, half)),
        col(extra.items.slice(half))
      )
    )
  ];
}

function buildMenuItem(item) {
  const title = [
    item.num ? `${item.num}. ` : '',
    item.name,
    spicyEmoji(item.spicy),
    item.price ? ` — ${item.price}` : '',
  ].join('');
  const el = h('div', { class: 'menu-item' }, h('h4', {}, title));
  if (item.desc) el.appendChild(h('p', {}, item.desc));
  return el;
}

function buildCategory(cat) {
  const wrap = h('div', { class: 'menu-category' },
    h('div', { class: 'menu-category-title' }, cat.title),
    h('div', { class: 'menu-divider' }),
    ...cat.items.map(buildMenuItem)
  );
  if (cat.featured) {
    const f = cat.featured;
    wrap.appendChild(
      h('div', { class: 'featured-card' },
        h('h3', {}, `${f.name} — ${f.price}`),
        f.subtitle ? h('p', { class: 'subtitle' }, f.subtitle) : null,
        f.desc ? h('p', {}, f.desc) : null
      )
    );
  }
  return wrap;
}

function buildFullMenu(layout, categories) {
  const rows = [];
  layout.forEach((row, i) => {
    if (i > 0) rows.push(h('div', { class: 'menu-row-divider' }));
    const colCount = row.cols.length;
    const menuRow = h('div', { class: 'menu-row', style: `--cols:${colCount}` },
      ...row.cols.map(key => h('div', {}, buildCategory(categories[key])))
    );
    rows.push(menuRow);
  });
  return [
    h('div', { class: 'full-menu-header' }, h('h2', {}, 'Meny')),
    h('div', { class: 'menu-section-wrap' }, ...rows),
  ];
}

function buildGallery(photos) {
  return [
    h('div', { class: 'gallery-grid' },
      ...photos.map(p => h('img', { src: p.src, alt: p.alt, loading: 'lazy' }))
    )
  ];
}

function buildLunchMenu(lunchMenu) {
  // lunchMenu is an array of single-key objects: [{klassisk:{title,items}}, ...]
  const categories = lunchMenu.map(obj => Object.values(obj)[0]);
  const rows = [];
  for (let i = 0; i < categories.length; i += 2) {
    if (i > 0) rows.push(h('div', { class: 'menu-row-divider' }));
    const pair = categories.slice(i, i + 2);
    rows.push(
      h('div', { class: 'menu-row', style: `--cols:${pair.length}` },
        ...pair.map(cat => h('div', {}, buildCategory(cat)))
      )
    );
  }
  return [
    h('div', { class: 'lunch-menu-header' }, h('h2', {}, 'Lunchmeny')),
    h('div', { class: 'lunch-menu-wrap' }, ...rows),
  ];
}

function buildFooter(brand, hours) {
  const summary = hours.map(r => `${r.days}: ${r.time}`).join('\u00a0|\u00a0');
  return [
    h('p', {}, h('strong', {}, brand.name)),
    h('p', {}, 'Telefon: ', h('a', { href: brand.phone.href }, brand.phone.display)),
    h('p', { class: 'hours-summary' }, summary),
  ];
}

// ── main render ──────────────────────────────────────────────

function render(site) {
  const accent = site.brand.accentColor || '#b03d2e';
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.lang = site.lang || 'sv';
  document.title = site.title || site.brand.name;
  document.querySelector('meta[name="description"]')?.setAttribute('content', site.description || '');

  const mount = (id, nodes) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    nodes.forEach(n => n && el.appendChild(n));
  };

  mount('tpl-header', buildHeader(site.brand, site.nav));
  mount('tpl-hero', buildHero(site.hero));
  mount('tpl-hours', buildHours(site.hours));
  mount('tpl-lunchmeny', buildLunchMenu(site.lunchMenu));
  mount('tpl-full-menu', buildFullMenu(site.menuLayout, site.menuCategories));
  mount('tpl-extra', buildExtraSides(site.extraSides));
  mount('tpl-footer', buildFooter(site.brand, site.hours));
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('menu.json')
    .then(r => r.json())
    .then(cfg => {
      SITE.hours = cfg.hours;
      SITE.extraSides = cfg.extraSides;
      SITE.menuCategories = cfg.menuCategories;
      SITE.lunchMenu = cfg.lunchMenu;
      render(SITE);
    });
});
