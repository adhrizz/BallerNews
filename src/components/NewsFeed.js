import React, { useState, useEffect, useRef } from 'react';
import './NewsFeed.css';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const feedContainerRef = useRef(null);

  useEffect(() => {
    fetchNews();
    if (feedContainerRef.current) {
      feedContainerRef.current.focus();
    }
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/news/football');
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToArticle = (index) => {
    const feedElement = document.querySelector('.feed-container');
    if (feedElement && feedElement.children[index]) {
      feedElement.children[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, news.length - 1);
      if (newIndex !== prevIndex) {
        scrollToArticle(newIndex);
      }
      return newIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      if (newIndex !== prevIndex) {
        scrollToArticle(newIndex);
      }
      return newIndex;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    const container = feedContainerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [news, currentIndex]);

  if (loading) {
    return (
      <div className="news-feed-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading news feed...</p>
        </div>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="news-feed-container">
        <div className="no-news">
          <p>No news available at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-feed-container" tabIndex="-1" ref={feedContainerRef}>
      <div className="feed-container">
        {news.map((article, index) => (
          <div key={index} className="feed-item">
            <div className="article-content">
              {article.urlToImage && (
                <div className="article-image">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="article-text">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">
                  {article.description || 'No description available'}
                </p>

                <div className="article-meta">
                  <span className="article-source">
                    {article.source?.name || 'Unknown Source'}
                  </span>
                  <span className="article-date">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString()
                      : 'Unknown Date'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="arrow-button"
        >
          &uarr;
        </button>
        <div className="position-indicator">
          {currentIndex + 1} / {news.length}
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex >= news.length - 1}
          className="arrow-button"
        >
          &darr;
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;
