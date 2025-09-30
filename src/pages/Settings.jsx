import React, { useState, useEffect } from "react";
import "./Settings.css";

// Translations for English & Hindi
const translations = {
  English: {
    title: "⚙️ ERP Settings",
    company: "Company/College Name",
    email: "Admin Email",
    phone: "Contact Number",
    theme: "Theme",
    language: "Language",
    save: "Save Settings",
    light: "🌞 Light",
    dark: "🌙 Dark",
  },
  Hindi: {
    title: "⚙️ ईआरपी सेटिंग्स",
    company: "कॉलेज/कंपनी का नाम",
    email: "एडमिन ईमेल",
    phone: "संपर्क नंबर",
    theme: "थीम",
    language: "भाषा",
    save: "सेटिंग्स सहेजें",
    light: "🌞 हल्का",
    dark: "🌙 गहरा",
  },
};

const Settings = () => {
  // Load saved settings from localStorage, else empty
  const [companyName, setCompanyName] = useState(
    localStorage.getItem("companyName") || ""
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  // Apply theme when changed
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Save settings to localStorage
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("companyName", companyName);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    alert("✅ Settings updated & saved!");
  };

  const t = translations[language];

  return (
    <div className="settings-page">
      <h2>{t.title}</h2>
      <form onSubmit={handleSave} className="settings-form">
        <div className="form-group">
          <label>{t.company}</label>
          <input
            type="text"
            placeholder="Enter company/college name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>{t.email}</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>{t.phone}</label>
          <input
            type="text"
            placeholder="Enter contact number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>{t.theme}</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">{t.light}</option>
            <option value="dark">{t.dark}</option>
          </select>
        </div>

        <div className="form-group">
          <label>{t.language}</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <button type="submit" className="save-btn">
          {t.save}
        </button>
      </form>
    </div>
  );
};

export default Settings;
