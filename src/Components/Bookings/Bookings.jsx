import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import "./bookings.scss"
import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../Loader/Loader'


const Bookings = () => {
    const {user} = useContext(AuthContext);
    const userId = user._id
    // console.log(user)
    const {data} = useFetch(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userId}`);
    
    const bookings = data.bookings;
    // console.log(data);

    
    return (
        <>
        <Navbar/>
        <div className='main-cont'>
            {
                bookings ?  bookings.map((item, i)=>(
                    <div className='booking-cont' key={i}>
                        <div className='sub-container-1'>
                            <img width={140} height={140} src={item.hotelImg} alt='hotelImg'/>
                            <div className='sub-container-11'>
                                <h2>{item.hotelName}</h2>
                                <p>Booked</p>
                                <span>Check-In : {item.checkin}</span>
                                <span>Check-Out : {item.checkout}</span>
                            </div>
                        </div>
                        <div className='sub-container-2'>
                            <span>Booking Date : {item.bookingDate}</span>
                            <p>{item.price} ₹</p>
                        </div>
                    </div>
                )) : <Loader/>
            }
            <Footer/>
        </div>
        <div style={{}}></div>
    </>
  )
}

export default Bookings
        // const dummyBookings = [
        //     {
        //         hotelName : "Hotel Taj View",
        //         hotelImg : "https://r-xx.bstatic.com/xdata/images/city/250x250/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=",
        //         bookingDate : "12/10/200",
        //         price : "2000",
        //         checkIn : "24/12/2000",
        //         checkOut : "27/12/2000"
        //     },
        //     {
        //         hotelName : "Hotel Taj View",
        //         hotelImg : "https://r-xx.bstatic.com/xdata/images/city/250x250/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=",
        //         bookingDate : "12/10/200",
        //         price : "2000",
        //         checkIn : "24/12/2000",
        //         checkOut : "27/12/2000"
        //     },
        //     {
        //         hotelName : "Hotel Taj View",
        //         hotelImg : "https://r-xx.bstatic.com/xdata/images/city/250x250/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=",
        //         bookingDate : "12/10/200",
        //         price : "2000",
        //         checkIn : "24/12/2000",
        //         checkOut : "27/12/2000"
        //     },
        //     {
        //         hotelName : "Hotel Taj View",
        //         hotelImg : "https://r-xx.bstatic.com/xdata/images/city/250x250/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=",
        //         bookingDate : "12/10/200",
        //         price : "2000",
        //         checkIn : "24/12/2000",
        //         checkOut : "27/12/2000"
        //     },
        // ]