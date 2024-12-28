import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import LoginPlaceholder from '../../Images/login-illustration.png'
import { Tabs } from "antd";
import "./login.scss"
import LoginComponent from '../../Components/Login/LoginComponent.jsx'
import Register from '../../Components/Register/Register.jsx'

const Login = () => {
    
    const [activeKey, setActiveKey] = useState("1");
    const onChange = (key) => {
        setActiveKey(key)
    };
    const items = [
        {
            key: "1",
            label: "Login",
            children: <LoginComponent />,
        },
        {
            key: "2",
            label: "Register",
            children: <Register setActiveKey={setActiveKey}/>,
        },
    ];
    return (
        <>
            <Navbar />
            
            <div className="login">
                <img className="loginimg" src={LoginPlaceholder} alt=""/>
                <div className='signup-container'>
                    <h1>Welcome Back!</h1>
                    <Tabs activeKey={activeKey} items={items} onChange={onChange} />
                </div>
            </div>
        </>
    )
}

export default Login
