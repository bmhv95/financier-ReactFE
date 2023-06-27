import React, { useState } from "react";
import "./login.css";
import authService from "../../service/auth.service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.login(email, password)
    .then(()=>{
      navigate('/app');
    })
    .catch(()=>{
      alert("Invalid email or password");
    })
  };

  return (
    <div className="formDiv">
      <h1>Login</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="loginEmail">Email</label>
          <input
            type="email"
            className="form-control"
            name="loginEmail"
            id="emailInput"
            aria-describedby="emailHelpId"
            placeholder="xxx@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            className="form-control"
            name="login-password"
            id="passInput"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary ">
          submit
        </button>
      </form>
    </div>
  );
}
