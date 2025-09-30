// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import Settings from "./pages/Settings";
import Payment from "./pages/Payment";
import Analytics from "./pages/Analytics";
import Support from "./pages/Support";
import Academics from "./pages/Academics";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Admissions from "./pages/Admissions";
import Placements from "./pages/Placements";
import Faculty from "./pages/Faculty";
import Admin from "./pages/Admin";
import Parent from "./pages/Parent";
import HostelPage from "./components/HostelPage"

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

function MainLayout() {
  const location = useLocation();

  // Hide Navbar on Login & Signup pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="app-container">
      {!hideNavbar && <Navbar />}
      <div className="page-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
          <Route path="/academics" element={<ProtectedRoute><Academics /></ProtectedRoute>} />
          <Route path="/admissions" element={<ProtectedRoute><Admissions /></ProtectedRoute>} />
          <Route path="/faculty" element={<ProtectedRoute><Faculty /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/parent" element={<ProtectedRoute><Parent /></ProtectedRoute>} />
 <Route path="/hostels" element={<HostelPage />} /> 
          {/* Public Routes */}
          <Route path="/placements" element={<Placements />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                404 - Page Not Found
              </h2>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
