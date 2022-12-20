import React from 'react'

const MailList = () => {
  return (
    <div className='mail'>
        <div>
            <h1 className='mailTitle'>Save Time, Save Money!</h1>
            <span className="mailDesc">Sign up and we'll send the best deals to you</span>
            <div className='mailInputContainer'>
                <input required type={'email'} placeholder='Enter your Email'/>
                <button>Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default MailList
