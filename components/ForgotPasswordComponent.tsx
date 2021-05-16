import { UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Typography } from "antd";
import React from "react";
import styles from "../styles/ForgotPasswordForm.module.scss";

const { Text } = Typography;

interface IForgotFormProps {
  submitCallback: any;
  isSending: boolean;
  message: string;
}

const ForgotPasswordComponent = (props: IForgotFormProps) => {
  return (
    <div className={"container-sm " + styles.forgotpass_container}>
      <Divider className={styles.divider}>Reset Password</Divider>
      <Form name="forgotPassForm" onFinish={props.submitCallback}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            type="email"
            prefix={<UserOutlined />}
            placeholder="Email Address"
          ></Input>
        </Form.Item>
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
            className={styles.form_forgotpass_button}
            loading={props.isSending}
          >
            Send email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPasswordComponent;
