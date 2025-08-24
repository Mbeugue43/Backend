// src/Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css'; // Importer le fichier CSS pour le dashboard

const Dashboard = () => {
  // État pour le formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page lors de la soumission
    console.log('Formulaire soumis avec les données:', formData); // Afficher les données dans la console
    // Réinitialiser le formulaire après soumission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="dashboard">
      {/* Menu latéral (Sidebar) */}
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Accueil</li>
          <li>Utilisateurs</li>
          <li>Projets</li>
          <li>Paramètres</li>
        </ul>
      </div>
      
      {/* Contenu principal */}
      <div className="main-content">
        <header>
          <h1>Bienvenue sur le Dashboard</h1>
        </header>
        
        {/* Cartes d'informations */}
        <div className="cards">
          <div className="card">
            <h3>Utilisateurs</h3>
            <p>100+</p>
          </div>
          <div className="card">
            <h3>Projets</h3>
            <p>50+</p>
          </div>
          <div className="card">
            <h3>Tâches</h3>
            <p>35</p>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="form-container">
          <h2>Formulaire de Contact</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
