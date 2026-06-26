import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    alert("Login Successful");
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Student Management System</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;