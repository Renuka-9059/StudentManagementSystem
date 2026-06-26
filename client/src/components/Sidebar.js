import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h3>MENU</h3>

      <Link to="/dashboard">🏠 Dashboard</Link>

      <Link to="/students">👨‍🎓 Students</Link>

      <Link to="/courses">📚 Courses</Link>

      <Link to="/attendance">📅 Attendance</Link>

      <Link to="/results">📈 Results</Link>

    </div>
  );
}

export default Sidebar;