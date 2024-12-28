import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons"
import React, { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';
import "./roomBookLayout.scss";
import Loader from '../Loader/Loader'
import { AuthContext } from '../../context/AuthContext'

const RoomBookLayout = ({days, setOpen, hotelid, hotelName, hotelImg, checkin, checkout}) => {
  const {user} = useContext(AuthContext);
  const [roomId, setRoomId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const bookingDate = new Date().toLocaleDateString("en-GB");
  const [selectedRooms, setSelectedRooms] = useState([]);
  
  const navigate = useNavigate();
  days = days === 0 ? 1 : days;
  const userId = user._id;
  const {data, loading} = useFetch(`${process.env.REACT_APP_BACKEND_SERVER}/hotels/room/${hotelid}`);
  let sameDate = false;
  
  
  const handleSelect = (e) =>{
    const checked = e.target.checked;
    const value = e.target.value;
    
    const price = parseFloat(e.target.dataset.price);
    setRoomId(value)
    
    if (checked) {
      setTotalPrice((prevTotal) => prevTotal + price * days); 
    } else {
      setTotalPrice((prevTotal) => prevTotal - price * days);
    }
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item)=>item!==value));
  }
  
  let {dates} = useContext(SearchContext);

  if(dates.length===0) dates = [{startDate : new Date(), endDate : new Date(), key:'selection'}];

  const getDateInRange = (startDate, endDate) => {
      const start = new Date(startDate)
      const end = new Date(endDate)
      
      if(start.getTime()===end.getTime()) {
        sameDate = true;
      }

      const date = new Date(start.getTime());

      let list = [];
      while(date<=end) {
          list.push(new Date(date).getTime());
          date.setDate(date.getDate()+1);
      }
      
      return list;
  }
  const allDates = (getDateInRange(dates[0].startDate, dates[0].endDate));

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
  const handleClick = async() => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/rooms/${userId}/${hotelid}/${roomId}`, {
        hotelName : hotelName,
        hotelImg : hotelImg,
        bookingDate : bookingDate ,
        checkin : checkin,
        checkout : checkout, 
        price : totalPrice 
      });
    } catch (error) {
      
    }
    if(sameDate){
      message.warning('Please Select Dates for your Trip !!');
    }else{
      try {
        await Promise.all(
          selectedRooms.map((roomId) => {
            const res = axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/rooms/availability/${roomId}`, {
              dates: allDates,
            });
            return res.data;
          })
        );
        message.success('Booking Successful');
        setOpen(false);
        navigate("/");
      } catch (err) {}
    }
  }
  return (
    <div className='reserve'>
      <div className='rContainer'>
        <FontAwesomeIcon 
            icon={faCircleXmark} 
            className='rClose' 
            onClick={() => setOpen(false)}
        />
        {
          loading ? <Loader width={"100%"} height={"30vh"} /> : 
          <div>
            <h2 className='heading'>Select your Rooms</h2>
            {data.length===0 ? <h1 className='noRoom'
            >No Rooms to show</h1> :  data.map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">Price : ₹ {item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room" key={roomNumber._id}>
                      <label>{roomNumber.number}</label>
                      <input
                        className='checkbox'
                        type="checkbox"
                        value={roomNumber._id}
                        data-price={item.price}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {totalPrice !== 0 ? 
            <div className='total-amount'>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px'}}>
                <div><strong>Total Amount: </strong> <span>₹{totalPrice}</span><span style={{color: 'gray'}}>(For {days || 1} nights)</span></div>
                <span style={{color: 'gray'}}>(*Gst Inclusive)</span>
              </div>
            </div> : null}
            <button onClick={handleClick} className="rButton">Reserve Now !</button>
          </div>
        }
      </div>
    </div>
  )
}

export default RoomBookLayout
