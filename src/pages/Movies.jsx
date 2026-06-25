import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { searchMovieByGenre } from "../services/apiServices";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import avatarImage from "../assets/super_app_hero.png";

export const Movies = () => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.categories);
  const navigate = useNavigate();

  const [movieLists, setMovieLists] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeMovieId, setActiveMovieId] = useState(null);

  // Fetch movies for all selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) return;

    const apiKey = import.meta.env.VITE_OMDB_API_KEY || "MOCK_KEY";

    const fetchAllMovies = async () => {
      setLoading(true);
      const tempLists = {};
      
      try {
        // Fetch movies concurrently for all selected categories
        await Promise.all(
          selectedCategories.map(async (genre) => {
            const movies = await searchMovieByGenre(genre, apiKey);
            tempLists[genre] = movies;
          })
        );
        setMovieLists(tempLists);
      } catch (err) {
        console.error("Error loading movie lists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, [selectedCategories]);

  return (
    <div className="movies-page">
      {/* Header bar */}
      <header className="movies-header">
        <h1 className="movies-logo" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>Super app</h1>
        <div className="movies-user-profile">
          <div 
            className="movies-user-avatar" 
            onClick={() => navigate("/dashboard")} 
            style={{ cursor: "pointer" }} 
            title="Go to Dashboard"
          >
            <img src={avatarImage} className="movies-avatar-img" alt="User Profile" />
          </div>
        </div>
      </header>

      {/* Main page heading */}
      <h2 className="movies-page-title">Entertainment according to your choice</h2>

      {/* Recommendations grids */}
      {loading ? (
        <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", minHeight: "400px", color: "var(--text-secondary)" }}>
          <p>Compiling your personal movie recommendations...</p>
        </div>
      ) : (
        <main className="movies-categories-container">
          {selectedCategories.map((genre) => {
            const list = movieLists[genre] || [];
            let displayTitle = genre.charAt(0).toUpperCase() + genre.slice(1);
            if (genre === "music") displayTitle = "Mucic"; // match screenshot typo
            
            return (
              <section key={genre} className="movies-category-section" aria-labelledby={`title-${genre}`}>
                <h3 id={`title-${genre}`} className="movies-category-title">
                  {displayTitle}
                </h3>
                {list.length === 0 ? (
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", paddingLeft: "1rem" }}>
                    No movies found matching this category.
                  </p>
                ) : (
                  <div className="movies-list-scroll">
                    {list.map((movie) => (
                      <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        onClick={() => setActiveMovieId(movie.imdbID)}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </main>
      )}

      {/* High-fidelity movie details overlay */}
      {activeMovieId && (
        <MovieModal
          imdbID={activeMovieId}
          onClose={() => setActiveMovieId(null)}
        />
      )}
    </div>
  );
};

export default Movies;
