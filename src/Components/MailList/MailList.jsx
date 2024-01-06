import React, { useState } from 'react'
import { message } from 'antd';
import "./maillist.scss"

const MailList = () => {
  const [email, setEmail] = useState("")

  const handleClick = () =>{
    if(email==="") message.error("Please Enter You Emial Id");
    else if(email.endsWith("@gmail.com")) message.success('Thankyou for Subscribing');
    else message.error("Please Enter correct Email id")
  }
  return (
    <div className='mail'>
        <div>
            <h1 className='mailTitle'>Save Time, Save Money!</h1>
            <span className="mailDesc">Sign up and we'll send the best deals to you</span>
            <div className='mailInputContainer'>
                <input className='email_input' required type={'email'} placeholder='Enter your Email' onChange={e=>setEmail(e.target.value)}/>
                <button onClick={handleClick}>Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default MailList
