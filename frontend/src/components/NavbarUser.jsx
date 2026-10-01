import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bus, LayoutDashboard, User, Ticket, LogOut } from "lucide-react";
import "./NavbarUser.css";

export default function NavbarUser() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-user">
      <div className="navbar-user-brand">
        <Link to="/user" className="navbar-user-logo-wrapper">
          <div className="navbar-user-logo-badge">
            <Bus className="navbar-user-logo-icon" />
          </div>
          <div className="navbar-user-brand-text">
            <span className="brand-title">Smart Bus</span>
          </div>
        </Link>
      </div>

      <div className="navbar-user-links">
        <Link
          to="/user"
          className={`navbar-user-link ${isActive("/user") ? "active" : ""}`}
        >
          <LayoutDashboard className="nav-icon" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/profile"
          className={`navbar-user-link ${isActive("/profile") ? "active" : ""}`}
        >
          <User className="nav-icon" />
          <span>Profile</span>
        </Link>
        <Link
          to="/my-bookings"
          className={`navbar-user-link ${isActive("/my-bookings") ? "active" : ""}`}
        >
          <Ticket className="nav-icon" />
          <span>My Bookings</span>
        </Link>
      </div>

      <div className="navbar-user-right">
        <Link to="/" className="navbar-user-logout" title="Logout">
          <LogOut className="logout-icon" />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
