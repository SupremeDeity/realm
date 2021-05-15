import { Divider, Form, Input, Checkbox, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import * as React from "react";
import styles from "../styles/RegisterForm.module.scss";
import PasswordComponent from "./PasswordComponent";

const { Text } = Typography;

interface IRegisterFormProps {
  emailPassCallback: any;
  isRegistering: boolean;
  message: string;
}

const RegisterForm = (props: IRegisterFormProps) => {
  return (
    <div className={"container-sm " + styles.register_container}>
      <Divider className={styles.divider}>Register</Divider>
      <Form name="registerForm" onFinish={props.emailPassCallback}>
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

        <PasswordComponent />

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
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
