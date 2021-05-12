import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AccDropdown from "./header-AccDD";
import GlobalUserContext from "../components/GlobalUserContext";
import { Navbar } from "react-bootstrap";

const Header = (props) => {
  let router = useRouter();

  let handleLogin = (event) => {
    event.preventDefault();
    router.push("/login");
  };

  let { user, setUser } = useContext(GlobalUserContext);
  let isLoggedIn: boolean = user.displayName.length > 0 ? true : false;

  const AccStatus = () => {
    if (isLoggedIn) {
      return <AccDropdown />;
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
      <Navbar bg="dark" className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Image
              src="/favicon.ico"
              width="24px"
              height="24px"
              className="img-thumbnail"
            ></Image>
            <label className="ms-1">Realm</label>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
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
      </Navbar>
    </>
  );
};

export default Header;
