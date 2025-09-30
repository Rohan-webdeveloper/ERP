// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../pages/supabaseClient"; // Supabase client
import { FcGoogle } from "react-icons/fc"; // ✅ Real Google logo

export default function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true); // toggle between login and signup
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // ✅ Redirect to Home if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/"); // user already logged in → go to Home
      }
    });
  }, [navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) setErrorMsg(error.message);
        else navigate("/");
      } else {
        // Signup
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }, // ✅ Save full name
        });
        if (error) setErrorMsg(error.message);
        else navigate("/");
      }
    } catch (err) {
      setErrorMsg(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google OAuth handler
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin, // redirect back after login
        },
      });
      if (error) setErrorMsg(error.message);
    } catch (err) {
      setErrorMsg(err.message || "Google login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://i.pinimg.com/1200x/00/05/3b/00053b881999055bf307026bda009ba2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          padding: "40px",
          borderRadius: "16px",
          width: "360px",
          textAlign: "center",
          boxShadow: "0px 8px 25px rgba(0,0,0,0.3)",
          color: "#353333ff",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleAuth}
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              style={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

          <button type="submit" style={styles.authBtn} disabled={loading}>
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        <div style={styles.divider}>or continue with</div>

        {/* ✅ Social Login (Google with Supabase) */}
        <div style={styles.socialRow}>
          <button style={styles.googleBtn} onClick={handleGoogleLogin}>
            <FcGoogle size={22} style={{ marginRight: "8px" }} />
            Sign in with Google
          </button>
        </div>

        <p style={styles.footerText}>
          {isLogin ? "Don’t have an account? " : "Already have an account? "}
          <span style={styles.link} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  input: {
    padding: "12px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "rgba(255,255,255,0.8)",
  },
  authBtn: {
    marginTop: "12px",
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
  divider: {
    margin: "20px 0",
    color: "#353333ff",
    fontSize: "14px",
    textTransform: "uppercase",
  },
  socialRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  googleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "#fff",
    color: "#444",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
    transition: "0.3s",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#353333ff",
  },
  link: {
    color: "#ffcc00",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
