import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header'
import Navbar from '../Navbar'
import {format} from 'date-fns'
import {DateRange} from 'react-date-range'
import SearchItem from '../SearchItem'
import useFetch from "../../hooks/useFetch"
import Loader from '../Loader'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);

  const [minP, setMinP] = useState(undefined);
  const [maxP, setMaxP] = useState(undefined);
  

  //custom hook to fetch data from backend
  const { data, loading, error, reFetch } = useFetch(
    `https://bookingapp-backend.onrender.com/api/hotels?city=${destination}&min=${minP || 0}&max=${maxP || 999}` 
  );

  const handleClick = () =>{
    reFetch();
  }

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input type="text" placeholder={destination} onChange={e=>setDestination(e.target.value)}/>
            </div>
            <div className='lsItem'>
              <label>Check-in Date</label>
              <span onClick={()=>{setOpenDate(!openDate)}}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`} </span>

              {openDate && <DateRange
                onChange={(item)=>setDates([item.selection])}
                minDate = {new Date()}
                ranges={dates}
              />
              }
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Min Price <small>(per night)</small></span>
                  <input className='lsOptionInput' type={'number'} onChange={e=>setMinP(e.target.value)}/>
                </div>                
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Max Price <small>(per night)</small></span>
                  <input className='lsOptionInput' type={'number'} onChange={e=>setMaxP(e.target.value)}/>
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Adults</span>
                  <input className='lsOptionInput' type={'number'} min={1} placeholder={options.adults}/>
                </div>  
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Childrens</span>
                  <input className='lsOptionInput' type={'number'} min={0} placeholder={options.childrens}/>
                </div>  
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Rooms</span>
                  <input className='lsOptionInput' type={'number'} min={1} placeholder={options.rooms}/>
                </div> 
              </div>               
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className='listResult'>
              {loading ? <Loader/> : 
                <>
                  {
                    data.map((item)=>(
                      <SearchItem key={item._id} item = {item} />
                    ))
                  }
                </>
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
