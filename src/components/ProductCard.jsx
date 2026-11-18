import React, { useState, useMemo } from 'react';
import './ProductCard.css';

const DEFAULT_PERFUME = {
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
    longevity: 92, // 12+ soat
    sillage: 88,   // Kuchli shleyf
    season: 'Kuz / Qish',
    origin: 'Fransiya, Grasse',
  },
  description:
    'Sharqona ziravorlar va noyob qora ud uyg‘unligidagi chuqur, hashamatli va uzoq saqlanuvchi mualliflik atiri.',
};

const ProductCard = ({
  product = DEFAULT_PERFUME,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  onQuickView,
  onCompare,
  isCompared = false,
}) => {
  const variants = product.variants && product.variants.length > 0
    ? product.variants
    : DEFAULT_PERFUME.variants;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(
    variants.length > 1 ? 1 : 0
  );
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'specs'
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [pulseHeart, setPulseHeart] = useState(false);

  const currentVariant = variants[selectedVariantIndex] || variants[0];

  const discountPercent = useMemo(() => {
    if (!currentVariant.oldPrice || currentVariant.oldPrice <= currentVariant.price) {
      return 0;
    }
    return Math.round(
      ((currentVariant.oldPrice - currentVariant.price) / currentVariant.oldPrice) * 100
    );
  }, [currentVariant]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
  };

  const handleVariantSelect = (index) => {
    setSelectedVariantIndex(index);
    setQuantity(1);
  };

  const handleDecreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQty = () => {
    const maxStock = currentVariant.stock || 10;
    setQuantity((prev) => (prev < maxStock ? prev + 1 : prev));
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setPulseHeart(true);
    setTimeout(() => setPulseHeart(false), 500);
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView({
        ...product,
        selectedVariant: currentVariant,
      });
    }
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    if (onCompare) {
      onCompare(product);
    }
  };

  const handleAddToCartClick = () => {
    if (currentVariant.stock === 0) return;

    setIsAddedFeedback(true);
    if (onAddToCart) {
      onAddToCart({
        id: `${product.id}-${currentVariant.volume}`,
        productId: product.id,
        brand: product.brand,
        name: product.name,
        image: product.image,
        volume: currentVariant.volume,
        price: currentVariant.price,
        quantity,
      });
    }

    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 1600);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return Array.from({ length: 5 }, (_, idx) => (
      <span
        key={idx}
        className={`product-card__star ${
          idx < fullStars ? 'product-card__star--filled' : ''
        }`}
      >
        ★
      </span>
    ));
  };

  const isOutOfStock = currentVariant.stock === 0;
  const isLowStock = currentVariant.stock > 0 && currentVariant.stock <= 5;

  return (
    <article
      className={`product-card ${isHovered ? 'product-card--hovered' : ''} ${
        isOutOfStock ? 'product-card--sold-out' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Yuqori nishonlar (Badges) */}
      <div className="product-card__badges">
        {product.badge && (
          <span className="product-card__badge product-card__badge--primary">
            {product.badge}
          </span>
        )}
        {product.isNew && (
          <span className="product-card__badge product-card__badge--new">
            Yangi
          </span>
        )}
        {discountPercent > 0 && (
          <span className="product-card__badge product-card__badge--discount">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Tezkor harakat tugmalari (Wishlist, Quick View, Compare) */}
      <div className="product-card__floating-actions">
        <button
          type="button"
          className={`product-card__icon-btn ${
            isWishlisted ? 'product-card__icon-btn--active' : ''
          } ${pulseHeart ? 'product-card__icon-btn--pulse' : ''}`}
          onClick={handleWishlistClick}
          aria-label="Sevimlilarga qo'shish"
          title="Sevimlilarga qo'shish"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <button
          type="button"
          className="product-card__icon-btn"
          onClick={handleQuickViewClick}
          aria-label="Tezkor ko'rish"
          title="Tezkor ko'rish"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        <button
          type="button"
          className={`product-card__icon-btn ${
            isCompared ? 'product-card__icon-btn--active' : ''
          }`}
          onClick={handleCompareClick}
          aria-label="Solishtirish"
          title="Solishtirishga qo'shish"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
          </svg>
        </button>
      </div>

      {/* Flakon rasmi va hover effekti */}
      <div className="product-card__media" onClick={handleQuickViewClick}>
        <div className="product-card__glow" />
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className="product-card__img product-card__img--main"
          loading="lazy"
        />
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} detail`}
            className="product-card__img product-card__img--secondary"
            loading="lazy"
          />
        )}

        <div className="product-card__category-pill">
          <span>{product.category}</span>
          <span className="product-card__dot">•</span>
          <span>{product.concentration}</span>
        </div>
      </div>

      {/* Asosiy ma'lumotlar qismi */}
      <div className="product-card__body">
        <div className="product-card__meta-top">
          <span className="product-card__brand">{product.brand}</span>
          <div className="product-card__rating">
            <div className="product-card__stars">{renderStars(product.rating)}</div>
            <span className="product-card__rating-value">{product.rating}</span>
            <span className="product-card__reviews">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="product-card__title" onClick={handleQuickViewClick}>
          {product.name}
        </h3>
        <p className="product-card__subtitle">{product.subtitle}</p>

        {/* Hajm (ml) tanlash tugmalari */}
        <div className="product-card__variants">
          <div className="product-card__variants-header">
            <span className="product-card__label">Flakon hajmi:</span>
            <span
              className={`product-card__stock ${
                isOutOfStock
                  ? 'product-card__stock--out'
                  : isLowStock
                  ? 'product-card__stock--low'
                  : 'product-card__stock--in'
              }`}
            >
              {isOutOfStock
                ? 'Sotuvda yo‘q'
                : isLowStock
                ? `Faqat ${currentVariant.stock} dona qoldi`
                : 'Sotuvda mavjud'}
            </span>
          </div>

          <div className="product-card__variant-list">
            {variants.map((variant, index) => (
              <button
                key={variant.volume}
                type="button"
                disabled={variant.stock === 0}
                onClick={() => handleVariantSelect(index)}
                className={`product-card__variant-btn ${
                  selectedVariantIndex === index
                    ? 'product-card__variant-btn--active'
                    : ''
                }`}
              >
                {variant.volume}
              </button>
            ))}
          </div>
        </div>

        {/* Interaktiv Tablar: Notalar Piramidasi va Texnik xususiyatlar */}
        <div className="product-card__details-box">
          <div className="product-card__tabs">
            <button
              type="button"
              className={`product-card__tab ${
                activeTab === 'notes' ? 'product-card__tab--active' : ''
              }`}
              onClick={() => setActiveTab('notes')}
            >
              Atir notalari
            </button>
            <button
              type="button"
              className={`product-card__tab ${
                activeTab === 'specs' ? 'product-card__tab--active' : ''
              }`}
              onClick={() => setActiveTab('specs')}
            >
              Turg‘unlik & Shleyf
            </button>
          </div>

          {activeTab === 'notes' ? (
            <div className="product-card__notes-pyramid">
              <div className="product-card__note-row">
                <span className="product-card__note-level">Yuqori:</span>
                <div className="product-card__note-tags">
                  {product.notes.top.map((note) => (
                    <span key={note} className="product-card__note-tag">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="product-card__note-row">
                <span className="product-card__note-level">O‘rta:</span>
                <div className="product-card__note-tags">
                  {product.notes.heart.map((note) => (
                    <span key={note} className="product-card__note-tag">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="product-card__note-row">
                <span className="product-card__note-level">Asosiy:</span>
                <div className="product-card__note-tags">
                  {product.notes.base.map((note) => (
                    <span key={note} className="product-card__note-tag">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="product-card__specs-panel">
              <div className="product-card__meter">
                <div className="product-card__meter-head">
                  <span>Turg‘unlik (Longevity)</span>
                  <span>{product.metrics.longevity}%</span>
                </div>
                <div className="product-card__meter-bar">
                  <div
                    className="product-card__meter-fill"
                    style={{ width: `${product.metrics.longevity}%` }}
                  />
                </div>
              </div>

              <div className="product-card__meter">
                <div className="product-card__meter-head">
                  <span>Shleyf kuchi (Sillage)</span>
                  <span>{product.metrics.sillage}%</span>
                </div>
                <div className="product-card__meter-bar">
                  <div
                    className="product-card__meter-fill"
                    style={{ width: `${product.metrics.sillage}%` }}
                  />
                </div>
              </div>

              <div className="product-card__spec-footer">
                <span>Fasl: <strong>{product.metrics.season}</strong></span>
                <span>Kelib chiqishi: <strong>{product.metrics.origin}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Narx va Savatga qo'shish paneli */}
        <div className="product-card__footer">
          <div className="product-card__price-block">
            {currentVariant.oldPrice && (
              <span className="product-card__old-price">
                {formatCurrency(currentVariant.oldPrice * quantity)}
              </span>
            )}
            <span className="product-card__current-price">
              {formatCurrency(currentVariant.price * quantity)}
            </span>
          </div>

          <div className="product-card__purchase-controls">
            <div className="product-card__stepper">
              <button
                type="button"
                className="product-card__stepper-btn"
                onClick={handleDecreaseQty}
                disabled={isOutOfStock || quantity <= 1}
                aria-label="Kamaytirish"
              >
                −
              </button>
              <span className="product-card__stepper-value">{quantity}</span>
              <button
                type="button"
                className="product-card__stepper-btn"
                onClick={handleIncreaseQty}
                disabled={isOutOfStock || quantity >= currentVariant.stock}
                aria-label="Ko'paytirish"
              >
                +
              </button>
            </div>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCartClick}
              className={`product-card__add-btn ${
                isAddedFeedback ? 'product-card__add-btn--success' : ''
              }`}
            >
              {isOutOfStock ? (
                <span>Tugagan</span>
              ) : isAddedFeedback ? (
                <>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Qo‘shildi</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span>Savatga</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;