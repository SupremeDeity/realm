import React from "react";
import { Checkbox, Divider, Form, Input, Button, Typography } from "antd";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import styles from "@styles/LoginForm.module.scss";
import Header from "@components/header";

const { Text } = Typography;

interface ILoginFormProps {
  providerCallback: any;
  emailPassCallback: any;
  isLoggingIn: boolean;
  message: string;
}

const LoginForm = (props: ILoginFormProps) => {
  return (
    <>
      <Header active="NONE" />
      <div className={"container-md " + styles.login_container}>
        <Divider className={styles.divider}>By Credentials</Divider>
        <Form name="loginForm" onFinish={props.emailPassCallback}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className={styles.input}
              type="email"
              prefix={<MailOutlined style={{ color: "var(--tc-white)" }} />}
              placeholder="Email Address"
            ></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              className={styles.input}
              type="password"
              prefix={<LockOutlined style={{ color: "var(--tc-white)" }} />}
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
              <Checkbox style={{ color: "var(--tc-white)" }}>
                Remember me
              </Checkbox>
            </Form.Item>

            <a className={styles.login_form_forgot} href="../forgotpassword">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.form_login_button}
              loading={props.isLoggingIn}
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item style={{ color: "var(--tc-white)" }}>
            Don't have an account? <a href="/register">Register now</a>
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
    </>
  );
};

export default LoginForm;
