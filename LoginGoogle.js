import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCJi1sngpOa7Y_M7RAg6Pi87fgLY1sqIss",
  authDomain: "login15601-c7bc7.firebaseapp.com",
  projectId: "login15601-c7bc7",
  storageBucket: "login15601-c7bc7.appspot.com",
  messagingSenderId: "510773766817",
  appId: "1:510773766817:web:2b63d87fd90a9ed381dee0"
};

const app = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);

const LoginGoogle = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      {user ? (
        <div>
          <p >Hola,  {user.displayName}!</p>
          <button className="custom-button" onClick={signOut}>Cerrar sesion</button>
        </div>
      ) : (
        <button className="custom-button" onClick={signInWithGoogle}>Iniciar sesion con Google</button>
      )}
    </div>
  );
};

export default LoginGoogle;