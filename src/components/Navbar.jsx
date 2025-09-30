// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Fuse from "fuse.js";
import ProfileMenu from "./ProfileMenu";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const pages = [
    { name: "home", path: "/" },
    { name: "dashboard", path: "/dashboard" },
    { name: "profile", path: "/profile" },
    { name: "student profile", path: "/profile" },
    { name: "settings", path: "/settings" },
    { name: "payments", path: "/payments" },
    { name: "analytics", path: "/analytics" },
    { name: "support", path: "/support" },
    { name: "academics", path: "/academics" },
    { name: "admissions", path: "/admissions" },
    { name: "faculty", path: "/faculty" },
    { name: "admin", path: "/admin" },
    { name: "parent", path: "/parent" },
    { name: "placements", path: "/placements" },
    { name: "terms", path: "/terms" },
    { name: "privacy", path: "/privacy" },
    { name: "login", path: "/login" },
    { name: "signup", path: "/signup" },
  ];

  const fuse = new Fuse(pages, {
    keys: ["name"],
    threshold: 0.4,
  });

  const handleSearch = () => {
    if (!query.trim()) return;
    const results = fuse.search(query);
    if (results.length > 0) navigate(results[0].item.path);
    else alert("Page not found ❌");
  };

  return (
    <nav className="navbar">
      {/* Left logo */}
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <div className="erp-container">
      <h2 className="erp-logo">ERP</h2>
    </div>
        </Link>
      </div>

      {/* Right links */}
      <div className="navbar-right">
        <Link to="/">Home</Link>

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/faculty">Faculty</Link>
            <Link to="/profile">Student</Link>
            <Link to="/hostels">Hostel Allotment</Link>
            <Link to="/dashboard">Dashboard</Link>
            <ProfileMenu user={user} />
          </>
        )}
      </div>
    </nav>
  );
}
