import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bus, ShieldCheck, Ticket, Zap, ArrowRight, CheckCircle2, Sparkles, MapPin, Users, DollarSign } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HomePage.css";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="landing-wrapper">
      <div className="bg-glow-top-left" />
      <div className="bg-glow-bottom-right" />

      {/* Hero Section */}
      <section className="hero-container">
        <div className="hero-content" data-aos="fade-up">
          
          <div className="hero-pill-tag">
            <Sparkles className="sparkle-icon" />
            <span>Next-Gen Bus Reservation Engine</span>
          </div>

          <h1 className="hero-headline">
            Smart Bus Booking <br />
            <span className="gradient-text">Fast, Secure & Seamless</span>
          </h1>

          <p className="hero-description">
            Book college trips, exam travel, and city routes in seconds. Experience interactive real-time seat maps, instant digital ticket confirmations, and complete fleet management.
          </p>

          <div className="hero-cta-group">
            <Link to="/register" className="primary-cta-btn">
              <span>Book Your Ticket Now</span>
              <ArrowRight className="cta-icon" />
            </Link>

            <Link to="/login" className="secondary-cta-btn">
              <span>Login to Account</span>
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="metrics-strip">
            <div className="strip-item">
              <span className="strip-val">100+</span>
              <span className="strip-lbl">Active Daily Routes</span>
            </div>
            <div className="strip-divider" />
            <div className="strip-item">
              <span className="strip-val">100%</span>
              <span className="strip-lbl">Real-time Seat Selection</span>
            </div>
            <div className="strip-divider" />
            <div className="strip-item">
              <span className="strip-val">Instant</span>
              <span className="strip-lbl">Digital Ticket Confirmation</span>
            </div>
          </div>

        </div>
      </section>

      {/* Features Grid Section */}
      <section className="features-section" id="features">
        <div className="section-title-center" data-aos="fade-up">
          <div className="section-badge">Platform Capabilities</div>
          <h2>Everything You Need for Bus Transport</h2>
          <p>Built with MERN Stack architecture for passengers and transport managers</p>
        </div>

        <div className="features-card-grid">
          
          <div className="feature-card-box" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-icon-wrapper icon-blue">
              <Bus />
            </div>
            <h3>Interactive Seat Selection</h3>
            <p>Visual 40-seat map with live available, booked, and selected seat status updates in real-time.</p>
            <ul className="feature-bullet-list">
              <li><CheckCircle2 className="chk-ic" /> AC & Non-AC Sleeper Filter</li>
              <li><CheckCircle2 className="chk-ic" /> Live fare calculation</li>
            </ul>
          </div>

          <div className="feature-card-box" data-aos="fade-up" data-aos-delay="180">
            <div className="feature-icon-wrapper icon-purple">
              <ShieldCheck />
            </div>
            <h3>Super Admin Suite</h3>
            <p>Comprehensive fleet management. Add buses, update departure schedules, assign drivers, and manage users.</p>
            <ul className="feature-bullet-list">
              <li><CheckCircle2 className="chk-ic" /> CSV Report Export</li>
              <li><CheckCircle2 className="chk-ic" /> Role-based user control</li>
            </ul>
          </div>

          <div className="feature-card-box" data-aos="fade-up" data-aos-delay="260">
            <div className="feature-icon-wrapper icon-emerald">
              <Ticket />
            </div>
            <h3>Digital Passenger Portal</h3>
            <p>Access your digital ticket passes, track active reservations, and inspect transaction reference IDs anytime.</p>
            <ul className="feature-bullet-list">
              <li><CheckCircle2 className="chk-ic" /> Live Payment Status</li>
              <li><CheckCircle2 className="chk-ic" /> Easy Cancellation</li>
            </ul>
          </div>

          <div className="feature-card-box" data-aos="fade-up" data-aos-delay="340">
            <div className="feature-icon-wrapper icon-amber">
              <Zap />
            </div>
            <h3>Multi-Payment System</h3>
            <p>Supports Instant Demo Checkout, Razorpay Payment Gateway, and Manual UPI UTR verification.</p>
            <ul className="feature-bullet-list">
              <li><CheckCircle2 className="chk-ic" /> 1-Click Test Checkout</li>
              <li><CheckCircle2 className="chk-ic" /> Razorpay Test Gateway</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Popular Route Showcase Section */}
      <section className="popular-routes-section">
        <div className="routes-card-wide" data-aos="fade-up">
          <div className="routes-header">
            <div>
              <span className="section-badge">Live Routes</span>
              <h2>Popular College & Express Routes</h2>
            </div>
            <Link to="/login" className="view-all-link">
              Search All Buses <ArrowRight className="link-ic" />
            </Link>
          </div>

          <div className="sample-routes-grid">
            <div className="sample-route-item">
              <div className="route-cities">
                <MapPin className="pin-ic" />
                <span>GLA Campus → MZP Station</span>
              </div>
              <span className="route-fare">₹200</span>
            </div>

            <div className="sample-route-item">
              <div className="route-cities">
                <MapPin className="pin-ic" />
                <span>Delhi ISBT → Manali Volvo</span>
              </div>
              <span className="route-fare">₹750</span>
            </div>

            <div className="sample-route-item">
              <div className="route-cities">
                <MapPin className="pin-ic" />
                <span>Mumbai Central → Goa Express</span>
              </div>
              <span className="route-fare">₹950</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content-grid">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <Bus className="footer-logo-ic" />
              <span>Smart Bus Booking</span>
            </div>
            <p>Your reliable digital partner for campus trips, exam routes, and interstate bus travel.</p>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register Account</Link></li>
              <li><a href="#features">Features</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4>Contact & Support</h4>
            <p>Email: support@smartbusbooking.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Database: MongoDB Atlas Connected</p>
          </div>
        </div>

        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Smart Bus Booking System. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
