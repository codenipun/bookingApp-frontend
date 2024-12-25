import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./userRegister.scss"
import {message} from 'antd'
import Loader from "../../Components/Loader/Loader";

const UserRegister = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const newUser = {
        ...info,
      };

      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/auth/register`, newUser);
      setLoading(false);
      // navigate("/");
      navigate("/login")
      message.success("Successfully Registered, Please Login to explore")
    } catch (err) {
      console.log(err);
      message.error('Failed to Register')
    }
    setLoading(false);
  };

  const handleLoginClick = () =>{
    navigate("/login")
  }

  // console.log(info);
  return (
    <>
      <Navbar />
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Create An Account</h1>
          </div>
         <div className="bottom">
            <div className="right">
              <form className="form">
                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label className="rLabel">{input.label}</label>
                    <input
                    className="rinput"
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  </div>
                ))}
                {!loading ? <button className="rButton" onClick={handleClick}>Submit</button> : <div className="register-loader"><Loader height={30} width={30}/></div>}
                <span onClick={handleLoginClick} className='register'>Already a User? &nbsp; <span className="loginBtn">Sign-in</span></span>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default UserRegister;