import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Header.css';

const ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    badge: 'BEPUL YETKAZIB BERISH',
    text: '1 500 000 so‘mdan yuqori barcha buyurtmalar O‘zbekiston bo‘ylab bepul yetkazib beriladi',
  },
  {
    id: 'ann-2',
    badge: 'EKSKLYUZIV SOVG‘A',
    text: 'Har bir xaridga 2 ta 2 ml hajmdagi mualliflik niche atir probniklari sovg‘a sifatida qo‘shiladi',
  },
  {
    id: 'ann-3',
    badge: '100% ORIGINAL',
    text: 'Fransiyaning Grasse laboratoriyalari va rasmiy parfyumeriya uylaridan to‘g‘ridan-to‘g‘ri yetkazma',
  },
  {
    id: 'ann-4',
    badge: 'AURELIA PRIVÉ CLUB',
    text: 'Ro‘yxatdan o‘ting va birinchi buyurtmangiz uchun 10% maxsus keshbekka ega bo‘ling',
  },
];

const NAV_ITEMS = [
  { id: 'hero', label: 'Bosh sahifa', hasMegaMenu: false },
  { id: 'catalog', label: 'Katalog', hasMegaMenu: true },
  { id: 'bestsellers', label: 'Bestsellerlar', hasMegaMenu: false },
  { id: 'journal', label: 'Parfyum Jurnali', hasMegaMenu: false },
  { id: 'boutiques', label: 'Butiklarimiz', hasMegaMenu: false },
];

const MEGA_MENU_DATA = {
  categories: [
    { label: 'Barcha atirlar', value: 'All', count: '120+' },
    { label: 'Ayollar parfyumeriyasi', value: 'Ayollar', count: '48' },
    { label: 'Erkaklar parfyumeriyasi', value: 'Erkaklar', count: '42' },
    { label: 'Unisex & Niche', value: 'Unisex', count: '36' },
  ],
  olfactoryFamilies: [
    { label: 'Sharqona & Ud', note: 'Ud yog‘ochi', desc: 'Chuqur, issiq va sirli kompozitsiyalar' },
    { label: 'Gulli & Nafis', note: 'Damashq atirguli', desc: 'Nozik gul yaproqlari va ipak shleyf' },
    { label: 'Yog‘ochli & Ambra', note: 'Sandal', desc: 'Mustahkam, aristokratik va jozibali' },
    { label: 'Sitrus & Fresh', note: 'Bergamot', desc: 'Yengil, tetiklantiruvchi va kundalik' },
  ],
  concentrations: [
    { code: 'Extrait', name: 'Extrait de Parfum', strength: '30% – 40% moy • 14+ soat' },
    { code: 'EDP', name: 'Eau de Parfum', strength: '15% – 20% moy • 8–10 soat' },
    { code: 'EDT', name: 'Eau de Toilette', strength: '8% – 12% moy • 4–6 soat' },
  ],
};

const POPULAR_SEARCHES = [
  'Noir de Samarkand',
  'Ud yog‘ochi',
  'Extrait de Parfum',
  'Bergamot',
  'Vanil & Ambra',
];

const Header = ({
  activeSection = 'hero',
  onNavigate,
  searchQuery = '',
  onSearchChange,
  onSelectCategory,
  onSelectNoteFilter,
  cartCount = 0,
  cartTotal = 0,
  wishlistCount = 0,
  compareCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  products = [],
  onQuickView,
  currency = 'UZS',
  onToggleCurrency,
}) => {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(true);
  const [cartBadgeBounce, setCartBadgeBounce] = useState(false);

  const searchContainerRef = useRef(null);
  const megaMenuTimeoutRef = useRef(null);
  const prevCartCountRef = useRef(cartCount);

  // E'lonlar lentasini avtomatik almashtirish
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Skroll holati va progress chizig'ini kuzatish
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 36);

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Savatga yangi mahsulot qo'shilganda badge animatsiyasi
  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setCartBadgeBounce(true);
      const timer = setTimeout(() => setCartBadgeBounce(false), 550);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  // Qidiruv oynasidan tashqariga bosilganda yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mobil menyu ochilganda sahifa skrollini bloklash
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Jonli qidiruv natijalari
  const instantSearchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query || !products || products.length === 0) return [];

    return products
      .filter((item) => {
        const inName = item.name?.toLowerCase().includes(query);
        const inBrand = item.brand?.toLowerCase().includes(query);
        const inSubtitle = item.subtitle?.toLowerCase().includes(query);
        const inNotes =
          item.notes &&
          [
            ...(item.notes.top || []),
            ...(item.notes.heart || []),
            ...(item.notes.base || []),
          ].some((n) => n.toLowerCase().includes(query));
        return inName || inBrand || inSubtitle || inNotes;
      })
      .slice(0, 4);
  }, [searchQuery, products]);

  const formatMoney = (amount) => {
    if (currency === 'USD') {
      const usdValue = (amount / 12800).toFixed(0);
      return `$${usdValue}`;
    }
    return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
  };

  const handleNavClick = (sectionId) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setIsMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 180);
  };

  const handleCategoryChoose = (categoryValue) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(categoryValue);
    }
    handleNavClick('catalog');
  };

  const handleNoteChoose = (noteValue) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onSelectNoteFilter) {
      onSelectNoteFilter(noteValue);
    } else if (onSearchChange) {
      onSearchChange(noteValue);
    }
    handleNavClick('catalog');
  };

  const handleNextAnnouncement = () => {
    setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  const handlePrevAnnouncement = () => {
    setAnnouncementIndex((prev) =>
      prev === 0 ? ANNOUNCEMENTS.length - 1 : prev - 1
    );
  };

  const activeAnnouncement = ANNOUNCEMENTS[announcementIndex];

  return (
    <header
      className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}
      onMouseLeave={handleMegaMenuLeave}
    >
      {/* 1. Yuqori e'lonlar lentasi (Announcement Bar) */}
      <div className="site-header__announcement">
        <div className="site-header__container site-header__announcement-inner">
          <button
            type="button"
            className="site-header__ann-arrow"
            onClick={handlePrevAnnouncement}
            aria-label="Oldingi e'lon"
          >
            ‹
          </button>

          <div key={activeAnnouncement.id} className="site-header__ann-content">
            <span className="site-header__ann-badge">{activeAnnouncement.badge}</span>
            <p className="site-header__ann-text">{activeAnnouncement.text}</p>
          </div>

          <div className="site-header__ann-right">
            {onToggleCurrency && (
              <button
                type="button"
                className="site-header__currency-btn"
                onClick={onToggleCurrency}
                title="Valyutani o'zgartirish"
              >
                {currency === 'UZS' ? 'UZS (so‘m)' : 'USD ($)'}
              </button>
            )}
            <button
              type="button"
              className="site-header__ann-arrow"
              onClick={handleNextAnnouncement}
              aria-label="Keyingi e'lon"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* 2. Asosiy Navigatsiya Qatori */}
      <div className="site-header__main">
        <div className="site-header__container site-header__main-inner">
          {/* Chap: Mobil tugma va Brend Logotipi */}
          <div className="site-header__brand-group">
            <button
              type="button"
              className={`site-header__burger ${
                isMobileMenuOpen ? 'site-header__burger--open' : ''
              }`}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Menyuni ochish"
              aria-expanded={isMobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>

            <a
              href="#hero"
              className="site-header__logo"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('hero');
              }}
            >
              <span className="site-header__logo-emblem" aria-hidden="true">
                <svg viewBox="0 0 36 36" width="32" height="32" fill="none">
                  <rect
                    x="11"
                    y="3"
                    width="14"
                    height="5"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M15 8H21V11.5L27 16V30C27 31.6569 25.6569 33 24 33H12C10.3431 33 9 31.6569 9 30V16L15 11.5V8Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="18" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <span className="site-header__logo-text">
                <span className="site-header__logo-title">AURELIA</span>
                <span className="site-header__logo-subtitle">HAUTE PARFUMERIE</span>
              </span>
            </a>
          </div>

          {/* Markaz: Desktop Navigatsiya */}
          <nav className="site-header__nav" aria-label="Asosiy navigatsiya">
            <ul className="site-header__nav-list">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li
                    key={item.id}
                    className="site-header__nav-item"
                    onMouseEnter={item.hasMegaMenu ? handleMegaMenuEnter : undefined}
                  >
                    <button
                      type="button"
                      className={`site-header__nav-link ${
                        isActive ? 'site-header__nav-link--active' : ''
                      }`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <span>{item.label}</span>
                      {item.hasMegaMenu && (
                        <svg
                          className={`site-header__chevron ${
                            isMegaMenuOpen ? 'site-header__chevron--rotated' : ''
                          }`}
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* O'ng: Jonli Qidiruv va Foydalanuvchi Harakatlari */}
          <div className="site-header__actions">
            {/* Qidiruv maydoni */}
            <div
              ref={searchContainerRef}
              className={`site-header__search ${
                isSearchFocused ? 'site-header__search--focused' : ''
              }`}
            >
              <svg
                className="site-header__search-icon"
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                placeholder="Atir, brend yoki nota qidiring..."
                className="site-header__search-input"
                aria-label="Atirlarni qidirish"
              />

              {searchQuery && (
                <button
                  type="button"
                  className="site-header__search-clear"
                  onClick={() => onSearchChange && onSearchChange('')}
                  aria-label="Qidiruvni tozalash"
                >
                  ✕
                </button>
              )}

              {/* Jonli qidiruv natijalari Dropdown */}
              {isSearchFocused && (
                <div className="site-header__search-dropdown">
                  {searchQuery.trim() === '' ? (
                    <div className="site-header__search-suggestions">
                      <span className="site-header__dropdown-label">
                        Ommabop qidiruvlar:
                      </span>
                      <div className="site-header__suggestion-chips">
                        {POPULAR_SEARCHES.map((term) => (
                          <button
                            key={term}
                            type="button"
                            className="site-header__suggestion-chip"
                            onClick={() => {
                              if (onSearchChange) onSearchChange(term);
                              handleNavClick('catalog');
                              setIsSearchFocused(false);
                            }}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : instantSearchResults.length > 0 ? (
                    <div className="site-header__search-results">
                      <span className="site-header__dropdown-label">
                        Topilgan atirlar ({instantSearchResults.length})
                      </span>
                      {instantSearchResults.map((item) => {
                        const basePrice = item.variants?.[0]?.price || 0;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            className="site-header__search-item"
                            onClick={() => {
                              setIsSearchFocused(false);
                              if (onQuickView) {
                                onQuickView(item);
                              } else {
                                handleNavClick('catalog');
                              }
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="site-header__search-thumb"
                            />
                            <div className="site-header__search-info">
                              <span className="site-header__search-brand">
                                {item.brand}
                              </span>
                              <span className="site-header__search-name">
                                {item.name}
                              </span>
                            </div>
                            <span className="site-header__search-price">
                              {formatMoney(basePrice)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="site-header__search-empty">
                      “{searchQuery}” bo‘yicha mos atir topilmadi. Boshqa nota yoki brend nomini kiriting.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Solishtirish tugmasi */}
            <button
              type="button"
              className="site-header__icon-action"
              onClick={onOpenCompare}
              aria-label="Atirlarni solishtirish"
              title="Solishtirish ro'yxati"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
              </svg>
              {compareCount > 0 && (
                <span className="site-header__badge">{compareCount}</span>
              )}
            </button>

            {/* Sevimlilar tugmasi */}
            <button
              type="button"
              className="site-header__icon-action"
              onClick={onOpenWishlist}
              aria-label="Sevimli atirlar"
              title="Sevimlilar"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="site-header__badge">{wishlistCount}</span>
              )}
            </button>

            {/* Savat tugmasi */}
            <button
              type="button"
              className={`site-header__cart-btn ${
                cartBadgeBounce ? 'site-header__cart-btn--bounce' : ''
              }`}
              onClick={onOpenCart}
              aria-label="Xarid savati"
            >
              <div className="site-header__cart-icon-wrap">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="site-header__cart-count">{cartCount}</span>
              </div>
              <div className="site-header__cart-summary">
                <span className="site-header__cart-label">Savat</span>
                <span className="site-header__cart-total">
                  {cartTotal > 0 ? formatMoney(cartTotal) : 'Bo‘sh'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Kengaytirilgan Katalog Mega-Menyusi */}
      {isMegaMenuOpen && (
        <div
          className="site-header__mega-menu"
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        >
          <div className="site-header__container site-header__mega-grid">
            {/* Ustun 1: Kategoriyalar */}
            <div className="site-header__mega-col">
              <h4 className="site-header__mega-heading">Kolleksiyalar</h4>
              <ul className="site-header__mega-list">
                {MEGA_MENU_DATA.categories.map((cat) => (
                  <li key={cat.value}>
                    <button
                      type="button"
                      className="site-header__mega-link"
                      onClick={() => handleCategoryChoose(cat.value)}
                    >
                      <span>{cat.label}</span>
                      <span className="site-header__mega-count">{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ustun 2: Olfaktor Hid Oilalari */}
            <div className="site-header__mega-col">
              <h4 className="site-header__mega-heading">Hid Oilalari</h4>
              <div className="site-header__mega-cards">
                {MEGA_MENU_DATA.olfactoryFamilies.map((fam) => (
                  <button
                    key={fam.label}
                    type="button"
                    className="site-header__mega-family"
                    onClick={() => handleNoteChoose(fam.note)}
                  >
                    <strong>{fam.label}</strong>
                    <span>{fam.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ustun 3: Konsentratsiya Turlari */}
            <div className="site-header__mega-col">
              <h4 className="site-header__mega-heading">Konsentratsiya Darajasi</h4>
              <div className="site-header__mega-conc-list">
                {MEGA_MENU_DATA.concentrations.map((conc) => (
                  <button
                    key={conc.code}
                    type="button"
                    className="site-header__mega-conc"
                    onClick={() => handleNoteChoose(conc.name)}
                  >
                    <span className="site-header__mega-conc-title">{conc.name}</span>
                    <span className="site-header__mega-conc-desc">{conc.strength}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ustun 4: Mavsumiy Promo Banner */}
            <div className="site-header__mega-promo">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
                alt="AURELIA Privé Collection"
                className="site-header__mega-promo-img"
              />
              <div className="site-header__mega-promo-overlay">
                <span className="site-header__mega-promo-tag">YANGI MAVSUM</span>
                <h5>Noir de Samarkand</h5>
                <p>32% sof parfyum ekstrakti — Grasse & Samarqand ilhomi.</p>
                <button
                  type="button"
                  className="site-header__mega-promo-btn"
                  onClick={() => handleCategoryChoose('Unisex')}
                >
                  Kolleksiyani ko‘rish →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skroll Progress Indikatori */}
      <div className="site-header__progress-track">
        <div
          className="site-header__progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 4. Mobil Navigatsiya Tortmasi (Drawer) */}
      <div
        className={`site-header__mobile-backdrop ${
          isMobileMenuOpen ? 'site-header__mobile-backdrop--visible' : ''
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside
        className={`site-header__mobile-drawer ${
          isMobileMenuOpen ? 'site-header__mobile-drawer--open' : ''
        }`}
        aria-label="Mobil menyu"
      >
        <div className="site-header__mobile-head">
          <span className="site-header__logo-title">AURELIA PARFUMS</span>
          <button
            type="button"
            className="site-header__mobile-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Menyuni yopish"
          >
            ✕
          </button>
        </div>

        {/* Mobil qidiruv */}
        <div className="site-header__mobile-search">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Atir yoki nota qidiring..."
            className="site-header__mobile-search-input"
          />
          <button
            type="button"
            className="site-header__mobile-search-btn"
            onClick={() => handleNavClick('catalog')}
          >
            Izlash
          </button>
        </div>

        <ul className="site-header__mobile-nav">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="site-header__mobile-item">
              {item.hasMegaMenu ? (
                <div className="site-header__mobile-accordion">
                  <button
                    type="button"
                    className="site-header__mobile-link"
                    onClick={() => setMobileAccordionOpen((prev) => !prev)}
                  >
                    <span>{item.label}</span>
                    <span>{mobileAccordionOpen ? '−' : '+'}</span>
                  </button>
                  {mobileAccordionOpen && (
                    <div className="site-header__mobile-sublist">
                      {MEGA_MENU_DATA.categories.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          className="site-header__mobile-sublink"
                          onClick={() => handleCategoryChoose(cat.value)}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className="site-header__mobile-link"
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="site-header__mobile-footer">
          <p>Toshkent, Amir Temur shoh ko‘chasi, 108 — Aurelia Flagship Boutique</p>
          <a href="tel:+998712008899" className="site-header__mobile-phone">
            +998 (71) 200-88-99
          </a>
        </div>
      </aside>
    </header>
  );
};

export default Header;