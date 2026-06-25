import React from "react";
import { useStore } from "../store/useStore";
import avatarImage from "../assets/super_app_hero.png";

export const UserProfileWidget = () => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);

  return (
    <div className="profile-widget">
      <div className="profile-avatar-container">
        <img src={avatarImage} className="profile-avatar-img" alt="User Avatar" />
      </div>
      <div className="profile-details-container">
        <div className="profile-details">
          <h2 className="profile-name">{user.name}</h2>
          <span className="profile-email">{user.email}</span>
          <span className="profile-username">{user.username}</span>
        </div>
        <div className="profile-categories-chips">
          {categories.map((catId) => {
            let label = catId.charAt(0).toUpperCase() + catId.slice(1);
            if (catId === "music") label = "Mucic"; // match screenshot typo
            return (
              <span key={catId} className="profile-chip">
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfileWidget;
