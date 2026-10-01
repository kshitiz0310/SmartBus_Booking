import React, { useEffect, useState } from "react";
import { CalendarCheck, CheckCircle, XCircle, Trash2, Ban, ExternalLink, Ticket, DollarSign, User, Bus } from "lucide-react";
import API from "../api";
import "./ManageBookings.css";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const { data } = await API.get("/bookings");
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handlePaymentVerification = async (id, status) => {
    try {
      await API.patch(`/bookings/${id}/verify`, { paymentStatus: status });
      loadBookings();
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await API.patch(`/bookings/${id}/cancel`);
      loadBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking record?")) return;
    try {
      await API.delete(`/bookings/${id}`);
      loadBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="manage-bookings-wrapper">
      <div className="manage-bookings-content">
        
        {/* Header */}
        <header className="page-header">
          <div>
            <div className="header-badge amber-badge">
              <CalendarCheck className="header-badge-icon" />
              <span>Reservation Management</span>
            </div>
            <h1 className="page-title">Manage Bookings</h1>
            <p className="page-subtitle">Verify payment transactions, manage seat reservations, and export records</p>
          </div>
        </header>

        {/* Bookings Table Card */}
        <div className="table-card">
          <div className="table-card-header">
            <h3>All Passenger Bookings ({bookings.length})</h3>
          </div>

          <div className="table-responsive">
            <table className="custom-dark-table">
              <thead>
                <tr>
                  <th><User className="th-icon" /> Passenger</th>
                  <th><Bus className="th-icon" /> Bus No.</th>
                  <th><Ticket className="th-icon" /> Seats</th>
                  <th><DollarSign className="th-icon" /> Amount</th>
                  <th>UTR / Txn ID</th>
                  <th>Payment Status</th>
                  <th>Receipt</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-data-cell">
                      No passenger bookings found yet.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="user-name-cell">
                        {booking.userId?.name || booking.userId?.email || "Guest User"}
                      </td>
                      <td>
                        <span className="bus-tag">{booking.busId?.busNumber || "N/A"}</span>
                      </td>
                      <td className="seat-cell">
                        {booking.seatNumbers?.join(", ") || "N/A"}
                      </td>
                      <td className="amount-cell">₹{booking.totalAmount}</td>
                      <td className="utr-cell">{booking.utrNumber || "Online / Razorpay"}</td>
                      <td>
                        <span className={`status-pill ${booking.paymentStatus}`}>
                          {booking.paymentStatus === "verified" && "✓ Verified"}
                          {booking.paymentStatus === "pending" && "⏳ Pending"}
                          {booking.paymentStatus === "rejected" && "✕ Rejected"}
                          {!["verified", "pending", "rejected"].includes(booking.paymentStatus) && booking.paymentStatus}
                        </span>
                      </td>
                      <td>
                        {booking.transactionScreenshot ? (
                          <a
                            href={`${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace(/\/api\/?$/, "") : "http://localhost:5000"}/uploads/transactions/${booking.transactionScreenshot}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="receipt-link"
                          >
                            View <ExternalLink className="link-ic" />
                          </a>
                        ) : (
                          <span className="no-receipt">None</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group">
                          {booking.paymentStatus === "pending" && (
                            <>
                              <button
                                className="action-btn verify-btn"
                                onClick={() => handlePaymentVerification(booking._id, "verified")}
                                title="Approve Payment"
                              >
                                <CheckCircle className="btn-ic" /> Verify
                              </button>
                              <button
                                className="action-btn reject-btn"
                                onClick={() => handlePaymentVerification(booking._id, "rejected")}
                                title="Reject Payment"
                              >
                                <XCircle className="btn-ic" /> Reject
                              </button>
                            </>
                          )}
                          <button
                            className="action-btn cancel-btn"
                            onClick={() => handleCancel(booking._id)}
                            title="Cancel Booking"
                          >
                            <Ban className="btn-ic" /> Cancel
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDelete(booking._id)}
                            title="Delete Record"
                          >
                            <Trash2 className="btn-ic" />
                          </button>
                        </div>
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