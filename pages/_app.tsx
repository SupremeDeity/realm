import React from "react";
import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import initializeFirebase from "./services/firebase";
import firebase from "firebase/app";

function MyApp({ Component, pageProps }) {
  initializeFirebase();

  return <Component {...pageProps} />;
}

export default MyApp;
