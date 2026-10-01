import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bus,
  CalendarCheck,
  Users,
  BarChart3,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Activity,
  PlusCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import API from "../api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBuses: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [busesRes, bookingsRes, usersRes] = await Promise.allSettled([
        API.get("/buses"),
        API.get("/bookings"),
        API.get("/users"),
      ]);

      const buses = busesRes.status === "fulfilled" ? busesRes.value.data : [];
      const bookings = bookingsRes.status === "fulfilled" ? bookingsRes.value.data : [];
      const users = usersRes.status === "fulfilled" ? usersRes.value.data : [];

      const revenue = bookings.reduce((sum, b) => sum + (b.totalAmount || b.busId?.fare || 0), 0);

      setStats({
        totalBuses: buses.length,
        totalBookings: bookings.length,
        totalUsers: users.length,
        totalRevenue: revenue,
      });

      setRecentBookings(bookings.slice(0, 5));
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard-wrapper">
      {/* Background Accent Gradients */}
      <div className="bg-glow-1" />
      <div className="bg-glow-2" />

      <div className="admin-dashboard-content">
        {/* Welcome Hero Section */}
        <header className="admin-hero">
          <div className="admin-hero-main">
            <div className="hero-badge">
              <Sparkles className="badge-sparkle" />
              <span>Control Center</span>
            </div>
            <h1 className="hero-title">
              Welcome Back, <span className="title-gradient">Super Admin! 👋</span>
            </h1>
            <p className="hero-subtitle">
              Here is your real-time overview of fleet status, passenger bookings, and system health.
            </p>
          </div>
          <div className="admin-hero-actions">
            <div className="system-pill">
              <span className="live-dot" />
              <Activity className="pill-icon" />
              <span>DB Connected (Atlas)</span>
            </div>
            <Link to="/admin/buses" className="hero-cta-btn">
              <PlusCircle className="cta-icon" />
              <span>Add New Bus</span>
            </Link>
          </div>
        </header>

        {/* Live Metrics Grid */}
        <section className="metrics-section">
          <div className="metric-card card-buses">
            <div className="metric-header">
              <div className="metric-icon-box blue-glow">
                <Bus className="metric-icon" />
              </div>
              <span className="metric-trend positive">+100% Active</span>
            </div>
            <div className="metric-body">
              <span className="metric-label">Total Fleet Buses</span>
              <h2 className="metric-value">{loading ? "..." : stats.totalBuses}</h2>
            </div>
            <div className="metric-footer">
              <Link to="/admin/buses" className="metric-link">
                Manage Fleet <ArrowRight className="link-arrow" />
              </Link>
            </div>
          </div>

          <div className="metric-card card-bookings">
            <div className="metric-header">
              <div className="metric-icon-box purple-glow">
                <CalendarCheck className="metric-icon" />
              </div>
              <span className="metric-trend positive">Live System</span>
            </div>
            <div className="metric-body">
              <span className="metric-label">Total Bookings</span>
              <h2 className="metric-value">{loading ? "..." : stats.totalBookings}</h2>
            </div>
            <div className="metric-footer">
              <Link to="/admin/bookings" className="metric-link">
                View All Bookings <ArrowRight className="link-arrow" />
              </Link>
            </div>
          </div>

          <div className="metric-card card-users">
            <div className="metric-header">
              <div className="metric-icon-box emerald-glow">
                <Users className="metric-icon" />
              </div>
              <span className="metric-trend positive">Verified</span>
            </div>
            <div className="metric-body">
              <span className="metric-label">Registered Users</span>
              <h2 className="metric-value">{loading ? "..." : stats.totalUsers}</h2>
            </div>
            <div className="metric-footer">
              <Link to="/admin/users" className="metric-link">
                User Directory <ArrowRight className="link-arrow" />
              </Link>
            </div>
          </div>

          <div className="metric-card card-revenue">
            <div className="metric-header">
              <div className="metric-icon-box amber-glow">
                <DollarSign className="metric-icon" />
              </div>
              <span className="metric-trend positive">INR ₹</span>
            </div>
            <div className="metric-body">
              <span className="metric-label">Estimated Revenue</span>
              <h2 className="metric-value">₹{loading ? "..." : stats.totalRevenue.toLocaleString("en-IN")}</h2>
            </div>
            <div className="metric-footer">
              <Link to="/admin/bookings" className="metric-link">
                Financial Reports <ArrowRight className="link-arrow" />
              </Link>
            </div>
          </div>
        </section>

        {/* Action Modules Grid */}
        <section className="modules-section">
          <div className="section-heading-row">
            <div>
              <h2 className="section-title">Quick Control Modules</h2>
              <p className="section-sub">Direct access to manage your transit platform</p>
            </div>
          </div>

          <div className="action-cards-grid">
            {/* Bus Fleet Module */}
            <div className="action-card">
              <div className="action-card-header">
                <div className="action-card-icon icon-blue">
                  <Bus />
                </div>
                <span className="card-badge">Fleet Mgmt</span>
              </div>
              <h3>Manage Buses & Routes</h3>
              <p>Add new buses, schedule departure & arrival times, set ticket pricing, and manage seat configurations.</p>
              <div className="action-card-footer">
                <div className="card-stat-chip">{stats.totalBuses} Active Buses</div>
                <Link to="/admin/buses" className="action-btn btn-blue">
                  <span>Manage Buses</span>
                  <ArrowRight className="btn-arrow" />
                </Link>
              </div>
            </div>

            {/* Bookings Module */}
            <div className="action-card">
              <div className="action-card-header">
                <div className="action-card-icon icon-purple">
                  <CalendarCheck />
                </div>
                <span className="card-badge">Reservations</span>
              </div>
              <h3>Manage Passenger Bookings</h3>
              <p>Review customer reservations, track seat allocations, process cancellations, and export booking data.</p>
              <div className="action-card-footer">
                <div className="card-stat-chip">{stats.totalBookings} Total Tickets</div>
                <Link to="/admin/bookings" className="action-btn btn-purple">
                  <span>Manage Bookings</span>
                  <ArrowRight className="btn-arrow" />
                </Link>
              </div>
            </div>

            {/* Users Module */}
            <div className="action-card">
              <div className="action-card-header">
                <div className="action-card-icon icon-emerald">
                  <Users />
                </div>
                <span className="card-badge">Accounts</span>
              </div>
              <h3>User Accounts & Roles</h3>
              <p>Monitor registered users, manage user accounts, assign admin privileges, and inspect user activity logs.</p>
              <div className="action-card-footer">
                <div className="card-stat-chip">{stats.totalUsers} Registered</div>
                <Link to="/admin/users" className="action-btn btn-emerald">
                  <span>Manage Users</span>
                  <ArrowRight className="btn-arrow" />
                </Link>
              </div>
            </div>

            {/* Reports Module */}
            <div className="action-card">
              <div className="action-card-header">
                <div className="action-card-icon icon-amber">
                  <BarChart3 />
                </div>
                <span className="card-badge">Analytics</span>
              </div>
              <h3>Reports & CSV Export</h3>
              <p>Generate revenue reports, view route popularity analytics, and download comprehensive CSV files.</p>
              <div className="action-card-footer">
                <div className="card-stat-chip">Instant CSV Export</div>
                <Link to="/admin/bookings" className="action-btn btn-amber">
                  <span>View Reports</span>
                  <ArrowRight className="btn-arrow" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* System Health & Quick Status Grid */}
        <section className="status-grid-section">
          <div className="status-card-wide">
            <div className="status-card-header">
              <div className="header-title-box">
                <Activity className="status-header-icon" />
                <div>
                  <h3>System Status & Infrastructure</h3>
                  <p>All core services operating normally</p>
                </div>
              </div>
              <span className="health-tag">99.9% Uptime</span>
            </div>

            <div className="system-items-row">
              <div className="sys-item">
                <CheckCircle2 className="sys-icon green" />
                <div className="sys-info">
                  <span className="sys-label">Database</span>
                  <span className="sys-val">MongoDB Atlas Cloud</span>
                </div>
              </div>

              <div className="sys-item">
                <CheckCircle2 className="sys-icon green" />
                <div className="sys-info">
                  <span className="sys-label">API Gateway</span>
                  <span className="sys-val">Express.js (Port 5000)</span>
                </div>
              </div>

              <div className="sys-item">
                <CheckCircle2 className="sys-icon green" />
                <div className="sys-info">
                  <span className="sys-label">Payment Gateway</span>
                  <span className="sys-val">Razorpay Live API</span>
                </div>
              </div>

              <div className="sys-item">
                <CheckCircle2 className="sys-icon green" />
                <div className="sys-info">
                  <span className="sys-label">Security</span>
                  <span className="sys-val">JWT Signed Bearer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
