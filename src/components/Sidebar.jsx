import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">ERP</h2>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">🏠 Dashboard</Link></li>
        {/* <li><Link to="/profile">👤 Student Profile</Link></li> */}
        <li><Link to="/admissions">📝 Admissions</Link></li>
        <li><Link to="/academics">🎓 Academics</Link></li>
        {/* <li><Link to="/admin">🏛 Admin</Link></li> */}
        {/* <li><Link to="/faculty">👨‍🏫 Faculty</Link></li> */}
        {/* <li><Link to="/parent">👪 Parent</Link></li> */}
        {/* <li><Link to="/analytics">📊 Analytics</Link></li> */}
        <li><Link to="/payments">💳 Payments</Link></li>
        <li><Link to="/placements">💼 Placements</Link></li>
        <li><Link to="/support">💬 Support</Link></li>
        <li><Link to="/settings">⚙️ Settings</Link></li>
      </ul>
    </div>
  );
}
