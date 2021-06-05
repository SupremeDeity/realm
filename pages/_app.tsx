import React from "react";
import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

export const config = { amp: "hybrid" };

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
