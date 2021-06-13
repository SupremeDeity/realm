import { LockOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Form, Input, message, Upload } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import styles from "@styles/SettingsComponent.module.scss";
import PasswordComponent from "@components/PasswordComponent";

const SettingsComponent = (props) => {
  const [avatarImg, setAvatarImg] = useState("");

  const GetAvatar = (size?, img?: string) => {
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
      return;
    } else if (!isCorrectType) {
      message.error("Avatar file type incorrect.");
      return;
    } else {
      let src = URL.createObjectURL(event.file);

      setAvatarImg(src);
    }

    return [event.file];
  };

  return (
    <div className="container-md text-center">
      <Card
        className={styles.card}
        title={
          <Text style={{ color: "var(--tc-white)" }}>
            <SettingOutlined /> Settings
          </Text>
        }
        headStyle={{
          fontFamily: "Roboto",
          fontWeight: "bold",
          color: "var(--tc-white)",
          userSelect: "none",
          borderBottomColor: "var(--bs-gray)",
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
            <Text
              style={{ color: "var(--tc-white)", userSelect: "none" }}
              strong
            >
              {props.user.displayName}
            </Text>
          </Form.Item>

          <Card
            style={{ borderColor: "var(--bs-gray)" }}
            className={"fw-bold mb-3 " + styles.innerCard}
            type="inner"
            title="Change Credentials"
            headStyle={{
              fontWeight: "bold",
              color: "var(--tc-white)",
              backgroundColor: "var(--tc-gray-dark)",
              borderColor: "var(--bs-gray)",
              textAlign: "left",
            }}
            bodyStyle={{
              backgroundColor: "var(--tc-whiteish)",
            }}
          >
            <Form.Item
              label={
                <Text style={{ color: "var(--tc-white)" }}>New Username: </Text>
              }
              colon={false}
              className={styles.formItem}
              name="newName"
            >
              <Input
                prefix={<UserOutlined />}
                className={styles.input}
                type="text"
              />
            </Form.Item>

            <Form.Item
              // tooltip="Must contain atleast 6 characters with 1 uppercase, 1 lowercase and 1 numeric character."
              label={
                <Text style={{ color: "var(--tc-white)" }}>New Password: </Text>
              }
              colon={false}
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
            // tooltip="The current password, this is required to make any changes."
            label={
              <Text style={{ color: "var(--tc-white)" }}>
                Current Password:
              </Text>
            }
            className={styles.formItem}
            name="currentPass"
          >
            <Input
              prefix={<LockOutlined />}
              className={styles.input}
              type="password"
            />
          </Form.Item>
          {props.message ? (
            <Form.Item>
              <Text type="danger">{props.message}</Text>
            </Form.Item>
          ) : (
            <div />
          )}

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
