import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import {format} from 'date-fns'
import {DateRange} from 'react-date-range'
import SearchItem from '../../Components/SearchItem/SearchItem'
import useFetch from "../../hooks/useFetch"
import Loader from '../../Components/Loader/Loader'
import { Pagination, Slider, Switch, TreeSelect } from 'antd'

import "./list.scss"

const List = () => {
  const location = useLocation();
  let [openFilter, setOpenFilter] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [hotelType ,setHotelType] = useState(location.state.type);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(location.state.dates);
  const options = location?.state.options;

  const [minP, setMinP] = useState(2199);
  const [maxP, setMaxP] = useState(9999);
  const [activeToggle, setActiveToggle] = useState(1);
  const [sortBy, setSortBy] = useState("cheapestPrice");
  const [sortOrder, setSortOrder] = useState('asc');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  // console.log(location.state.type)
  
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleDestinationChange = debounce((value) => {
    setDestination(value);
  }, 300);
  
  const queryParams = new URLSearchParams({
    min: minP,
    max: maxP,
    sortBy: sortBy,
    sortOrder: sortOrder,
    page: pageNumber,
    limit: pageLimit
  });

  if (destination) {
    queryParams.append("city", destination);
  }
  
  if (hotelType) {
    queryParams.append("type", hotelType);
  }
  
  //custom hook to fetch data from backend
  const { data, loading, reFetch } = useFetch(
    `${process.env.REACT_APP_BACKEND_SERVER}/hotels?${queryParams.toString()}` 
  );
  
  const {data: hotelData, page, rows} = data;

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
  
  const handlePriceChange = debounce((value) => {
    setMinP(value[0]);
    setMaxP(value[1]);
  }, 300);
  
  const handleToggleChange = (toggleId) => {
    setActiveToggle(toggleId);

    switch(toggleId) {
      case 1: 
        setSortBy("cheapestPrice");
        setSortOrder("asc");
        break;
      
      case 2:
        setSortBy("cheapestPrice");
        setSortOrder("desc");
        break;
      
      case 3: 
        setSortBy("rating");
        setSortOrder("desc");
        break;
      
      default: 
        break;
    }
  };
  
  const treeData = [
    {
      value: 'hotel',
      title: 'Hotel',
    },
    {
      value: 'apartment',
      title: 'Apartment'
    },
    {
      value: 'resort',
      title: 'Resort'
    },
    {
      value: 'villa',
      title: 'Villa'
    },
    {
      value: 'cabin',
      title: 'Cabin'
    }
  ];
  
  const onPropertyChange = (value) => {
    setHotelType(value);
  }
  
  const onShowSizeChange = (current, pageSize) => {
    setPageLimit(pageSize);
  }
  
  const onPageChange = (pagenumber) => {
    setPageNumber(pagenumber)
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
                  <input className='destination_input' type="text" placeholder={destination} onChange={e=>handleDestinationChange(e.target.value)}/>
                </div>
                <div className='lsItem'>
                  <label>Check-in Date</label>
                  <span onClick={()=>{setOpenDate(!openDate)}}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`} </span>

                  {openDate && <DateRange
                    onChange={(item)=>setDates([item.selection])}
                    minDate = {new Date()}
                    ranges={dates}/>
                  }
                </div>
                <div className='lsOptions'>{options.adults} Adults | {options.childrens} Childrens | {options.rooms} Rooms</div>
              <div className='lsItem'>
                <label style={{padding: '20px 0px 10px 0px'}}>FILTERS</label>
                <div className="price-range">
                  <span>PRICE</span>
                  <Slider range defaultValue={[2199, 9999]} min={0} max={19999} onChange={handlePriceChange}/>
                  <span>₹{minP} - ₹{maxP}</span>
                </div>
                <div className='sorting'>
                  <span>SORT BY</span>
                  <div>Price: Low to High <Switch checked={activeToggle === 1} defaultChecked onChange={() => handleToggleChange(1)} /></div>
                  <div>Price: High to Low <Switch checked={activeToggle === 2} onChange={() => handleToggleChange(2)} /></div>
                  <div>Customers Rating <Switch checked={activeToggle === 3} onChange={() => handleToggleChange(3)} /></div>
                </div>
                <div className="property-type" >
                  <span>PROPERTY TYPE</span>
                  <TreeSelect
                    style={{ width: '50%' }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Select"
                    allowClear
                    treeDefaultExpandAll
                    value={hotelType}
                    onChange={onPropertyChange}
                    treeData={treeData}
                  />
                </div>
              </div>        
            <button onClick={handleClick}>Search</button>
          </div>
            )
          }
          <div className='listResult'>
              {loading ? <Loader width={"100%"} height={"100%"} /> : 
                <div style={{marginBottom: '50px'}}>
                  {hotelData?.length !==0 ? 
                    hotelData?.map((item) => ( 
                      <SearchItem key={item._id} item = {item} dates={dates} options={options} />
                    )) :
                    <div className='emptyContainer'>No Data Found !!</div>
                  }
                </div>
              }
              <div className='pagination'>
                <Pagination 
                  defaultCurrent={page} 
                  total={rows} 
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  onChange={onPageChange} />
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
