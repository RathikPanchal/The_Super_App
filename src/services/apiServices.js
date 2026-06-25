import axios from "axios";

// Import local movie poster images
import eternalsPoster from "../assets/Eternals.png";
import meganPoster from "../assets/Megan.png";
import ouijaPoster from "../assets/Ouija.png";
import smilePoster from "../assets/SMile.png";
import grayManPoster from "../assets/The Gray Man.png";
import invitationPoster from "../assets/The Invitation.png";
import topGunPoster from "../assets/TopGunMaverick.png";
import blackAdamPoster from "../assets/black_adam.png";
import orphanPoster from "../assets/orphan_first_kill.png";
import oxygenPoster from "../assets/oxygen.png";
import tenetPoster from "../assets/tenet.png";
import menuPoster from "../assets/the menu.png";

// Standard HTTP Configurations
const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

const newsClient = axios.create({
  baseURL: "https://newsapi.org/v2",
});

const movieClient = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

// ==========================================
// HIGH-FIDELITY MOCK FALLBACK DATA
// ==========================================

const MOCK_WEATHER = {
  main: {
    temp: 24,
    pressure: 1010,
    humidity: 83,
  },
  wind: {
    speed: 3.7,
  },
  weather: [
    {
      main: "Drizzle",
      description: "Heavy rain",
      icon: "09d",
    },
  ],
  name: "New Delhi",
};

const MOCK_NEWS = [
  {
    title: "Want to climb Mount Everest?",
    description: "In the years since human beings first reached the summit of Mount Everest in 1953, climbing the world's highest mountain has changed dramatically. Today, hundreds of mountaineers manage the feat each year thanks to improvements in knowledge, technology, and the significant infrastructure provided by commercially guided expeditions that provide a veritable highway up the mountain for those willing to accept both the......",
    urlToImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
    author: "Tech News Network",
    publishedAt: "2-20-2023 | 07:35 PM",
  },
  {
    title: "AI Models Push the Boundaries of Generative Code Synthesis in Modern IDEs",
    description: "DeepMind and other leading research labs release developer agents capable of writing, auditing, and executing complex software changes, setting a new standard for developer productivity.",
    urlToImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800",
    author: "Global Code Digest",
    publishedAt: "2-20-2023 | 07:35 PM",
  }
];

const MOCK_MOVIES = {
  action: [
    { Title: "Black Adam", Year: "2022", imdbID: "tt1111111", Type: "movie", Poster: blackAdamPoster },
    { Title: "Eternals", Year: "2021", imdbID: "tt2222222", Type: "movie", Poster: eternalsPoster },
    { Title: "Top Gun: Maverick", Year: "2022", imdbID: "tt3333333", Type: "movie", Poster: topGunPoster },
    { Title: "Tenet", Year: "2020", imdbID: "tt4444444", Type: "movie", Poster: tenetPoster }
  ],
  drama: [
    { Title: "The Shawshank Redemption", Year: "1994", imdbID: "tt0111161", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxNzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzcwM2FmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
    { Title: "The Godfather", Year: "1972", imdbID: "tt0068646", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
    { Title: "Forrest Gump", Year: "1994", imdbID: "tt0109830", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlYTUtY2U3ZS00Yzg1LWJhNzYtMmZiYjEyMWU1N2U0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" },
    { Title: "Parasite", Year: "2019", imdbID: "tt6751668", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZDVjODlhOWVhYjE3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg" }
  ],
  romance: [
    { Title: "Titanic", Year: "1997", imdbID: "tt0120338", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg" },
    { Title: "The Notebook", Year: "2004", imdbID: "tt0332280", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_SX300.jpg" },
    { Title: "About Time", Year: "2013", imdbID: "tt2194499", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTA1ODUzMDA3NzZeQTJeQWpwZ15BbWU4MDQxNjExMDMx._V1_SX300.jpg" },
    { Title: "Pride & Prejudice", Year: "2005", imdbID: "tt0414387", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTA1NDQ3ODcyODNeQTJeQWpwZ15BbWU4MDFjMzc1NDI@._V1_SX300.jpg" }
  ],
  thriller: [
    { Title: "Oxygen", Year: "2021", imdbID: "tt5555555", Type: "movie", Poster: oxygenPoster },
    { Title: "Smile", Year: "2022", imdbID: "tt6666666", Type: "movie", Poster: smilePoster },
    { Title: "The Gray Man", Year: "2022", imdbID: "tt7777777", Type: "movie", Poster: grayManPoster },
    { Title: "The Menu", Year: "2022", imdbID: "tt8888888", Type: "movie", Poster: menuPoster }
  ],
  western: [
    { Title: "Django Unchained", Year: "2012", imdbID: "tt1414141", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjUxM15BMl5BanBnXkFtZTcwODc5ODY4OQ@@._V1_SX300.jpg" },
    { Title: "The Good, the Bad and the Ugly", Year: "1966", imdbID: "tt1515151", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BOTQ5NDI3Mjc0MV5BMl5BanBnXkFtZTgwMDc5ODQ1MDE@._V1_SX300.jpg" },
    { Title: "Unforgiven", Year: "1992", imdbID: "tt1616161", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BODM3YWY4NmYtN2YwMi00YTViLWJjY2ItY2UxNzAxNWUxODdlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" },
    { Title: "True Grit", Year: "2010", imdbID: "tt1717171", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMjIxNjYzNTM1N15BMl5BanBnXkFtZTcwNDcyNzk2Mw@@._V1_SX300.jpg" }
  ],
  horror: [
    { Title: "M3GAN", Year: "2022", imdbID: "tt9999999", Type: "movie", Poster: meganPoster },
    { Title: "The Invitation", Year: "2022", imdbID: "tt1010101", Type: "movie", Poster: invitationPoster },
    { Title: "Orphan: First Kill", Year: "2022", imdbID: "tt1212121", Type: "movie", Poster: orphanPoster },
    { Title: "Ouija: Origin of Evil", Year: "2016", imdbID: "tt1313131", Type: "movie", Poster: ouijaPoster }
  ],
  fantasy: [
    { Title: "The Lord of the Rings: The Fellowship of the Ring", Year: "2001", imdbID: "tt0120737", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTQtMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg" },
    { Title: "Harry Potter and the Sorcerer's Stone", Year: "2001", imdbID: "tt0241527", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDVkZi00YzQ0LWIyNDYtMzcxMTU4N2JkM2NzXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg" },
    { Title: "The Hobbit: An Unexpected Journey", Year: "2012", imdbID: "tt0903624", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX300.jpg" },
    { Title: "Avatar", Year: "2009", imdbID: "tt0499549", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODUtY2I0NC00YmY0LWE1NzItOWFjMWZhDKw@@._V1_SX300.jpg" }
  ],
  music: [
    { Title: "Bohemian Rhapsody", Year: "2018", imdbID: "tt0887208", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNDg2NjcxNjUzMl5BMl5BanBnXkFtZTgwMjc1MDM5NjM@._V1_SX300.jpg" },
    { Title: "La La Land", Year: "2016", imdbID: "tt3783958", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg" },
    { Title: "A Star Is Born", Year: "2018", imdbID: "tt1517451", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMjE1NzM4MjUxOF5BMl5BanBnXkFtZTgwMDI4OTEzVzM@._V1_SX300.jpg" },
    { Title: "Rocketman", Year: "2019", imdbID: "tt1742044", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTgwMDihMzM3NjM@._V1_SX300.jpg" }
  ],
  fiction: [
    { Title: "Interstellar", Year: "2014", imdbID: "tt1818181", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFkODMtY2FiYjdmYWVjODU3XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" },
    { Title: "Blade Runner 2049", Year: "2017", imdbID: "tt1919191", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg" },
    { Title: "The Matrix", Year: "1999", imdbID: "tt2020202", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDlkQzRkOTEyODUxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
    { Title: "Inception", Year: "2010", imdbID: "tt1375666", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" }
  ]
};

const MOCK_MOVIE_DETAILS = {
  "tt1111111": { Title: "Black Adam", Rated: "PG-13", Runtime: "125 min", Genre: "Action, Fantasy, Sci-Fi", Plot: "Nearly 5,000 years after he was bestowed with the almighty powers of the ancient gods-and imprisoned just as quickly-Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.", Actors: "Dwayne Johnson, Aldis Hodge, Pierce Brosnan", ImdbRating: "6.3", Poster: blackAdamPoster },
  "tt2222222": { Title: "Eternals", Rated: "PG-13", Runtime: "156 min", Genre: "Action, Adventure, Fantasy", Plot: "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.", Actors: "Gemma Chan, Richard Madden, Angelina Jolie", ImdbRating: "6.3", Poster: eternalsPoster }
};

// ==========================================
// API IMPLEMENTATIONS WITH FALLBACKS
// ==========================================

// Weather Fetcher Method
export const fetchCurrentWeather = async (city, apiKey) => {
  if (!apiKey || apiKey === "MOCK_KEY" || apiKey.trim() === "") {
    console.warn("Weather API Key not provided. Returning premium mock data.");
    return { ...MOCK_WEATHER, name: city || MOCK_WEATHER.name };
  }
  try {
    const response = await weatherClient.get(`/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error("Weather service failure, falling back to mock:", error);
    return { ...MOCK_WEATHER, name: city || MOCK_WEATHER.name };
  }
};

// News Fetcher Method
export const fetchTopHeadlines = async (category = "general", apiKey) => {
  if (!apiKey || apiKey === "MOCK_KEY" || apiKey.trim() === "") {
    console.warn("News API Key not provided. Returning premium mock data.");
    return MOCK_NEWS;
  }
  try {
    const response = await newsClient.get(`/top-headlines?category=${category}&language=en&apiKey=${apiKey}`);
    return response.data.articles || MOCK_NEWS;
  } catch (error) {
    console.error("News service failure, falling back to mock:", error);
    return MOCK_NEWS;
  }
};

// Movie Fetcher Method (sends standard query keywords based on selected genre)
export const searchMovieByGenre = async (genre, apiKey) => {
  const normalizedGenre = genre.toLowerCase().trim();
  if (!apiKey || apiKey === "MOCK_KEY" || apiKey.trim() === "") {
    console.warn(`Movie API Key not provided for ${genre}. Returning premium mock data.`);
    return MOCK_MOVIES[normalizedGenre] || MOCK_MOVIES["action"];
  }
  try {
    // Map genres to search terms to fetch results from OMDB
    let searchTerm = genre;
    if (normalizedGenre === "romance") searchTerm = "love";
    if (normalizedGenre === "music") searchTerm = "sing";
    if (normalizedGenre === "sports") searchTerm = "race";
    
    const response = await movieClient.get(`/?s=${encodeURIComponent(searchTerm)}&type=movie&apikey=${apiKey}`);
    if (response.data && response.data.Search) {
      return response.data.Search;
    }
    return MOCK_MOVIES[normalizedGenre] || MOCK_MOVIES["action"];
  } catch (error) {
    console.error(`Movie query service failure for ${genre}, falling back to mock:`, error);
    return MOCK_MOVIES[normalizedGenre] || MOCK_MOVIES["action"];
  }
};

// Detailed Movie Fetcher Method
export const fetchMovieDetails = async (imdbID, apiKey) => {
  if (!apiKey || apiKey === "MOCK_KEY" || apiKey.trim() === "") {
    console.warn(`Movie API Key not provided for ID ${imdbID}. Returning premium mock details.`);
    return MOCK_MOVIE_DETAILS[imdbID] || {
      Title: "Unknown Movie",
      Rated: "N/A",
      Runtime: "120 min",
      Genre: "General",
      Plot: "Detailed plot description is currently unavailable for this mock entry.",
      Actors: "N/A",
      ImdbRating: "7.0",
      Poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400"
    };
  }
  try {
    const response = await movieClient.get(`/?i=${imdbID}&plot=full&apikey=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(`Movie detail payload query error for ID ${imdbID}, falling back to mock:`, error);
    return MOCK_MOVIE_DETAILS[imdbID] || {
      Title: "Movie Details Error",
      Rated: "N/A",
      Runtime: "120 min",
      Genre: "General",
      Plot: "Details could not be fetched due to an API error. Mock info placeholder.",
      Actors: "N/A",
      ImdbRating: "5.0",
      Poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400"
    };
  }
};
