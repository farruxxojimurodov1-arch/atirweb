import React, { useState } from 'react';
import './NewsCard.css';

const DEFAULT_ARTICLE = {
  id: 'news-001',
  category: 'Yangi Kolleksiya',
  title: 'Grasse atirgullari va Sharq udi: "Silk Road Elixir" kolleksiyasi taqdimoti',
  excerpt:
    'AURELIA PARFUMS parfyumeriya uyi 2026-yil kuz-qish mavsumi uchun maxsus yaratilgan va 18 oy davomida eman bochkalarida yetiltirilgan yangi eksklyuziv kolleksiyasini taqdim etdi.',
  content:
    'Fransiyaning Grasse shahridagi tarixiy laboratoriyamizda yaratilgan "Silk Road Elixir" kolleksiyasi Buyuk Ipak yo‘lining qadimiy ziravorlar karvonidan ilhomlangan. Har bir flakon qo‘lda sayqallangan billur shishadan tayyorlangan bo‘lib, tarkibida 35% gacha sof parfyum ekstrakti mavjud.',
  image:
    'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1100&q=85',
  date: '14 Noyabr, 2026',
  readTime: '4 daqiqa o‘qish',
  views: 1420,
  initialLikes: 96,
  featured: false,
  author: {
    name: 'Kamila Alimova',
    role: 'Bosh Parfyumer & Ekspert',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  tags: ['Extrait de Parfum', 'Grasse', 'Yangi kolleksiya', 'Niche'],
};

const NewsCard = ({
  article = DEFAULT_ARTICLE,
  featured = false,
  onReadMore,
  onToggleBookmark,
  isBookmarked = false,
  onTagClick,
}) => {
  const [likesCount, setLikesCount] = useState(article.initialLikes || 48);
  const [isLiked, setIsLiked] = useState(false);
  const [isShareCopied, setIsShareCopied] = useState(false);
  const [bookmarkAnim, setBookmarkAnim] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFeaturedCard = featured || article.featured;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setBookmarkAnim(true);
    setTimeout(() => setBookmarkAnim(false), 450);
    if (onToggleBookmark) {
      onToggleBookmark(article);
    }
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/journal/${article.id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    setIsShareCopied(true);
    setTimeout(() => setIsShareCopied(false), 1800);
  };

  const handleReadArticle = () => {
    if (onReadMore) {
      onReadMore(article);
    }
  };

  const handleTagSelect = (e, tag) => {
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  const fallbackImage =
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80';

  return (
    <article
      className={`news-card ${isFeaturedCard ? 'news-card--featured' : ''}`}
      onClick={handleReadArticle}
    >
      {/* Chap yoki yuqori rasm bloki */}
      <div className="news-card__media">
        <img
          src={imageError ? fallbackImage : article.image}
          alt={article.title}
          className="news-card__image"
          loading="lazy"
          onError={() => setImageError(true)}
        />
        <div className="news-card__media-overlay" />

        {/* Kategoriya va o'qish vaqti */}
        <div className="news-card__top-bar">
          <span className="news-card__category">{article.category}</span>

          <button
            type="button"
            onClick={handleBookmarkClick}
            className={`news-card__bookmark-btn ${
              isBookmarked ? 'news-card__bookmark-btn--active' : ''
            } ${bookmarkAnim ? 'news-card__bookmark-btn--pop' : ''}`}
            aria-label="Maqolani saqlash"
            title={isBookmarked ? 'Saqlanganlardan o‘chirish' : 'Keyinroq o‘qish uchun saqlash'}
          >
            <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              fill={isBookmarked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        <div className="news-card__media-meta">
          <span className="news-card__read-time">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {article.readTime}
          </span>
          {article.views && (
            <span className="news-card__views">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {article.views.toLocaleString('uz-UZ')}
            </span>
          )}
        </div>
      </div>

      {/* Kontent bloki */}
      <div className="news-card__content">
        <div className="news-card__date-row">
          <time className="news-card__date">{article.date}</time>
          {isFeaturedCard && (
            <span className="news-card__editorial-badge">Muharrir tanlovi</span>
          )}
        </div>

        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__excerpt">{article.excerpt}</p>

        {/* Teglar */}
        {article.tags && article.tags.length > 0 && (
          <div className="news-card__tags">
            {article.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="news-card__tag"
                onClick={(e) => handleTagSelect(e, tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Muallif va pastki interaktiv panel */}
        <div className="news-card__footer">
          {article.author && (
            <div className="news-card__author">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="news-card__author-avatar"
              />
              <div className="news-card__author-info">
                <span className="news-card__author-name">{article.author.name}</span>
                <span className="news-card__author-role">{article.author.role}</span>
              </div>
            </div>
          )}

          <div className="news-card__actions">
            <button
              type="button"
              onClick={handleLikeClick}
              className={`news-card__action-pill ${
                isLiked ? 'news-card__action-pill--liked' : ''
              }`}
              aria-label="Yoqtirish"
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill={isLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span>{likesCount}</span>
            </button>

            <button
              type="button"
              onClick={handleShareClick}
              className={`news-card__action-pill ${
                isShareCopied ? 'news-card__action-pill--copied' : ''
              }`}
              title="Havolani nusxalash"
            >
              {isShareCopied ? (
                <span>Nusxalandi</span>
              ) : (
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleReadArticle();
              }}
              className="news-card__read-btn"
            >
              <span>O‘qish</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;