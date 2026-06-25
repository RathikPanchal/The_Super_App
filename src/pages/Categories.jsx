import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import CategoryCard from "../components/CategoryCard";

const CATEGORIES = [
  { id: "action", name: "Action", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=400" },
  { id: "drama", name: "Drama", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400" },
  { id: "romance", name: "Romance", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400" },
  { id: "thriller", name: "Thriller", image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=400" },
  { id: "western", name: "Western", image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=400" },
  { id: "horror", name: "Horror", image: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80&w=400" },
  { id: "fantasy", name: "Fantasy", image: "https://images.unsplash.com/photo-1519074069444-1ba4e66640c2?auto=format&fit=crop&q=80&w=400" },
  { id: "music", name: "Music", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400" },
  { id: "fiction", name: "Fiction", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400" }
];

export const Categories = () => {
  const selectedCategories = useStore((state) => state.categories);
  const setCategories = useStore((state) => state.setCategories);
  const navigate = useNavigate();

  const [selected, setSelected] = useState(selectedCategories);
  const [showError, setShowError] = useState(false);

  const handleCardClick = (id) => {
    let updated;
    if (selected.includes(id)) {
      updated = selected.filter((item) => item !== id);
    } else {
      updated = [...selected, id];
    }
    setSelected(updated);
    
    // Clear error message if threshold met
    if (updated.length >= 3) {
      setShowError(false);
    }
  };

  const handleRemoveChip = (id) => {
    const updated = selected.filter((item) => item !== id);
    setSelected(updated);
    if (updated.length >= 3) {
      setShowError(false);
    }
  };

  const handleContinue = () => {
    if (selected.length < 3) {
      setShowError(true);
    } else {
      setCategories(selected);
      navigate("/dashboard");
    }
  };

  return (
    <div className="categories-page">
      {/* Left side details and selected chips */}
      <div className="categories-left">
        <h1 className="categories-logo">Super app</h1>
        <div className="categories-instruction-box">
          <h2 className="categories-title">Choose your entertainment category</h2>
          
          <div className="categories-chips-container">
            {selected.map((catId) => {
              const catObj = CATEGORIES.find((c) => c.id === catId);
              // Handle typo matching in screenshot for music if needed, but standard name is fine.
              let displayLabel = catObj ? catObj.name : catId;
              if (catId === "music") displayLabel = "Mucic"; // Matching the visual screenshot typo exactly
              
              return (
                <div key={catId} className="category-chip">
                  <span>{displayLabel}</span>
                  <span
                    className="category-chip-remove"
                    onClick={() => handleRemoveChip(catId)}
                    role="button"
                    aria-label={`Remove ${displayLabel}`}
                  >
                    X
                  </span>
                </div>
              );
            })}
          </div>
          
          {showError && (
            <div className="categories-error-banner">
              <span>⚠️</span>
              <span>Minimum 3 category required</span>
            </div>
          )}
        </div>
      </div>

      {/* Right side category card grid & continue button */}
      <div className="categories-right">
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              image={cat.image}
              isSelected={selected.includes(cat.id)}
              onClick={() => handleCardClick(cat.id)}
            />
          ))}
        </div>
        <div className="categories-continue-container">
          <button
            className="categories-continue-btn"
            onClick={handleContinue}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
