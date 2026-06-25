import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfileWidget from "../components/UserProfileWidget";
import WeatherWidget from "../components/WeatherWidget";
import NotesWidget from "../components/NotesWidget";
import NewsWidget from "../components/NewsWidget";
import TimerWidget from "../components/TimerWidget";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      {/* Grid of Widgets */}
      <main className="dashboard-grid" role="main">
        {/* User profile details */}
        <section className="dashboard-card cell-profile" aria-label="User Profile">
          <UserProfileWidget />
        </section>

        {/* Live weather clock details */}
        <section className="cell-weather" aria-label="Weather Info">
          <WeatherWidget />
        </section>

        {/* Text editable pad notes */}
        <section className="dashboard-card cell-notes" aria-label="Scratchpad Notes">
          <NotesWidget />
        </section>

        {/* News API article carousel */}
        <section className="dashboard-card cell-news" aria-label="News Headlines Feed">
          <NewsWidget />
        </section>

        {/* Timer circular controls inside grid */}
        <section className="dashboard-card cell-timer" aria-label="Countdown Timer">
          <TimerWidget />
        </section>
      </main>

      {/* Footer with Browse button aligned bottom-right */}
      <div className="dashboard-footer">
        <button
          type="button"
          className="dashboard-browse-btn"
          onClick={() => navigate("/movies")}
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
