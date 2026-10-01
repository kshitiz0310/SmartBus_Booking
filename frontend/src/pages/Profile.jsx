import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, ShieldCheck, Ticket, Edit3, Save, X, Sparkles } from "lucide-react";
import API from "../api";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    role: "user"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", age: "" });
  const [loading, setLoading] = useState(true);
  const [myBookingsCount, setMyBookingsCount] = useState(0);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const [meRes, bookingsRes] = await Promise.allSettled([
        API.get("/auth/me"),
        API.get("/bookings/my")
      ]);

      if (meRes.status === "fulfilled") {
        const uData = meRes.value.data;
        setUser(uData);
        setFormData({
          name: uData.name || "",
          phone: uData.phone || "",
          age: uData.age || "",
        });
      }

      if (bookingsRes.status === "fulfilled") {
        setMyBookingsCount(bookingsRes.value.data?.length || 0);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setUser((prev) => ({
        ...prev,
        name: formData.name,
        phone: formData.phone,
        age: formData.age,
      }));
      setIsEditing(false);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="bg-glow-profile" />

      <div className="profile-content">
        
        {/* Profile Card Header */}
        <div className="profile-card">
          <div className="profile-hero-top">
            <div className="profile-avatar-box">
              <span className="avatar-letter">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
            </div>

            <div className="profile-hero-text">
              <div className="role-pill">
                <ShieldCheck className="shield-ic" />
                <span>{user.role === "admin" ? "Super Admin" : "Verified Passenger"}</span>
              </div>
              <h1 className="profile-name">{user.name || "Passenger"}</h1>
              <p className="profile-email">{user.email || "user@example.com"}</p>
            </div>

            <div className="profile-quick-stats">
              <div className="stat-box">
                <Ticket className="stat-ic" />
                <div>
                  <span className="stat-num">{myBookingsCount}</span>
                  <span className="stat-lbl">Total Tickets</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-details-section">
            <div className="section-title-bar">
              <h3>Account Details</h3>
              {!isEditing ? (
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                  <Edit3 className="btn-ic" /> Edit Profile
                </button>
              ) : (
                <div className="edit-btn-group">
                  <button className="save-btn" onClick={handleSave}>
                    <Save className="btn-ic" /> Save
                  </button>
                  <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                    <X className="btn-ic" /> Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="profile-fields-grid">
              
              <div className="profile-field-item">
                <span className="field-lbl"><User className="field-ic" /> Full Name</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="field-val">{user.name || "N/A"}</span>
                )}
              </div>

              <div className="profile-field-item">
                <span className="field-lbl"><Mail className="field-ic" /> Email Address (Read-only)</span>
                <span className="field-val email-locked">{user.email || "N/A"}</span>
              </div>

              <div className="profile-field-item">
                <span className="field-lbl"><Phone className="field-ic" /> Mobile Number</span>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="field-val">{user.phone || "N/A"}</span>
                )}
              </div>

              <div className="profile-field-item">
                <span className="field-lbl"><Calendar className="field-ic" /> Age</span>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                  />
                ) : (
                  <span className="field-val">{user.age ? `${user.age} Years` : "N/A"}</span>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
