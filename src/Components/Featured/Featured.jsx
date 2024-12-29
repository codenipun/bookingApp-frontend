import React, { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import Skeleton from "../SkeletonLoader/Skeleton";
import "./featured.scss";

const Featured = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  const dates = [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ];

  const options = {
    adults: 1,
    childrens: 0,
    rooms: 1,
  };

  const { data, loading } = useFetch(
    `${process.env.REACT_APP_BACKEND_SERVER}/hotels/countByCity?cities=delhi,mumbai,agra,goa,lonavla`
  );

  const handleSearch = (city) => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination: city, dates, options },
    });
    navigate("/hotels", { state: { destination: city, dates, options } });
  };

  return (
    <div className="featured">
      {loading ? (
        <div style={{display: 'flex'}}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} width={300} height={200} />
          ))}
        </div>
      ) : (
        cityData?.map((item, i) => (
          <div
            key={i}
            onClick={() => handleSearch(item.city.toLowerCase())}
            className="featuredItem"
          >
            <img
              src={item.img}
              alt={`${item.city}`}
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{item.city}</h1>
              <h2>{data[i] || "0"} properties</h2>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Featured;

const cityData = [
  {
    img: "https://r-xx.bstatic.com/xdata/images/city/250x250/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=",
    city: "Delhi",
  },
  {
    img: "https://r-xx.bstatic.com/xdata/images/city/250x250/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=",
    city: "Mumbai",
  },
  {
    img: "https://r-xx.bstatic.com/xdata/images/city/250x250/684501.jpg?k=225f7713b3f47f0c2c580c34c35582ba70331757bcc8dc32e7f17072c80805ff&o=",
    city: "Agra",
  },
  {
    img: "https://q-xx.bstatic.com/xdata/images/region/250x250/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=",
    city: "Goa",
  },
  {
    img: "https://r-xx.bstatic.com/xdata/images/city/250x250/684682.jpg?k=30cf9de93f2a0f87eed7d2d0d9b3e6eccd5dcf3a4b68b4e0151c0800ddc84af7&o=",
    city: "Lonavla",
  },
];
