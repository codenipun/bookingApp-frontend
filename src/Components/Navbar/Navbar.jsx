import React, { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import "./navbar.scss"
import useFetch from '../../hooks/useFetch'
import { Button, Dropdown, message } from 'antd';
import { BookOutlined, DashboardOutlined, LoginOutlined, LogoutOutlined, QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";


const Navbar = () => {
  // const {user:currUser} = useContext(AuthContext);
  const {user, dispatch} = useContext(AuthContext);
  let userId = null;
  if(user){
    userId = user._id;
  }
  // console.log(user)
  const {data, reFetch} = useFetch(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userId}`);

  let bookings = [];

  bookings = data.bookings;
  // console.log(bookings); 

  
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const handleLogin=()=>{
    navigate("/login")
  }

  const handleLogout = () =>{
    reFetch();
    setOpenMenu(!openMenu);
    dispatch({type :"LOGOUT"});
    // window.onload();    
    navigate("/");
    message.success('Successfully Loged Out')
  }
  const items = [
    {
      label: user?.username,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "My Bookings",
      key: "3",
      icon: <BookOutlined />
    },
    {
      label: 'Admin Dashboard',
      key: "4",
      icon: <DashboardOutlined />
    },
    {
      label: "Logout",
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];
  
  const handleMenuClick = (e) => {
    switch(e.key) { 
      case '2': 
        handleLogout();
        break;
      case '3': 
        navigate('bookings');
        break;
      default:
        break;
    }
  };
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className='navbar'>
      <div>
        <Link to={"/"} style={{textDecoration:"none", color:"white"}}>
          <div className='logo'>
              Hotel Booking
          </div>
        </Link>
        <div className='logo-booking'>
          {(user && bookings?.length !==0 ) ? <Button primary ghost>Bookings</Button>
            : null}
            {user ? 
            <div >
              <Dropdown
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
                menu={menuProps}>
              <Button style={{display:'flex', justifyContent:'center', alignItems
              :'center'}}>
                <UserOutlined />
              </Button>
              </Dropdown>
          
            </div> : ( <div className='navItems'>
                {/* <button onClick={handleRegister} className='navButton'>Register</button>*/}
                <button onClick={handleLogin} className='navButton'>Login</button> 
            </div>)}
       </div>
      </div>
    </div>
  )
}

export default Navbar
