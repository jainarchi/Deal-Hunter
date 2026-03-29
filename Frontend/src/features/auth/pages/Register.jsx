import React, { useState } from "react";
import "../style/authForm.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    console.log("Register", { username, email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="app-name">Deal Hunter</h1>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
      <div className="link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </form>
  );
};

export default Register;