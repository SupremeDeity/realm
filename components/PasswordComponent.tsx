// Based on Antd Password component
// Checks for good password and gives feedback

import { Form, Input, Progress } from "antd";
import { LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styles from "@styles/PasswordComponent.module.scss";

interface PasswordComponentProps {
  required: boolean;
  autoComplete: string;
}

const PasswordComponent = (props: PasswordComponentProps) => {
  const [percentage, setPercentage] = useState(0);

  const validatePassword = (event) => {
    const currentValue: string = event.target.value;
    const MediumRegEx = new RegExp(
      "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,32}$"
    );
    const StrongRegEx = new RegExp(
      "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,32}$"
    );

    if (percentage > 0 && currentValue.length <= 0) {
      setPercentage(0);
    } else if (currentValue.match(StrongRegEx)) {
      setPercentage(100);
    } else if (currentValue.match(MediumRegEx)) {
      setPercentage(66);
    } else {
      setPercentage(33);
    }
  };

  const getStrokeColor = () => {
    if (percentage <= 33) {
      return "#dc3545";
    } else if (percentage <= 66) {
      return "#0d6efd";
    } else {
      return "#198754";
    }
  };

  const getFormat = (percent) => {
    if (percent <= 33) {
      return (
        <label
          style={{
            color: "var(--bs-danger)",
            fontWeight: "bold",
            userSelect: "none",
          }}
        >
          Weak
        </label>
      );
    } else if (percent <= 66) {
      return (
        <label style={{ color: "#0d6efd", userSelect: "none" }}>Medium</label>
      );
    } else if (percent <= 100) {
      return (
        <label style={{ color: "#198754", userSelect: "none" }}>Strong</label>
      );
    }
  };

  return (
    <>
      <Form.Item
        name="password"
        style={{ margin: "auto" }}
        rules={[
          {
            required: props.required,
            message: "Please input a password!",
            min: 6,
            pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,32}$/,
          },
        ]}
      >
        <Input
          className={styles.input}
          type="password"
          prefix={<LockOutlined />}
          placeholder="Password"
          onChange={validatePassword}
          autoComplete={props.autoComplete}
        ></Input>
      </Form.Item>
      <Progress
        format={(percent) => getFormat(percent)}
        percent={percentage}
        strokeColor={getStrokeColor()}
        className={"mb-4" + styles.progressBar}
        trailColor="var(--bs-gray-dark)"
      />
    </>
  );
};
export default PasswordComponent;
