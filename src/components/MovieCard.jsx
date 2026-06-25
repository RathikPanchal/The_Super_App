import React from "react";

export const MovieCard = ({ movie, onClick }) => {
  const posterUrl = movie.Poster && movie.Poster !== "N/A"
    ? movie.Poster
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400";

  return (
    <div
      className="movie-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div className="movie-poster-container">
        <img
          src={posterUrl}
          alt={movie.Title}
          className="movie-poster"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400";
          }}
        />
      </div>
    </div>
  );
};

export default MovieCard;
