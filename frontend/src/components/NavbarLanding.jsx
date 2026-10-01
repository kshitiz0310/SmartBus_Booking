import React from "react";
import { Bus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./NavbarLanding.css";

export default function NavbarLanding() {
  return (
    <nav className="navbar-landing">
      <div className="navbar-landing-left">
        <Link to="/" aria-label="Home" className="navbar-landing-logo-wrapper">
          <div className="navbar-landing-logo-badge">
            <Bus className="navbar-landing-logo-icon" />
          </div>
          <span className="navbar-landing-title">Smart Bus</span>
        </Link>
      </div>

      <div className="navbar-landing-right">
        <Link to="/login" className="nav-login-link">
          Login
        </Link>
        <Link to="/register" className="nav-signup-btn">
          <span>Sign Up</span>
          <ArrowRight className="btn-ic" />
        </Link>
      </div>
    </nav>
  );
}
