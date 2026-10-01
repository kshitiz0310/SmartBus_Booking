import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreditCard, QrCode, CheckCircle2, AlertTriangle, ShieldCheck, Ticket } from "lucide-react";
import API from "../api";
import "./BookBus.css";

export default function BookBus() {
  const { busId } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingType, setBookingType] = useState("instant"); // 'instant' | 'razorpay' | 'upi'
  const [utrNumber, setUtrNumber] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchBusDetails();
  }, [busId]);

  const fetchBusDetails = async () => {
    try {
      const seatData = await API.get(`/bookings/seats/${busId}`);
      const busInfo = await API.get(`/buses/${busId}`);
      setBus({ ...busInfo.data, ...seatData.data });
    } catch (error) {
      console.error("Error fetching bus:", error);
      setErrorMsg("Failed to load bus details.");
    } finally {
      setLoading(false);
    }
  };

  const generateSeats = () => {
    const seats = [];
    for (let i = 1; i <= (bus?.capacity || 40); i++) {
      seats.push(`S${i}`);
    }
    return seats;
  };

  const handleSeatClick = (seatNumber) => {
    if (bus.bookedSeats?.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // 1️⃣ Instant / Demo Booking (No External Gateway Required)
  const handleInstantBooking = async (totalAmount) => {
    try {
      setProcessing(true);
      setErrorMsg("");

      const mockPaymentId = "pay_demo_" + Math.random().toString(36).substr(2, 9);
      const mockOrderId = "order_demo_" + Math.random().toString(36).substr(2, 9);

      const res = await API.post("/bookings", {
        busId,
        seatNumbers: selectedSeats,
        totalAmount,
        paymentId: mockPaymentId,
        orderId: mockOrderId,
      });

      if (res.data.success || res.status === 200) {
        alert("🎉 Booking Confirmed Successfully!");
        navigate("/my-bookings");
      }
    } catch (err) {
      console.error("Instant Booking Error:", err);
      setErrorMsg(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  // 2️⃣ Razorpay Online Payment
  const handleRazorpayBooking = async (totalAmount) => {
    try {
      setProcessing(true);
      setErrorMsg("");

      // 1. Create order on backend
      const orderRes = await API.post("/payment/create-order", {
        amount: totalAmount,
      });

      const { id: order_id, amount } = orderRes.data;

      // 2. Razorpay Checkout options
      const options = {
        key: process.env.REACT_APP_RZP_KEY || "rzp_test_RjvHG9WDrUYF5F",
        amount: amount,
        currency: "INR",
        name: "Smart Bus Booking",
        description: `Bus ${bus.busNumber} (${selectedSeats.length} Seats)`,
        order_id: order_id,

        handler: async function (response) {
          try {
            // Verify payment signature
            const verifyRes = await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (!verifyRes.data.success) {
              return setErrorMsg("Payment verification failed!");
            }

            // Save booking to Database
            await API.post("/bookings", {
              busId,
              seatNumbers: selectedSeats,
              totalAmount,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });

            alert("🎉 Razorpay Payment & Booking Successful!");
            navigate("/my-bookings");
          } catch (err) {
            console.error("Payment confirmation error:", err);
            setErrorMsg("Error confirming Razorpay booking.");
          }
        },

        theme: { color: "#2563eb" },
      };

      if (!window.Razorpay) {
        setErrorMsg("Razorpay SDK not loaded. Please use Instant Demo Mode.");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (resp) {
        setErrorMsg(`Payment Failed: ${resp.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error("Razorpay Order Error:", error);
      setErrorMsg(
        "Razorpay Test Key invalid/expired. Please select 'Instant (Demo Mode)' below to complete your booking!"
      );
    } finally {
      setProcessing(false);
    }
  };

  // 3️⃣ UPI QR Code / Manual Payment
  const handleUpiBooking = async (totalAmount) => {
    if (!utrNumber.trim()) {
      setErrorMsg("Please enter UTR / Transaction reference number.");
      return;
    }

    try {
      setProcessing(true);
      setErrorMsg("");

      const upiPaymentId = "pay_upi_" + utrNumber.trim();
      const upiOrderId = "order_upi_" + Date.now();

      await API.post("/bookings", {
        busId,
        seatNumbers: selectedSeats,
        totalAmount,
        paymentId: upiPaymentId,
        orderId: upiOrderId,
        utrNumber: utrNumber.trim(),
      });

      alert("🎉 Booking Submitted! Sent for Admin Verification.");
      navigate("/my-bookings");
    } catch (err) {
      console.error("UPI Booking Error:", err);
      setErrorMsg(err.response?.data?.message || "UPI Booking submission failed.");
    } finally {
      setProcessing(false);
    }
  };

  const submitBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat first.");
      return;
    }

    const totalAmount = selectedSeats.length * bus.fare;

    if (bookingType === "instant") {
      handleInstantBooking(totalAmount);
    } else if (bookingType === "razorpay") {
      handleRazorpayBooking(totalAmount);
    } else if (bookingType === "upi") {
      handleUpiBooking(totalAmount);
    }
  };

  if (loading) return <div className="loading-screen">Loading bus details...</div>;
  if (!bus) return <div className="error-screen">Bus not found</div>;

  const totalAmount = selectedSeats.length * bus.fare;

  return (
    <div className="book-bus-wrapper">
      <div className="book-bus-content">
        
        {/* Header */}
        <header className="booking-header">
          <div>
            <span className="bus-badge">{bus.busNumber}</span>
            <h1>{bus.startPoint} → {bus.destination}</h1>
            <p>Departure: {bus.departureTime} | Travel Date: {new Date(bus.date).toLocaleDateString("en-IN")}</p>
          </div>
          <div className="fare-badge">
            <span>₹{bus.fare}</span>
            <small>per seat</small>
          </div>
        </header>

        {errorMsg && (
          <div className="error-banner">
            <AlertTriangle className="error-icon" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="booking-layout">
          
          {/* Seat Map Left */}
          <div className="seat-section-card">
            <div className="card-title">
              <Ticket className="title-icon" />
              <h3>Select Seats ({selectedSeats.length} selected)</h3>
            </div>

            <div className="driver-bar">
              <span className="steering">⚙️ Driver Deck</span>
            </div>

            <div className="seat-grid">
              {generateSeats().map((seatNumber) => {
                const isBooked = bus.bookedSeats?.includes(seatNumber);
                const isSelected = selectedSeats.includes(seatNumber);
                return (
                  <button
                    key={seatNumber}
                    className={`seat-box ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
                    onClick={() => handleSeatClick(seatNumber)}
                    disabled={isBooked}
                    title={isBooked ? "Already Booked" : `Seat ${seatNumber}`}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>

            <div className="seat-legend-row">
              <div className="legend-item"><span className="legend-box available" /> Available</div>
              <div className="legend-item"><span className="legend-box selected" /> Selected</div>
              <div className="legend-item"><span className="legend-box booked" /> Booked</div>
            </div>
          </div>

          {/* Payment Right Panel */}
          <div className="payment-section-card">
            <div className="card-title">
              <ShieldCheck className="title-icon green" />
              <h3>Payment & Checkout</h3>
            </div>

            {/* Seat Summary */}
            <div className="summary-box">
              <div className="summary-row">
                <span>Selected Seats:</span>
                <span className="val-seats">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                </span>
              </div>
              <div className="summary-row">
                <span>Fare per seat:</span>
                <span>₹{bus.fare}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total Payable:</span>
                <span className="total-val">₹{totalAmount}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="payment-methods">
              <p className="method-label">Choose Payment Method:</p>

              <label 
                className={`method-option ${bookingType === "instant" ? "active" : ""}`}
                onClick={() => setBookingType("instant")}
              >
                <input
                  type="radio"
                  name="bookingType"
                  checked={bookingType === "instant"}
                  onChange={() => setBookingType("instant")}
                />
                <div className="method-info">
                  <span className="method-title">⚡ Instant (Demo / Test Mode)</span>
                  <span className="method-desc">Recommended for testing (No API Key required)</span>
                </div>
              </label>

              <label 
                className={`method-option ${bookingType === "razorpay" ? "active" : ""}`}
                onClick={() => setBookingType("razorpay")}
              >
                <input
                  type="radio"
                  name="bookingType"
                  checked={bookingType === "razorpay"}
                  onChange={() => setBookingType("razorpay")}
                />
                <div className="method-info">
                  <span className="method-title">💳 Razorpay Online Gateway</span>
                  <span className="method-desc">Card / UPI / NetBanking via Razorpay</span>
                </div>
              </label>

              <label 
                className={`method-option ${bookingType === "upi" ? "active" : ""}`}
                onClick={() => setBookingType("upi")}
              >
                <input
                  type="radio"
                  name="bookingType"
                  checked={bookingType === "upi"}
                  onChange={() => setBookingType("upi")}
                />
                <div className="method-info">
                  <span className="method-title">📲 UPI QR Code / Manual UTR</span>
                  <span className="method-desc">Manual payment verification</span>
                </div>
              </label>

              {bookingType === "upi" && (
                <div className="upi-inputs">
                  <input
                    type="text"
                    placeholder="Enter UTR / Transaction No."
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                  />
                </div>
              )}
            </div>

            <button
              className="confirm-pay-btn"
              onClick={submitBooking}
              disabled={selectedSeats.length === 0 || processing}
            >
              {processing ? "Processing..." : `Pay ₹${totalAmount} & Confirm`}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
