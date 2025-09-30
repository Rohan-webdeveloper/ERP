import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [form, setForm] = useState({
    name: "Rohan Singh",
    email: "rohan@example.com",
    phone: "9876543210",
    department: "Finance",
    theme: "light",
    notifications: true,
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Settings updated successfully!");
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Account Settings</h2>

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email ID</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            <option>Finance</option>
            <option>HR</option>
            <option>IT</option>
            <option>Sales</option>
          </select>
        </div>

        <div className="form-group">
          <label>Theme</label>
          <select
            name="theme"
            value={form.theme}
            onChange={handleChange}
          >
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={form.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>
        </div>

        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-btn">💾 Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
