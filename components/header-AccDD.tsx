// Header component - Account dropdown
import * as React from "react";

import styles from "@styles/headerDD.module.scss";
import { Menu, Dropdown, Typography, Avatar } from "antd";
import {
  DownOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import firebase from "firebase/app";
import { useRouter } from "next/router";
import Link from "next/link";

const { Text } = Typography;

const AccDropdown = (props) => {
  const router = useRouter();

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/login");
      });
  };

  const GetAvatar = () => {
    if (props.user.photoURL) {
      return <Avatar alt="avatar" src={props.user.photoURL} size={30}></Avatar>;
    } else {
      if (props.user.displayName) {
        return (
          <Avatar
            size={30}
            style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            alt="avatar"
          >
            {props.user.displayName.charAt(0).toUpperCase()}
          </Avatar>
        );
      } else {
        return (
          <Avatar
            size={30}
            style={{ backgroundColor: "#87d068" }}
            alt="avatar"
            icon={
              <UserOutlined style={{ margin: "auto", fontSize: "1.2rem" }} />
            }
          />
        );
      }
    }
  };

  const menu = (
    <Menu
      style={{
        borderBottomLeftRadius: ".5em",
        borderBottomRightRadius: ".5em",
        minWidth: 100,
        background: "var(--bs-gray-dark)",
        color: "var(--tc-gray)",
      }}
    >
      <Menu.Item
        style={{
          background: "var(--tc-white)",
          borderRadius: "2px",
        }}
      />
      <Menu.Item className={"d-block " + styles.menuItemAcc}>
        {GetAvatar()}
        <Text
          style={{ width: 100, color: "var(--tc-white)" }}
          ellipsis={true}
          className="mx-1"
          strong={true}
        >
          {props.user.displayName}
        </Text>
      </Menu.Item>
      <hr />
      <Menu.Item
        className={styles.menuItem}
        icon={<SettingOutlined style={{ color: "var(--tc-white)" }} />}
      >
        <Link href="./settings">
          <a style={{ color: "var(--tc-white)" }} rel="noopener noreferrer">
            Settings
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item
        danger
        onClick={logoutHandler}
        icon={<LogoutOutlined style={{ color: "var(--tc-white)" }} />}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {GetAvatar()}
          <DownOutlined className="mx-1" />
        </a>
      </Dropdown>
    </div>
  );
};

export default AccDropdown;
