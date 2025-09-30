// src/components/ProfileMenu.jsx
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css";

export default function ProfileMenu({ user }) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ initials helper
  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  // ✅ Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-menu" ref={menuRef}>
      {/* Avatar trigger */}
      <div className="profile-trigger" onClick={() => setOpen(!open)}>
        {user.profilePicUrl ? (
          <img
            src={user.profilePicUrl}
            alt={user.name}
            className="profile-avatar"
          />
        ) : (
          <div className="profile-initials">{getInitials(user.name)}</div>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="profile-dropdown">
          <div className="profile-header">
            {/* ✅ Sirf name ko black kar diya */}
            <strong className="profile-name" style={{ color: "#000" }}>
              {user.name}
            </strong>
            <p className="profile-email">{user.email}</p>
          </div>
          <hr />

          {/* ✅ Create another account → sirf login page open kare */}
          {/* <button
            className="dropdown-btn"
            onClick={() => {
              setOpen(false);
              navigate("/login"); // direct login page open
            }}
          >
            Create another account
          </button> */}

          {/* ✅ Sign out → logout bhi kare aur login page bhi open ho */}
          <button
            className="dropdown-btn signout"
            onClick={() => {
              logout();
              setOpen(false);
              navigate("/login"); // logout ke baad login page
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
