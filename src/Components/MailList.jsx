import React from 'react'
import {useNavigate } from 'react-router-dom'
import { message } from 'antd';

const MailList = () => {
  const navigate = useNavigate();

  const handleClick = () =>{
    message.success('Thankyou for Subscribing');
    // document.getElementsByClassName('email_input').input("");
    navigate("/");
    
  }
  return (
    <div className='mail'>
        <div>
            <h1 className='mailTitle'>Save Time, Save Money!</h1>
            <span className="mailDesc">Sign up and we'll send the best deals to you</span>
            <div className='mailInputContainer'>
                <input className='email_input' required type={'email'} placeholder='Enter your Email'/>
                <button onClick={handleClick}>Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default MailList
