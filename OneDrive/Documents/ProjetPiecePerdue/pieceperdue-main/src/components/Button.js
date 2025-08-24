import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button style={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: "#007BFF",
    color: "red",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
    margin: "5px"
  }
};

export default Button;
