import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import NewsCard from './NewsCard';

export const PERFUMES_DATA = [
  {
    id: 'aur-001',
    brand: 'AURELIA PRIVÉ',
    name: 'Noir de Samarkand',
    subtitle: 'Extrait de Parfum • Oriental Woody',
    category: 'Unisex',
    concentration: 'Extrait de Parfum (32%)',
    badge: 'Bestseller',
    isNew: true,
    rating: 4.9,
    reviewsCount: 184,
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
    variants: [
      { volume: '30 ml', price: 1150000, oldPrice: 1350000, stock: 12 },
      { volume: '50 ml', price: 1690000, oldPrice: 1950000, stock: 7 },
      { volume: '100 ml', price: 2490000, oldPrice: 2890000, stock: 4 },
      { volume: '200 ml', price: 3890000, oldPrice: null, stock: 2 },
    ],
    notes: {
      top: ['Za’faron', 'Bergamot', 'Qizil murch'],
      heart: ['Damashq atirguli', 'Ud yog‘ochi', 'Mirra'],
      base: ['Qora ambra', 'Madagaskar vanili', 'Sandal'],
    },
    metrics: {
      longevity: 95,
      sillage: 91,
      season: 'Kuz / Qish',
      origin: 'Fransiya, Grasse',
    },
    mood: 'oriental',
    timeOfDay: 'evening',
    description:
      'Sharqona ziravorlar va noyob qora ud uyg‘unligidagi chuqur, hashamatli va 14 soatgacha saqlanuvchi mualliflik ekstrakti.',
  },
  {
    id: 'aur-002',
    brand: 'AURELIA COLLECTION',
    name: 'Jardin de Soie',
    subtitle: 'Eau de Parfum • Floral Velvet',
    category: 'Ayollar',
    concentration: 'Eau de Parfum (22%)',
    badge: 'Top Reyting',
    isNew: false,
    rating: 4.9,
    reviewsCount: 246,
    image:
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85',
    variants: [
      { volume: '30 ml', price: 890000, oldPrice: null, stock: 15 },
      { volume: '50 ml', price: 1320000, oldPrice: 1520000, stock: 9 },
      { volume: '100 ml', price: 1980000, oldPrice: 2250000, stock: 6 },
      { volume: '200 ml', price: 3100000, oldPrice: null, stock: 3 },
    ],
    notes: {
      top: ['Oq shaftoli', 'Mandarin', 'Pushti pion'],
      heart: ['Damashq atirguli', 'Yasmin sambak', 'Iris'],
      base: ['Oq mushk', 'Kaşmir yog‘ochi', 'Vanil'],
    },
    metrics: {
      longevity: 86,
      sillage: 82,
      season: 'Bahor / Yoz',
      origin: 'Fransiya, Parij',
    },
    mood: 'floral',
    timeOfDay: 'day',
    description:
      'Grasse atirguli va ipakdek mayin oq mushk notalarini birlashtirgan nafis, romantik va jozibali ayollar parfyumi.',
  },
  {
    id: 'aur-003',
    brand: 'AURELIA HOMME',
    name: 'Souverain Cedre',
    subtitle: 'Extrait de Parfum • Woody Aromatic',
    category: 'Erkaklar',
    concentration: 'Extrait de Parfum (30%)',
    badge: 'Bestseller',
    isNew: false,
    rating: 4.8,
    reviewsCount: 198,
    image:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',
    variants: [
      { volume: '30 ml', price: 980000, oldPrice: 1120000, stock: 10 },
      { volume: '50 ml', price: 1490000, oldPrice: 1740000, stock: 5 },
      { volume: '100 ml', price: 2190000, oldPrice: 2490000, stock: 8 },
      { volume: '200 ml', price: 3450000, oldPrice: null, stock: 0 },
    ],
    notes: {
      top: ['Kalabriya bergamoti', 'Qora murch', 'Archa mevasi'],
      heart: ['Atlas kedri', 'Vetiver', 'Lavanda'],
      base: ['Ambroksan', 'Terri akkordi', 'Eman moxi'],
    },
    metrics: {
      longevity: 91,
      sillage: 87,
      season: 'Barcha fasllar',
      origin: 'Fransiya, Grasse',
    },
    mood: 'woody',
    timeOfDay: 'day',
    description:
      'Kuchli xarakter va zamonaviy aristokratiya timsoli: Atlas kedri, tutunli vetiver va tetiklantiruvchi bergamot uyg‘unligi.',
  },
  {
    id: 'aur-004',
    brand: 'AURELIA PRIVÉ',
    name: 'Ambre Impérial',
    subtitle: 'Extrait de Parfum • Amber Spicy',
    category: 'Unisex',
    concentration: 'Extrait de Parfum (35%)',
    badge: 'Cheklangan Nashr',
    isNew: true,
    rating: 5.0,
    reviewsCount: 92,
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=85',
    variants: [
      { volume: '30 ml', price: 1290000, oldPrice: null, stock: 6 },
      { volume: '50 ml', price: 1890000, oldPrice: 2150000, stock: 4 },
      { volume: '100 ml', price: 2790000, oldPrice: 3150000, stock: 3 },
      { volume: '200 ml', price: 4290000, oldPrice: null, stock: 1 },
    ],
    notes: {
      top: ['Dolchin', 'Kardamon', 'Qizil apelsin'],
      heart: ['Benzoin smolasi', 'Labdanum', 'Turkiya atirguli'],
      base: ['Kulrang ambra', 'Tonka loviyasi', 'Sandal'],
    },
    metrics: {
      longevity: 97,
      sillage: 94,
      season: 'Kuz / Qish',
      origin: 'Fransiya, Grasse',
    },
    mood: 'oriental',
    timeOfDay: 'evening',
    description:
      '18 oy eman bochkalarida yetiltirilgan qimmatbaho kulrang ambra, issiq dolchin va benzoin smolasidan iborat shohona kompozitsiya.',
  },
  {
    id: 'aur-005',
    brand: 'AURELIA SOLEIL',
    name: 'Néroli d’Or',
    subtitle: 'Eau de Parfum • Citrus Mediterranean',
    category: 'Unisex',
    concentration: 'Eau de Parfum (18%)',
    badge: 'Yozgi Tanlov',
    isNew: false,
    rating: 4.7,
    reviewsCount: 163,
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85',
    variants: [
      { volume: '30 ml', price: 790000, oldPrice: 920000, stock: 18 },
      { volume: '50 ml', price: 1180000, oldPrice: 1350000, stock: 11 },
      { volume: '100 ml', price: 1750000, oldPrice: 1990000, stock: 7 },
      { volume: '200 ml', price: 2790000, oldPrice: null, stock: 4 },
    ],
    notes: {
      top: ['Tunis nerolisi', 'Bergamot', 'Limon bargi'],
      heart: ['Apelsin guli', 'Petitgrain', 'Oq choy'],
      base: ['Oq ambra', 'Kedr', 'Mayin mushk'],
    },
    metrics: {
      longevity: 81,
      sillage: 78,
      season: 'Bahor / Yoz',
      origin: 'Italiya, Amalfi',
    },
    mood: 'fresh',
    timeOfDay: 'day',
    description:
      'O‘rta yer dengizi quyoshi ostidagi sitrus bog‘lari nafasini o‘zida mujassam etgan sof, yorqin va tetiklantiruvchi eliksir.',
  },
  {
    id: 'aur-006',
    brand: 'AURELIA COLLECTION',
    name: 'Velours Rouge',
    subtitle: 'Extrait de Parfum • Gourmand Floral',
    category: 'Ayollar',
    concentration: 'Extrait de Parfum (30%)',
    badge: 'Bestseller',
    isNew: true,
    rating: 4.9,
    reviewsCount: 215,
    image:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',
    variants: [
      { volume: '30 ml', price: 1090000, oldPrice: 1250000, stock: 9 },
      { volume: '50 ml', price: 1590000, oldPrice: 1820000, stock: 6 },
      { volume: '100 ml', price: 2350000, oldPrice: 2690000, stock: 5 },
      { volume: '200 ml', price: 3690000, oldPrice: null, stock: 2 },
    ],
    notes: {
      top: ['Qora olcha', 'Za’faron', 'Achchiq bodom'],
      heart: ['Damashq atirguli', 'Praline', 'Tuberoza'],
      base: ['Burbon vanili', 'Sandal', 'Peru balzami'],
    },
    metrics: {
      longevity: 93,
      sillage: 90,
      season: 'Kuz / Qish',
      origin: 'Fransiya, Parij',
    },
    mood: 'floral',
    timeOfDay: 'evening',
    description:
      'Baxmaldek mayin qora olcha, qovurilgan bodom va Burbon vanilining unutilmas, jozibador kechki shleyfi.',
  },
  {
    id: 'aur-007',
    brand: 'AURELIA HOMME',
    name: 'Oud Royal de Bukhara',
    subtitle: 'Extrait de Parfum • Leather & Oud',
    category: 'Erkaklar',
    concentration: 'Extrait de Parfum (36%)',
    badge: 'Eksklyuziv',
    isNew: true,
    rating: 4.9,
    reviewsCount: 137,
    image:
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85',
    variants: [
      { volume: '30 ml', price: 1350000, oldPrice: null, stock: 8 },
      { volume: '50 ml', price: 1950000, oldPrice: 2250000, stock: 4 },
      { volume: '100 ml', price: 2890000, oldPrice: 3290000, stock: 3 },
      { volume: '200 ml', price: 4490000, oldPrice: null, stock: 1 },
    ],
    notes: {
      top: ['Muskat yong‘og‘i', 'Bergamot', 'Tutunli ladan'],
      heart: ['Qadimiy Ud yog‘ochi', 'Saffian terisi', 'Pachuli'],
      base: ['Qora ambra', 'Sandal', 'Guayak yog‘ochi'],
    },
    metrics: {
      longevity: 98,
      sillage: 95,
      season: 'Kuz / Qish',
      origin: 'Fransiya, Grasse',
    },
    mood: 'woody',
    timeOfDay: 'evening',
    description:
      'Eng yuqori 36% konsentratsiyali qadimiy ud, saffian terisi va tutunli ladanning mahobatli uyg‘unligi.',
  },
  {
    id: 'aur-008',
    brand: 'AURELIA SOLEIL',
    name: 'Brise d’Azur',
    subtitle: 'Eau de Toilette • Marine & Bergamot',
    category: 'Erkaklar',
    concentration: 'Eau de Toilette (14%)',
    badge: 'Kundalik',
    isNew: false,
    rating: 4.6,
    reviewsCount: 142,
    image:
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85',
    variants: [
      { volume: '30 ml', price: 720000, oldPrice: 850000, stock: 16 },
      { volume: '50 ml', price: 1050000, oldPrice: 1220000, stock: 12 },
      { volume: '100 ml', price: 1580000, oldPrice: 1790000, stock: 9 },
      { volume: '200 ml', price: 2450000, oldPrice: null, stock: 5 },
    ],
    notes: {
      top: ['Dengiz shabadasi', 'Greypfrut', 'Bergamot'],
      heart: ['Rozmarin', 'Kiparis', 'Yalpiz'],
      base: ['Oq kedr', 'Ambroksan', 'Dengiz moxi'],
    },
    metrics: {
      longevity: 79,
      sillage: 76,
      season: 'Bahor / Yoz',
      origin: 'Fransiya, Nitssa',
    },
    mood: 'fresh',
    timeOfDay: 'day',
    description:
      'Moviy sohilda tonggi dengiz shabadasi va yovvoyi rozmarin iforini eslatuvchi sof va zamonaviy erkaklar atiri.',
  },
];

export const ARTICLES_DATA = [
  {
    id: 'news-001',
    category: 'Yangi Kolleksiya',
    title: 'Grasse atirgullari va Sharq udi: "Silk Road Elixir" kolleksiyasi taqdimoti',
    excerpt:
      'AURELIA PARFUMS parfyumeriya uyi 2026-yil kuz-qish mavsumi uchun maxsus yaratilgan va 18 oy davomida eman bochkalarida yetiltirilgan yangi eksklyuziv kolleksiyasini taqdim etdi.',
    content:
      'Fransiyaning Grasse shahridagi tarixiy laboratoriyamizda yaratilgan "Silk Road Elixir" kolleksiyasi Buyuk Ipak yo‘lining qadimiy ziravorlar karvonidan ilhomlangan. Har bir flakon qo‘lda sayqallangan billur shishadan tayyorlangan bo‘lib, tarkibida 35% gacha sof parfyum ekstrakti mavjud. Kolleksiya Toshkent, Samarqand va Buxoro butiklarida cheklangan miqdorda sotuvga chiqarildi.',
    image:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1100&q=85',
    date: '14 Noyabr, 2026',
    readTime: '4 daqiqa o‘qish',
    views: 1840,
    initialLikes: 124,
    featured: true,
    author: {
      name: 'Kamila Alimova',
      role: 'Bosh Parfyumer & Ekspert',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['Extrait de Parfum', 'Grasse', 'Yangi kolleksiya', 'Niche'],
  },
  {
    id: 'news-002',
    category: 'Parfyumeriya San’ati',
    title: 'Nima uchun Extrait de Parfum terida 14 soatdan ortiq saqlanadi?',
    excerpt:
      'Parfyum konsentratsiyasi, molekulalarning og‘irligi va eman bochkalarida matseratsiya jarayoni atirning shleyf kuchiga qanday ta’sir qilishini tahlil qilamiz.',
    content:
      'Oddiy Eau de Toilette tarkibida 8–12% aromatik moylar bo‘lsa, Extrait de Parfum konsentratsiyasi 30% dan 40% gacha yetadi. Kam alkogolli formula terini quritmaydi va baza notalari — ambra, sandal hamda udning asta-sekin ochilishini ta’minlaydi.',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',
    date: '09 Noyabr, 2026',
    readTime: '5 daqiqa o‘qish',
    views: 1290,
    initialLikes: 89,
    featured: false,
    author: {
      name: 'Anri Delakrua',
      role: 'Grasse Laboratoriyasi Texnologi',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['Turg‘unlik', 'Matseratsiya', 'Extrait de Parfum'],
  },
  {
    id: 'news-003',
    category: 'Maslahatlar',
    title: 'Fragrance Layering: Ikki xil atirni birlashtirib o‘z imzo hidingizni yarating',
    excerpt:
      'Yog‘ochli baza va gulli yoki sitrusli yuqori notalarni qatlamlab sepish orqali mutlaqo takrorlanmas shaxsiy kompozitsiya tuzish qoidalari.',
    content:
      'Layering san’atining oltin qoidasi: avval og‘irroq va quyuqroq baza notali atirni (masalan, Ambre Impérial) puls nuqtalariga seping, 2 daqiqadan so‘ng esa yengil sitrusli yoki gulli kompozitsiyani (Néroli d’Or) ustidan qo‘llang.',
    image:
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85',
    date: '02 Noyabr, 2026',
    readTime: '3 daqiqa o‘qish',
    views: 980,
    initialLikes: 74,
    featured: false,
    author: {
      name: 'Madina Karimova',
      role: 'AURELIA Parfyum Somelyesi',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['Layering', 'Maslahatlar', 'Shleyf'],
  },
  {
    id: 'news-004',
    category: 'Intervyu',
    title: 'Samarqand ziravorlari va Parij maktabi: Zamonaviy Sharq parfyumeriyasi uyg‘onishi',
    excerpt:
      'Nega bugun Yevropaning eng nufuzli parfyumerlari za’faron, qora ud va Buxoro ambrasi bilan ishlashga intilmoqda?',
    content:
      'Sharqona ingredientlar nafaqat boy tarixga, balki noyob tabiiy fiksator xususiyatiga ham ega. Za’faronning metallik-issiq ohangi va haqiqiy ud yog‘ochining chuqurligi har bir flakonga tirik ruh bag‘ishlaydi.',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
    date: '26 Oktabr, 2026',
    readTime: '6 daqiqa o‘qish',
    views: 1510,
    initialLikes: 112,
    featured: false,
    author: {
      name: 'Kamila Alimova',
      role: 'Bosh Parfyumer & Ekspert',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['Samarqand', 'Ud yog‘ochi', 'Intervyu'],
  },
];

const QUICK_NOTES = [
  'Barchasi',
  'Ud yog‘ochi',
  'Damashq atirguli',
  'Bergamot',
  'Sandal',
  'vanil',
  'ambra',
];

const Perfume = ({
  products = PERFUMES_DATA,
  articles = ARTICLES_DATA,
  searchQuery = '',
  onSearchChange,
  selectedCategory = 'All',
  onSelectCategory,
  noteFilter = '',
  onSelectNoteFilter,
  onAddToCart,
  wishlistIds = [],
  onToggleWishlist,
  compareIds = [],
  onToggleCompare,
  onQuickView,
  bookmarkedArticleIds = [],
  onToggleBookmarkArticle,
  onReadArticle,
  currency = 'UZS',
  onOpenConsultation,
}) => {
  // Hero sahnadagi tanlangan flagman atir indeksi
  const [heroShowcaseIndex, setHeroShowcaseIndex] = useState(0);

  // Katalog filtrlari
  const [selectedConcentration, setSelectedConcentration] = useState('All');
  const [maxPriceLimit, setMaxPriceLimit] = useState(3500000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'
  const [visibleCount, setVisibleCount] = useState(6);

  // Interaktiv Shaxsiy Somelye (Scent Finder) holati
  const [finderGender, setFinderGender] = useState('Unisex');
  const [finderMood, setFinderMood] = useState('oriental');
  const [finderTime, setFinderTime] = useState('evening');

  // Jurnal kategoriya filtri
  const [selectedArticleCat, setSelectedArticleCat] = useState('Barchasi');

  const heroPerfumes = useMemo(() => products.slice(0, 3), [products]);
  const activeHeroPerfume = heroPerfumes[heroShowcaseIndex] || products[0];

  const formatMoney = (amount) => {
    if (currency === 'USD') {
      return `$${Math.round(amount / 12800)}`;
    }
    return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
  };

  // Kategoriya bo'yicha sonlarni hisoblash
  const categoryCounts = useMemo(() => {
    return {
      All: products.length,
      Ayollar: products.filter((p) => p.category === 'Ayollar').length,
      Erkaklar: products.filter((p) => p.category === 'Erkaklar').length,
      Unisex: products.filter((p) => p.category === 'Unisex').length,
    };
  }, [products]);

  // Asosiy Katalog filtrlash va saralash
  const filteredPerfumes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const activeNote = noteFilter.trim().toLowerCase();

    const filtered = products.filter((item) => {
      // 1. Kategoriya filtri
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Konsentratsiya filtri
      if (
        selectedConcentration !== 'All' &&
        !item.concentration.toLowerCase().includes(selectedConcentration.toLowerCase())
      ) {
        return false;
      }

      // 3. Maksimal narx filtri (50 ml yoki birinchi variant bo'yicha)
      const refVariant = item.variants?.[1] || item.variants?.[0];
      if (refVariant && refVariant.price > maxPriceLimit) {
        return false;
      }

      // 4. Nota filtri
      if (activeNote && activeNote !== 'barchasi') {
        const allNotes = [
          ...(item.notes?.top || []),
          ...(item.notes?.heart || []),
          ...(item.notes?.base || []),
        ].map((n) => n.toLowerCase());
        const matchesNote =
          allNotes.some((n) => n.includes(activeNote)) ||
          item.concentration.toLowerCase().includes(activeNote);
        if (!matchesNote) return false;
      }

      // 5. Qidiruv so'zi filtri
      if (query) {
        const inName = item.name.toLowerCase().includes(query);
        const inBrand = item.brand.toLowerCase().includes(query);
        const inSub = item.subtitle.toLowerCase().includes(query);
        const inNotes = [
          ...(item.notes?.top || []),
          ...(item.notes?.heart || []),
          ...(item.notes?.base || []),
        ].some((n) => n.toLowerCase().includes(query));

        if (!inName && !inBrand && !inSub && !inNotes) {
          return false;
        }
      }

      return true;
    });

    // Saralash (Sorting)
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort(
          (a, b) => (a.variants?.[0]?.price || 0) - (b.variants?.[0]?.price || 0)
        );
        break;
      case 'price-desc':
        sorted.sort(
          (a, b) => (b.variants?.[0]?.price || 0) - (a.variants?.[0]?.price || 0)
        );
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
        break;
      case 'longevity':
        sorted.sort(
          (a, b) => (b.metrics?.longevity || 0) - (a.metrics?.longevity || 0)
        );
        break;
      default:
        break;
    }

    return sorted;
  }, [
    products,
    selectedCategory,
    selectedConcentration,
    maxPriceLimit,
    noteFilter,
    searchQuery,
    sortBy,
  ]);

  // Shaxsiy Somelye (Scent Finder) natijalari
  const sommelierRecommendations = useMemo(() => {
    return products
      .map((item) => {
        let score = 68;
        if (item.category === finderGender) score += 14;
        else if (item.category === 'Unisex' || finderGender === 'Unisex') score += 8;

        if (item.mood === finderMood) score += 12;
        if (item.timeOfDay === finderTime) score += 5;

        return {
          ...item,
          matchPercent: Math.min(99, score),
        };
      })
      .sort((a, b) => b.matchPercent - a.matchPercent)
      .slice(0, 3);
  }, [products, finderGender, finderMood, finderTime]);

  // Bestsellerlar ro'yxati
  const bestsellerPerfumes = useMemo(() => {
    return products
      .filter((p) => p.badge === 'Bestseller' || p.rating >= 4.9)
      .slice(0, 4);
  }, [products]);

  // Jurnal maqolalarini filtrlash
  const articleCategories = useMemo(() => {
    const cats = Array.from(new Set(articles.map((a) => a.category)));
    return ['Barchasi', ...cats];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (selectedArticleCat === 'Barchasi') return articles;
    return articles.filter((a) => a.category === selectedArticleCat);
  }, [articles, selectedArticleCat]);

  const featuredArticle =
    filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const secondaryArticles = filteredArticles.filter(
    (a) => a.id !== featuredArticle?.id
  );

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedConcentration !== 'All' ||
    maxPriceLimit < 3500000 ||
    Boolean(noteFilter) ||
    Boolean(searchQuery.trim());

  const handleResetAllFilters = () => {
    if (onSelectCategory) onSelectCategory('All');
    if (onSelectNoteFilter) onSelectNoteFilter('');
    if (onSearchChange) onSearchChange('');
    setSelectedConcentration('All');
    setMaxPriceLimit(3500000);
    setSortBy('featured');
    setVisibleCount(6);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="perfume-page">
      {/* =====================================================================
          1. HASHAMATLI HERO SAHNA (AURELIA PRIVÉ SHOWCASE)
         ===================================================================== */}
      <section id="hero" className="perfume-hero">
        <div className="perfume-hero__ambient-orb perfume-hero__ambient-orb--left" />
        <div className="perfume-hero__ambient-orb perfume-hero__ambient-orb--right" />

        <div className="perfume-container perfume-hero__grid">
          {/* Chap ustun: Brend manifesti va CTA */}
          <div className="perfume-hero__content">
            <div className="perfume-hero__eyebrow">
              <span className="perfume-hero__eyebrow-dot" />
              <span>GRASSE • PARIS • SAMARKAND — 2026 KOLLEKSIYASI</span>
            </div>

            <h1 className="perfume-hero__title">
              Har bir tomchida{' '}
              <span className="perfume-hero__title-gold">abadiy joziba</span> va
              Sharq siri
            </h1>

            <p className="perfume-hero__description">
              AURELIA PARFUMS — Fransiyaning Grasse laboratoriyalarida 18 oy
              davomida eman bochkalarida yetiltirilgan, 30% dan 36% gacha sof
              parfyum ekstraktiga ega mualliflik niche atirlar uyi.
            </p>

            <div className="perfume-hero__cta-group">
              <button
                type="button"
                className="perfume-btn perfume-btn--primary"
                onClick={scrollToCatalog}
              >
                <span>Kolleksiyani kashf etish</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                type="button"
                className="perfume-btn perfume-btn--glass"
                onClick={() => {
                  const el = document.getElementById('scent-finder');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Shaxsiy atir tanlash (AI Somelye)</span>
              </button>
            </div>

            {/* Uy ko'rsatkichlari */}
            <div className="perfume-hero__stats">
              <div className="perfume-hero__stat">
                <strong>36%</strong>
                <span>Sof Extrait konsentratsiya</span>
              </div>
              <div className="perfume-hero__stat-divider" />
              <div className="perfume-hero__stat">
                <strong>14+ soat</strong>
                <span>Terida turg‘un shleyf</span>
              </div>
              <div className="perfume-hero__stat-divider" />
              <div className="perfume-hero__stat">
                <strong>100%</strong>
                <span>Grasse tabiiy essensiyalari</span>
              </div>
            </div>
          </div>

          {/* O'ng ustun: Interaktiv Flagman Flakon Vitrina */}
          {activeHeroPerfume && (
            <div className="perfume-hero__stage">
              <div className="perfume-hero__bottle-card">
                <div className="perfume-hero__ring perfume-hero__ring--outer" />
                <div className="perfume-hero__ring perfume-hero__ring--inner" />

                <div className="perfume-hero__bottle-top">
                  <span className="perfume-hero__bottle-badge">
                    {activeHeroPerfume.badge || 'Signature'}
                  </span>
                  <span className="perfume-hero__bottle-conc">
                    {activeHeroPerfume.concentration}
                  </span>
                </div>

                <div
                  className="perfume-hero__bottle-visual"
                  onClick={() => onQuickView && onQuickView(activeHeroPerfume)}
                >
                  <img
                    src={activeHeroPerfume.image}
                    alt={activeHeroPerfume.name}
                    className="perfume-hero__bottle-img"
                  />
                </div>

                {/* Suzuvchi nota chiplari */}
                <div className="perfume-hero__floating-notes">
                  {activeHeroPerfume.notes.top.slice(0, 2).map((n) => (
                    <span key={n} className="perfume-hero__note-pill">
                      ✦ {n}
                    </span>
                  ))}
                  <span className="perfume-hero__note-pill">
                    ✦ {activeHeroPerfume.notes.base[0]}
                  </span>
                </div>

                <div className="perfume-hero__bottle-info">
                  <div>
                    <span className="perfume-hero__bottle-brand">
                      {activeHeroPerfume.brand}
                    </span>
                    <h3 className="perfume-hero__bottle-name">
                      {activeHeroPerfume.name}
                    </h3>
                  </div>
                  <div className="perfume-hero__bottle-price">
                    <span>50 ml</span>
                    <strong>
                      {formatMoney(
                        (activeHeroPerfume.variants?.[1] ||
                          activeHeroPerfume.variants?.[0])?.price || 0
                      )}
                    </strong>
                  </div>
                </div>

                <div className="perfume-hero__bottle-actions">
                  <button
                    type="button"
                    className="perfume-btn perfume-btn--primary perfume-btn--sm"
                    onClick={() => {
                      const variant =
                        activeHeroPerfume.variants?.[1] ||
                        activeHeroPerfume.variants?.[0];
                      if (onAddToCart && variant) {
                        onAddToCart({
                          id: `${activeHeroPerfume.id}-${variant.volume}`,
                          productId: activeHeroPerfume.id,
                          brand: activeHeroPerfume.brand,
                          name: activeHeroPerfume.name,
                          image: activeHeroPerfume.image,
                          volume: variant.volume,
                          price: variant.price,
                          quantity: 1,
                        });
                      }
                    }}
                  >
                    Savatga qo‘shish
                  </button>
                  <button
                    type="button"
                    className="perfume-btn perfume-btn--outline perfume-btn--sm"
                    onClick={() => onQuickView && onQuickView(activeHeroPerfume)}
                  >
                    Notalarni ko‘rish
                  </button>
                </div>
              </div>

              {/* Flagman almashtirgich tugmalari */}
              <div className="perfume-hero__switcher">
                {heroPerfumes.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHeroShowcaseIndex(idx)}
                    className={`perfume-hero__switch-item ${
                      heroShowcaseIndex === idx
                        ? 'perfume-hero__switch-item--active'
                        : ''
                    }`}
                  >
                    <img src={item.image} alt={item.name} />
                    <div>
                      <span>0{idx + 1}</span>
                      <strong>{item.name}</strong>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          2. INTERAKTIV SHAXSIY PARFYUM SOMELYE (SCENT FINDER)
         ===================================================================== */}
      <section id="scent-finder" className="scent-finder">
        <div className="perfume-container">
          <div className="scent-finder__wrapper">
            <div className="scent-finder__header">
              <span className="perfume-section-eyebrow">INDIVIDUAL TAVSIYA TIZIMI</span>
              <h2 className="perfume-section-title">
                O‘z xarakteringizga mos <span>imzo atirni</span> toping
              </h2>
              <p className="perfume-section-subtitle">
                Uchta parametrni belgilang — parfyumeriya algoritmimiz siz uchun eng yuqori
                moslikka ega 3 ta kompozitsiyani hisoblab beradi.
              </p>
            </div>

            <div className="scent-finder__controls">
              {/* Parametr 1: Kim uchun */}
              <div className="scent-finder__step">
                <label className="scent-finder__step-label">
                  <span>01</span> Kim uchun tanlayapsiz?
                </label>
                <div className="scent-finder__options">
                  {[
                    { value: 'Ayollar', label: 'Ayollar uchun' },
                    { value: 'Erkaklar', label: 'Erkaklar uchun' },
                    { value: 'Unisex', label: 'Unisex (Universal)' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFinderGender(opt.value)}
                      className={`scent-finder__chip ${
                        finderGender === opt.value ? 'scent-finder__chip--active' : ''
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parametr 2: Hid yo'nalishi */}
              <div className="scent-finder__step">
                <label className="scent-finder__step-label">
                  <span>02</span> Qanday hid kayfiyatini yoqtirasiz?
                </label>
                <div className="scent-finder__options">
                  {[
                    { value: 'oriental', label: 'Sharqona, Ud & Ziravorli' },
                    { value: 'floral', label: 'Gulli, Nafis & Vanilli' },
                    { value: 'woody', label: 'Yog‘ochli, Kedr & Teri' },
                    { value: 'fresh', label: 'Sitrusli, Dengiz & Sof' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFinderMood(opt.value)}
                      className={`scent-finder__chip ${
                        finderMood === opt.value ? 'scent-finder__chip--active' : ''
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parametr 3: Vaqt va Fasl */}
              <div className="scent-finder__step">
                <label className="scent-finder__step-label">
                  <span>03</span> Qachon foydalanasiz?
                </label>
                <div className="scent-finder__options">
                  {[
                    { value: 'day', label: 'Kunduzgi uchrashuv & Ofis' },
                    { value: 'evening', label: 'Kechki tadbir & Maxsus kecha' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFinderTime(opt.value)}
                      className={`scent-finder__chip ${
                        finderTime === opt.value ? 'scent-finder__chip--active' : ''
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tavsiya etilgan Top 3 natijalar */}
            <div className="scent-finder__results">
              {sommelierRecommendations.map((rec) => {
                const defaultVar = rec.variants?.[1] || rec.variants?.[0];
                return (
                  <div key={rec.id} className="scent-finder__result-card">
                    <div className="scent-finder__match-badge">
                      {rec.matchPercent}% Moslik
                    </div>
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="scent-finder__result-img"
                      onClick={() => onQuickView && onQuickView(rec)}
                    />
                    <div className="scent-finder__result-body">
                      <span className="scent-finder__result-brand">{rec.brand}</span>
                      <h4>{rec.name}</h4>
                      <p>{rec.notes.top.join(' • ')}</p>
                      <div className="scent-finder__result-footer">
                        <strong>{formatMoney(defaultVar?.price || 0)}</strong>
                        <button
                          type="button"
                          onClick={() => onQuickView && onQuickView(rec)}
                        >
                          Ko‘rish →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ASOSIY ATIRLAR KATALOGI VA KO'P MEZONLI FILTRLAR
         ===================================================================== */}
      <section id="catalog" className="perfume-catalog">
        <div className="perfume-container">
          <div className="perfume-section-head">
            <div>
              <span className="perfume-section-eyebrow">EKSKLYUZIV KOLLEKSIYA</span>
              <h2 className="perfume-section-title">
                AURELIA <span>Parfyumeriya Katalogi</span>
              </h2>
            </div>

            {onOpenConsultation && (
              <button
                type="button"
                className="perfume-btn perfume-btn--outline"
                onClick={onOpenConsultation}
              >
                Somelye bilan bog‘lanish
              </button>
            )}
          </div>

          {/* Kategoriya Tablari va Ko'rinish Boshqaruvi */}
          <div className="perfume-catalog__toolbar">
            <div className="perfume-catalog__categories" role="tablist">
              {[
                { key: 'All', label: 'Barcha atirlar' },
                { key: 'Ayollar', label: 'Ayollar' },
                { key: 'Erkaklar', label: 'Erkaklar' },
                { key: 'Unisex', label: 'Unisex & Niche' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat.key}
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory(cat.key);
                    setVisibleCount(8);
                  }}
                  className={`perfume-catalog__cat-btn ${
                    selectedCategory === cat.key
                      ? 'perfume-catalog__cat-btn--active'
                      : ''
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="perfume-catalog__cat-count">
                    {categoryCounts[cat.key] || 0}
                  </span>
                </button>
              ))}
            </div>

            <div className="perfume-catalog__controls-right">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="perfume-catalog__select"
                aria-label="Saralash turi"
              >
                <option value="featured">Saralash: Tavsiya etilgan</option>
                <option value="rating">Eng yuqori reyting</option>
                <option value="longevity">Eng turg‘un (Longevity)</option>
                <option value="price-asc">Narx: arzondan qimmatga</option>
                <option value="price-desc">Narx: qimmatdan arzonga</option>
              </select>

              <div className="perfume-catalog__view-toggle">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`perfume-catalog__view-btn ${
                    viewMode === 'grid' ? 'perfume-catalog__view-btn--active' : ''
                  }`}
                  title="Keng panjara ko'rinishi"
                  aria-label="Keng panjara ko'rinishi"
                >
                  ⊞
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  className={`perfume-catalog__view-btn ${
                    viewMode === 'compact' ? 'perfume-catalog__view-btn--active' : ''
                  }`}
                  title="Ixcham ko'rinish"
                  aria-label="Ixcham ko'rinish"
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {/* Kengaytirilgan Filtr Paneli: Konsentratsiya, Narx va Hid Notalari */}
          <div className="perfume-catalog__filters-panel">
            <div className="perfume-catalog__filter-group">
              <span className="perfume-catalog__filter-title">Konsentratsiya:</span>
              <div className="perfume-catalog__pill-row">
                {['All', 'Extrait de Parfum', 'Eau de Parfum', 'Eau de Toilette'].map(
                  (conc) => (
                    <button
                      key={conc}
                      type="button"
                      onClick={() => setSelectedConcentration(conc)}
                      className={`perfume-catalog__filter-pill ${
                        selectedConcentration === conc
                          ? 'perfume-catalog__filter-pill--active'
                          : ''
                      }`}
                    >
                      {conc === 'All' ? 'Barchasi' : conc}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="perfume-catalog__filter-group">
              <span className="perfume-catalog__filter-title">
                Maksimal narx (50 ml):{' '}
                <strong>{formatMoney(maxPriceLimit)}</strong>
              </span>
              <input
                type="range"
                min="800000"
                max="3500000"
                step="100000"
                value={maxPriceLimit}
                onChange={(e) => setMaxPriceLimit(Number(e.target.value))}
                className="perfume-catalog__range"
                aria-label="Maksimal narx filtri"
              />
            </div>

            <div className="perfume-catalog__filter-group perfume-catalog__filter-group--full">
              <span className="perfume-catalog__filter-title">Asosiy hid notasi:</span>
              <div className="perfume-catalog__pill-row">
                {QUICK_NOTES.map((note) => {
                  const isActive =
                    (note === 'Barchasi' && !noteFilter) ||
                    noteFilter.toLowerCase() === note.toLowerCase();
                  return (
                    <button
                      key={note}
                      type="button"
                      onClick={() => {
                        if (onSelectNoteFilter) {
                          onSelectNoteFilter(note === 'Barchasi' ? '' : note);
                        }
                      }}
                      className={`perfume-catalog__filter-pill ${
                        isActive ? 'perfume-catalog__filter-pill--active' : ''
                      }`}
                    >
                      {note === 'vanil'
                        ? 'Vanil'
                        : note === 'ambra'
                        ? 'Ambra'
                        : note}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Natijalar soni va Faol filtrlarni tozalash */}
          <div className="perfume-catalog__status-bar">
            <span>
              Jami <strong>{filteredPerfumes.length}</strong> ta atir topildi
              {searchQuery && (
                <>
                  {' '}
                  — qidiruv: <em>“{searchQuery}”</em>
                </>
              )}
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                className="perfume-catalog__reset-btn"
                onClick={handleResetAllFilters}
              >
                ✕ Barcha filtrlarni tozalash
              </button>
            )}
          </div>

          {/* ProductCard Grid */}
          {filteredPerfumes.length > 0 ? (
            <>
              <div
                className={`perfume-catalog__grid ${
                  viewMode === 'compact' ? 'perfume-catalog__grid--compact' : ''
                }`}
              >
                {filteredPerfumes.slice(0, visibleCount).map((perfume) => (
                  <ProductCard
                    key={perfume.id}
                    product={perfume}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlistIds.includes(perfume.id)}
                    onQuickView={onQuickView}
                    onCompare={onToggleCompare}
                    isCompared={compareIds.includes(perfume.id)}
                  />
                ))}
              </div>

              {visibleCount < filteredPerfumes.length && (
                <div className="perfume-catalog__load-more">
                  <button
                    type="button"
                    className="perfume-btn perfume-btn--outline"
                    onClick={() => setVisibleCount((prev) => prev + 4)}
                  >
                    Yana ko‘rsatish ({filteredPerfumes.length - visibleCount} ta qoldi)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="perfume-catalog__empty">
              <div className="perfume-catalog__empty-icon">✦</div>
              <h3>Tanlangan mezonlar bo‘yicha atir topilmadi</h3>
              <p>
                Qidiruv so‘zini o‘zgartirib ko‘ring yoki barcha filtrlarni asl holatiga
                qaytaring.
              </p>
              <button
                type="button"
                className="perfume-btn perfume-btn--primary"
                onClick={handleResetAllFilters}
              >
                Katalogni to‘liq ko‘rsatish
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          4. BESTSELLERLAR VA GRASSE PARFYUMERIYA SAN'ATI
         ===================================================================== */}
      <section id="bestsellers" className="perfume-bestsellers">
        <div className="perfume-container">
          <div className="perfume-section-head">
            <div>
              <span className="perfume-section-eyebrow">MIJOZLAR TANLOVI</span>
              <h2 className="perfume-section-title">
                Eng ko‘p sevilgan <span>Bestsellerlar</span>
              </h2>
            </div>
          </div>

          <div className="perfume-bestsellers__grid">
            {bestsellerPerfumes.map((perfume) => (
              <ProductCard
                key={`best-${perfume.id}`}
                product={perfume}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(perfume.id)}
                onQuickView={onQuickView}
                onCompare={onToggleCompare}
                isCompared={compareIds.includes(perfume.id)}
              />
            ))}
          </div>

          {/* 3 Bosqichli Grasse Matseratsiya Jarayoni */}
          <div className="perfume-atelier">
            <div className="perfume-atelier__intro">
              <span className="perfume-section-eyebrow">GRASSE ATELIER MEROSI</span>
              <h3>Nima uchun AURELIA atirlari o‘zgacha yangraydi?</h3>
            </div>

            <div className="perfume-atelier__steps">
              <div className="perfume-atelier__card">
                <span className="perfume-atelier__num">01</span>
                <h4>Tonggi Gul Terimi</h4>
                <p>
                  May atirguli va yasmin gullari quyosh chiqmasdan oldin qo‘lda teriladi —
                  aynan shu pallada efir moylari eng yuqori konsentratsiyada bo‘ladi.
                </p>
              </div>

              <div className="perfume-atelier__card">
                <span className="perfume-atelier__num">02</span>
                <h4>18 Oylik Matseratsiya</h4>
                <p>
                  Tayyor kompozitsiya shishaga quyilishidan avval maxsus haroratda 18 oy
                  yetiltiriladi, bu esa notalarning ipakdek silliq uyg‘unligini yaratadi.
                </p>
              </div>

              <div className="perfume-atelier__card">
                <span className="perfume-atelier__num">03</span>
                <h4>Raqamlangan Billur Flakon</h4>
                <p>
                  Har bir flakon individual partiya raqamiga ega bo‘lib, ultrabinafsha
                  nurlardan himoyalovchi qalin qora-oltin shishada taqdim etiladi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. PARFYUM JURNALI VA YANGILIKLAR (NewsCard)
         ===================================================================== */}
      <section id="journal" className="perfume-journal">
        <div className="perfume-container">
          <div className="perfume-section-head">
            <div>
              <span className="perfume-section-eyebrow">AURELIA JOURNAL</span>
              <h2 className="perfume-section-title">
                Parfyumeriya olami <span>yangiliklari va maqolalar</span>
              </h2>
            </div>

            <div className="perfume-journal__tabs">
              {articleCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedArticleCat(cat)}
                  className={`perfume-journal__tab ${
                    selectedArticleCat === cat
                      ? 'perfume-journal__tab--active'
                      : ''
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Asosiy Featured Maqola */}
          {featuredArticle && (
            <div className="perfume-journal__featured">
              <NewsCard
                article={featuredArticle}
                featured={true}
                onReadMore={onReadArticle}
                onToggleBookmark={onToggleBookmarkArticle}
                isBookmarked={bookmarkedArticleIds.includes(featuredArticle.id)}
                onTagClick={(tag) => {
                  if (onSearchChange) onSearchChange(tag);
                  scrollToCatalog();
                }}
              />
            </div>
          )}

          {/* Qolgan Maqolalar Gridi */}
          {secondaryArticles.length > 0 && (
            <div className="perfume-journal__grid">
              {secondaryArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  featured={false}
                  onReadMore={onReadArticle}
                  onToggleBookmark={onToggleBookmarkArticle}
                  isBookmarked={bookmarkedArticleIds.includes(article.id)}
                  onTagClick={(tag) => {
                    if (onSearchChange) onSearchChange(tag);
                    scrollToCatalog();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Perfume;