import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [darkMode, setDarkMode] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      if (savedTheme !== null) {
        setDarkMode(JSON.parse(savedTheme));
      }
    };

    fetchTheme();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      console.log("Dark mode toggled:", newMode); 
      return newMode;
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, resetPassword, updateEmail, updatePassword, toggleDarkMode, darkMode }}>
      {children}
    </AuthContext.Provider>
  );
}