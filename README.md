# The Super App 🌟

A premium, interactive dashboard application built with **React** and **Vite**. The application provides users with personalized widgets, including live weather, top headlines, notes scratchpad, a custom countdown timer, and movie recommendations based on user-selected categories.

---

## 🚀 Live Demo & Repository
- **Repository:** [https://github.com/RathikPanchal/The_Super_App](https://github.com/RathikPanchal/The_Super_App)

---

## ✨ Features

### 1. User Registration
- A clean, modern authentication entry point.
- Full validation for inputs (Name, Username, Email, and 10-digit Phone Number) with real-time inline errors.
- Persistent user flow validation.

### 2. Category Selector
- Visual choice selector showcasing different entertainment genres.
- Smart validation preventing progression unless at least **3 categories** are selected.
- Interactive chips for quick removal of selected genres.

### 3. Core Dashboard
An aggregated workspace featuring:
- **User Profile:** Displays user details and selected interest tags.
- **Notes Widget:** An auto-saved scratchpad for quick reminders, integrated with browser storage (`localStorage`).
- **Live Weather & Clock:** Syncs real-time local weather parameters (Temperature, Wind Speed, Humidity, and Pressure) along with a ticking system clock.
- **News Widget:** Fetching top global headlines and rotating them automatically every 2 seconds in a high-fidelity carousel format.
- **Timer Widget:** An interactive, circular countdown timer offering precise hour, minute, and second controls.

### 4. Movie Recommendations
- Recommends movies matching your interest profile using real-time search queries.
- Detailed overlay modal loaded dynamically per movie to display cast, runtime, rating, and plot summaries.

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **State Management:** [Zustand 5](https://zustand.docs.pmnd.rs/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Styling:** Vanilla CSS (Custom Design System with dark mode themes and glassmorphic variables)
- **Linter:** [Oxlint](https://github.com/oxc-project/oxc) (for super-fast static analysis)

---

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended) along with `npm`.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/RathikPanchal/The_Super_App.git
   cd The_Super_App
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Duplicate the template file `.env.example` and name it `.env`:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and supply your API keys:
   ```env
   VITE_WEATHER_API_KEY=your_openweathermap_api_key
   VITE_NEWS_API_KEY=your_newsapi_org_key
   VITE_OMDB_API_KEY=your_omdb_api_key
   ```
   *Note: If no API keys are provided, the application automatically triggers premium static mock data so you can still preview the complete experience.*

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *Open [http://localhost:5173](http://localhost:5173) in your browser.*

5. **Build for Production:**
   ```bash
   npm run build
   ```
   *This compiles optimized static assets into the `dist` directory.*

---

## 📂 Project Structure

```
├── public/                # Static assets (Favicons, SVG icons)
├── src/
│   ├── assets/            # Local images and fallback movie posters
│   ├── components/        # Reusable dashboard widgets & UI elements
│   │   ├── CategoryCard.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieModal.jsx
│   │   ├── NewsWidget.jsx
│   │   ├── NotesWidget.jsx
│   │   ├── RegistrationForm.jsx
│   │   ├── TimerWidget.jsx
│   │   └── UserProfileWidget.jsx
│   ├── pages/             # View routers
│   │   ├── Categories.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Movies.jsx
│   │   └── Register.jsx
│   ├── routes/            # Route guarding and app routing configurations
│   ├── services/          # API handlers and Axios configurations
│   ├── store/             # Zustand global state configurations
│   ├── App.css            # Layout styles
│   ├── App.jsx            # Main app router mount
│   ├── index.css          # Design system, root variables, and globals
│   └── main.jsx           # React DOM Entrypoint
├── .env.example           # Shared environment template
├── vite.config.js         # Vite bundler configurations
└── package.json           # Dependencies and scripts
```

---

## 🔒 Security

We ignore actual `.env` files in git to protect credentials. A template file `.env.example` is committed to the repository to safely show other developers the configuration shape without leaking credentials.

---

## 📄 License
This project is open-source and available under the MIT License.
