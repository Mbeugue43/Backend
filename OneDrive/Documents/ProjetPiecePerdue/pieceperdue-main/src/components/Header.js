import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Assure-toi que ce fichier CSS existe

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        {/* 🔹 Ajout du logo */}
        <img src="/logo.png" alt="Logo" className="logo" />

        {/* <h1 className="header-title">Gestion des Pièces Perdues</h1> */}

        {/* <nav className="header-nav">
          <Link to="/" className="header-link">Accueil</Link>
          <Link to="/piece-perdu" className="header-link">Pièces Perdues</Link>
          <Link to="/piece-ramace" className="header-link">Pièces Ramassées</Link>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
