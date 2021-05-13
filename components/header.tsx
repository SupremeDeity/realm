import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AccDropdown from "./header-AccDD";
import { DefaultUser } from "../components/GlobalUserContext";
import firebase from "firebase/app";
import initializeFirebase from "../pages/services/firebase";

const Header = (props) => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let router = useRouter();
  let [user, setUser] = useState(DefaultUser);

  const checkLoginSession = () => {
    initializeFirebase();

    firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
      if (!currentUser) {
        setIsLoggedIn(false);
        return;
      } else {
        var username = currentUser.displayName
          ? currentUser.displayName
          : currentUser.uid.slice(0, 5);

        setUser({
          email: currentUser.email,
          displayName: username,
          id: currentUser.uid,
          photoURL: currentUser.photoURL,
        });
        setIsLoggedIn(true);
        return;
      }
    });
  };

  // This validates the login session at component load.
  useEffect(() => {
    checkLoginSession();
  }, []);

  let handleLogin = (event) => {
    event.preventDefault();
    router.push("/login");
  };

  const AccStatus = () => {
    if (isLoggedIn) {
      return <AccDropdown user={user} />;
    } else {
      return (
        <div>
          <button className="btn btn-outline-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Image
              src="/favicon.ico"
              width="24px"
              height="24px"
              className="img-thumbnail d-inline-block align-text-top"
            ></Image>
            <label className="mx-1">Realm</label>
          </a>
          <div
            className="collapse navbar-collapse flex-row-reverse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item me-2">
                <a
                  className="nav-link active fw-bold"
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" href="#">
                  Docs
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" href="#">
                  API
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          {AccStatus()}
        </div>
      </nav>
    </>
  );
};

export default Header;
