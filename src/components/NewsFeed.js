import React, { useState, useEffect } from 'react';
import './NewsFeed.css';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/news/football');
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles.slice(0, 20)); // Get more articles for feed
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="news-feed-container">
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
    </div>
  );
};

export default NewsFeed;
