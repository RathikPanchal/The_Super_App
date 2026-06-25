import React, { useState, useEffect } from "react";
import { fetchTopHeadlines } from "../services/apiServices";

export const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news data
  useEffect(() => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY || "MOCK_KEY";
    const getNews = async () => {
      try {
        setLoading(true);
        const data = await fetchTopHeadlines("general", apiKey);
        
        // Filter out articles with removed content or missing images to keep layout premium
        const cleanArticles = data.filter(
          (art) => art.title && art.urlToImage && !art.title.includes("[Removed]")
        );
        
        setArticles(cleanArticles.length > 0 ? cleanArticles : data);
        setError(null);
      } catch (err) {
        console.error("Failed to load news headlines:", err);
        setError("Unable to load news.");
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  // Auto-rotation effect: rotates every 2 seconds
  useEffect(() => {
    if (articles.length <= 1) return;

    const rotationInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 2000);

    return () => clearInterval(rotationInterval);
  }, [articles]);

  if (loading) {
    return (
      <div className="news-widget dashboard-card" style={{ justifyContent: "center", alignItems: "center", minHeight: "300px", color: "var(--text-secondary)" }}>
        <p>Fetching top headlines...</p>
      </div>
    );
  }

  if (error || articles.length === 0) {
    return (
      <div className="news-widget dashboard-card" style={{ justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
        <p style={{ color: "var(--color-error)" }}>{error || "No headlines available at this moment."}</p>
      </div>
    );
  }

  const activeArticle = articles[currentIndex];
  const publishedDate = activeArticle.publishedAt
    ? new Date(activeArticle.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="news-widget dashboard-card">
      <div className="news-image-container">
        <img
          src={activeArticle.urlToImage}
          alt={activeArticle.title}
          className="news-image"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=800";
          }}
        />
        <div className="news-image-overlay">
          <h4 className="news-title-overlay">{activeArticle.title}</h4>
        </div>
      </div>
      <div className="news-details">
        <p className="news-desc">
          {activeArticle.description || "Click read more to access the complete details of this reporting segment. Stay tuned for further updates."}
        </p>
        <div className="news-meta">
          <span>By {activeArticle.author || "Global Publisher"}</span>
          <span>{publishedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsWidget;
