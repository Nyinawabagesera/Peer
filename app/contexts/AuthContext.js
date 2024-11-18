import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password); 
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password); 
  }


  function logout(){
    return signOut(auth)
  }
   function updateEmail(email){
     return currentUser.updateEmail(email)
   }

   function updatePassword(password){
    return currentUser.updatePassword(password)
  }

  function resetPassword(email) { 
    return sendPasswordResetEmail(auth, email)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

     return unsubscribe;
   }, []);

 

  return (
    <AuthContext.Provider value={{currentUser, login, signup,logout, resetPassword, updateEmail, updatePassword}}>
      {children}
    </AuthContext.Provider>
  );
}
