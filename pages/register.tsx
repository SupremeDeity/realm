import RegisterForm from "../components/RegisterForm";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import { message as Message, Spin } from "antd";
import initializeFirebase from "../services/firebase";
import { LoadingOutlined } from "@ant-design/icons";

const Register = () => {
  const [isRegistering, setIsRegistering] = useState(false);
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

  // Confirms that whether the user is signed in
  useEffect(() => {
    checkLoginSession();
  }, []);

  const emailPassCallback = (props) => {
    setIsRegistering(true);
    Message.info({ content: "Registering...", key: "registerMessage" });
    initializeFirebase();

    // Registers + Logs the user in
    firebase
      .auth()
      .createUserWithEmailAndPassword(props.email, props.password)
      .then(() => {
        setMessage("");
        setIsRegistering(false);

        Message.success(
          {
            content: "Registeration Successful!",
            key: "registerMessage",
          },
          3
        );
        router.push("../");
      })
      .catch((error) => {
        setIsRegistering(false);

        Message.error(
          {
            content: "Registeration Failed!",
            key: "registerMessage",
          },
          3
        );

        if (error.code == "auth/email-already-in-use") {
          setMessage("Email already exists!");
        } else if (error.code == "auth/weak-password") {
          setMessage("Email already exists!");
        }
      });
  };

  return !isChecking ? (
    <div>
      <RegisterForm
        emailPassCallback={emailPassCallback}
        isRegistering={isRegistering}
        message={message}
      />
    </div>
  ) : (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <Spin indicator={<LoadingOutlined />} size="large" />
    </div>
  );
};

export default Register;
