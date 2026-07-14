import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
          background: "#111",
        }}
      >
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          to="/favorites"
          style={{ color: "white", textDecoration: "none" }}
        >
          Favorites ❤️
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;