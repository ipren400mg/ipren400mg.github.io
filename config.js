/* ─────────────────────────────────────────────────────────────
   SITE DATA  –  generated from 3Måltider Sushi & Wok PDF menu
   Source: 1-2.pdf
   ───────────────────────────────────────────────────────────── */

const SITE = {

  /* ── Meta ────────────────────────────────────────────────── */
  lang: 'sv',
  title: '3Måltider Sushi & Wok',
  description: '3Måltider Sushi & Wok i Häggviks centrum erbjuder sushi, poké bowl, varmrätter och thailändska rätter.',

  /* ── Brand ───────────────────────────────────────────────── */
  brand: {
    name: '3Måltider Sushi & Wok',
    logoFont: 'Georgia, serif',
    phone: { display: '08-356 240', href: 'tel:08356240' },
    website: 'www.3måltider.se',
    address: 'Studievägen 10, Häggviks centrum',
    accentColor: '#b03d2e',
  },

  /* ── Navigation ──────────────────────────────────────────── */
  nav: [
    { label: 'Hem',       href: '#'          },
    { label: 'Meny',      href: '#meny'      },
    { label: 'Lunchmeny', href: '#lunchmeny' },
    { label: 'Beställ online', href: 'https://qopla.com/restaurant/3maltider-sushi-&-wok/qGo2dgdYNq/order' },
  ],

  /* ── Hero section ────────────────────────────────────────── */
  hero: {
    heading: '3Måltider Sushi & Wok',
    body: 'Välkommen till 3Måltider Sushi & Wok vid Häggviks centrum. Vi serverar sushi, poké bowl, varmrätter och thailändska rätter.',
    cta: { label: 'Se Menyn', href: '#meny' },
  },

  /* ── Lunch promo banner ──────────────────────────────────── */
  lunchPromo: {
    heading: 'Dagens Lunch!',
    cta: { label: 'Se lunchmenyn', href: '#lunchmeny' },
    image: {
      src: 'assets/lunch.jpg',
      alt: 'Dagens lunch',
    },
  },

  /* ── Menu overview images (scanned menu pages) ───────────── */
  menuImages: [
    {
      src: 'assets/1-2.pdf',
      alt: '3Måltider Sushi & Wok meny',
    },
  ],

  /* ── Extra sides ─────────────────────────────────────────── */
  extraSides: {
    title: 'Tillbehör',
    items: [
      { name: 'Sushi Maki',                    price: '13 kr / st' },
      { name: 'Lax / avokado / räka nigiri',   price: '15 kr / st' },
      { name: 'Ris (kokt)',                    price: '15 kr / st' },
      { name: 'Sushiris (kokt)',               price: '20 kr / st' },
      { name: 'Äggnudlar istället för ris',    price: '45 kr' },
      { name: 'Extra grönsaker',               price: '20 kr' },
      { name: 'Extra protein',                 price: 'Biff 55 kr · Kyckling 39 kr' },
      { name: 'Cashewnötter',                  price: '30 kr' },
      { name: 'Krossade jordnötter',           price: '10 kr' },
      { name: 'Jordnötssås',                   price: '35 kr' },
      { name: 'Chilimajonnäs',                 price: '10 kr' },
      { name: 'Sjögrässallad',                 price: '35 kr' },
      { name: 'Misosoppa',                     price: '10 kr' },
      { name: 'Dryck',                         price: '20 kr' },
      { name: 'Räkchips',                      price: '30 kr' },
    ],
  },

  /* ── Full menu ───────────────────────────────────────────── */
  menuLayout: [
    { cols: ['forratter', 'sushi'] },
    { cols: ['pokeBowl', 'varmratter'] },
    { cols: ['thai', 'kombo'] },
  ],

  /* ── Photo gallery ───────────────────────────────────────── */
  gallery: [
    { src: 'assets/gallery-1.jpg', alt: '3Måltider Sushi & Wok maträtt' },
    { src: 'assets/gallery-2.jpg', alt: 'Sushi från 3Måltider Sushi & Wok' },
  ],

  /* ── Lunch menu images ───────────────────────────────────── */
  lunchMenuImages: [
    {
      src: 'assets/1-2.pdf',
      alt: 'Lunchmeny',
    },
  ],

}; // end SITE