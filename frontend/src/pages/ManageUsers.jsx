import React, { useEffect, useState } from "react";
import { Users, Shield, Trash2, Edit3, Check, X, Mail, Hash, UserCheck } from "lucide-react";
import API from "../api";
import "./ManageUsers.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const loadUsers = async () => {
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditRole = (user) => {
    setEditingUser(user);
    setNewRole(user.role);
  };

  const handleSaveRole = async () => {
    try {
      await API.put(`/users/${editingUser._id}/role`, { role: newRole });
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setNewRole("");
  };

  return (
    <div className="manage-users-wrapper">
      <div className="manage-users-content">
        
        {/* Header */}
        <header className="page-header">
          <div>
            <div className="header-badge purple-badge">
              <Users className="header-badge-icon" />
              <span>User Directory</span>
            </div>
            <h1 className="page-title">Manage Users</h1>
            <p className="page-subtitle">View user profiles, assign admin roles, or remove accounts</p>
          </div>
        </header>

        {/* Users Table Card */}
        <div className="table-card">
          <div className="table-card-header">
            <h3>Registered User Accounts ({users.length})</h3>
          </div>

          <div className="table-responsive">
            <table className="custom-dark-table">
              <thead>
                <tr>
                  <th><Hash className="th-icon" /> User ID</th>
                  <th><UserCheck className="th-icon" /> Full Name</th>
                  <th><Mail className="th-icon" /> Email Address</th>
                  <th><Shield className="th-icon" /> System Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-data-cell">
                      No registered users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td className="user-id-cell">{user._id}</td>
                      <td className="user-name-cell">{user.name}</td>
                      <td className="user-email-cell">{user.email}</td>
                      <td>
                        {editingUser && editingUser._id === user._id ? (
                          <select 
                            className="role-select" 
                            value={newRole} 
                            onChange={(e) => setNewRole(e.target.value)}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span className={`role-badge ${user.role === "admin" ? "role-admin" : "role-user"}`}>
                            {user.role === "admin" ? "🛡️ Admin" : "👤 User"}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingUser && editingUser._id === user._id ? (
                          <div className="btn-group">
                            <button className="action-btn save-btn" onClick={handleSaveRole}>
                              <Check className="btn-ic" /> Save
                            </button>
                            <button className="action-btn cancel-btn" onClick={handleCancelEdit}>
                              <X className="btn-ic" /> Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="btn-group">
                            <button className="action-btn edit-btn" onClick={() => handleEditRole(user)}>
                              <Edit3 className="btn-ic" /> Edit Role
                            </button>
                            <button className="action-btn delete-btn" onClick={() => handleDelete(user._id)}>
                              <Trash2 className="btn-ic" /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
