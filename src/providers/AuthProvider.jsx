import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);

  // ✅ Email/Password Login
  const handleLogin = async (email, password) => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.data.user);
        Cookies.set("token", res.data.data.token, { expires: 7 });
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
  const handleRegister = async (name, email, password) => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.data.user);

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
  const LogOut = () => {
    setLoader(true);
    Cookies.remove("token");
    setUser(null);
    setLoader(false);
  };

  // ✅ Forgot Password
  const ForgotPassword = async (email) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
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
        `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
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

  // ✅ Auto Login
const token = Cookies.get("token");

useEffect(() => {
  console.log("Token from cookie:", token);

  if (token) {
    setLoader(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        console.log("Profile response:", res.data);
        if (res.data.success) {
          setUser(res.data.data.user);
        } else {
          console.warn("User not found in response");
          setUser(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err.response?.data || err.message);
        setUser(null);
      })
      .finally(() => {
        setLoader(false);
        console.log("Finished fetching user profile");
      });
  } else {
    console.warn("No token found. Skipping user fetch.");
    setLoader(false);
  }
}, []);


  // ✅ Google Login
  const handleGoogleLogin = {
    onSuccess: async (tokenResponse) => {
      setLoader(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
          {
            provider: "google",
            token: tokenResponse.access_token,
          }
        );
        if (res.data.success) {
          setUser(res.data.data.user);
          Cookies.set("token", res.data.data.token);
        }
      } catch (error) {
        console.error("Google login error", error);
      } finally {
        setLoader(false);
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
    },
  };

  const AuthInfo = {
    user,
    loader,
    setUser,
    handleLogin,
    handleRegister,
    LogOut,
    ForgotPassword,
    ManageProfile,
    handleGoogleLogin,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
