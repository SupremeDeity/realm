import { Divider, Form, Input, Button, Typography } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import * as React from "react";
import styles from "@styles/RegisterForm.module.scss";
import PasswordComponent from "@components/PasswordComponent";
import Header from "@components/header";
import Link from "next/link";

const { Text } = Typography;

interface IRegisterFormProps {
  emailPassCallback: any;
  isRegistering: boolean;
  message: string;
}

const RegisterForm = (props: IRegisterFormProps) => {
  return (
    <>
      <Header active="NONE" />
      <div className={"container-sm " + styles.register_container}>
        <Divider className={styles.divider}>Register</Divider>
        <Form name="registerForm" onFinish={props.emailPassCallback}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              className={styles.input}
              type="text"
              prefix={<UserOutlined />}
              placeholder="Username"
            ></Input>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className={styles.input}
              type="email"
              prefix={<MailOutlined />}
              placeholder="Email Address"
            ></Input>
          </Form.Item>

          <PasswordComponent required={true} autoComplete="new-password" />

          {props.message ? (
            <Form.Item>
              <Text type="danger">{props.message}</Text>
            </Form.Item>
          ) : (
            <div />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.form_register_button}
              loading={props.isRegistering}
            >
              Register
            </Button>
            <Form.Item style={{ color: "var(--tc-white)" }}>
              Already have an account?{" "}
              <Link href="./login">
                <a>Login now</a>
              </Link>
            </Form.Item>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
      </div>
    </>
  );
};

export default RegisterForm;
