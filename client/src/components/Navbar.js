import React from "react";
import "../styles/Navbar.css";
function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "#0d6efd",
        height: "70px",
        padding: "0 30px",
      }}
    >
      <h3 className="text-white m-0">
        🎓 Student Management System
      </h3>
    </nav>
  );
}

export default Navbar;