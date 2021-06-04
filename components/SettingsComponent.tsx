import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Upload,
} from "antd";
import Text from "antd/lib/typography/Text";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import React, { useState } from "react";
import styles from "../styles/SettingsComponent.module.scss";
import PasswordComponent from "./PasswordComponent";

const SettingsComponent = (props) => {
  const [avatarImg, setAvatarImg] = useState("");

  const GetAvatar = (size?, img?: string) => {
    console.log(img);
    if (img) {
      return <Avatar shape="square" alt="avatar" src={img} size={size} />;
    } else if (props.user.photoURL) {
      return (
        <Avatar
          shape="square"
          alt="avatar"
          src={props.user.photoURL}
          size={size}
        ></Avatar>
      );
    } else {
      if (props.user.displayName) {
        return (
          <Avatar
            shape="square"
            size={size}
            style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            alt="avatar"
          >
            {props.user.displayName.charAt(0).toUpperCase()}
          </Avatar>
        );
      } else {
        return (
          <Avatar
            shape="square"
            size={size}
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

  // Return false to manually handle uploding
  const getValueProp = (event) => {
    let isLt2M = event.file.size / 1024 / 1024 < 2; // < 2MB
    let isCorrectType =
      event.file.type === "image/jpeg" || event.file.type === "image/png"; // only png & jpg

    if (!isLt2M) {
      message.error("Avatar file size should be less than 2MB.");
    } else if (!isCorrectType) {
      message.error("Avatar file type incorrect.");
    } else {
      let src = URL.createObjectURL(event.file);

      setAvatarImg(src);
    }

    return event.file && event.fileList;
  };

  return (
    <div className="container-sm text-center">
      <Card
        className={styles.card}
        title="Settings"
        headStyle={{
          fontFamily: "Roboto",
          fontWeight: "bold",
          backgroundColor: "var(--tc-whiteish)",
          userSelect: "none",
        }}
      >
        <Form className={styles.form} size="middle" onFinish={props.onSave}>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={getValueProp}
            name="image"
            className={styles.formItem}
          >
            <Upload
              showUploadList={false}
              accept="image/jpeg,image/png"
              maxCount={1}
              listType="picture-card"
              style={{ display: "flex !important" }}
              beforeUpload={() => {
                return false;
              }}
            >
              {GetAvatar(100, avatarImg)}
            </Upload>
          </Form.Item>
          <Form.Item style={{ flex: "0" }} className={styles.formItem}>
            <Text style={{ userSelect: "none" }} strong>
              {props.user.displayName}
            </Text>
          </Form.Item>

          <Card
            className={"fw-bold mb-3 "}
            type="inner"
            title="Change Credentials"
            headStyle={{
              fontWeight: "bold",
              backgroundColor: "var(--tc-gray)",
              textAlign: "left",
            }}
            bodyStyle={{ backgroundColor: "var(--tc-whiteish)" }}
          >
            <Form.Item
              label="New Username"
              className={styles.formItem}
              name="newName"
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              tooltip="Must contain atleast 6 characters with 1 uppercase, 1 lowercase and 1 numeric character."
              label="New Password"
              className={styles.formItem}
            >
              <PasswordComponent required={false} />
            </Form.Item>
          </Card>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your current password.",
              },
            ]}
            required={true}
            tooltip="The current password, this is required to make any changes."
            label="Current password"
            className={styles.formItem}
            name="currentPass"
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SettingsComponent;
