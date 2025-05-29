// AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);

  const api = import.meta.env.VITE_API_BASE_URL;

  // ✅ Email/Password Login
  const handleLogin = async (email, password) => {
    console.log("handleLogin called with:", { email, password });
    setLoader(true);
    try {
      const res = await axios.post(
        `${api}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("handleLogin response:", res.data);

      if (res.data.success) {
        const { user, token } = res.data.data;
        setUser(user);
        Cookies.set("token", token, { expires: 7, path: "/" });
        console.log("Token set in cookie:", token);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error("handleLogin error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoader(false);
    }
  };

  // ✅ Register
  const handleRegister = async (name, email, password, role) => {
    console.log("handleRegister called with:", { name, email, password, role });
    setLoader(true);
    try {
      const res = await axios.post(
        `${api}/auth/signup`,
        { name, email, password, role },
        { withCredentials: true }
      );
      console.log("handleRegister response:", res.data);

      if (res.data.success) {
        setUser(res.data.data.user);
        Cookies.set("token", res.data.data.token, { expires: 7, path: "/" });
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error("handleRegister error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoader(false);
    }
  };

  // ✅ Logout
  const logOut = () => {
    Cookies.remove("token", { path: "/" });
    console.log("Removed token:", Cookies.get("token"));
    setUser(null);
    window.location.href = "/";
  };

  // ✅ Forgot Password
  const ForgotPassword = async (email) => {
    console.log("ForgotPassword called with:", email);
    try {
      const res = await axios.post(
        `${api}/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      console.log("ForgotPassword response:", res.data);
      return res.data;
    } catch (err) {
      console.error("ForgotPassword error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to send reset email",
      };
    }
  };

  // ✅ Update Profile
  const ManageProfile = async (name, image) => {
    console.log("ManageProfile called with:", { name, image });
    setLoader(true);
    try {
      const res = await axios.patch(
        `${api}/users/profile`,
        { name, image },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          withCredentials: true,
        }
      );
      console.log("ManageProfile response:", res.data);

      if (res.data.success) {
        setUser(res.data.data.user);
        return { success: true };
      } else {
        return {
          success: false,
          message: res.data.message || "Profile update failed",
        };
      }
    } catch (err) {
      console.error("ManageProfile error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Profile update failed",
      };
    } finally {
      setLoader(false);
    }
  };


// ✅ Check if user is logged in on initial load


useEffect(() => {
  console.log("🔄 Checking token for auto-login...");
  const token = Cookies.get("token");
  console.log("🧩 Token from cookie:", token);

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("✅ Decoded token:", decoded);

      // 🛠️ Key ঠিক করা: user_id → userId
      if (decoded.userId) {
        decoded.userId ;
        delete decoded.userId;
      }

      const currentTime = Date.now() / 1000;
      console.log("⏱️ Current time (in seconds):", currentTime);
      console.log("📅 Token expires at:", decoded.exp);

      if (decoded.exp > currentTime) {
        console.log("🔐 Token is still valid, trying to fetch user...");
        setLoader(true);

        axios
          .get(`${api}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.success) {
              setUser(res.data.data.user);
            } else {
              console.log("🚫 Backend says user not found.");
              setUser(null);
              Cookies.remove("token");
            }
          })
          .catch((err) => {
            console.error("❌ Error fetching user from token:", err.message);
            setUser(null);
            Cookies.remove("token");
          })
          .finally(() => {
            console.log("⏹️ Loader set to false");
            setLoader(false);
          });
      } else {
        console.log("⛔ Token expired");
        setUser(null);
        Cookies.remove("token");
      }
    } catch (err) {
      console.error("💥 Token decode error:", err.message);
      setUser(null);
      Cookies.remove("token");
    }
  }
}, []);




  // ✅ Google Login
  const handleGoogleLogin = {
    onSuccess: async (tokenResponse) => {
      console.log("Google login success, tokenResponse:", tokenResponse);
      setLoader(true);
      try {
        const res = await axios.post(`${api}/auth/google`, {
          provider: "google",
          token: tokenResponse.access_token,
        });
        console.log("Google login response:", res.data);

        if (res.data.success) {
          setUser(res.data.data.user);
          Cookies.set("token", res.data.data.token, { expires: 7, path: "/" });
        }
      } catch (error) {
        console.error("Google login error:", error);
      } finally {
        setLoader(false);
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
    },
  };

  // ✅ Shared Context
  const AuthInfo = {
    user,
    loader,
    setUser,
    handleLogin,
    handleRegister,
    logOut,
    ForgotPassword,
    ManageProfile,
    handleGoogleLogin,
  };

  return <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
