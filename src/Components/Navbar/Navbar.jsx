import React, { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import "./navbar.scss"

const Navbar = () => {
  const {user, dispatch} = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const handleLogin=()=>{
    navigate("/login")
  }
  const handleRegister=()=>{
    navigate("/register")
  }

  const handleLogout = () =>{
    setOpenMenu(!openMenu);
    dispatch({type :"LOGOUT"});
    navigate("/");
  }

  return (
    <div className='navbar'>
      <div>
        <Link to={"/"} style={{textDecoration:"none", color:"white"}}>
          <div className='logo'>
              Hotel Booking
          </div>
        </Link>
       {user ? <div onClick={()=>setOpenMenu(!openMenu)} >
       <img className='userimg' src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt=""/>
       
       </div> : ( <div className='navItems'>
            <button onClick={handleRegister} className='navButton'>Register</button>
            <button onClick={handleLogin} className='navButton'>Login</button>
        </div>)}

        {openMenu &&
                <div className='menu'>
                  <Link className='menuLink'>
                    <div className="menuItem">{user.username}</div>
                  </Link>
                  {user.username === "codenipun" && 
                    <div className="menuItem "><a className='adminlink' href='https://booking-app-admin.onrender.com/'>ADMIN</a></div>
                  }
                  <Link className='menuLink'>
                    <div className="menuItem">Bookings</div>
                  </Link>
                  <Link onClick={handleLogout} className='menuLink'>
                    <div className="menuItem">Logout</div>
                  </Link>
                  <Link className='menuLink'>
                    <div  className="menuItem">Settings</div>
                  </Link>
                </div>
            }         
      </div>
    </div>
  )
}

export default Navbar
