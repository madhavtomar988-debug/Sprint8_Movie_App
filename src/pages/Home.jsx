import { useEffect, useState, useRef } from "react";
import { getPopularMovies, searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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