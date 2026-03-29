import React, { useState } from "react";
import '../style/authForm.scss';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    console.log("Login", { email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="app-name">Deal Hunter</h1>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
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
      <button type="submit">Login</button>
      <div className="link">
        Don't have an account? <a href="/register">Register</a>
      </div>
    </form>
  );
};

export default Login;