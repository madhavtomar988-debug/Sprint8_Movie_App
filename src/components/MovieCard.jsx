function MovieCard({ movie, onFavorite }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        position: "relative",
      }}
    >
      <button
        onClick={() => onFavorite(movie)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "20px",
          background: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        ❤️
      </button>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
        style={{ width: "100%", borderRadius: "10px" }}
      />

      <h3>{movie.title}</h3>

      <p>⭐ {movie.vote_average}</p>

      <p>📅 {movie.release_date}</p>
    </div>
  );
}

export default MovieCard;