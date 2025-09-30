import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Assistant from "../pages/Assistant";
import "./Dashboard.css";

export default function Dashboard() {
  const [showChat, setShowChat] = useState(false);

  // URL hash check karke chat open
  useEffect(() => {
    if (window.location.hash === "#chat") {
      setShowChat(true);
    }
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        
        {/* ✅ Horizontal box */}
        <div className="dashboard-header-box">
          <h1>Welcome to Dashboard 🎉</h1>
          <button
            className="chat-toggle-btn"
            onClick={() => setShowChat(!showChat)}
          >
            {showChat ? "Hide Chat" : "Open Chat"}
          </button>
        </div>

        {/* Assistant component */}
        {showChat && <Assistant />}
      </div>
    </div>
  );
}
