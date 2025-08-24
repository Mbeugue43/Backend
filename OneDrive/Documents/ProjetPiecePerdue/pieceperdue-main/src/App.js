import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PiecePerdu from "./pages/PiecePerdu";
import PieceRamace from "./pages/PieceRamace";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <Router>
      <div className="App">
        {/* 🔹 Header et navigation globale */}
        <Header />
        <nav style={styles.navbar}>
          <Link to="/" style={styles.link}>Accueil</Link>
          <Link to="/piece-perdu" style={styles.link}>Pièces Perdues</Link>
          <Link to="/piece-ramace" style={styles.link}>Pièces Ramassées</Link>
        </nav>

        {/* 🔹 Gestion des routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/piece-perdu" element={<PiecePerdu />} />
          <Route path="/piece-ramace" element={<PieceRamace />} />
        </Routes>

        {/* 🔹 Footer global */}
        <Footer />
      </div>
    </Router>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "10px",
    backgroundColor: "#ddd"
  },
  link: {
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333"
  }
};

export default App;
