import React from "react";

export const CategoryCard = ({ id, name, image, isSelected, onClick }) => {
  return (
    <div
      className={`category-card ${id} ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <h3 className="category-card-name">{name}</h3>
      <img src={image} className="category-card-image" alt={name} />
    </div>
  );
};

export default CategoryCard;
