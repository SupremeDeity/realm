// Header component - Account dropdown
import * as React from "react";

import { Menu, Dropdown, Typography, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import firebase from "firebase/app";
import { useRouter } from "next/router";

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
      return <Avatar src={props.user.photoURL} size={30}></Avatar>;
    } else {
      if (props.user.displayName) {
        return (
          <Avatar
            size={30}
            style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            {props.user.displayName.charAt(0).toUpperCase()}
          </Avatar>
        );
      } else {
        return (
          <Avatar
            size={30}
            style={{ backgroundColor: "#87d068" }}
            icon={
              <UserOutlined style={{ margin: "auto", fontSize: "1.2rem" }} />
            }
          />
        );
      }
    }
  };

  const menu = (
    <Menu style={{ minWidth: 100 }}>
      <Menu.Item className="d-block">
        {GetAvatar()}
        <Text
          style={{ width: 100 }}
          ellipsis={true}
          className="mx-1"
          strong={true}
        >
          {props.user.displayName}
        </Text>
      </Menu.Item>
      <hr></hr>
      <Menu.Item>
        <a rel="noopener noreferrer" href="#">
          Settings
        </a>
      </Menu.Item>
      <Menu.Item danger onClick={logoutHandler}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {GetAvatar()}
        <DownOutlined className="mx-1" />
      </a>
    </Dropdown>
  );
};

export default AccDropdown;
