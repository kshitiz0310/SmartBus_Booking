import React, { useEffect, useState } from "react";
import { Bus, PlusCircle, X, Trash2, Calendar, Clock, MapPin, User, Phone, DollarSign, FileText, Wind } from "lucide-react";
import API from "../api";
import "./ManageBuses.css";

export default function ManageBuses() {
  const [buses, setBuses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    busNumber: "",
    date: "",
    departureTime: "",
    arrivalTime: "",
    startPoint: "",
    destination: "",
    driverName: "",
    driverPhone: "",
    capacity: 40,
    seatsAvailable: 40,
    isAc: true,
    fare: 0,
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBuses = async () => {
    try {
      const { data } = await API.get("/buses");
      setBuses(data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  useEffect(() => {
    loadBuses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    try {
      await API.delete(`/buses/${id}`);
      loadBuses();
    } catch (error) {
      console.error("Error deleting bus:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/buses", formData);
      setShowAddForm(false);
      setFormData({
        busNumber: "",
        date: "",
        departureTime: "",
        arrivalTime: "",
        startPoint: "",
        destination: "",
        driverName: "",
        driverPhone: "",
        capacity: 40,
        seatsAvailable: 40,
        isAc: true,
        fare: 0,
        notes: ""
      });
      loadBuses();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add bus.");
      console.error("Error adding bus:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-buses-wrapper">
      <div className="manage-buses-content">
        
        {/* Header Section */}
        <header className="page-header">
          <div>
            <div className="header-badge">
              <Bus className="header-badge-icon" />
              <span>Fleet Operations</span>
            </div>
            <h1 className="page-title">Manage Buses</h1>
            <p className="page-subtitle">Add new buses, manage schedules, routes, and fare pricing</p>
          </div>
          
          <button 
            className={`add-bus-toggle-btn ${showAddForm ? "cancel" : ""}`}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? (
              <>
                <X className="btn-icon" />
                <span>Cancel Form</span>
              </>
            ) : (
              <>
                <PlusCircle className="btn-icon" />
                <span>Add New Bus</span>
              </>
            )}
          </button>
        </header>

        {/* Add Bus Form Modal / Collapsible Section */}
        {showAddForm && (
          <div className="add-bus-card">
            <div className="card-header-bar">
              <h3><PlusCircle className="form-head-icon" /> Add New Bus to Fleet</h3>
              <p>Fill out the details to schedule a new bus route</p>
            </div>

            {error && <div className="form-error-alert">{error}</div>}

            <form onSubmit={handleSubmit} className="add-bus-grid-form">
              {/* Row 1 */}
              <div className="form-grid-2">
                <div className="input-field-group">
                  <label><Bus className="field-icon" /> Bus Number / Code</label>
                  <input
                    type="text"
                    name="busNumber"
                    placeholder="e.g. DL-01-AB-1234"
                    value={formData.busNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-field-group">
                  <label><Calendar className="field-icon" /> Travel Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="form-grid-2">
                <div className="input-field-group">
                  <label><Clock className="field-icon" /> Departure Time</label>
                  <input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-field-group">
                  <label><Clock className="field-icon" /> Arrival Time</label>
                  <input
                    type="time"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="form-grid-2">
                <div className="input-field-group">
                  <label><MapPin className="field-icon" /> Start Point (Origin)</label>
                  <input
                    type="text"
                    name="startPoint"
                    placeholder="e.g. Delhi"
                    value={formData.startPoint}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-field-group">
                  <label><MapPin className="field-icon" /> Destination</label>
                  <input
                    type="text"
                    name="destination"
                    placeholder="e.g. Manali"
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="form-grid-2">
                <div className="input-field-group">
                  <label><User className="field-icon" /> Driver Name</label>
                  <input
                    type="text"
                    name="driverName"
                    placeholder="Driver's Full Name"
                    value={formData.driverName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-field-group">
                  <label><Phone className="field-icon" /> Driver Phone</label>
                  <input
                    type="tel"
                    name="driverPhone"
                    placeholder="+91 9876543210"
                    value={formData.driverPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div className="form-grid-3">
                <div className="input-field-group">
                  <label>Total Capacity (Seats)</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-field-group">
                  <label><DollarSign className="field-icon" /> Fare Ticket Price (₹)</label>
                  <input
                    type="number"
                    name="fare"
                    placeholder="e.g. 750"
                    value={formData.fare}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-field-group">
                  <label><Wind className="field-icon" /> AC / Non-AC Type</label>
                  <div className="ac-radio-options">
                    <label className={`radio-pill ${formData.isAc ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="isAc"
                        checked={formData.isAc === true}
                        onChange={() => setFormData({ ...formData, isAc: true })}
                      />
                      AC Sleeper
                    </label>
                    <label className={`radio-pill ${!formData.isAc ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="isAc"
                        checked={formData.isAc === false}
                        onChange={() => setFormData({ ...formData, isAc: false })}
                      />
                      Non-AC
                    </label>
                  </div>
                </div>
              </div>

              {/* Row 6 */}
              <div className="input-field-group">
                <label><FileText className="field-icon" /> Additional Route Notes / Stops</label>
                <textarea
                  name="notes"
                  rows="2"
                  placeholder="Optional boarding point instructions or amenities"
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="form-submit-row">
                <button type="submit" className="submit-bus-btn" disabled={loading}>
                  {loading ? "Adding Bus..." : "Submit & Schedule Bus"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bus Table Container */}
        <div className="table-card">
          <div className="table-card-header">
            <h3>Active Fleet Buses ({buses.length})</h3>
          </div>

          <div className="table-responsive">
            <table className="custom-dark-table">
              <thead>
                <tr>
                  <th>Bus No.</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>AC Type</th>
                  <th>Seats</th>
                  <th>Fare</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="no-data-cell">
                      No buses found in fleet. Click "Add New Bus" to add one!
                    </td>
                  </tr>
                ) : (
                  buses.map((bus) => (
                    <tr key={bus._id}>
                      <td className="bus-no-cell">
                        <span className="bus-tag">{bus.busNumber}</span>
                      </td>
                      <td className="route-cell">
                        <span className="point">{bus.startPoint}</span>
                        <span className="arrow">→</span>
                        <span className="point">{bus.destination}</span>
                      </td>
                      <td>{new Date(bus.date).toLocaleDateString("en-IN")}</td>
                      <td className="time-text">{bus.departureTime}</td>
                      <td className="time-text">{bus.arrivalTime}</td>
                      <td>
                        <span className={`ac-badge ${bus.isAc ? "ac" : "non-ac"}`}>
                          {bus.isAc ? "AC" : "Non-AC"}
                        </span>
                      </td>
                      <td>{bus.capacity} seats</td>
                      <td className="fare-cell">₹{bus.fare}</td>
                      <td>
                        <button className="table-del-btn" onClick={() => handleDelete(bus._id)}>
                          <Trash2 className="action-icon" /> Delete
                        </button>
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
