import React from 'react'
import useFetch from "../hooks/useFetch"
import Loader from './Loader';


const Featured = () => {

    const { data, loading} = useFetch(
        "https://bookingapp-backend.onrender.com/api/hotels/countByCity?cities=delhi,mumbai,goa"
      );
    // console.log(data);
  return (
    <div className='featured'>
        {loading? <Loader/> : <>
            <div className='featuredItem'>
                <img src="https://r-xx.bstatic.com/xdata/images/city/250x250/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
                    alt=''
                    className='featuredImg'
                />
                <div className="featuredTitles">
                    <h1>Delhi</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className='featuredItem'>
            <img
                src="https://r-xx.bstatic.com/xdata/images/city/250x250/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
                alt=""
                className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Mumbai</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className='featuredItem'>
                <img src="https://q-xx.bstatic.com/xdata/images/region/250x250/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o="
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Goa</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div>
        </>}
    </div>
  )
}

export default Featured
