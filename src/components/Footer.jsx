import React, { useState } from 'react';
import './Footer.css';

const TRUST_PILLARS = [
  {
    id: 'pillar-1',
    title: '100% Original Kafolati',
    description: 'Har bir flakon maxsus himoya gologrammasi va xalqaro muvofiqlik sertifikatiga ega.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'pillar-2',
    title: 'Eksklyuziv Probnik Sovg‘a',
    description: 'Har bir buyurtmaga 2 ta 2 ml hajmdagi mualliflik niche parfyum namunasi qo‘shiladi.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    id: 'pillar-3',
    title: 'Harorat Nazoratli Yetkazma',
    description: 'Parfyum molekulalari sifatini saqlash uchun maxsus termo-qadoqda tezkor kuryer xizmati.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'pillar-4',
    title: 'Shaxsiy Parfyum Somelye',
    description: 'Terining kimyoviy xususiyati va mavsumga mos individual atir tanlash maslahati.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
      </svg>
    ),
  },
];

const BOUTIQUES = [
  {
    id: 'tashkent',
    city: 'Toshkent Flagship',
    address: 'Amir Temur shoh ko‘chasi, 108, Mirobod tumani',
    hours: 'Har kuni: 10:00 – 22:00',
    phone: '+998 (71) 200-88-99',
    status: 'Hozir ochiq',
  },
  {
    id: 'samarkand',
    city: 'Samarqand Butik',
    address: 'Registon Plaza, 2-qavat, Universitet xiyoboni, 14',
    hours: 'Har kuni: 10:00 – 21:00',
    phone: '+998 (66) 233-77-55',
    status: 'Hozir ochiq',
  },
  {
    id: 'bukhara',
    city: 'Buxoro Salon',
    address: 'Baxouddin Naqshband ko‘chasi, 42, Ark Palace',
    hours: 'Du – Ya: 10:00 – 20:30',
    phone: '+998 (65) 224-44-11',
    status: 'Hozir ochiq',
  },
];

const SCENT_PREFERENCES = [
  'Sharqona & Ud',
  'Gulli & Nafis',
  'Yog‘ochli & Ambra',
  'Sitrus & Fresh',
];

const Footer = ({
  onNavigate,
  onSelectCategory,
  onOpenConsultation,
}) => {
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState('tashkent');
  const [email, setEmail] = useState('');
  const [selectedPreference, setSelectedPreference] = useState('Sharqona & Ud');
  const [subscribeStatus, setSubscribeStatus] = useState('idle'); // 'idle' | 'error' | 'success'
  const [errorMessage, setErrorMessage] = useState('');
  const [promoCopied, setPromoCopied] = useState(false);

  const activeBoutique =
    BOUTIQUES.find((item) => item.id === selectedBoutiqueId) || BOUTIQUES[0];

  const handleLinkNavigation = (sectionId, categoryValue = null) => {
    if (categoryValue && onSelectCategory) {
      onSelectCategory(categoryValue);
    }
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      setSubscribeStatus('error');
      setErrorMessage('Iltimos, to‘g‘ri elektron pochta manzilini kiriting.');
      return;
    }

    setSubscribeStatus('success');
    setErrorMessage('');
    setEmail('');
  };

  const handleCopyPromoCode = () => {
    const code = 'AURELIA10';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setPromoCopied(true);
    setTimeout(() => setPromoCopied(false), 2000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="boutiques" className="site-footer">
      {/* Dekorativ yuqori oltin nur chizig'i */}
      <div className="site-footer__top-glow" aria-hidden="true" />

      {/* 1. Ishonch va Hashamat Kafolatlari (Trust Pillars) */}
      <section className="site-footer__pillars" aria-label="Xizmat kafolatlari">
        <div className="site-footer__container">
          <div className="site-footer__pillars-grid">
            {TRUST_PILLARS.map((pillar) => (
              <div key={pillar.id} className="site-footer__pillar-card">
                <div className="site-footer__pillar-icon">{pillar.icon}</div>
                <div className="site-footer__pillar-text">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. VIP Newsletter & Shaxsiy Parfyum Klubi */}
      <section className="site-footer__newsletter">
        <div className="site-footer__container">
          <div className="site-footer__newsletter-box">
            <div className="site-footer__newsletter-info">
              <span className="site-footer__eyebrow">AURELIA PRIVÉ CLUB</span>
              <h2 className="site-footer__newsletter-title">
                Yopiq kolleksiyalar va 10% xush kelibsiz imtiyoziga ega bo‘ling
              </h2>
              <p className="site-footer__newsletter-desc">
                Sevimli hid yo‘nalishingizni tanlang — biz sizga Grasse laboratoriyasidan chiqqan
                yangi atirlar, cheklangan nashrlar va maxsus takliflarni birinchi bo‘lib yuboramiz.
              </p>

              <div className="site-footer__pref-group">
                <span className="site-footer__pref-label">Yoqtirgan hid yo‘nalishingiz:</span>
                <div className="site-footer__pref-chips">
                  {SCENT_PREFERENCES.map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setSelectedPreference(pref)}
                      className={`site-footer__pref-chip ${
                        selectedPreference === pref
                          ? 'site-footer__pref-chip--active'
                          : ''
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="site-footer__newsletter-form-wrap">
              {subscribeStatus === 'success' ? (
                <div className="site-footer__subscribe-success">
                  <div className="site-footer__success-badge">✓ A’zolik faollashtirildi</div>
                  <h4>AURELIA Privé klubiga xush kelibsiz!</h4>
                  <p>
                    Siz tanlagan <strong>{selectedPreference}</strong> yo‘nalishi bo‘yicha
                    tavsiyalar tayyorlandi. Birinchi buyurtma uchun promokodingiz:
                  </p>
                  <div className="site-footer__promo-box">
                    <code>AURELIA10</code>
                    <button
                      type="button"
                      onClick={handleCopyPromoCode}
                      className="site-footer__copy-btn"
                    >
                      {promoCopied ? 'Nusxalandi ✓' : 'Nusxalash'}
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="site-footer__form"
                  onSubmit={handleSubscribeSubmit}
                  noValidate
                >
                  <div className="site-footer__input-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (subscribeStatus === 'error') setSubscribeStatus('idle');
                      }}
                      placeholder="Elektron pochta manzilingiz..."
                      className={`site-footer__input ${
                        subscribeStatus === 'error' ? 'site-footer__input--error' : ''
                      }`}
                      aria-label="Elektron pochta manzili"
                    />
                    <button type="submit" className="site-footer__submit-btn">
                      <span>A’zo bo‘lish</span>
                      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                  {subscribeStatus === 'error' && (
                    <p className="site-footer__error-msg">{errorMessage}</p>
                  )}
                  <span className="site-footer__privacy-note">
                    Obuna bo‘lish orqali maxfiylik siyosatiga rozilik bildirasiz. Istalgan vaqtda bekor qilish mumkin.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Asosiy Navigatsiya va Butiklar Ma'lumotlari */}
      <div className="site-footer__main">
        <div className="site-footer__container site-footer__main-grid">
          {/* Ustun 1: Brend va Butik Manzil Almashtirgichi */}
          <div className="site-footer__brand-col">
            <div className="site-footer__logo">
              <span className="site-footer__logo-title">AURELIA</span>
              <span className="site-footer__logo-sub">HAUTE PARFUMERIE • PARIS & TASHKENT</span>
            </div>

            <p className="site-footer__brand-story">
              2016-yildan buyon biz jahon parfyumeriya san’atining eng noyob ekstraktlari va
              Sharqning qadimiy atir an’analarini yagona hashamatli kolleksiyada birlashtirib kelamiz.
            </p>

            {/* Butiklar tanlovi */}
            <div className="site-footer__boutique-card">
              <div className="site-footer__boutique-tabs">
                {BOUTIQUES.map((boutique) => (
                  <button
                    key={boutique.id}
                    type="button"
                    onClick={() => setSelectedBoutiqueId(boutique.id)}
                    className={`site-footer__boutique-tab ${
                      selectedBoutiqueId === boutique.id
                        ? 'site-footer__boutique-tab--active'
                        : ''
                    }`}
                  >
                    {boutique.city.split(' ')[0]}
                  </button>
                ))}
              </div>

              <address className="site-footer__boutique-details">
                <div className="site-footer__boutique-head">
                  <strong>{activeBoutique.city}</strong>
                  <span className="site-footer__status-pill">
                    <span className="site-footer__status-dot" />
                    {activeBoutique.status}
                  </span>
                </div>
                <p>{activeBoutique.address}</p>
                <span>{activeBoutique.hours}</span>
                <a href={`tel:${activeBoutique.phone.replace(/[^+\d]/g, '')}`}>
                  {activeBoutique.phone}
                </a>
              </address>
            </div>
          </div>

          {/* Ustun 2: Kolleksiyalar */}
          <nav className="site-footer__nav-col" aria-label="Kolleksiyalar">
            <h4 className="site-footer__col-title">Kolleksiyalar</h4>
            <ul className="site-footer__links">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('catalog', 'All')}
                >
                  Barcha atirlar katalogi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('catalog', 'Ayollar')}
                >
                  Ayollar parfyumeriyasi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('catalog', 'Erkaklar')}
                >
                  Erkaklar parfyumeriyasi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('catalog', 'Unisex')}
                >
                  Unisex & Niche ekstraktlar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('bestsellers')}
                >
                  Eng ko‘p sotilganlar (Top 10)
                </button>
              </li>
            </ul>
          </nav>

          {/* Ustun 3: Parfyumeriya Uyi */}
          <nav className="site-footer__nav-col" aria-label="Parfyumeriya uyi">
            <h4 className="site-footer__col-title">Parfyumeriya Uyi</h4>
            <ul className="site-footer__links">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('journal')}
                >
                  Parfyum Jurnali & Maqolalar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('hero')}
                >
                  Grasse laboratoriyasi tarixi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenConsultation ? onOpenConsultation() : handleLinkNavigation('catalog')
                  }
                >
                  Shaxsiy Somelye konsultatsiyasi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('catalog')}
                >
                  VIP Sovg‘a sertifikatlari
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('boutiques')}
                >
                  Korporativ hamkorlik
                </button>
              </li>
            </ul>
          </nav>

          {/* Ustun 4: Mijozlar Xizmati va Ijtimoiy Tarmoqlar */}
          <div className="site-footer__nav-col">
            <h4 className="site-footer__col-title">Mijozlar Xizmati</h4>
            <ul className="site-footer__links">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('catalog')}
                >
                  Yetkazib berish va to‘lov shartlari
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('catalog')}
                >
                  Original mahsulot tekshiruvi (Batch Code)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('journal')}
                >
                  Atirni to‘g‘ri saqlash bo‘yicha gid
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkNavigation('boutiques')}
                >
                  Aloqa va qayta qo‘ng‘iroq
                </button>
              </li>
            </ul>

            <div className="site-footer__socials">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="site-footer__social-btn"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="#telegram"
                onClick={(e) => e.preventDefault()}
                className="site-footer__social-btn"
                aria-label="Telegram"
                title="Telegram"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </a>

              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="site-footer__social-btn"
                aria-label="YouTube"
                title="YouTube"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Pastki Huquqiy Panel, To'lov Tizimlari va Yuqoriga Qaytish */}
      <div className="site-footer__bottom">
        <div className="site-footer__container site-footer__bottom-inner">
          <p className="site-footer__copyright">
            © 2026 AURELIA PARFUMS. Barcha huquqlar himoyalangan.
          </p>

          <div className="site-footer__payments" aria-label="Qabul qilinadigan to'lov tizimlari">
            <span className="site-footer__payment-badge">UZCARD</span>
            <span className="site-footer__payment-badge">HUMO</span>
            <span className="site-footer__payment-badge">PAYME</span>
            <span className="site-footer__payment-badge">CLICK</span>
            <span className="site-footer__payment-badge">VISA</span>
            <span className="site-footer__payment-badge">MASTERCARD</span>
          </div>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="site-footer__top-btn"
            aria-label="Sahifa yuqorisiga qaytish"
          >
            <span>Yuqoriga</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;