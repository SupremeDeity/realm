import React from "react";
import { Checkbox, Divider, Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import styles from "../styles/LoginForm.module.scss";

const { Text } = Typography;

interface ILoginFormProps {
  providerCallback: any;
  emailPassCallback: any;
  isLoggingIn: boolean;
  message: string;
}

const LoginForm = (props: ILoginFormProps) => {
  return (
    <div className={"container-sm " + styles.login_container}>
      <Divider className={styles.divider}>By Credentials</Divider>
      <Form name="loginForm" onFinish={props.emailPassCallback}>
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
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            type="password"
            prefix={<LockOutlined />}
            placeholder="Password"
          ></Input>
        </Form.Item>
        {props.message ? (
          <Form.Item>
            <Text type="danger">{props.message}</Text>
          </Form.Item>
        ) : (
          <div />
        )}
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className={styles.login_form_forgot} href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.form_login_button}
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Divider className={styles.divider}>Or using Google</Divider>
          <Button
            danger={true}
            type="primary"
            icon={<GoogleOutlined className={styles.providerIcon} />}
            className={styles.providerBtn}
            loading={props.isLoggingIn}
            onClick={props.providerCallback}
          >
            Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
