import React, { useState, useEffect, useRef } from 'react';
import './NewsGrid.css';

const NewsGrid = ({ news, loading }) => {
  const [focusedCardIndex, setFocusedCardIndex] = useState(-1);
  const cardRefs = useRef([]);

  // Add click handler function
  const handleCardClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, news.length);
  }, [news]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setFocusedCardIndex((prevIndex) =>
          prevIndex === news.length - 1 ? 0 : prevIndex + 1
        );
      } else if (e.key === 'ArrowLeft') {
        setFocusedCardIndex((prevIndex) =>
          prevIndex <= 0 ? news.length - 1 : prevIndex - 1
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [news.length]);

  useEffect(() => {
    if (focusedCardIndex !== -1 && cardRefs.current[focusedCardIndex]) {
      cardRefs.current[focusedCardIndex].focus();
    }
  }, [focusedCardIndex]);

  if (loading) {
    return (
      <div className="news-grid-container">
        <div className="news-header">
          <h2>Latest News</h2>
          <div className="news-filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Transfer</button>
            <button className="filter-btn">Match Reports</button>
            <button className="filter-btn">Opinion</button>
          </div>
        </div>
        <div className="loading-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="news-card-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="news-grid-container">
      <div className="news-header">
        <h2>Latest News</h2>
        <div className="news-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Transfer</button>
          <button className="filter-btn">Match Reports</button>
          <button className="filter-btn">Opinion</button>
        </div>
      </div>
      
      <div className="news-grid">
        {news.map((article, index) => (
          <div 
            key={index} 
            ref={(el) => (cardRefs.current[index] = el)}
            className={`news-card ${focusedCardIndex === index ? 'focused' : ''}`}
            onClick={() => handleCardClick(article.url)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(article.url);
              }
            }}
            aria-label={`Read full article: ${article.title}`}
          >
            <div className="news-card-image">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} />
              )}
              <div className="news-card-overlay">
                <span className="news-source">{article.source.name}</span>
                <span className="news-date">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <div className="news-card-content">
              <h3 className="news-card-title">{article.title}</h3>
              <p className="news-card-description">
                {article.description?.substring(0, 120)}...
              </p>
              {/* Remove the footer with read more button */}
            </div>
          </div>
        ))}
      </div>
      
      {news.length === 0 && (
        <div className="no-news">
          <p>No news available at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default NewsGrid; 