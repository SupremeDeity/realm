import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import initializeFirebase from "./services/firebase";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";

const Login = (props) => {
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
    const provider = new firebase.auth.EmailAuthProvider();

    setIsLogging(true);
    console.log(props.remember);

    firebase
      .auth()
      .setPersistence(
        props.remember
          ? firebase.auth.Auth.Persistence.LOCAL
          : firebase.auth.Auth.Persistence.SESSION
      )
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(props.email, props.password)
          .then((result) => {
            const { user, credential } = result;
            if (!user) {
              throw new Error("There was an error authorizing");
            }

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
    <> </>
  );
};

export default Login;
