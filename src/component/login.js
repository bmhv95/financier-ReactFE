import React, { useState } from "react";
import "./login.css";

export default function Login() {
  return (
    <div className="formDiv">
      <h1>Login</h1>
      <form className="loginForm">
        <div className="inputContainer">
          <label for="login-email">Email</label>
          <input
            type="email"
            className="form-control"
            name="login-email"
            id="emailInput"
            aria-describedby="emailHelpId"
            placeholder="xxx@email.com"
            required
          />
        </div>
        <div className="inputContainer">
          <label for="">Password</label>
          <input
            type="password"
            className="form-control"
            name="login-password"
            id="passInput"
            placeholder="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
            submit
        </button>
      </form>
    </div>
  );
}
