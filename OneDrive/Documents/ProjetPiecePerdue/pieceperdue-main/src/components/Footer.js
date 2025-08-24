import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Gestion des Pièces Perdues. Tous droits réservés.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "white",
    textAlign: "center",
    padding: "0px",
    position: "fixed",
    bottom: "0",
    width: "100%"
  }
};

export default Footer;
