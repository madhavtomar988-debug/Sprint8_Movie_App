import { useEffect, useState, useRef } from "react";
import { getPopularMovies, searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import { getMovieSuggestion } from "../services/gemini";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [mood, setMood] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const observer = useRef();

  // Load movies whenever page changes
  useEffect(() => {
    loadPopularMovies(page);
  }, [page]);

  // Fetch popular movies
  const loadPopularMovies = async (pageNumber = 1) => {
    const data = await getPopularMovies(pageNumber);

    if (pageNumber === 1) {
      setMovies(data);
    } else {
      setMovies((prev) => [...prev, ...data]);
    }
  };

  // Search movies
  const handleSearch = async () => {
    if (search.trim() === "") {
      setPage(1);
      loadPopularMovies(1);
      return;
    }

    const data = await searchMovies(search);
    setMovies(data);
  };
  useEffect(() => {
  const timer = setTimeout(async () => {
    if (search.trim() === "") {
      setPage(1);
      loadPopularMovies(1);
      return;
    }

    const data = await searchMovies(search);
    setMovies(data);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

  // Add to favorites
  const addToFavorites = (movie) => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyExists = favorites.find(
      (item) => item.id === movie.id
    );

    if (!alreadyExists) {
      favorites.push(movie);
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );
      alert("Added to Favorites ❤️");
    } else {
      alert("Already in Favorites");
    }
  };
  const handleMoodSearch = async () => {
  if (!mood.trim()) return;

  setLoadingAI(true);

  try {
    const movieTitle = await getMovieSuggestion(mood);

    if (!movieTitle) {
      alert("AI could not suggest a movie.");
      return;
    }

    setSearch(movieTitle);

    const data = await searchMovies(movieTitle);
    setMovies(data);
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  } finally {
    setLoadingAI(false);
  }
};

  // Infinite Scroll
  const lastMovieElementRef = (node) => {
    if (search.trim() !== "") return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Popular Movies</h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        

        
      </div>
      <div
  style={{
    textAlign: "center",
    marginBottom: "30px",
  }}
>
  <input
    type="text"
    placeholder="Enter your mood (happy, sad, action, romantic...)"
    value={mood}
    onChange={(e) => setMood(e.target.value)}
    style={{
      padding: "10px",
      width: "320px",
      marginRight: "10px",
    }}
  />

  <button
    onClick={handleMoodSearch}
    disabled={loadingAI}
    style={{
      padding: "10px 18px",
      cursor: "pointer",
    }}
  >
    {loadingAI ? "Thinking..." : "🎬 AI Mood Match"}
  </button>
</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {movies.map((movie, index) => {
          if (index === movies.length - 1) {
            return (
              <div key={movie.id} ref={lastMovieElementRef}>
                <MovieCard
                  movie={movie}
                  onFavorite={addToFavorites}
                />
              </div>
            );
          }

          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavorite={addToFavorites}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;