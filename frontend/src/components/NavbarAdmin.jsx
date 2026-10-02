import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bus, LayoutDashboard, Calendar, Users, LogOut, ShieldCheck } from "lucide-react";
import "./NavbarAdmin.css";

export default function NavbarAdmin() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-admin">
      <div className="navbar-admin-container">
        <div className="navbar-admin-brand">
          <Link to="/admin" className="navbar-admin-logo-wrapper">
            <div className="navbar-admin-logo-badge">
              <Bus className="navbar-admin-logo-icon" />
              <div className="logo-glow-ring-admin"></div>
            </div>
            <div className="navbar-admin-brand-text">
              <span className="brand-title">Smart Bus</span>
              <span className="brand-subtitle">
                <ShieldCheck className="shield-icon" /> Admin Suite
              </span>
            </div>
          </Link>
        </div>

        <div className="navbar-admin-links">
          <Link
            to="/admin"
            className={`navbar-admin-link ${isActive("/admin") ? "active" : ""}`}
          >
            <LayoutDashboard className="nav-icon" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/buses"
            className={`navbar-admin-link ${isActive("/admin/buses") ? "active" : ""}`}
          >
            <Bus className="nav-icon" />
            <span>Buses</span>
          </Link>
          <Link
            to="/admin/bookings"
            className={`navbar-admin-link ${isActive("/admin/bookings") ? "active" : ""}`}
          >
            <Calendar className="nav-icon" />
            <span>Bookings</span>
          </Link>
          <Link
            to="/admin/users"
            className={`navbar-admin-link ${isActive("/admin/users") ? "active" : ""}`}
          >
            <Users className="nav-icon" />
            <span>Users</span>
          </Link>
        </div>

        <div className="navbar-admin-user">
          <div className="admin-profile-pill">
            <div className="admin-avatar">A</div>
            <div className="admin-info">
              <span className="admin-name">Super Admin</span>
              <span className="admin-status"><span className="status-dot"></span> Online</span>
            </div>
          </div>
          <Link to="/" className="navbar-admin-logout" title="Logout">
            <LogOut className="logout-icon" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
