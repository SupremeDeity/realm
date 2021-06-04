import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import firebase from "firebase/app";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { isSameUser, PrototypeUser } from "../components/GlobalUserContext";
import Header from "../components/header";
import SettingsComponent from "../components/SettingsComponent";
import initializeFirebase from "../services/firebase";

const Settings = () => {
  const [isChecking, setIsChecking] = useState(true);
  let [user, setUser] = useState(PrototypeUser);

  const checkLoginSession = () => {
    initializeFirebase();

    if (user === PrototypeUser) {
      firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
        if (currentUser) {
          var username = currentUser.displayName
            ? currentUser.displayName
            : currentUser.uid.slice(0, 5);

          const cUser = {
            email: currentUser.email,
            displayName: username,
            id: currentUser.uid,
            photoURL: currentUser.photoURL,
          };

          if (!isSameUser(cUser, user)) {
            setUser({
              email: currentUser.email,
              displayName: username,
              id: currentUser.uid,
              photoURL: currentUser.photoURL,
            });
          }
          setIsChecking(false);
        } else {
          router.push("../login");
        }
      });
    }
  };

  // This validates the login session at component load.
  useEffect(() => {
    checkLoginSession();
  }, []);

  const onSave = (props) => {
    console.log(props);
  };

  return !isChecking ? (
    <div>
      <Header active="NONE" />
      <SettingsComponent user={user} onSave={onSave} />
    </div>
  ) : (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <Spin indicator={<LoadingOutlined />} size="large" />
    </div>
  );
};

export default Settings;
