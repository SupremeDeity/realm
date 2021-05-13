import React, { useState } from "react";
import "../styles/global.scss";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

// import {
//   ContextProvider,
//   DefaultUser,
//   User,
//   UserStateInterface,
// } from "../components/GlobalUserContext";

function MyApp({ Component, pageProps }) {
  // const [user, setUser] = useState(DefaultUser);

  // const GlobalUserDefault: UserStateInterface = {
  //   user: user,
  //   setUser: setUser,
  // };

  return (
    // <ContextProvider value={GlobalUserDefault}>
    <Component {...pageProps} />
    // </ContextProvider>
  );
}

export default MyApp;
