import React from "react";
import "./Policy.css"; // create this file or reuse your Home.css

const Terms = () => {
  return (
    <div className="policy-container">
      <h1>Terms & Conditions</h1>
      <p>Welcome to our ERP platform. By using this website, you agree to the following terms and conditions:</p>

      <ol>
        <li>
          <strong>Acceptance:</strong> By accessing and using this ERP system, you accept and agree to comply with all the rules and policies outlined here.
        </li>
        <li>
          <strong>User Responsibilities:</strong> Users must provide accurate information and not misuse the system for fraudulent or illegal purposes.
        </li>
        <li>
          <strong>Data Usage:</strong> The platform may collect, store, and process user data to provide services efficiently. Users consent to this collection.
        </li>
        <li>
          <strong>Account Security:</strong> Users are responsible for maintaining the confidentiality of their account credentials and should notify the admin of any unauthorized access.
        </li>
        <li>
          <strong>Changes to Terms:</strong> We reserve the right to modify the terms at any time. Continued use of the platform implies acceptance of changes.
        </li>
      </ol>

      <p>For any questions regarding these terms, please contact support@hostelpay.com.</p>
    </div>
  );
};

export default Terms;
