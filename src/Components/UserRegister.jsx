import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const UserRegister = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        ...info,
      };

      await axios.post("https://bookingapp-backend.onrender.com/api/auth/register", newUser);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(info);
  return (
    <div className="new">
      <Navbar />
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
              <button className="rButton" onClick={handleClick}>Send</button>
              <span className='register'>Already a User? &nbsp; <a href='/register'> Login</a></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;