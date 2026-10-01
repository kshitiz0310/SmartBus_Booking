import React, { useEffect, useState } from "react";
import { Ticket, MapPin, Calendar, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import API from "../api";
import "./MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error("Error loading my bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mybookings-wrapper">
      <div className="mybookings-content">
        
        {/* Header */}
        <header className="page-header">
          <div>
            <div className="header-badge">
              <Ticket className="header-badge-icon" />
              <span>Passenger Portal</span>
            </div>
            <h1 className="page-title">My Ticket Bookings</h1>
            <p className="page-subtitle">View your active bus tickets, seat reservations, and transaction details</p>
          </div>
        </header>

        {loading ? (
          <div className="loading-state">Loading your ticket reservations...</div>
        ) : bookings.length === 0 ? (
          <div className="no-bookings-card">
            <Ticket className="empty-icon" />
            <h3>No Bookings Found</h3>
            <p>You haven't booked any bus tickets yet. Search buses on the home page to start your journey!</p>
          </div>
        ) : (
          <div className="tickets-grid">
            {bookings.map((b) => (
              <div className="ticket-card" key={b._id}>
                {/* Ticket Top Header */}
                <div className="ticket-top">
                  <span className="bus-no-tag">{b.busId?.busNumber || "Bus Ticket"}</span>
                  <span className={`status-tag ${b.paymentStatus || b.status}`}>
                    {b.paymentStatus === "paid" || b.paymentStatus === "verified" ? (
                      <><CheckCircle2 className="st-icon" /> Paid & Confirmed</>
                    ) : b.paymentStatus === "pending" ? (
                      <><AlertCircle className="st-icon" /> Pending Admin Review</>
                    ) : (
                      <><XCircle className="st-icon" /> {b.paymentStatus || b.status}</>
                    )}
                  </span>
                </div>

                {/* Route Header */}
                <div className="ticket-route">
                  <div className="point-box">
                    <MapPin className="pin-icon" />
                    <span>{b.busId?.startPoint || "Origin"}</span>
                  </div>
                  <div className="route-line">
                    <span>🚌</span>
                  </div>
                  <div className="point-box end">
                    <MapPin className="pin-icon" />
                    <span>{b.busId?.destination || "Destination"}</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="ticket-details-grid">
                  <div className="detail-item">
                    <span className="lbl"><Calendar className="ic" /> Travel Date</span>
                    <span className="val">
                      {b.busId?.date ? new Date(b.busId.date).toLocaleDateString("en-IN") : "Scheduled Date"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="lbl"><Clock className="ic" /> Departure Time</span>
                    <span className="val">{b.busId?.departureTime || "TBD"}</span>
                  </div>

                  <div className="detail-item">
                    <span className="lbl"><Ticket className="ic" /> Seats ({b.seatNumbers?.length || 0})</span>
                    <span className="val seat-highlight">{b.seatNumbers?.join(", ") || "N/A"}</span>
                  </div>

                  <div className="detail-item">
                    <span className="lbl">Total Paid</span>
                    <span className="val price-highlight">₹{b.totalAmount}</span>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="ticket-footer">
                  <span className="txn-ref">Txn ID: {b.paymentId || b.utrNumber || b._id.substring(0, 10)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
