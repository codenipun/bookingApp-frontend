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

const RoomBookLayout = ({setOpen, hotelid, hotelName, hotelImg, checkin, checkout, price}) => {
  const {user} = useContext(AuthContext);
  const bookingDate = new Date();
  // console.log(bookingDate);
  // console.log(checkin);
  // console.log(checkout);

  const [roomId, setRoomId] = useState("")
  const userId = user._id;
    const navigate = useNavigate();
    const {data, loading} = useFetch(`${process.env.REACT_APP_BACKEND_SERVER}/hotels/room/${hotelid}`);
    
    const [selectedRooms, setSelectedRooms] = useState([]);
    let sameDate = false;
    
    const handleSelect = (e) =>{
        const checked = e.target.checked;
        const value = e.target.value;

        setRoomId(value)

        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item)=>item!==value));
    }
    // console.log(selectedRooms);
    
    const {dates} = useContext(SearchContext);
    // console.log(dates[0].startDate===dates[0].endDate)

    const getDateInRange = (startDate, endDate) =>{
        const start = new Date(startDate)
        const end = new Date(endDate)

        // console.log(start.getTime())
        // console.log(end.getTime())
        if(start.getTime()===end.getTime()){
          sameDate = true;
        }

        const date = new Date(start.getTime());

        let list = [];
        while(date<=end){
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
  // console.log(allDates)
  // console.log(data);
    

    const handleClick = async()=>{
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/rooms/${userId}/${hotelid}/${roomId}`, {
          hotelName : hotelName,
          hotelImg : hotelImg,
          bookingDate : bookingDate ,
          checkin : checkin,
          checkout : checkout, 
          price : price 
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
    // console.log(data)
  return (
    <div className='reserve'>
      <div className='rContainer'>
        <FontAwesomeIcon 
            icon={faCircleXmark} 
            className='rClose' 
            onClick={() => setOpen(false)}
        />
        {
          loading ? <div style={{height:"200px"}}><Loader/></div> : 
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
                          <div className="room">
                            <label>{roomNumber.number}</label>
                            <input
                              className='checkbox'
                              type="checkbox"
                              value={roomNumber._id}
                              onChange={handleSelect}
                              disabled={!isAvailable(roomNumber)}
                            />
                            {/* <hr style={{color : "black"}}></hr> */}
                          </div>
                        ))}
                      </div>
              </div>
            ))}
            <button onClick={handleClick} className="rButton">Reserve Now !</button>
          </div>
        }
      </div>
    </div>
  )
}

export default RoomBookLayout
