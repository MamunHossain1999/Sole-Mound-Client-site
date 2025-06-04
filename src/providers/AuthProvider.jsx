import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../components/Loading";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true); 
  const api = import.meta.env.VITE_API_BASE_URL;

  //Login
  const handleLogin = async (email, password) => {
    try {
      setLoader(true);
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

  //Register
  const handleRegister = async (name, email, password, role) => {
    try {
      setLoader(true);
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
    Cookies.remove("token");
    setUser(null);
    window.location.href = "/";
  };

  //Forgot Password
  const ForgotPassword = async (email) => {
    try {
      setLoader(true);
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
    } finally {
      setLoader(false);
    }
  };

  //Update Profile
  const ManageProfile = async (name, image) => {
    const token = Cookies.get("token");

    if (!token) {
      return { success: false, message: "User not authenticated" };
    }

    try {
      setLoader(true);
      const payload = { name };
      if (image) payload.image = image;

      const res = await axios.patch(`${api}/users/profile`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  //Google Login
  const handleGoogleLogin = {
    onSuccess: async (tokenResponse) => {
      setLoader(true);
      try {
        const res = await axios.post(
          `${api}/auth/google`,
          {
            provider: "google",
            token: tokenResponse.access_token,
          },
          { withCredentials: true }
        );

        if (res.data.success) {
          setUser(res.data.data.user);
          Cookies.set("token", res.data.data.token, { expires: 7, path: "/" });
        }
      } catch (error) {
        // error suppressed
      } finally {
        setLoader(false);
      }
    },
    onError: (error) => {
      // error suppressed
    },
  };

  //Auto login on refresh
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setUser(null);
      setLoader(false);
      return;
    }

    const verifyAccessToken = async () => {
      try {
        const res = await axios.get(`${api}/users/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (res.data.success && res.data.data?.user) {
          setUser(res.data.data.user);
        } else {
          setUser(null);
          Cookies.remove("token", { path: "/" });
        }
      } catch (error) {
        setUser(null);
        Cookies.remove("token", { path: "/" });
      } finally {
        setLoader(false);
      }
    };

    verifyAccessToken();
  }, []);

  // Context values
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
    <AuthContext.Provider value={AuthInfo}>
      {loader ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
