import RegisterForm from "../components/RegisterForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import { message as Message } from "antd";

const Register = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const checkLoginSession = () => {
    //InitializeFirebase();

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
    // InitializeFirebase();

    // Registers + Logs the user in
    firebase
      .auth()
      .createUserWithEmailAndPassword(props.email, props.password)
      .then(() => {
        setMessage("");
        setIsRegistering(false);

        Message.success({
          content: "Registeration Successful!",
          key: "registerMessage",
        });
        router.push("../");
      })
      .catch((error) => {
        setIsRegistering(false);

        Message.error({
          content: "Registeration Failed!",
          key: "registerMessage",
        });

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
    <> </>
  );
};

export default Register;
