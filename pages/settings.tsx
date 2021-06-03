import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import firebase from "firebase/app";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { DefaultUser } from "../components/GlobalUserContext";
import Header from "../components/header";
import SettingsComponent from "../components/SettingsComponent";
import initializeFirebase from "../services/firebase";

const Settings = () => {
  const [isChecking, setIsChecking] = useState(true);
  let [user, setUser] = useState(DefaultUser);

  const checkLoginSession = () => {
    initializeFirebase();

    firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
      if (currentUser) {
        var username = currentUser.displayName
          ? currentUser.displayName
          : currentUser.uid.slice(0, 5);

        setUser({
          email: currentUser.email,
          displayName: username,
          id: currentUser.uid,
          photoURL: currentUser.photoURL,
        });
        setIsChecking(false);
      } else {
        router.push("../login");
      }
    });
  };

  // This validates the login session at component load.
  useEffect(() => {
    checkLoginSession();
  }, []);

  return !isChecking ? (
    <div>
      <Header active="NONE" />
      <SettingsComponent user={user} />
    </div>
  ) : (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <Spin indicator={<LoadingOutlined />} size="large" />
    </div>
  );
};

export default Settings;
