import React, { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { fetchUserDisplayNameFromFirestore } from "@api/firestore";
import { auth } from "@firebase/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  const reloadUser = async () => await currentUser.reload();

  const reload = async () => {
    try {
      reloadUser();
      const user = currentUser;
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

  const handleLogin = (email, password) => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          if (!user.displayName) {
            updateDisplayName(user);
          }
        })
        .catch((err) => {
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

  const updateDisplayName = async (user) => {
    const username = await fetchUserDisplayNameFromFirestore();
    updateProfile(user, {
      displayName: username,
    }).catch((error) => {
      console.log("Error updating display name: " + error.message);
    });
  };

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
