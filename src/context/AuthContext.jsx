// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../pages/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // refresh ke baad session restore
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      }
      if (data?.session?.user) {
        setUser(formatUser(data.session.user));
      }
      setLoading(false);
    };

    initAuth();

    // auth state listener (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ? formatUser(session.user) : null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const formatUser = (supabaseUser) => {
    // Supabase user ke andar provider_metadata hota hai (Google, GitHub, etc.)
    const meta = supabaseUser.user_metadata || {};

    return {
      id: supabaseUser.id,
      name: meta.full_name || meta.name || supabaseUser.email?.split("@")[0] || "Unknown User",
      email: supabaseUser.email,
      profilePicUrl: meta.avatar_url || "", // agar avatar nahi hai toh empty
    };
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
