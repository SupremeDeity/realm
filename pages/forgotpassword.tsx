import firebase from "firebase/app";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import ForgotPasswordComponent from "../components/ForgotPasswordComponent";
import initializeFirebase from "../services/firebase";

const ForgotPassword = (props) => {
  const [isSending, setIsSending] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

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

  // Confirms whether the user is signed in
  useEffect(() => {
    console.log(props.params);
    checkLoginSession();
  }, []);

  const submitCallback = (event) => {
    firebase
      .auth()
      .fetchSignInMethodsForEmail(event.email)
      .then((methods) => {
        if (methods.indexOf("password") != -1) {
          firebase
            .auth()
            .sendPasswordResetEmail(event.email)
            .then(() => {
              setMessage(
                "You should recieve a reset password email if the provided email exists."
              );
            })
            .catch((error) => {
              console.log(error);
              setMessage(
                "You should recieve a reset password email if the provided email exists."
              );
            });
        } else {
          setMessage(
            "Password of accounts made with providers cannot be reset!"
          );
        }
      });
  };

  return !isChecking ? (
    <div>
      <ForgotPasswordComponent
        submitCallback={submitCallback}
        isSending={isSending}
        message={message}
      />
    </div>
  ) : (
    <> </>
  );
};

export default ForgotPassword;
