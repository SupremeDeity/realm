import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";
import { message as Message, Spin } from "antd";
import initializeFirebase from "../services/firebase";
import { LoadingOutlined } from "@ant-design/icons";

const Login = () => {
  const router = useRouter();

  const [isLogging, setIsLogging] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [message, setMessage] = useState("");

  const checkLoginSession = () => {
    initializeFirebase();

    firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
      if (currentUser) {
        router.push("../");
      } else {
        setIsChecking(false);
      }
    });
  };

  // Confirms that the user isnt signed in
  useEffect(() => {
    checkLoginSession();
  }, []);

  const doProviderAuth = async (_) => {
    // Initialize Firebase
    initializeFirebase();
    // Get provider
    const provider = new firebase.auth.GoogleAuthProvider();

    setIsLogging(true);
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            const { user, credential } = result;

            if (!user) {
              throw new Error("There was an error authorizing");
            }

            setIsLogging(false);

            Message.success("Logged in successfully.");

            return;

            //router.push("../");
          })
          .catch((e) => {
            setIsLogging(false);
            console.log(e);
            return;
          });
      });
  };

  const doEmailPassAuth = (props) => {
    // Initialize Firebase
    initializeFirebase();
    // Get provider
    //const provider = new firebase.auth.EmailAuthProvider();

    setIsLogging(true);

    firebase
      .auth()
      .setPersistence(
        props.remember
          ? firebase.auth.Auth.Persistence.LOCAL
          : firebase.auth.Auth.Persistence.SESSION
      )
      .then(() => {
        Message.info({ content: "Logging in....", key: "logInfo" });
        firebase
          .auth()
          .signInWithEmailAndPassword(props.email, props.password)
          .then((result) => {
            const { user, credential } = result;
            if (!user) {
              throw new Error("There was an error authorizing");
            }

            Message.success({
              content: "Logged in successfully",
              key: "logInfo",
            });

            setIsLogging(false);
            setMessage("");

            return;
          })
          .catch((e) => {
            setIsLogging(false);

            if (
              e.code == "auth/user-not-found" ||
              e.code == "auth/wrong-password"
            ) {
              console.log("called");
              setMessage("Invalid email or password, please try again.");
            }

            console.log(e);
            return;
          });
      });
  };

  return !isChecking ? (
    <div>
      <LoginForm
        providerCallback={doProviderAuth}
        emailPassCallback={doEmailPassAuth}
        isLoggingIn={isLogging}
        message={message}
      />
    </div>
  ) : (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <Spin indicator={<LoadingOutlined />} size="large" />
    </div>
  );
};

export default Login;
