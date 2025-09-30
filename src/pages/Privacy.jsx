import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <style>{`
        .privacy-container {
          padding: 40px;
          max-width: 900px;
          margin: auto;
          background: #f8f9fb;
          color: #7361a3ff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.8;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }

        .privacy-container h1 {
          text-align: center;
          color: #0077cc;
          margin-bottom: 20px;
          font-size: 2.2rem;
        }

        .privacy-container h2 {
          color: #444;
          margin-top: 30px;
          font-size: 1.5rem;
          border-left: 4px solid #0077cc;
          padding-left: 10px;
        }

        .privacy-container p,
        .privacy-container li {
          font-size: 1rem;
          color: #555;
        }

        .privacy-container ul {
          padding-left: 20px;
          margin-top: 10px;
        }

        .privacy-container li {
          margin-bottom: 8px;
          position: relative;
        }

        .privacy-container li::before {
          content: "✔";
          color: #28a745;
          margin-right: 8px;
        }

        .privacy-container strong {
          color: #000;
        }

        .privacy-container p:last-child {
          text-align: center;
          margin-top: 30px;
          font-size: 1.1rem;
          background: #f5f5f5;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
      `}</style>

      <h1>Privacy Policy</h1>
      <p>
        At <strong>ERP System</strong>, we value your privacy and are committed to
        protecting your personal information. This Privacy Policy explains how we
        collect, use, and safeguard your data when you use our platform.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>Personal details like name, email, and phone number provided during registration.</li>
        <li>Academic records such as roll number, branch, and year.</li>
        <li>Payment and fee-related information.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and manage ERP services.</li>
        <li>To process student admissions and academics.</li>
        <li>To communicate important updates and notifications.</li>
      </ul>

      <h2>3. Data Protection</h2>
      <p>
        We implement strong security measures to protect your personal
        information. Your data will never be sold to third parties.
      </p>

      <h2>4. Your Rights</h2>
      <p>
        You can access, update, or delete your personal information by contacting
        the administrator.
      </p>

      <h2>5. Changes to this Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Please review it
        periodically.
      </p>

      <p>
        📧 For any questions, contact us at <strong>support@erp.com</strong>
      </p>
    </div>
  );
}
