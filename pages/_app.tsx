import React from "react";
import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import { useState } from "react";
import initializeFirebase from "../services/firebase";
import firebase from "firebase/app";

function MyApp({ Component, pageProps }) {
  // const [isLogging, setIsLogging] = useState(false);
  // const [isChecking, setIsChecking] = useState(true);
  // const [message, setMessage] = useState("");

  // const checkLoginSession = () => {
  //   initializeFirebase();

  //   firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
  //     if (currentUser) {
  //       router.push("../");
  //     } else {
  //       setIsChecking(false);
  //     }
  //   });
  // };

  return <Component {...pageProps} />;
}

export default MyApp;
