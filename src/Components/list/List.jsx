import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import {format} from 'date-fns'
import {DateRange} from 'react-date-range'
import SearchItem from '../SearchItem/SearchItem'
import useFetch from "../../hooks/useFetch"
import Loader from '../Loader/Loader'

import "./list.scss"

const List = () => {
  const location = useLocation();
  let [openFilter, setOpenFilter] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);

  const [minP, setMinP] = useState(undefined);
  const [maxP, setMaxP] = useState(undefined);
  
  

  //custom hook to fetch data from backend
  const { data, loading, error, reFetch } = useFetch(
    `https://bookingapp-backend.onrender.com/api/hotels?city=${destination}&min=${minP || 0}&max=${maxP || 19999}` 
  );

  const handleClick = () =>{
    setOpenFilter(!openFilter)
    reFetch();
  }

  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 750;

  if(!isMobile){
      openFilter = true;
  }

  const handleFilterClick = () =>{
    if(isMobile){
      setOpenFilter(!openFilter);
    }
  }
  
  return (
    
    <div>
      <Navbar/>
      <div className='listHeader'>
        <Header type="list"/>
      </div>
      <div className='listContainer'>
        <div className='listWrapper'>
          {
            !openFilter ? (<div onClick={handleFilterClick} className='mobileFilterView'>
              Search Filters
            </div>) : (
              <div className='listSearch'>
                <h1 className='lsTitle'>Search</h1>
                <div className='lsItem'>
                  <label>Destination</label>
                  <input className='destination_input' type="text" placeholder={destination} onChange={e=>setDestination(e.target.value)}/>
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
                  <input className='lsOptionInput' type={'number'} placeholder='0' onChange={e=>setMinP(e.target.value)}/>
                </div>                
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Max Price <small>(per night)</small></span>
                  <input className='lsOptionInput' type={'number'} placeholder='19999' onChange={e=>setMaxP(e.target.value)}/>
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
            )
          }
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
