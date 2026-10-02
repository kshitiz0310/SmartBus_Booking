import React from "react";
import { Bus, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import "./NavbarLanding.css";

export default function NavbarLanding() {
  return (
    <nav className="navbar-landing">
      <div className="navbar-landing-container">
        <div className="navbar-landing-left">
          <Link to="/" aria-label="Home" className="navbar-landing-logo-wrapper">
            <div className="navbar-landing-logo-badge">
              <Bus className="navbar-landing-logo-icon" />
              <div className="logo-glow-ring"></div>
            </div>
            <div className="navbar-brand-text-group">
              <span className="navbar-landing-title">Smart Bus</span>
              <span className="navbar-brand-tag">
                <Sparkles className="tag-sparkle" /> Express Fleet
              </span>
            </div>
          </Link>
        </div>

        <div className="navbar-landing-right">
          <Link to="/login" className="nav-login-link">
            Log In
          </Link>
          <Link to="/register" className="nav-signup-btn">
            <span>Get Started</span>
            <ArrowRight className="btn-ic" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
