import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Bus, ArrowRight, ShieldCheck, UserCheck, Sparkles, Filter, Wind } from "lucide-react";
import API from "../api";
import "./UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState({
    from: "",
    to: "",
    date: "",
    ac: true,
    nonAc: true,
  });
  const [error, setError] = useState("");
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
    // Fetch all buses on initial load so user sees available routes right away!
    fetchAllBuses();
  }, []);

  const fetchAllBuses = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/buses");
      setBuses(data);
    } catch (err) {
      console.error("Error loading buses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === "checkbox") {
      setSearch((prev) => ({ ...prev, [name]: checked }));
    } else {
      setSearch((prev) => ({ ...prev, [name]: value }));
    }
    setError("");
  };

  const handleQuickRouteSelect = (from, to) => {
    setSearch((prev) => ({ ...prev, from, to }));
    executeSearch(from, to, search.date, search.ac, search.nonAc);
  };

  const executeSearch = async (from, to, date, ac, nonAc) => {
    setLoading(true);
    setHasSearched(true);
    setError("");

    try {
      const params = new URLSearchParams({
        from: from || "",
        to: to || "",
        date: date || "",
        ac: ac ? "1" : "0",
        nonAc: nonAc ? "1" : "0",
      }).toString();

      const { data } = await API.get(`/buses?${params}`);
      setBuses(data);
    } catch (error) {
      console.error("Error fetching buses:", error);
      setError("Failed to load buses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.from.trim() && !search.to.trim()) {
      // If empty, reload all buses
      fetchAllBuses();
      return;
    }
    executeSearch(search.from, search.to, search.date, search.ac, search.nonAc);
  };

  return (
    <div className="user-dashboard-wrapper">
      <div className="bg-glow-top" />
      <div className="bg-glow-bottom" />

      <div className="user-dashboard-content">
        
        {/* Hero Welcome & Search Banner */}
        <section className="user-hero-card">
          <div className="hero-badge-pill">
            <Sparkles className="sparkle-ic" />
            <span>Smart Bus Express</span>
          </div>

          <h1 className="user-hero-title">
            Where do you want to <span className="highlight-text">travel today?</span>
          </h1>

          <p className="user-hero-sub">
            Welcome, <strong className="user-name-highlight">{user ? user.name : "Passenger"}</strong>! Search and reserve comfortable sleeper & seater bus tickets instantly.
          </p>

          {/* Search Box Form */}
          <form className="main-search-bar" onSubmit={handleSearchSubmit}>
            <div className="search-input-group">
              <MapPin className="input-icon" />
              <input
                name="from"
                type="text"
                placeholder="From (e.g. GLA / Delhi)"
                value={search.from}
                onChange={handleChange}
              />
            </div>

            <div className="search-divider">
              <span>→</span>
            </div>

            <div className="search-input-group">
              <MapPin className="input-icon" />
              <input
                name="to"
                type="text"
                placeholder="To (e.g. MZP / Manali)"
                value={search.to}
                onChange={handleChange}
              />
            </div>

            <div className="search-input-group date-group">
              <Calendar className="input-icon" />
              <input
                name="date"
                type="date"
                value={search.date}
                onChange={handleChange}
              />
            </div>

            <div className="ac-toggle-filters">
              <label className={`toggle-chip ${search.ac ? "active" : ""}`}>
                <input
                  name="ac"
                  type="checkbox"
                  checked={search.ac}
                  onChange={handleChange}
                />
                AC
              </label>
              <label className={`toggle-chip ${search.nonAc ? "active" : ""}`}>
                <input
                  name="nonAc"
                  type="checkbox"
                  checked={search.nonAc}
                  onChange={handleChange}
                />
                Non-AC
              </label>
            </div>

            <button type="submit" className="search-btn">
              <Search className="btn-ic" />
              <span>Search Buses</span>
            </button>
          </form>

          {/* Quick Route Chips */}
          <div className="quick-routes-row">
            <span className="quick-label">Popular Routes:</span>
            <button className="route-chip" onClick={() => handleQuickRouteSelect("GLA", "MZP")}>
              GLA → MZP
            </button>
            <button className="route-chip" onClick={() => handleQuickRouteSelect("Delhi", "Manali")}>
              Delhi → Manali
            </button>
            <button className="route-chip" onClick={() => handleQuickRouteSelect("Mumbai", "Goa")}>
              Mumbai → Goa
            </button>
            <button className="route-chip" onClick={() => handleQuickRouteSelect("Jaipur", "Delhi")}>
              Jaipur → Delhi
            </button>
          </div>
        </section>

        {error && <div className="search-error-banner">{error}</div>}

        {/* Search Results Section */}
        <section className="buses-results-section">
          <div className="section-title-row">
            <div>
              <h2 className="results-heading">
                {hasSearched ? "Search Results" : "Available Fleet Buses"}
              </h2>
              <p className="results-sub">
                {buses.length} bus{buses.length !== 1 ? "es" : ""} ready for booking
              </p>
            </div>
          </div>

          {loading ? (
            <div className="buses-loading-card">Searching available buses...</div>
          ) : buses.length === 0 ? (
            <div className="no-buses-card">
              <Bus className="empty-ic" />
              <h3>No Buses Found for this Route</h3>
              <p>Try searching for a different starting point or destination date.</p>
            </div>
          ) : (
            <div className="buses-grid">
              {buses.map((bus) => (
                <div key={bus._id} className="bus-result-card">
                  
                  {/* Card Header */}
                  <div className="bus-card-top">
                    <div className="bus-identity">
                      <span className="bus-number-badge">{bus.busNumber}</span>
                      <span className={`ac-pill ${bus.isAc ? "ac" : "non-ac"}`}>
                        <Wind className="wind-ic" /> {bus.isAc ? "AC Sleeper" : "Non-AC"}
                      </span>
                    </div>
                    <div className="bus-price-tag">
                      <span className="price-val">₹{bus.fare}</span>
                      <small>per seat</small>
                    </div>
                  </div>

                  {/* Route Visual */}
                  <div className="bus-route-box">
                    <div className="route-point">
                      <span className="city-name">{bus.startPoint}</span>
                      <span className="time-val">{bus.departureTime}</span>
                    </div>

                    <div className="route-travel-indicator">
                      <div className="line-dot" />
                      <div className="line" />
                      <Bus className="bus-ic-mid" />
                      <div className="line" />
                      <div className="line-dot" />
                    </div>

                    <div className="route-point right">
                      <span className="city-name">{bus.destination}</span>
                      <span className="time-val">{bus.arrivalTime}</span>
                    </div>
                  </div>

                  {/* Bus Specs & Seat Count */}
                  <div className="bus-specs-row">
                    <div className="spec-item">
                      <span className="spec-lbl">Travel Date</span>
                      <span className="spec-val">{new Date(bus.date).toLocaleDateString("en-IN")}</span>
                    </div>

                    <div className="spec-item">
                      <span className="spec-lbl">Available Seats</span>
                      <span className={`spec-val seats-val ${bus.seatsAvailable > 5 ? "high" : "low"}`}>
                        {bus.seatsAvailable} / {bus.capacity} seats left
                      </span>
                    </div>

                    <div className="spec-item">
                      <span className="spec-lbl">Driver Info</span>
                      <span className="spec-val">{bus.driverName || "Assigned Driver"}</span>
                    </div>
                  </div>

                  {bus.notes && (
                    <div className="bus-notes-box">
                      <span>ℹ️ {bus.notes}</span>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    className="book-now-cta"
                    onClick={() => navigate(`/book/${bus._id}`)}
                    disabled={bus.seatsAvailable <= 0}
                  >
                    <span>{bus.seatsAvailable > 0 ? "Select Seats & Book" : "Sold Out"}</span>
                    <ArrowRight className="cta-arrow" />
                  </button>

                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
