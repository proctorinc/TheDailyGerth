import React, { createContext, useState, useEffect } from "react";
import { app, auth, firestore } from "../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const reloadUser = () => getUser().reload();

  const reload = async () => {
    try {
      await reloadUser();
      const user = getUser();
      setCurrentUser(user);
    } catch (error) {}
    return reload;
  };

  const handleLogout = async () => {
    try {
      signOut(auth);
      reload();
    } catch (e) {
      console.log(e);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const handleLogin = async (email, password) => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password).catch((err) => {
        if (err.code === "auth/invalid-email") {
          setError("Enter a valid email address");
        } else {
          setError("Invalid email or password");
        }
      });
    } else {
      setError("Enter email and password");
    }
  };

  const sendActivationEmail = (email) => {
    sendPasswordResetEmail(auth, email).catch((err) => {
      if (
        err.code === "auth/invalid-email" ||
        err.code === "auth/missing-email"
      ) {
        setError("Enter a valid email address");
      }
    });
  };

  //   const handleSignup = async (username, email, password, confirmPassword) => {
  //     if (username && email && password && confirmPassword) {
  //       if (password === confirmPassword) {
  //         firestore()
  //           .collection("users")
  //           .where("username", "<=", username.toUpperCase())
  //           .where("username", ">=", username.toLowerCase() + "\uf8ff")
  //           .get()
  //           .then((snapshot) => {
  //             if (snapshot.empty) {
  //               return auth().createUserWithEmailAndPassword(email, password);
  //             } else {
  //               snapshot.forEach((item) => {
  //                 console.log(item.data());
  //               });
  //               throw new Error("Username is already taken");
  //             }
  //           })
  //           .then((createdUser) => {
  //             createdUser.user.updateProfile({
  //               displayName: username,
  //             });
  //             firestore().collection("users").doc(createdUser.user.uid).set({
  //               email: email,
  //               username: username,
  //             });
  //             createdUser.user.reload();
  //             createdUser.user.sendEmailVerification();
  //           })
  //           .catch((err) => {
  //             if (err.code === "auth/invalid-email") {
  //               setError("Enter a valid email address");
  //             } else if (err.code === "auth/weak-password") {
  //               setError("Invalid password. Password is too weak");
  //             } else if (err.message === "Username is already taken") {
  //               setError(err.message);
  //             } else {
  //               // setError(err.message)
  //               setError("Unable to create account");
  //             }
  //           });
  //       } else {
  //         setError("Passwords do not match");
  //       }
  //     } else {
  //       setError("Enter email, password, and confirm password");
  //     }
  //   };

  const deleteAccount = () => {
    // Delete from Auth
    // Delete Firestore data => document(user.id)
  };

  const contextData = {
    currentUser,
    loading,
    reload,
    handleLogin,
    handleLogout,
    error,
    clearError,
    sendActivationEmail,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
