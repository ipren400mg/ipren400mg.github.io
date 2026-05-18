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
  ],

  /* ── Hero section ────────────────────────────────────────── */
  hero: {
    heading: '3Måltider Sushi & Wok',
    body: 'Välkommen till 3Måltider Sushi & Wok vid Häggviks centrum. Vi serverar sushi, poké bowl, varmrätter och thailändska rätter.',
    cta: { label: 'Se Menyn', href: '#meny' },
  },

  /* ── Opening hours ───────────────────────────────────────── */
  hours: [
    { days: 'Måndag – Torsdag', time: '11:00 – 20:30' },
    { days: 'Fredag',           time: '11:00 – 21:00' },
    { days: 'Lördag',           time: '12:00 – 21:00' },
    { days: 'Söndag',           time: '16:00 – 20:30' },
  ],

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

  menuCategories: {

    forratter: {
      title: 'Förrätter',
      items: [
        { num: '1', name: '4 bitar sushi', price: '59 kr', desc: '1 avokado, 1 räka, 1 lax, 1 rulle.' },
        { num: '2', name: 'Vegetariska vårrullar 10 st', price: '95 kr', desc: 'Vetemjöl, grönsaker.' },
        { num: '3', name: '6 lax rullar', price: '65 kr', desc: 'Lax, chilimayo.' },
        { num: '5', name: 'Vegetariska vårrullar 6 st', price: '69 kr', desc: 'Vetemjöl, grönsaker.' },
        { num: '6', name: 'Friterad mix 9 st', price: '99 kr', desc: '5 st vårrullar, 2 st kyckling, 2 st räkor.' },
        { num: '7', name: 'Pekingsoppa', price: '85 kr', desc: 'Ägg, grönsaker, kyckling, räkor, nötkött.' },
        { num: '8', name: 'Tom yam goong soppa', price: '75 kr', desc: 'Citrongräs, kokosmjölk, kyckling.' },
        { num: '9', name: 'Friterad mix 6 st', price: '79 kr', desc: '2 st vårrullar, 2 st kyckling, 2 st räkor.' },
      ],
    },

    pokeBowl: {
      title: 'Poké Bowl',
      items: [
        { name: 'Marinerad lax', price: '145 kr', desc: 'Lax, avokado, gurka, morötter, salladsmix, rödkål, sojabönor, ris, sesamfrö, chilimayo, Goma Dressing, ålsås.' },
        { name: 'Flamberad lax', price: '149 kr', desc: 'Flamberad lax, avokado, gurka, morötter, salladsmix, rödkål, sojabönor, ris, sesamfrö, chilimayo, Goma Dressing, ålsås.' },
        { name: 'Tempura poké', price: '145 kr', desc: 'Friterad jätteräkor, avokado, gurka, morötter, salladsmix, rödkål, sojabönor, ris, sesamfrö, chilimayo, Goma Dressing, ålsås.' },
      ],
    },

    sushi: {
      title: 'Sushi',
      items: [
        { num: '10', name: 'Liten sushi 9 bitar', price: '119 kr', desc: '3 rullar, 3 lax, 2 avokado, 1 räka.' },
        { num: '11', name: 'Mellan sushi 11 bitar', price: '139 kr', desc: '4 rullar, 4 lax, 1 räka, 1 avokado, 1 tonfisk.' },
        { num: '12', name: 'Stor sushi 13 bitar', price: '159 kr', desc: '4 rullar, 4 lax, 2 räkor, 2 avokado, 1 tonfisk.' },
        { num: '13', name: 'Extra stor sushi 15 bitar', price: '189 kr', desc: '5 rullar, 4 lax, 2 räkor, 2 avokado, 1 tonfisk, 1 mussla.' },
        { num: '14', name: 'Ett par sushi 20 bitar', price: '249 kr', desc: '6 rullar, 6 lax, 2 räkor, 2 avokado, 2 tonfisk, 2 mussla.' },
        { num: '15', name: 'Familj sushi 30 bitar', price: '365 kr', desc: '10 rullar, 8 lax, 3 räkor, 3 avokado, 2 tonfisk, 1 mussla, 3 tofu.' },
        { num: '16', name: 'Lax sushi nigiri 10 bitar', price: '145 kr' },
        { num: '17', name: 'Vegetarisk sushi 10 bitar', price: '129 kr', desc: '5 rullar, 3 avokado, 2 tofu.' },
        { num: '18', name: 'Lax & avokado & räkor', price: '8 bitar 119 kr · 10 bitar 139 kr · 12 bitar 169 kr' },
        { num: '19', name: 'Sashimi', price: 'Liten 12 bitar 155 kr · Stor 22 bitar 279 kr', desc: 'Rå fisk, skaldjur, isbergssallad och ris på sidan.' },
        { num: '20', name: 'California rolls 10 bitar', price: '135 kr', desc: 'Surimi (crabsticks), gurka, avokado, majonnäs, noriblad, toppad med sesamfrön och sojasås.' },
        { num: '21', name: 'Friterad rullar 11 bitar', price: '155 kr', desc: 'Lax, surimi (crabsticks), gurka, avokado, chilimayo, sojasås, noriblad, sesamfrön, rostad lök.' },
        { num: '22', name: 'Spicy tuna rullar 10 bitar', price: '155 kr', desc: 'Tonfisk, gurka, avokado, sojasås, noriblad, toppad med sesamfrön, rostad lök och chilimayo.' },
        { num: '23', name: 'Philadelphiaost rullar 10 bitar', price: '149 kr', desc: 'Surimi (crabsticks), flamberad lax ovanpå, gurka, avokado, Philadelphiaost, noriblad, sesamfrö, chilimayo, rostad lök.' },
        { num: '24', name: 'Friterad kyckling rullar 10 bitar', price: '149 kr', desc: 'Friterad kyckling, gurka, avokado, sojasås, chilimayo, noriblad, sesamfrö, rostad lök.' },
        { num: '25', name: 'Friterad räkor (tempura) rullar', price: '149 kr', desc: 'Friterade räkor, gurka, avokado, sojasås, chilimayo, rostad lök.' },
        { num: '26', name: 'Sakura rullar 11 bitar', price: '155 kr', desc: 'Lax, avokado, gurka, lax ovanpå, sojasås, chilimayo, rostad lök.' },
        { num: '27', name: 'Sushi & yakiniku', price: '155 kr', desc: '6 bitar sushi, ris, yakiniku.' },
        { num: '28', name: 'Sushi & yakitori', price: '155 kr', desc: '6 bitar sushi, ris, 3 st yakitori.' },
        { num: '29', name: 'Bento', price: '165 kr', desc: '4 bitar sushi, yakiniku, 2 st yakitori, ris.' },
        { num: 'NY1', name: 'Lax & rullar', price: '10 bitar 135 kr · 12 bitar 155 kr' },
        { num: 'NY2', name: 'Flamberad lax', price: '10 bitar 149 kr · 12 bitar 175 kr', desc: 'Lax, söt sojasås, chilimayo, toppad med sesamfrön och rostad lök.' },
      ],
    },

    varmratter: {
      title: 'Varmrätter',
      items: [
        { num: '30', name: 'Yakiniku', price: '149 kr', desc: 'Skivad entrecote med söt yakiniku sås, gul lök, purjolök, toppad med sesamfrön.' },
        { num: '31A', name: 'Yakitori', price: '129 kr', desc: '6 st kycklingspett med söt yakiniku sås, toppad med sesamfrön.' },
        { num: '31B', name: 'Kycklingspett med jordnötssås', price: '129 kr', desc: '6 st kycklingspett.' },
        { num: '32', name: 'Lax teriyaki', price: '127 kr', desc: 'Friterad lax med grönsaker och lax teriyaki sås, toppad med sesamfrön.' },
        { num: '33', name: 'Bibimbap', price: '145 kr', desc: 'Morötter, böngroddar, gurka, hemgjord kimchi, yakiniku, ägg, ris, toppad med sesamfrön, chilisås på sidan.' },
        { num: '34', name: 'Dumpling 10 st', price: '129 kr', desc: 'Kyckling / fläskkött / vegetarisk.' },
        { num: '35', name: 'Stekt nudlar med grönsaker och ägg', price: 'Kyckling 126 kr · Biff 137 kr · Räkor 146 kr' },
        { num: '36', name: 'Stekt risnudlar med grönsaker och ägg', price: 'Kyckling 126 kr · Biff 137 kr · Räkor 146 kr' },
        { num: '37', name: 'Stekt ris med grönsaker och ägg', price: 'Kyckling 126 kr · Biff 137 kr · Räkor 146 kr', desc: 'Kan göras glutenfri.' },
        { num: '38', name: 'Wok med BBQ-sås och vitlök', price: 'Kyckling 135 kr · Biff 155 kr · Räkor 159 kr' },
        { num: '39', name: 'Wok med svartpepparsås, vitlök och grönsaker', spicy: 1, price: 'Kyckling 135 kr · Biff 155 kr · Räkor 159 kr' },
        { num: '40', name: 'Wok med ostronsås och grönsaker', price: 'Kyckling 135 kr · Biff 155 kr · Räkor 159 kr' },
        { num: '41', name: 'Wok med Szechuan chilipasta och grönsaker', price: 'Kyckling 135 kr · Biff 155 kr · Räkor 159 kr', desc: 'Kan göras glutenfri.' },
        { num: '42', name: 'Kung Pao med cashewnötter och hoisinsås', price: 'Kyckling 135 kr · Biff 155 kr · Räkor 159 kr' },
        { num: '43', name: '3Måltiders Spicy Lime Chicken', spicy: 1, price: '145 kr', desc: 'Lättfriterad kycklingfilé, stark chilisås och limesås, färsk lök, paprika, tunna limeskivor.' },
        { num: '44', name: 'Friterad kyckling / räkor', price: 'Kyckling 138 kr · Räkor 145 kr', desc: 'Med sötsur sås.' },
        { num: '45', name: 'Friterad anka', price: '159 kr', desc: 'Med plommonsås på sidan.' },
        { num: '46', name: 'Wokad biff med bambuskott och champinjoner', price: '155 kr' },
        { num: '47', name: 'Nasi goreng', spicy: 1, price: '149 kr', desc: 'Kyckling, biff, räkor, curry smak, lök, purjolök, morötter.' },
        { num: 'NY3', name: '3Måltiders biff med chili', price: '155 kr', desc: 'Lättfriterad biff med färsk lök, paprika och purjolök i hemgjord stark chili- och sötsursås och soja.' },
        { num: 'NY4', name: '3Måltiders kyckling med jordnötssås', price: '135 kr', desc: 'Stekt kycklingfilé med kokosmjölk och jordnötssås.' },
      ],
    },

    thai: {
      title: 'Thairätter',
      items: [
        { num: '48', name: 'Padd graprao nua', price: 'Kyckling 135 kr · Biff 155 kr · Räkor 159 kr', desc: 'Wokad starkbasilikablad, gullök, bambuskott, morötter, paprika, broccoli, vit blomkål och champinjoner.' },
        { num: '49 NY1', name: 'Pad Thai', price: 'Kyckling 135 kr · Biff 149 kr · Räkor 159 kr', desc: 'Thai chilisås, breda risnudlar, grönsaker, ägg, asiatisk fisksås, krossade jordnötter på sidan.' },
        { num: '49 NY2', name: 'Pad Thai (sötsur smak)', price: 'Kyckling 135 kr · Biff 149 kr · Räkor 159 kr', desc: 'Stekt risnudlar med kyckling, böngroddar, purjolök och ägg. Toppad med krossade jordnötter. Citronskiva på sidan.' },
        { num: '50', name: 'Padd medmamuang gai', spicy: 1, price: '139 kr', desc: 'Wokad kyckling med cashewnötter, gullök, morötter, paprika, purjolök, bambuskott, broccoli, vit blomkål, champinjoner.' },
        { num: '51', name: 'Paddking mo', price: 'Kyckling 135 kr · Biff 155 kr · Räkor 159 kr', desc: 'Wok med valfri protein, broccoli, ingefära, gullök, champinjoner, morötter, paprika och blomkål.' },
        { num: '52', name: 'Thai Röd curry', price: 'Kyckling 135 kr · Biff 155 kr · Räkor 159 kr', desc: 'Rödcurry med bambuskott och paprika.' },
        { num: '53', name: 'Pad Phrik Paw', price: 'Kyckling 135 kr · Biff 155 kr · Räkor 159 kr', desc: 'Thai chilipasta, grönsaker, vitlök, citronblad.' },
        { num: '54', name: 'Pad Graphrad', price: 'Kyckling 135 kr · Biff 155 kr · Räkor 159 kr', desc: 'Ostronsås, chilipasta, grönsaker, vitlök, citronblad.' },
      ],
    },

    kombo: {
      title: 'Kombo',
      items: [
        { num: 'NY5', name: 'Kyckling vitlök chilisås + friterad räkor + mini vårrulle', price: '145 kr' },
        { num: 'NY6', name: 'Vegan tofu med grönsaker + dumpling grönsaker + mini vårrulle', price: '145 kr' },
      ],
    },

  }, // end menuCategories

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