import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Perfume, { PERFUMES_DATA, ARTICLES_DATA } from './components/Perfume';
import ProductCard from './components/ProductCard';
import NewsCard from './components/NewsCard';
import Footer from './components/Footer';
import './App.css';

const STORAGE_KEYS = {
  CART: 'aurelia_parfums_cart_v1',
  WISHLIST: 'aurelia_parfums_wishlist_v1',
  COMPARE: 'aurelia_parfums_compare_v1',
  BOOKMARKS: 'aurelia_parfums_bookmarks_v1',
  CURRENCY: 'aurelia_parfums_currency_v1',
};

const FREE_SHIPPING_THRESHOLD = 1500000;

const PROMO_CODES = {
  AURELIA10: { discountPercent: 10, label: '10% AURELIA Privé imtiyozi' },
  SAMARKAND15: { discountPercent: 15, label: '15% Maxsus kolleksiya chegirmasi' },
};

const loadStoredState = (key, fallbackValue) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch {
    return fallbackValue;
  }
};

function App() {
  // Navigatsiya va Qidiruv/Filtr holatlari
  const [activeSection, setActiveSection] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [noteFilter, setNoteFilter] = useState('');
  const [currency, setCurrency] = useState(() =>
    loadStoredState(STORAGE_KEYS.CURRENCY, 'UZS')
  );

  // Savat, Sevimlilar, Solishtirish va Saqlangan Maqolalar
  const [cartItems, setCartItems] = useState(() =>
    loadStoredState(STORAGE_KEYS.CART, [
      {
        id: 'aur-001-50 ml',
        productId: 'aur-001',
        brand: 'AURELIA PRIVÉ',
        name: 'Noir de Samarkand',
        image: PERFUMES_DATA[0].image,
        volume: '50 ml',
        price: 1690000,
        quantity: 1,
      },
    ])
  );

  const [wishlistIds, setWishlistIds] = useState(() =>
    loadStoredState(STORAGE_KEYS.WISHLIST, ['aur-001', 'aur-004'])
  );

  const [compareIds, setCompareIds] = useState(() =>
    loadStoredState(STORAGE_KEYS.COMPARE, ['aur-001', 'aur-003'])
  );

  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState(() =>
    loadStoredState(STORAGE_KEYS.BOOKMARKS, ['news-001'])
  );

  // Modallar va Drawer holatlari
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewVariantIdx, setQuickViewVariantIdx] = useState(1);
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [activeArticle, setActiveArticle] = useState(null);

  // Savat ichidagi Promokod va Buyurtma rasmiylashtirish holati
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'form' | 'done'
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    phone: '+998 ',
    city: 'Toshkent',
    address: '',
    deliveryType: 'courier',
    giftWrap: true,
    note: '',
  });
  const [lastOrderNumber, setLastOrderNumber] = useState('');

  // Somelye konsultatsiya formasi
  const [consultForm, setConsultForm] = useState({
    name: '',
    phone: '+998 ',
    boutique: 'Toshkent Flagship',
    format: 'Butikda shaxsiy uchrashuv',
    preference: 'Sharqona & Ud',
  });
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Toast bildirishnomalar ro'yxati
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((title, message, type = 'gold') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-2), { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3400);
  }, []);

  // LocalStorage bilan sinxronizatsiya
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch {
      // ignore storage quota errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.WISHLIST,
        JSON.stringify(wishlistIds)
      );
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.COMPARE,
        JSON.stringify(compareIds)
      );
    } catch {
      // ignore
    }
  }, [compareIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.BOOKMARKS,
        JSON.stringify(bookmarkedArticleIds)
      );
    } catch {
      // ignore
    }
  }, [bookmarkedArticleIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.CURRENCY,
        JSON.stringify(currency)
      );
    } catch {
      // ignore
    }
  }, [currency]);

  // Skroll paytida faol bo'limni aniqlash
  useEffect(() => {
    const sectionIds = ['hero', 'catalog', 'bestsellers', 'journal', 'boutiques'];
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // ESC tugmasi bilan barcha modallarni yopish va body skrollini boshqarish
  const hasAnyModalOpen =
    isCartOpen ||
    isWishlistOpen ||
    isCompareOpen ||
    isConsultationOpen ||
    Boolean(quickViewProduct) ||
    Boolean(activeArticle);

  useEffect(() => {
    if (hasAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsCompareOpen(false);
        setIsConsultationOpen(false);
        setQuickViewProduct(null);
        setActiveArticle(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasAnyModalOpen]);

  // Pul birligini formatlash
  const formatMoney = useCallback(
    (amount) => {
      if (currency === 'USD') {
        return `$${Math.round(amount / 12800)}`;
      }
      return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
    },
    [currency]
  );

  // Savat hisob-kitoblari
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    return Math.round((cartSubtotal * appliedPromo.discountPercent) / 100);
  }, [cartSubtotal, appliedPromo]);

  const shippingFee = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    if (orderForm.deliveryType === 'pickup') return 0;
    return cartSubtotal - discountAmount >= FREE_SHIPPING_THRESHOLD ? 0 : 45000;
  }, [cartSubtotal, discountAmount, orderForm.deliveryType]);

  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const freeShippingProgress = Math.min(
    100,
    Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const amountLeftForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - cartSubtotal
  );

  // Navigatsiya boshqaruvi
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Savatga qo'shish
  const handleAddToCart = (newItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (newItem.quantity || 1),
        };
        return updated;
      }
      return [
        ...prev,
        {
          ...newItem,
          quantity: newItem.quantity || 1,
        },
      ];
    });

    setCheckoutStep('cart');
    pushToast(
      'Savatga qo‘shildi',
      `${newItem.name} (${newItem.volume}) savatingizga joylandi.`,
      'gold'
    );
  };

  const handleUpdateCartQty = (itemId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Sevimlilarga qo'shish/o'chirish
  const handleToggleWishlist = (product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        pushToast(
          'Sevimlilardan o‘chirildi',
          `${product.name} sevimlilar ro‘yxatidan olindi.`,
          'neutral'
        );
        return prev.filter((id) => id !== product.id);
      }
      pushToast(
        'Sevimlilarga saqlandi',
        `${product.name} shaxsiy kolleksiyangizga qo‘shildi.`,
        'gold'
      );
      return [...prev, product.id];
    });
  };

  // Solishtirish ro'yxatiga qo'shish/o'chirish (maksimal 3 ta)
  const handleToggleCompare = (product) => {
    setCompareIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 3) {
        pushToast(
          'Maksimal 3 ta atir',
          'Bir vaqtning o‘zida 3 tagacha atirni solishtirish mumkin.',
          'warning'
        );
        return [...prev.slice(1), product.id];
      }
      pushToast(
        'Solishtirishga qo‘shildi',
        `${product.name} taqqoslash jadvaliga qo‘shildi.`,
        'gold'
      );
      return [...prev, product.id];
    });
  };

  // Maqolalarni saqlash (Bookmark)
  const handleToggleBookmarkArticle = (article) => {
    setBookmarkedArticleIds((prev) => {
      const exists = prev.includes(article.id);
      if (exists) {
        pushToast('Saqlanganlardan o‘chirildi', article.title, 'neutral');
        return prev.filter((id) => id !== article.id);
      }
      pushToast('Maqola saqlandi', 'Jurnal bo‘limida keyinroq o‘qishingiz mumkin.', 'gold');
      return [...prev, article.id];
    });
  };

  // Tezkor ko'rish modalini ochish
  const handleOpenQuickView = (product) => {
    const initialIdx = product.selectedVariant
      ? Math.max(
          0,
          product.variants.findIndex(
            (v) => v.volume === product.selectedVariant.volume
          )
        )
      : product.variants?.length > 1
      ? 1
      : 0;
    setQuickViewVariantIdx(initialIdx);
    setQuickViewQty(1);
    setQuickViewProduct(product);
  };

  // Promokod qo'llash
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, ...PROMO_CODES[code] });
      setPromoError('');
      pushToast('Promokod faollashdi', PROMO_CODES[code].label, 'success');
    } else {
      setPromoError('Noto‘g‘ri promokod. Masalan: AURELIA10');
    }
  };

  // Buyurtmani yakunlash
  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (!orderForm.fullName.trim() || orderForm.phone.trim().length < 9) {
      pushToast(
        'Ma’lumotlarni tekshiring',
        'Ismingiz va telefon raqamingizni to‘liq kiriting.',
        'warning'
      );
      return;
    }

    const generatedId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setLastOrderNumber(generatedId);
    setCheckoutStep('done');
    setCartItems([]);
    setAppliedPromo(null);
    pushToast(
      'Buyurtma qabul qilindi!',
      `Buyurtma raqami: ${generatedId}. Tez orada operator bog‘lanadi.`,
      'success'
    );
  };

  // Somelye konsultatsiyasiga yozilish
  const handleConsultSubmit = (e) => {
    e.preventDefault();
    if (!consultForm.name.trim() || consultForm.phone.trim().length < 9) {
      pushToast(
        'Maydonlarni to‘ldiring',
        'Ism va telefon raqamingizni kiriting.',
        'warning'
      );
      return;
    }
    setConsultSubmitted(true);
    pushToast(
      'Uchrashuv band qilindi',
      `${consultForm.boutique} somelyesi siz bilan bog‘lanadi.`,
      'success'
    );
  };

  const wishlistedProducts = useMemo(
    () => PERFUMES_DATA.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  const comparedProducts = useMemo(
    () => PERFUMES_DATA.filter((p) => compareIds.includes(p.id)),
    [compareIds]
  );

  const bookmarkedArticles = useMemo(
    () => ARTICLES_DATA.filter((a) => bookmarkedArticleIds.includes(a.id)),
    [bookmarkedArticleIds]
  );

  return (
    <div className="app-shell">
      {/* 1. Sayt Sarlavhasi va Navigatsiya */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={setSelectedCategory}
        onSelectNoteFilter={setNoteFilter}
        cartCount={cartCount}
        cartTotal={cartGrandTotal}
        wishlistCount={wishlistIds.length}
        compareCount={compareIds.length}
        onOpenCart={() => {
          setCheckoutStep('cart');
          setIsCartOpen(true);
        }}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        products={PERFUMES_DATA}
        onQuickView={handleOpenQuickView}
        currency={currency}
        onToggleCurrency={() =>
          setCurrency((prev) => (prev === 'UZS' ? 'USD' : 'UZS'))
        }
      />

      {/* 2. Asosiy Do'kon Sahifasi (Hero, Scent Finder, Katalog va Jurnal) */}
      <Perfume
        products={PERFUMES_DATA}
        articles={ARTICLES_DATA}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        noteFilter={noteFilter}
        onSelectNoteFilter={setNoteFilter}
        onAddToCart={handleAddToCart}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        compareIds={compareIds}
        onToggleCompare={handleToggleCompare}
        onQuickView={handleOpenQuickView}
        bookmarkedArticleIds={bookmarkedArticleIds}
        onToggleBookmarkArticle={handleToggleBookmarkArticle}
        onReadArticle={(article) => setActiveArticle(article)}
        currency={currency}
        onOpenConsultation={() => {
          setConsultSubmitted(false);
          setIsConsultationOpen(true);
        }}
      />

      {/* 3. Sayt Pastki Qismi (Footer) */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={setSelectedCategory}
        onOpenConsultation={() => {
          setConsultSubmitted(false);
          setIsConsultationOpen(true);
        }}
      />

      {/* =====================================================================
          4. XARID SAVATI TORTMASI (SLIDE-OVER CART & CHECKOUT DRAWER)
         ===================================================================== */}
      {isCartOpen && (
        <div
          className="app-backdrop"
          onClick={() => setIsCartOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Xarid savati"
        >
          <aside
            className="app-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="app-drawer__header">
              <div>
                <span className="app-drawer__eyebrow">AURELIA BOUTIQUE BAG</span>
                <h2 className="app-drawer__title">
                  {checkoutStep === 'cart' && `Xarid savatingiz (${cartCount})`}
                  {checkoutStep === 'form' && 'Buyurtmani rasmiylashtirish'}
                  {checkoutStep === 'done' && 'Buyurtma tasdiqlandi'}
                </h2>
              </div>
              <button
                type="button"
                className="app-close-btn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Savatni yopish"
              >
                ✕
              </button>
            </div>

            {/* Bepul yetkazib berish progress bari */}
            {checkoutStep !== 'done' && (
              <div className="app-shipping-meter">
                <p>
                  {amountLeftForFreeShipping === 0 ? (
                    <span>
                      ✦ Tabriklaymiz! Siz uchun <strong>bepul kuryer yetkazmasi</strong>{' '}
                      faollashdi.
                    </span>
                  ) : (
                    <span>
                      Bepul yetkazib berish uchun yana{' '}
                      <strong>{formatMoney(amountLeftForFreeShipping)}</strong> qo‘shing
                    </span>
                  )}
                </p>
                <div className="app-shipping-meter__track">
                  <div
                    className="app-shipping-meter__fill"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="app-drawer__body">
              {checkoutStep === 'done' ? (
                <div className="app-order-success">
                  <div className="app-order-success__icon">✓</div>
                  <h3>Rahmat, {orderForm.fullName}!</h3>
                  <p>
                    Sizning buyurtmangiz qabul qilindi va Grasse standartidagi maxsus
                    termo-qadoqlash bo‘limiga yuborildi.
                  </p>
                  <div className="app-order-success__ticket">
                    <span>Buyurtma raqami:</span>
                    <strong>{lastOrderNumber}</strong>
                  </div>
                  <p className="app-order-success__gift">
                    🎁 Sovg‘a sifatida 2 ta 2 ml mualliflik niche probnik qo‘shildi.
                  </p>
                  <button
                    type="button"
                    className="app-primary-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep('cart');
                    }}
                  >
                    Xaridni davom ettirish
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="app-empty-state">
                  <span className="app-empty-state__symbol">✦</span>
                  <h3>Savatingiz hozircha bo‘sh</h3>
                  <p>
                    AURELIA PARFUMS kolleksiyasidan o‘zingizga mos eksklyuziv atirni
                    tanlang.
                  </p>
                  <button
                    type="button"
                    className="app-primary-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      handleNavigate('catalog');
                    }}
                  >
                    Katalogga o‘tish
                  </button>
                </div>
              ) : checkoutStep === 'cart' ? (
                <>
                  <ul className="app-cart-list">
                    {cartItems.map((item) => (
                      <li key={item.id} className="app-cart-item">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="app-cart-item__img"
                        />
                        <div className="app-cart-item__info">
                          <span className="app-cart-item__brand">{item.brand}</span>
                          <h4>{item.name}</h4>
                          <span className="app-cart-item__vol">
                            Hajm: {item.volume}
                          </span>
                          <strong className="app-cart-item__price">
                            {formatMoney(item.price * item.quantity)}
                          </strong>
                        </div>

                        <div className="app-cart-item__controls">
                          <button
                            type="button"
                            className="app-cart-item__remove"
                            onClick={() => handleRemoveCartItem(item.id)}
                            title="O'chirish"
                          >
                            ✕
                          </button>
                          <div className="app-qty-pill">
                            <button
                              type="button"
                              onClick={() => handleUpdateCartQty(item.id, -1)}
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateCartQty(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Promokod kiritish bloki */}
                  <form className="app-promo-form" onSubmit={handleApplyPromo}>
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError('');
                      }}
                      placeholder="Promokod (masalan: AURELIA10)"
                      className="app-input"
                    />
                    <button type="submit" className="app-secondary-btn">
                      Qo‘llash
                    </button>
                  </form>
                  {promoError && <p className="app-form-error">{promoError}</p>}
                  {appliedPromo && (
                    <div className="app-promo-applied">
                      <span>✓ {appliedPromo.label}</span>
                      <button
                        type="button"
                        onClick={() => setAppliedPromo(null)}
                      >
                        Bekor qilish
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* Buyurtma rasmiylashtirish formasi */
                <form
                  id="checkout-form"
                  className="app-checkout-form"
                  onSubmit={handleCompleteOrder}
                >
                  <div className="app-field">
                    <label>Ism va familiyangiz *</label>
                    <input
                      type="text"
                      required
                      value={orderForm.fullName}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, fullName: e.target.value })
                      }
                      placeholder="Masalan: Jasur Karimov"
                      className="app-input"
                    />
                  </div>

                  <div className="app-field">
                    <label>Telefon raqamingiz *</label>
                    <input
                      type="tel"
                      required
                      value={orderForm.phone}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, phone: e.target.value })
                      }
                      placeholder="+998 90 123 45 67"
                      className="app-input"
                    />
                  </div>

                  <div className="app-field">
                    <label>Qabul qilish usuli</label>
                    <div className="app-radio-row">
                      <button
                        type="button"
                        onClick={() =>
                          setOrderForm({ ...orderForm, deliveryType: 'courier' })
                        }
                        className={`app-radio-card ${
                          orderForm.deliveryType === 'courier'
                            ? 'app-radio-card--active'
                            : ''
                        }`}
                      >
                        <strong>Kuryer yetkazmasi</strong>
                        <span>Eshikgacha termo-qadoqda</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setOrderForm({ ...orderForm, deliveryType: 'pickup' })
                        }
                        className={`app-radio-card ${
                          orderForm.deliveryType === 'pickup'
                            ? 'app-radio-card--active'
                            : ''
                        }`}
                      >
                        <strong>Butikdan olib ketish</strong>
                        <span>Bepul • 1 soatda tayyor</span>
                      </button>
                    </div>
                  </div>

                  <div className="app-field-grid">
                    <div className="app-field">
                      <label>Shahar</label>
                      <select
                        value={orderForm.city}
                        onChange={(e) =>
                          setOrderForm({ ...orderForm, city: e.target.value })
                        }
                        className="app-input"
                      >
                        <option value="Toshkent">Toshkent</option>
                        <option value="Samarqand">Samarqand</option>
                        <option value="Buxoro">Buxoro</option>
                        <option value="Farg‘ona">Farg‘ona</option>
                        <option value="Namangan">Namangan</option>
                        <option value="Andijon">Andijon</option>
                      </select>
                    </div>

                    <div className="app-field">
                      <label>Manzil / Mo‘ljal</label>
                      <input
                        type="text"
                        value={orderForm.address}
                        onChange={(e) =>
                          setOrderForm({ ...orderForm, address: e.target.value })
                        }
                        placeholder="Ko‘cha, uy, xonadon"
                        className="app-input"
                      />
                    </div>
                  </div>

                  <label className="app-checkbox-row">
                    <input
                      type="checkbox"
                      checked={orderForm.giftWrap}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, giftWrap: e.target.checked })
                      }
                    />
                    <span>
                      Bepul AURELIA oltin tasmali sovg‘a qutisi va tabriknoma qo‘shish
                    </span>
                  </label>
                </form>
              )}
            </div>

            {cartItems.length > 0 && checkoutStep !== 'done' && (
              <div className="app-drawer__footer">
                <div className="app-totals">
                  <div className="app-totals__row">
                    <span>Mahsulotlar ({cartCount} dona):</span>
                    <span>{formatMoney(cartSubtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="app-totals__row app-totals__row--discount">
                      <span>Chegirma ({appliedPromo.code}):</span>
                      <span>−{formatMoney(discountAmount)}</span>
                    </div>
                  )}
                  <div className="app-totals__row">
                    <span>Yetkazib berish:</span>
                    <span>
                      {shippingFee === 0 ? 'Bepul' : formatMoney(shippingFee)}
                    </span>
                  </div>
                  <div className="app-totals__grand">
                    <span>Jami to‘lov:</span>
                    <strong>{formatMoney(cartGrandTotal)}</strong>
                  </div>
                </div>

                {checkoutStep === 'cart' ? (
                  <button
                    type="button"
                    className="app-primary-btn"
                    onClick={() => setCheckoutStep('form')}
                  >
                    Buyurtmani rasmiylashtirish →
                  </button>
                ) : (
                  <div className="app-checkout-actions">
                    <button
                      type="button"
                      className="app-secondary-btn"
                      onClick={() => setCheckoutStep('cart')}
                    >
                      ← Orqaga
                    </button>
                    <button
                      type="submit"
                      form="checkout-form"
                      className="app-primary-btn"
                    >
                      Buyurtmani tasdiqlash
                    </button>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      )}

      {/* =====================================================================
          5. TEZKOR KO'RISH MODALI (PRODUCT QUICK VIEW MODAL)
         ===================================================================== */}
      {quickViewProduct && (
        <div
          className="app-backdrop app-backdrop--center"
          onClick={() => setQuickViewProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-label={quickViewProduct.name}
        >
          <div
            className="app-modal app-modal--quickview"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="app-close-btn app-modal__close"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Yopish"
            >
              ✕
            </button>

            <div className="app-qv-grid">
              <div className="app-qv-media">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                />
                <span className="app-qv-badge">
                  {quickViewProduct.concentration}
                </span>
              </div>

              <div className="app-qv-content">
                <span className="app-qv-brand">{quickViewProduct.brand}</span>
                <h2>{quickViewProduct.name}</h2>
                <p className="app-qv-subtitle">{quickViewProduct.subtitle}</p>
                <p className="app-qv-desc">{quickViewProduct.description}</p>

                {/* To'liq Notalar Piramidasi */}
                <div className="app-qv-pyramid">
                  <div className="app-qv-pyramid__row">
                    <span>Yuqori notalar:</span>
                    <strong>{quickViewProduct.notes.top.join(', ')}</strong>
                  </div>
                  <div className="app-qv-pyramid__row">
                    <span>Yurak notalari:</span>
                    <strong>{quickViewProduct.notes.heart.join(', ')}</strong>
                  </div>
                  <div className="app-qv-pyramid__row">
                    <span>Baza notalari:</span>
                    <strong>{quickViewProduct.notes.base.join(', ')}</strong>
                  </div>
                </div>

                {/* Hajm tanlash */}
                <div className="app-qv-variants">
                  <span>Flakon hajmini tanlang:</span>
                  <div className="app-qv-variant-grid">
                    {quickViewProduct.variants.map((variant, idx) => (
                      <button
                        key={variant.volume}
                        type="button"
                        disabled={variant.stock === 0}
                        onClick={() => {
                          setQuickViewVariantIdx(idx);
                          setQuickViewQty(1);
                        }}
                        className={`app-qv-variant-btn ${
                          quickViewVariantIdx === idx
                            ? 'app-qv-variant-btn--active'
                            : ''
                        }`}
                      >
                        <strong>{variant.volume}</strong>
                        <span>{formatMoney(variant.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Miqdor va Savatga qo'shish */}
                {(() => {
                  const activeVar =
                    quickViewProduct.variants[quickViewVariantIdx] ||
                    quickViewProduct.variants[0];
                  return (
                    <div className="app-qv-footer">
                      <div className="app-qty-pill app-qty-pill--lg">
                        <button
                          type="button"
                          onClick={() =>
                            setQuickViewQty((q) => (q > 1 ? q - 1 : 1))
                          }
                        >
                          −
                        </button>
                        <span>{quickViewQty}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuickViewQty((q) =>
                              q < (activeVar.stock || 10) ? q + 1 : q
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        disabled={activeVar.stock === 0}
                        className="app-primary-btn"
                        onClick={() => {
                          handleAddToCart({
                            id: `${quickViewProduct.id}-${activeVar.volume}`,
                            productId: quickViewProduct.id,
                            brand: quickViewProduct.brand,
                            name: quickViewProduct.name,
                            image: quickViewProduct.image,
                            volume: activeVar.volume,
                            price: activeVar.price,
                            quantity: quickViewQty,
                          });
                          setQuickViewProduct(null);
                        }}
                      >
                        Savatga qo‘shish •{' '}
                        {formatMoney(activeVar.price * quickViewQty)}
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          6. SEVIMLI ATIRLAR OYNASI (ProductCard BILAN)
         ===================================================================== */}
      {isWishlistOpen && (
        <div
          className="app-backdrop app-backdrop--center"
          onClick={() => setIsWishlistOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Sevimli atirlar"
        >
          <div
            className="app-modal app-modal--wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="app-modal__header">
              <div>
                <span className="app-drawer__eyebrow">SHAXSIY KOLLEKSIYA</span>
                <h2>Sevimli atirlaringiz ({wishlistedProducts.length})</h2>
              </div>
              <button
                type="button"
                className="app-close-btn"
                onClick={() => setIsWishlistOpen(false)}
              >
                ✕
              </button>
            </div>

            {wishlistedProducts.length > 0 ? (
              <div className="app-wishlist-grid">
                {wishlistedProducts.map((item) => (
                  <ProductCard
                    key={`wish-${item.id}`}
                    product={item}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={true}
                    onQuickView={(prod) => {
                      setIsWishlistOpen(false);
                      handleOpenQuickView(prod);
                    }}
                    onCompare={handleToggleCompare}
                    isCompared={compareIds.includes(item.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="app-empty-state">
                <span className="app-empty-state__symbol">♡</span>
                <h3>Sevimlilar ro‘yxati bo‘sh</h3>
                <p>
                  Yoqtirgan atirlaringiz kartasidagi yurakcha belgisini bosing — ular shu
                  yerda saqlanadi.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          7. ATIRLARNI YONMA-YON SOLISHTIRISH MODALI (COMPARE MATRIX)
         ===================================================================== */}
      {isCompareOpen && (
        <div
          className="app-backdrop app-backdrop--center"
          onClick={() => setIsCompareOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Atirlarni solishtirish"
        >
          <div
            className="app-modal app-modal--wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="app-modal__header">
              <div>
                <span className="app-drawer__eyebrow">OLFaktor TAQQOSLASH</span>
                <h2>Atirlarni solishtirish ({comparedProducts.length}/3)</h2>
              </div>
              <button
                type="button"
                className="app-close-btn"
                onClick={() => setIsCompareOpen(false)}
              >
                ✕
              </button>
            </div>

            {comparedProducts.length > 0 ? (
              <div className="app-compare-table-wrap">
                <table className="app-compare-table">
                  <thead>
                    <tr>
                      <th>Xususiyatlar</th>
                      {comparedProducts.map((item) => (
                        <th key={item.id}>
                          <div className="app-compare-head">
                            <button
                              type="button"
                              className="app-compare-remove"
                              onClick={() => handleToggleCompare(item)}
                            >
                              ✕
                            </button>
                            <img src={item.image} alt={item.name} />
                            <span>{item.brand}</span>
                            <strong>{item.name}</strong>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Kategoriya</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id}>{p.category}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Konsentratsiya</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id}>{p.concentration}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>50 ml narxi</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="app-compare-price">
                          {formatMoney((p.variants?.[1] || p.variants?.[0]).price)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Turg‘unlik (Longevity)</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id}>{p.metrics.longevity}% (12+ soat)</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Shleyf kuchi (Sillage)</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id}>{p.metrics.sillage}%</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Yuqori notalar</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id}>{p.notes.top.join(', ')}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Asosiy (baza) notalar</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id}>{p.notes.base.join(', ')}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Xarid</td>
                      {comparedProducts.map((p) => {
                        const v = p.variants?.[1] || p.variants?.[0];
                        return (
                          <td key={p.id}>
                            <button
                              type="button"
                              className="app-primary-btn app-primary-btn--sm"
                              onClick={() =>
                                handleAddToCart({
                                  id: `${p.id}-${v.volume}`,
                                  productId: p.id,
                                  brand: p.brand,
                                  name: p.name,
                                  image: p.image,
                                  volume: v.volume,
                                  price: v.price,
                                  quantity: 1,
                                })
                              }
                            >
                              Savatga qo‘shish
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="app-empty-state">
                <h3>Solishtirish uchun atir tanlanmagan</h3>
                <p>
                  Katalogdagi mahsulot kartalaridan solishtirish belgisini bosing.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          8. MAQOLA O'QISH VA SAQLANGAN JURNAL MODALI (NewsCard BILAN)
         ===================================================================== */}
      {activeArticle && (
        <div
          className="app-backdrop app-backdrop--center"
          onClick={() => setActiveArticle(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeArticle.title}
        >
          <div
            className="app-modal app-modal--article"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="app-close-btn app-modal__close"
              onClick={() => setActiveArticle(null)}
            >
              ✕
            </button>

            <div className="app-article-hero">
              <img src={activeArticle.image} alt={activeArticle.title} />
              <div className="app-article-hero__overlay">
                <span className="app-drawer__eyebrow">{activeArticle.category}</span>
                <h2>{activeArticle.title}</h2>
                <div className="app-article-meta">
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                  {activeArticle.author && (
                    <>
                      <span>•</span>
                      <span>Muallif: {activeArticle.author.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="app-article-body">
              <p className="app-article-lead">{activeArticle.excerpt}</p>
              <p>{activeArticle.content}</p>

              {bookmarkedArticles.length > 0 && (
                <div className="app-article-saved">
                  <h4>Saqlangan jurnal maqolalari ({bookmarkedArticles.length})</h4>
                  <div className="app-article-saved-grid">
                    {bookmarkedArticles.slice(0, 2).map((savedArt) => (
                      <NewsCard
                        key={`saved-${savedArt.id}`}
                        article={savedArt}
                        featured={false}
                        onReadMore={(art) => setActiveArticle(art)}
                        onToggleBookmark={handleToggleBookmarkArticle}
                        isBookmarked={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          9. SHAXSIY SOMELYE KONSULTATSIYASI MODALI
         ===================================================================== */}
      {isConsultationOpen && (
        <div
          className="app-backdrop app-backdrop--center"
          onClick={() => setIsConsultationOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Shaxsiy somelye konsultatsiyasi"
        >
          <div
            className="app-modal app-modal--consult"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="app-close-btn app-modal__close"
              onClick={() => setIsConsultationOpen(false)}
            >
              ✕
            </button>

            <span className="app-drawer__eyebrow">AURELIA VIP SERVICE</span>
            <h2>Shaxsiy Parfyum Somelye Konsultatsiyasi</h2>
            <p className="app-consult-desc">
              Bosh parfyumerimiz sizning teri xususiyatingiz va uslubingizga mos 5 ta
              eksklyuziv kompozitsiyani tanlab, maxsus degustatsiya o‘tkazadi.
            </p>

            {consultSubmitted ? (
              <div className="app-order-success">
                <div className="app-order-success__icon">✓</div>
                <h3>So‘rovingiz qabul qilindi!</h3>
                <p>
                  <strong>{consultForm.boutique}</strong> katta somelyesi 15 daqiqa
                  ichida <strong>{consultForm.phone}</strong> raqamiga qo‘ng‘iroq qiladi.
                </p>
                <button
                  type="button"
                  className="app-primary-btn"
                  onClick={() => setIsConsultationOpen(false)}
                >
                  Yopish
                </button>
              </div>
            ) : (
              <form className="app-checkout-form" onSubmit={handleConsultSubmit}>
                <div className="app-field">
                  <label>Ismingiz *</label>
                  <input
                    type="text"
                    required
                    value={consultForm.name}
                    onChange={(e) =>
                      setConsultForm({ ...consultForm, name: e.target.value })
                    }
                    placeholder="Ismingizni kiriting"
                    className="app-input"
                  />
                </div>

                <div className="app-field">
                  <label>Telefon raqamingiz *</label>
                  <input
                    type="tel"
                    required
                    value={consultForm.phone}
                    onChange={(e) =>
                      setConsultForm({ ...consultForm, phone: e.target.value })
                    }
                    className="app-input"
                  />
                </div>

                <div className="app-field-grid">
                  <div className="app-field">
                    <label>Butik filiali</label>
                    <select
                      value={consultForm.boutique}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, boutique: e.target.value })
                      }
                      className="app-input"
                    >
                      <option value="Toshkent Flagship">Toshkent Flagship</option>
                      <option value="Samarqand Butik">Samarqand Butik</option>
                      <option value="Buxoro Salon">Buxoro Salon</option>
                    </select>
                  </div>

                  <div className="app-field">
                    <label>Yoqtirgan hid oilasi</label>
                    <select
                      value={consultForm.preference}
                      onChange={(e) =>
                        setConsultForm({
                          ...consultForm,
                          preference: e.target.value,
                        })
                      }
                      className="app-input"
                    >
                      <option value="Sharqona & Ud">Sharqona & Ud</option>
                      <option value="Gulli & Nafis">Gulli & Nafis</option>
                      <option value="Yog‘ochli & Ambra">Yog‘ochli & Ambra</option>
                      <option value="Sitrus & Fresh">Sitrus & Fresh</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="app-primary-btn">
                  Konsultatsiyaga yozilish
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          10. JONLI TOAST BILDIRISHNOMALAR STEKI
         ===================================================================== */}
      <div className="app-toast-stack" aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`app-toast app-toast--${toast.type}`}
          >
            <div className="app-toast__dot" />
            <div>
              <strong>{toast.title}</strong>
              <p>{toast.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;