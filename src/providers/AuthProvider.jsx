// AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const api = import.meta.env.VITE_API_BASE_URL;

  


  // ✅ Email/Password Login
  const handleLogin = async (email, password) => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${api}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        const { user, token } = res.data.data;
        Cookies.set("token", token, { expires: 7, path: "/" });
        setUser(user);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
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
    setLoader(true);
    try {
      const res = await axios.post(
        `${api}/auth/signup`,
        { name, email, password, role },
        { withCredentials: true }
      );

      if (res.data.success) {
        const { user, token } = res.data.data;
        Cookies.set("token", token, { expires: 7, path: "/" });
        setUser(user);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
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
    setUser(null);
    window.location.href = "/";
  };

  // ✅ Forgot Password
  const ForgotPassword = async (email) => {
    try {
      const res = await axios.post(
        `${api}/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to send reset email",
      };
    }
  };

  // ✅ Update Profile
  const ManageProfile = async (name, image) => {
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
      return {
        success: false,
        message: err.response?.data?.message || "Profile update failed",
      };
    } finally {
      setLoader(false);
    }
  };

  // Token verification function
  const verifyAccessToken = async (token) => {
    try {
      const response = await axios.get(`${api}/users/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("verifyAccessToken response:", response.data);
      return response.data.data.user;
    } catch (error) {
      if (error.response) {
        console.error("API error status:", error.response.status);
        console.error("API error data:", error.response.data);
      } else {
        console.error("Axios error:", error.message);
      }
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
      setUser(null);
      setLoader(false); // ✅ loader false করা দরকার
      return;
    }

    const verifyUser = async () => {
      const userData = await verifyAccessToken(token);
      console.log("Verified user data:", userData);
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
      setLoader(false); // ✅ finally loader false
    };

    verifyUser();
  }, []);

  // ✅ Google Login
  const handleGoogleLogin = {
    onSuccess: async (tokenResponse) => {
      setLoader(true);
      try {
        const res = await axios.post(`${api}/auth/google`, {
          provider: "google",
          token: tokenResponse.access_token,
        });

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

  // Shared context value
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

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
