import "./landingPage.css";
import Logo from "../../img/Logo.png";
import MoneyLogo from "../../img/MoneyLogo.png";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <header>
        <div className="container">
          <nav className="navbar">
            <div className="navbar_logo">
              <img src={MoneyLogo} alt="Logo Website" />
            </div>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Get in Touch</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Budgeting</a>
              </li>
            </ul>
            <Link to ="/login" className="buttonSignup">
              Sign Up
            </Link>
            <Link to ="/login" className="buttonSignin">
              Sign In
            </Link>
          </nav>
        </div>
      </header>
      <div className="container">
        <section id="logo">
          <div className="main">
            <div className="main_content">
              <img src={Logo} alt="" />
              <a href="#" className="buttonSignupBig">
                Create a Financier Account
              </a>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <p>Copyrighted 2023</p>
      </footer>
    </>
  );
}
