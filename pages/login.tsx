import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import initializeFirebase from "./services/firebase";
import { useRouter } from "next/router";
//import GlobalUserContext, { User } from "../components/GlobalUserContext";
import LoginForm from "../components/LoginForm";

const Login = (props) => {
  const router = useRouter();
  //const { user, setUser } = useContext(GlobalUserContext);

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

            // // Create User State from found data.
            // const userState: User = {
            //   email: user.email,
            //   displayName: user.displayName,
            //   id: user.uid,
            //   photoURL: user.photoURL,
            // };
            // setUser(userState);

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

            // Create User State from found data.
            // displayName and photoURL are null as these are not stored in session
            // and will be overidden when we get to the header component
            // let userState: User = {
            //   email: user.email,
            //   displayName: null,
            //   id: user.uid,
            //   photoURL: null,
            // };

            // setUser(userState);

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
