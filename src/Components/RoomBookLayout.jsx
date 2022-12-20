import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons"
import React, { useContext, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { SearchContext } from '../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RoomBookLayout = ({setOpen, hotelid}) => {
    const navigate = useNavigate();
    const {data, error, loading} = useFetch(`/hotels/room/${hotelid}`);
    
    const [selectedRooms, setSelectedRooms] = useState([]);
    
    const handleSelect = (e) =>{
        const checked = e.target.checked;
        const value = e.target.value;

        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item)=>item!==value));
    }
    // console.log(selectedRooms);
    
    const {dates} = useContext(SearchContext);

    const getDateInRange = (startDate, endDate) =>{
        const start = new Date(startDate)
        const end = new Date(endDate)

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
    

    const handleClick = async()=>{
        try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
    }
  return (
    <div className='reserve'>
      <div className='rContainer'>
        <FontAwesomeIcon 
            icon={faCircleXmark} 
            className='rClose' 
            onClick={() => setOpen(false)}
        />
        <span>
            <h2 className='heading'>Select your Rooms</h2>
            {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">Price : $ {item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
            <button onClick={handleClick} className="rButton">Reserve Now !</button>
        </span>
      </div>
    </div>
  )
}

export default RoomBookLayout
