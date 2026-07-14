import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Favorites ❤️</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavorite={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;