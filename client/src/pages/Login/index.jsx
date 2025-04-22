import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../reducers/authReducer";
import { getAllCourses } from "../../reducers/courseReducer";

import { Form, Input, Button, Checkbox, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import {
  FormItemFlex,
  PageContainer,
  FormContainer,
  FormWrapper,
  FormTitle,
} from "./style";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, error } = useSelector((state) => state.auth);

  // Handle successful authentication with useEffect
  useEffect(() => {
    if (isAuth) {
      dispatch(getAllCourses());
      navigate("/app/courses", { replace: true });
    }
  }, [isAuth, navigate, dispatch]);

  const onFinish = async (values) => {
    if (values.remember) {
      window.localStorage.setItem(
        "eduhub-remember-cred",
        JSON.stringify({ remember: values.remember, email: values.email })
      );
    } else {
      window.localStorage.setItem(
        "eduhub-remember-cred",
        JSON.stringify({ remember: false })
      );
    }

    try {
      await dispatch(login(values));
      // Navigation will happen in useEffect when isAuth changes
    } catch (error) {
      console.error("Login failed:", error);
      message.error(
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  const getInitialValues = () => {
    const savedValues = window.localStorage.getItem("eduhub-remember-cred");
    return savedValues ? JSON.parse(savedValues) : { remember: false };
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormWrapper>
          <Form
            name="login"
            onFinish={onFinish}
            initialValues={getInitialValues()}
            scrollToFirstError
          >
            <FormTitle>Sign in</FormTitle>

            <p>
              New user? <Link to="/register">Create Account</Link>
            </p>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="E-Mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <FormItemFlex>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/ForgetPassword">Forgot password?</Link>
            </FormItemFlex>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>
      </FormContainer>
    </PageContainer>
  );
};
export default Login;
