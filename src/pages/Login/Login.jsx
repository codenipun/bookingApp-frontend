import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import Footer from '../../Components/Footer/Footer';
import Loader from '../../Components/Loader/Loader';
import Navbar from '../../Components/Navbar/Navbar';
import loginImg from '../../Images/login-illustration.png'
import "./login.scss"
import {message} from 'antd'

const Login = () => {
    
    const [credential, setCredential] = useState({
        username : undefined,
        password : undefined
    });
    const navigate = useNavigate()
    const {loading, dispatch} = useContext(AuthContext);

    const handleChange = async (e)=>{
        setCredential((prev)=>({...prev, [e.target.id] : e.target.value})); 
    }
    const handleClick = async(e) =>{
        e.preventDefault();
        if(!credential.username || !credential.password){
            message.error('Please Enter Details')
            return;
        }
        dispatch({type :"LOGIN_START"})

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/auth/login`, credential);
            dispatch({type:"LOGIN_SUCCESS", payload : res.data.details });
            message.success('Successfully Loged In')
            navigate("/");
        } catch (err) {
            dispatch({type : "LOGIN_FAILURE", payload : err.response.data});
            message.error("Invalid Credentials");
        }
    }

    const handleRegisterClick = () =>{
        navigate("/register")
    }
  return (
    <>   
    <Navbar/>
    {
      loading ? <Loader/> :
       <div className='login'>
            <div className='login_subContainer1'>
                <div className='login_img_container'>
                    <img className = "login_img" src={loginImg} alt='Login Img' width={369}></img>
                    <p>Create your profile now and be eligible for crazy discounts on Hotels, Flights, Taxies and more</p>
                </div>
                <div className='lContainer'>
                    <span className='newUser'>New to Hotel Booking? &nbsp; <span onClick={handleRegisterClick} className='registerBtn'>Register</span></span>
                    <hr className='line'></hr>
                    <h1>Login</h1>
                    <label className='lLabel'>Username</label>
                    <input required className='linput' type={'text'} id='username' onChange={handleChange} value={credential.username}></input>
                    <label className='lLabel'>Password</label>
                    <input required className='linput' type={'password'} id='password' onChange={handleChange} value={credential.password}></input>
                    <span className='newUser registerBtn'>Forget Password?</span>
                    <button type='submit' disabled={loading} className='lButton' onClick={handleClick}>Login</button>
                </div>
            </div>
            <div className='foot'>
                <Footer/>
            </div>
       </div>
    }
    </>
  )
}

export default Login
