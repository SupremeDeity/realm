import { useRouter } from "next/router";
import Error from "next/error";
import { useEffect, useState } from "react";
import ResetPasswordComponent from "@components/ResetPasswordComponent";
import initializeFirebase from "@services/firebase";
import firebase from "firebase/app";
import React from "react";
import { message as Message } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// TODO: Globalize this
interface PageError {
  hasError: boolean;
  errorCode: number;
  title: string;
}

const DefaultError: PageError = {
  hasError: false,
  errorCode: 0,
  title: "",
};

const NotFoundError: PageError = {
  hasError: true,
  errorCode: 404,
  title: "This page could not be found",
};

const UnauthorizedError: PageError = {
  hasError: true,
  errorCode: 401,
  title: "Invalid or expired token code",
};

const ResetPassword = () => {
  const router = useRouter();
  const { mode, oobCode } = router.query;
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState(DefaultError);
  const [isChecking, setIsChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // just in case i need it for something

  useEffect(() => {
    if (router.isReady) {
      if (mode && oobCode) {
        initializeFirebase();
        firebase
          .auth()
          .verifyPasswordResetCode(oobCode.toString())
          .then((email) => {
            setEmail(email);
            setIsChecking(false);
          })
          .catch(() => setError(UnauthorizedError));
      } else {
        setError(NotFoundError);
      }
    }
  }, [router.isReady]);

  const resetPasswordCallback = (props) => {
    const { password } = props;
    firebase
      .auth()
      .confirmPasswordReset(oobCode.toString(), password)
      .then(() => {
        Message.success("Password Reset Successful.", 3);
        Message.info("You can now login with your new password.", 3);
        router.push("../login");
      })
      .catch(() => {
        Message.error("Error while resetting password!");
      });
  };

  return !isChecking ? (
    <div>
      <ResetPasswordComponent
        email={email}
        resetPasswordCallback={resetPasswordCallback}
        isChanging={isChanging}
        message={message}
      />
    </div>
  ) : error.hasError ? (
    <Error statusCode={error.errorCode} title={error.title} />
  ) : (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <Spin indicator={<LoadingOutlined />} size="large" />
    </div>
  );
};

export default ResetPassword;
