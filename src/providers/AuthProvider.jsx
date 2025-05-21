import React, { createContext, useState, useEffect } from "react";
// import {
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../firebase/firebase.config"; 
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const handleGoogleButton = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        console.error("Google login error:", error.message);
      })
      .finally(() => setLoader(false));
  };

  const handleAppleButton = () => {
    setLoader(true);
    return signInWithPopup(auth, appleProvider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        console.error("Apple login error:", error.message);
      })
      .finally(() => setLoader(false));
  };

  const handleFacebookButton = () => {
    setLoader(true);
    return signInWithPopup(auth, facebookProvider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        console.error("Facebook login error:", error.message);
      })
      .finally(() => setLoader(false));
  };

  const handleLogin = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => setUser(res.user))
      .finally(() => setLoader(false));
  };

  const handleRegister = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => setUser(res.user))
      .finally(() => setLoader(false));
  };

  const LogOut = () => {
    setLoader(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
      })
      .finally(() => setLoader(false));
  };

  const ForgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const ManageProfile = (name, image) => {
    setLoader(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    })
      .then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          displayName: name,
          photoURL: image,
        }));
      })
      .catch((error) => {
        console.error("Profile update error:", error.message);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });
    return () => unsubscribe();
  }, []);

  const AuthInfo = {
    user,
    loader,
    setUser,
    handleGoogleButton,
    handleAppleButton,
    handleFacebookButton,
    handleLogin,
    handleRegister,
    LogOut,
    ForgotPassword,
    ManageProfile,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
