import { LockOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Typography } from "antd";
import React from "react";
import styles from "../styles/ResetPassword.module.scss";
import PasswordComponent from "./PasswordComponent";

const { Text } = Typography;

interface IResetPasswordProps {
  email: string;
  resetPasswordCallback: any;
  isChanging: boolean;
  message: string;
}

const ResetPasswordComponent = (props: IResetPasswordProps) => {
  return (
    <div className={"container-sm " + styles.reset_container}>
      <Divider className={styles.divider}>Reset Password</Divider>
      <Form name="forgotPassForm" onFinish={props.resetPasswordCallback}>
        <Form.Item className="text-center">
          Changing for{" "}
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            {props.email}
          </Text>
        </Form.Item>
        <PasswordComponent />
        {props.message ? (
          <Form.Item>
            <Text type="success">{props.message}</Text>
          </Form.Item>
        ) : (
          <div />
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.form_change_button}
            loading={props.isChanging}
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordComponent;
