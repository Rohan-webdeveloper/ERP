import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaChartLine,
  FaUserShield,
  FaCheckCircle,
} from "react-icons/fa";
import { supabase } from "./supabaseClient"; // adjust the path if needed
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Track user session
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) setUser(session.user);
        else setUser(null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Background images
  const images = [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1950&q=80",
  ];

  // Random starting image
  const [currentImage, setCurrentImage] = useState(() =>
    Math.floor(Math.random() * images.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        {/* Slider */}
        <div className="hero-slider">
          {images.map((img, index) => (
            <div
              key={index}
              className={`slide ${index === currentImage ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>

        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Conversational ERP Assistant</h1>
          <p>
            Students, parents, and faculty can check fees, hostel details, or
            attendance directly through AI-powered chat — simple, fast, and
            secure.
          </p>

          {/* ✅ Get Started button or Welcome message */}
          {!user ? (
            <button
              className="hero-btn"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          ) : (
            <h2 style={{ color: "white", marginTop: "20px" }}>
              Welcome,{" "}
              <span style={{ color: "#007bff" }}>
                {user.user_metadata && user.user_metadata.full_name
                  ? user.user_metadata.full_name
                  : user.email}
              </span>
              !
            </h2>
          )}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="features-section fade-in">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-box">
            <FaRobot size={40} color="#0078ff" />
            <h3>AI-Powered Queries</h3>
            <p>Ask about hostel availability, fees, or attendance instantly.</p>
          </div>
          <div className="feature-box">
            <FaChartLine size={40} color="#0078ff" />
            <h3>Real-Time Analytics</h3>
            <p>
              Admins view fee collection, admissions, and hostel occupancy in
              seconds.
            </p>
          </div>
          <div className="feature-box">
            <FaUserShield size={40} color="#0078ff" />
            <h3>Secure Access</h3>
            <p>Parents, students, and staff only see their relevant data.</p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section slide-up">
        <div className="about-img">
          <img
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1950&q=80"
            alt="ERP Dashboard Demo"
          />
        </div>
        <div className="about-text">
          <h2>Why Conversational ERP?</h2>
          <p>
            No more navigating complex dashboards. Parents can confirm hostel
            fees, students check attendance, and staff update records — all by
            chatting naturally on WhatsApp or Telegram.
          </p>
          <ul>
            <li>
              <FaCheckCircle color="green" /> Save time & effort
            </li>
            <li>
              <FaCheckCircle color="green" /> Instant updates
            </li>
            <li>
              <FaCheckCircle color="green" /> Works on mobile
            </li>
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how-section fade-in">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Create an account</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>Upload or view hostel details</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>Pay securely online</p>
          </div>
          <div className="step">
            <span>4</span>
            <p>Track reports anytime</p>
          </div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="counters-section slide-up">
        <div className="counter-box">
          <h2>5000+</h2>
          <p>Students</p>
        </div>
        <div className="counter-box">
          <h2>50+</h2>
          <p>Hostels Managed</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section fade-in">
        <h2>What People Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-box">
            <p>
              “I can now check my child’s hostel fees from WhatsApp. Super
              easy!”
            </p>
            <h4>- Parent</h4>
          </div>
          <div className="testimonial-box">
            <p>“Admissions report in one line message — saves me hours.”</p>
            <h4>- Admin</h4>
          </div>
          <div className="testimonial-box">
            <p>
              “Attendance + hostel details in seconds. The bot is a lifesaver.”
            </p>
            <h4>- Faculty</h4>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section slide-up">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Is my data secure?</h3>
          <p>
            Yes, all data is encrypted and only accessible by authorized users.
          </p>
        </div>
        <div className="faq-item">
          <h3>Can parents pay fees online?</h3>
          <p>
            Absolutely. Parents can pay securely with UPI, cards, or net
            banking.
          </p>
        </div>
        <div className="faq-item">
          <h3>Does it work on mobile?</h3>
          <p>Yes, it works seamlessly on WhatsApp, Telegram, and web.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          {/* About */}
          <div className="footer-col">
            <h3>About Us</h3>
            <p>
              Our platform helps students and parents easily manage hostel & fee
              payments with secure transactions and real-time updates.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#how">How it Works</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="/terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3>Contact</h3>
            <p>Email: support@hostelpay.com</p>
            <p>Phone: +91 9876543210</p>
            <div className="footer-social">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} ERP. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
