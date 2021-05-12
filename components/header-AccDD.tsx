// Header component - Account dropdown
import * as React from "react";
import Image from "next/image";
import GlobalUserContext from "../components/GlobalUserContext";
import { Menu, Dropdown } from "antd";

const AccDropdown = (props) => {
  const { user, setUser } = React.useContext(GlobalUserContext);
  return (
    <div className="dropdown me-3 dropstart">
      <a
        className="dropdown-toggle"
        id="dropdownAccMenu"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
      >
        <img
          src={user.photoURL}
          width="24px"
          height="24px"
          className="img-thumbnail"
        ></img>
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start dropdown-menu-dark"
        aria-labelledby="dropdownAccMenu"
      >
        <li className="container-fluid mx-auto">
          <span className="d-block text-center">
            <img
              src={user.photoURL}
              width="24px"
              height="24px"
              className="img-thumbnail d-block"
            ></img>
          </span>
          <label className="d-block text-break text-center mx-2">Mohsih</label>
        </li>
        <hr></hr>
        <li>
          <a className="dropdown-item" href="#">
            Settings
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Log out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AccDropdown;
