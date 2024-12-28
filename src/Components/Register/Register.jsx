import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.scss'

const Register = ({setActiveKey}) => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/auth/register`, values);
            setLoading(false);
            setActiveKey("1");
            navigate("/login")
            message.success("Successfully Registered, Please Login to explore")
        } catch (err) {
            console.log(err);
            message.error(err.response.data.error)
        }
        setLoading(false);
    };
  
    return (
        <Form
          name="normal_login"
          className="login-form"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}>
          <div className='input-container'>
            <div>
                <Form.Item label="Username" name="username"
                    rules={[
                    {
                        required: true,
                        message: "Please input your Username!",
                    },
                    ]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item label="Email" name="email"
                    rules={[
                    {
                        required: true,
                        type: "email",
                        message: "Please enter a valid Email!",
                    },
                    ]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item label="Password" name="password"
                    rules={[
                    {
                        required: true,
                        message: "Please input your Password!",
                    },
                    ]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
            </div>
            <div>
                <Form.Item label="Phone" name="phone" style={{width: "230px"}}
                    rules={[
                        {
                            required: true,
                            message: "Please input your Contact No!",
                        },
                        {
                            pattern: /^[0-9]{10}$/,
                            message: "Phone number must be of digits onlly!",
                        }
                    ]}>
                    <Input
                        placeholder="Mobile"
                        maxLength={10}
                    />
                </Form.Item>
                <Form.Item label="Country" name="country"
                    rules={[
                    {
                        required: true,
                        message: "Please input your Country!",
                    },
                    ]}>
                    <Input placeholder="Country" />
                </Form.Item>
                <Form.Item label="City" name="city"
                    rules={[
                    {
                        required: true,
                        message: "Please input your City!",
                    },
                    ]}>
                    <Input placeholder="City" />
                </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
};

export default Register;