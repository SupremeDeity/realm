import React from "react";
import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
