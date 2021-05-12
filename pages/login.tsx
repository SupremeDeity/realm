import React, { useContext } from "react";
import firebase from "firebase/app";
import initializeFirebase from "./services/firebase";
import { useRouter } from "next/router";
import GlobalUserContext, { User } from "../components/GlobalUserContext";

// Initialize Firebase
initializeFirebase();

// Get provider
const provider = new firebase.auth.GoogleAuthProvider();

const Login = (props) => {
  const router = useRouter();
  const { user, setUser } = useContext(GlobalUserContext);

  const doProviderAuth = async (_) => {
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { user, credential } = result;

        if (!user) {
          throw new Error("There was an error authorizing");
        }

        console.log({ user, credential });

        // Create User State from found data.
        const userState: User = {
          email: user.email,
          displayName: user.displayName,
          id: user.uid,
          photoURL: user.photoURL,
        };

        setUser(userState);

        router.push("../");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={doProviderAuth}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
