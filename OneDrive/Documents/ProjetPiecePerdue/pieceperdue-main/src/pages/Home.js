import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header"; // Import du Header
import Footer from "../components/Footer";
import "../styles/Home.css"; // Assure-toi que ce fichier CSS existe

const Home = () => {
  return (
    <div className="home-container">
      {/* 🔹 Ajout du Header en haut de la page */}
      {/* <Header /> */}

      {/* <h1 className="home-title">Accueil</h1> */}

      <div className="home-button-wrapper">
        <div className="home-button-container">
          <Link to="/piece-ramace" className="home-button">
            DÉCLARER <br /> UNE PIÈCE RAMASSÉE
          </Link>
          <Link to="/piece-perdu" className="home-button">
            DÉCLARER <br /> UNE PIÈCE PERDUE
          </Link>
          <Link to="/piece-ramace" className="home-button">
            NOUS CONTACTER
          </Link>
          <Link to="/piece-perdu" className="home-button">
            NOUS SOUTENIR
          </Link>

        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
