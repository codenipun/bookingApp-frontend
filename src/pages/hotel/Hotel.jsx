import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import MailList from '../../Components/MailList/MailList'
import Navbar from '../../Components/Navbar/Navbar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import RoomBookLayout from '../../Components/RoomBookLayout/RoomBookLayout'
import Loader from '../../Components/Loader/Loader'
import "./hotel.scss"
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'

const Hotel = () => {
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];
  const {user} = useContext(AuthContext);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openBookLayout, setOpenBookLayout] = useState(false)
  const [openDate, setOpenDate] = useState(false);

  const handleOpen = (i)=>{
    setSlideNumber(i);
    setOpen(true);
  }

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const {data, loading } = useFetch( `${process.env.REACT_APP_BACKEND_SERVER}/hotels/find/${id}` );
  
  const [dates, setDates] = useState([
    { startDate: new Date(), endDate: new Date(), key: 'selection' },
  ]);
  const [options, setOptions] = useState({ adults: 1, childrens: 0, rooms: 1 });

  useEffect(() => {
    if (location.state) {
      setDates(location.state.dates);
      setOptions(location.state.options);
    }
  }, [location.state]); // Depend on location.state

  
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays === 0 ? 1 : diffDays;
  }

  const days = dayDifference(dates[0].startDate, dates[0].endDate);
  
  const handleMove = (direction) => {
    let newSlideNumber;

    if(direction==='l'){
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1;
    }else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1;
    }
    setSlideNumber(newSlideNumber);
  }
  
  const navigate = useNavigate();
  
  const handleBook = () =>{
    if(user){
      setOpenBookLayout(true);
    }else{
      navigate("/login");
    }
  }
  
  return (
    <div>
      <Navbar />
      <div className="hotelHeader">
        <Header type="list" />
      </div>
      {loading ? (
        <Loader width="100%" height="85vh" />
      ) : (
        <div className="hotelContainer">
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleBook}>
              Explore Rooms
            </button>
            <div className='checkInDates'>
              <label style={{fontSize: '12px', fontWeight: 'bold', color: 'black'}}>Check-in Dates</label>
              <span onClick={()=>{setOpenDate(!openDate)}} style={{cursor: 'pointer'}}>{`${format(dates[0].startDate, "MM/dd/yyyy")}`} <span style={{color: '#004cb8'}}>{`->`}</span> {`${format(dates[0].endDate, "MM/dd/yyyy")}`} </span>
            </div>
              <div style={{position: 'absolute', right: '0', top: '120px'}}>
                {openDate && <DateRange
                  onChange={(item)=>setDates([item.selection])}
                  minDate = {new Date()}
                  ranges={dates}/>
                }
              </div>
            <h1 className="hotelName">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span className>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance} from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ₹{data.cheapestPrice} at this property and get a free air taxi
            </span>
            <div className="hotelImages">
              {photos.map((photo, i) => (
                <div key={i} className="hotelImgWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=''
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days ? `${days}-` : ""}night stay</h1>
                <span>
                  Located in the real heart of {data.city}, this property has an
                  excellent location score of 9.8
                </span>
                {days!==0 ? 
                  <h2>
                    <b>₹{days * data?.cheapestPrice * options?.rooms}</b>
                    <span style={{color: 'gray'}}>({days} nights)</span>
                  </h2> 
                  : null
                }
                <button onClick={handleBook}>Explore Rooms</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openBookLayout && (
        <RoomBookLayout
          dates={dates}
          days={days}
          setOpen={setOpenBookLayout}
          hotelid={id}
          hotelName={data.name}
          hotelImg={data.images?.[0]}
          checkin={dates[0].startDate.toLocaleDateString("en-GB")}
          checkout={dates[0].endDate.toLocaleDateString("en-GB")}
          price={data.cheapestPrice}
        />
      )}
    </div>
  );
}

export default Hotel
