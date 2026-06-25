import React, { useState, useEffect } from "react";
import { fetchMovieDetails } from "../services/apiServices";

export const MovieModal = ({ imdbID, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdbID) return;

    const getDetails = async () => {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY || "MOCK_KEY";
      try {
        setLoading(true);
        const data = await fetchMovieDetails(imdbID, apiKey);
        setDetails(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load movie details:", err);
        setError("Unable to retrieve movie details.");
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [imdbID]);

  // Handle click on backdrop
  const handleBackdropClick = (e) => {
    if (e.target.className === "modal-backdrop") {
      onClose();
    }
  };

  if (!imdbID) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" role="dialog" aria-modal="true">
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close details"
        >
          ✕
        </button>

        {loading ? (
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "350px", color: "var(--text-secondary)" }}>
            <p>Loading film details...</p>
          </div>
        ) : error || !details ? (
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "350px", color: "var(--color-error)", padding: "2rem" }}>
            <p>{error || "Could not retrieve details."}</p>
          </div>
        ) : (
          <>
            {/* Left side: Poster */}
            <div className="modal-left-pane">
              <img
                src={details.Poster && details.Poster !== "N/A" ? details.Poster : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400"}
                alt={details.Title}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400";
                }}
              />
            </div>

            {/* Right side: Film Specs & Details */}
            <div className="modal-right-pane">
              <h2 className="modal-movie-title">{details.Title}</h2>
              
              <div className="modal-meta-row">
                <span className="modal-badge rating">{details.Rated || "PG-13"}</span>
                <span>{details.Runtime || "N/A"}</span>
                <span>{details.Genre || "N/A"}</span>
                
                {details.ImdbRating && details.ImdbRating !== "N/A" && (
                  <div className="modal-rating-score">
                    <span className="modal-rating-star">★</span>
                    <span>{details.ImdbRating} / 10</span>
                  </div>
                )}
              </div>

              <div className="modal-divider"></div>

              <div className="modal-plot-container">
                <h4 className="modal-plot-title">Plot Outline</h4>
                <p className="modal-plot-desc">{details.Plot || "No detailed plot outline is currently available for this title."}</p>
              </div>

              <div className="modal-divider"></div>

              <div className="modal-people-grid">
                <div className="modal-people-item">
                  <span>Cast: </span> {details.Actors || "N/A"}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
