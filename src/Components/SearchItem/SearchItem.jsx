import React from 'react'
import './searchItem.scss'
import {Link} from "react-router-dom"
import "./searchItem.scss"

const SearchItem = ({item}) => {
  return (
    <div className='searchItem'>
        <img src={item.images[0]}
        alt="" className='siImg'/>
        <div className='secondContainer'>
          <div className='siDesc'>
              <h1 className="siTitle">{item.name}</h1>
              <span className="siDistance">{item.distance}m from center</span>
              <span className="siTaxiOp">Free airport taxi</span>
              <span className="siSubtitle">
              Studio Apartment with Air conditioning
              </span>
              <span className="siFeatures">
                {item.desc}
              </span>
              <span className="siCancelOp">Free cancellation </span>
              <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
              </span>
          </div>

          <div className='siDetails'>
              {item.rating && <div className="siRating">
              <span>{item.rating===1 ? "Cheap" : item.rating===2 ? "Good" : item.rating===3 ? "Nice" : item.rating===4 ? "Superb" : "Excellent"}</span>
                <button>{item.rating}⭐</button>
              </div>}
              <div className="siDetailTexts">
                  <div className='myPrice'>
                    <span className="siPrice">₹ {item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                  </div>
                  <Link to={`/hotels/${item._id}`}>
                    <button className="siCheckButton">See availability</button>
                  </Link>
              </div>
          </div>
        </div>
    </div>
  )
}

export default SearchItem
