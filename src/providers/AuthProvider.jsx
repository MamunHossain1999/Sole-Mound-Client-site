import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);

  // Email/password Login
const handleLogin = async (email, password) => {
  setLoader(true);
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    if (res.data.success) {
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
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



  // Register
  const handleRegister = async (name, email, password) => {
    setLoader(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
        name,
        email,
        password
        
      });

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    } finally {
      setLoader(false);
    }
  };

  // Logout
  const LogOut = () => {
    setLoader(true);
    localStorage.removeItem("token");
    googleLogout(); // also logout Google
    setUser(null);
    setLoader(false);
  };

  // Forgot Password
  const ForgotPassword = async (email) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, {
        email,
      });
      return res.data;
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to send reset email" };
    }
  };

  // Update Profile
  const ManageProfile = async (name, image) => {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/update-profile`,
        { name, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Profile update failed" };
    } finally {
      setLoader(false);
    }
  };

  // Auto login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null))
        .finally(() => setLoader(false));
    } else {
      setLoader(false);
    }
  }, []);

  // Google Login
  const handleGoogleLogin = ({
    onSuccess: async (tokenResponse) => {
      setLoader(true);
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, {
          provider: "google",
          token: tokenResponse.access_token,
        });
        if (res.data.success) {
          setUser(res.data.user);
          localStorage.setItem("token", res.data.token);
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
  });

  // // Apple Login (manual redirect)
//   const handleAppleLogin = () => {
//   window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/apple`;
// };

// const handleFacebookLogin = () => {
//   window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/facebook`;
// };


  const AuthInfo = {
    user,
    loader,
    setUser,
    handleLogin,
    handleRegister,
    LogOut,
    ForgotPassword,
    ManageProfile,
    handleGoogleLogin
    // handleFacebookLogin
    // handleAppleLogin
 
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
