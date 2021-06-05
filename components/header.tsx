import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AccDropdown from "./header-AccDD";
import { isSameUser, PrototypeUser } from "../components/GlobalUserContext";
import firebase from "firebase/app";
import initializeFirebase from "../services/firebase";
import { Skeleton, Spin } from "antd";

let NavLinks = ["Home", "Docs", "API", "Pricing"];
let routes = { Home: "/", Docs: "#", API: "#", Pricing: "#" };

interface HeaderProps {
  active: "Home" | "Docs" | "API" | "Pricing" | "NONE";
}

const Header = (props: HeaderProps) => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let router = useRouter();
  let [user, setUser] = useState(PrototypeUser);
  let [isCheckingState, setIsCheckingState] = useState(true);

  const generateLinks = () => {
    let active = props.active;
    return NavLinks.map((value) => {
      return (
        <li key={value} className="nav-item me-2">
          <a
            className={"nav-link" + (active == value ? " fw-bold active" : "")}
            aria-current="page"
            href={routes[value]}
          >
            {value}
          </a>
        </li>
      );
    });
  };

  const checkLoginSession = () => {
    setIsCheckingState(true); // just in case

    initializeFirebase();
    if (user === PrototypeUser) {
      firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
        if (!currentUser) {
          setIsLoggedIn(false);
          setIsCheckingState(false);
          return;
        } else {
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
          setIsLoggedIn(true);
          setIsCheckingState(false);

          return;
        }
      });
    }
  };

  // This validates the login session at component load.
  useEffect(() => {
    checkLoginSession();
  }, []);

  let handleLogin = (event) => {
    router.push("/login");
  };

  let handleRegister = (event) => {
    router.push("/register");
  };

  const AccStatus = () => {
    if (isLoggedIn) {
      return <AccDropdown user={user} />;
    } else if (isCheckingState) {
      return <Skeleton.Avatar active />;
    } else {
      return (
        <div>
          <button className="btn btn-outline-primary" onClick={handleLogin}>
            Login
          </button>
          <button
            className="btn btn-outline-primary ms-1"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <Image
              src="/favicon.ico"
              width="24px"
              height="24px"
              className="img-thumbnail d-inline-block align-text-top"
              alt="header icon"
            ></Image>
            <label className="mx-1">Realm</label>
          </a>
          <div
            className="collapse navbar-collapse flex-row-reverse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">{generateLinks()}</ul>
          </div>
          {AccStatus()}
        </div>
      </nav>
    </>
  );
};

export default Header;
