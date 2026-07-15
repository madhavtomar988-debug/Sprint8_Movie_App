function MovieCard({ movie, onFavorite }) {
  const poster = movie.poster_path
  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  : "https://via.placeholder.com/500x750?text=No+Image";
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
  src={poster}
  alt={movie.title}
  loading="lazy"
  onError={(e) => {
    e.target.src =
      "https://via.placeholder.com/500x750?text=No+Image";
  }}
  style={{
    width: "100%",
    borderRadius: "10px",
  }}
/>

      <h3>{movie.title}</h3>

      <p>⭐ {movie.vote_average || "N/A"}</p>

      <p>📅 {movie.release_date || "Unknown"}</p>
    </div>
  );
}

export default MovieCard;