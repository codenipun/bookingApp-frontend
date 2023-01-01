import React from 'react'
import useFetch from '../hooks/useFetch';
import Loader from './Loader';

const FeaturedProperties = () => {

  const { data, loading } = useFetch(
    "https://bookingapp-backend.onrender.com/api/hotels?featured=true&limit=4"
  );

  return (
    <div className="fp">
    {loading ? <Loader/> :
      (<>
        {
          data.map((item, i)=>(
            <div className="fpItem" key={i}>
              <img
                src={data[i].images[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{data[i].name}</span>
              <span className="fpCity">{data[i].city}</span>
              <span className="fpPrice">Starting from ₹ {data[i].cheapestPrice}</span>
             {item.rating && <div className="fpRating">
                <button>{data[i].rating}⭐</button>
                <span>{data[i].rating===1 ? "Not Recommended" : data[i].rating===2 ? "Good" : data[i].rating===3 ? "Very Good" : data[i].rating===4 ? "Superb" : "Excellent"}</span>
              </div>}
            </div>
          ))
        }
      </>)
    }  
    </div>
  )
}
export default FeaturedProperties
