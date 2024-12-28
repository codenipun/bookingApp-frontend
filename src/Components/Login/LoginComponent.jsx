import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
import "./login.scss";
import { Button, Checkbox, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";

const LoginComponent = () => {
    const {loading, dispatch} = useContext(AuthContext);
    const navigate = useNavigate()

    const onFinish = async (values) => {
        dispatch({type :"LOGIN_START"});

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/auth/login`, values);
            dispatch({type:"LOGIN_SUCCESS", payload : res.data.details });
            message.success('Successfully Loged In')
            navigate("/");
        } catch (err) {
            dispatch({type : "LOGIN_FAILURE", payload : err.response.data});
            message.error("Invalid Credentials");
        }
    };
    return (
        <Form
        name="normal_login"
        
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        >
        <div style={{width: "230px"}}>
        <Form.Item name="username"
            rules={[
            {
                required: true,
                message: "Please input your Username!",
            },
            ]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password"
            rules={[
            {
                required: true,
                message: "Please input your Password!",
            },
            ]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>
        </Form.Item>
        </div>

        <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
        </Form.Item>
        </Form>
    );
};

export default LoginComponent;
