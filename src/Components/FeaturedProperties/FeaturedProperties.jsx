import useFetch from '../../hooks/useFetch';
import Loader from '../Loader/Loader';
import "./featuredProperties.scss"
import { useNavigate } from 'react-router-dom';

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_BACKEND_SERVER}/hotels?featured=true&limit=4`
  );
    const handleClick=(id)=>{
      navigate(`/hotels/${id}`);
    }
  return (
    <div className="fp">
    {loading ? <Loader width={"100%"} height={"100%"} /> :
      (<>
        {
          data?.map((item, i)=>(
            <div className="fpItem" key={i} onClick={()=>handleClick(item._id)}>
              <img
                src={data[i]?.images[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{data[i]?.name}</span>
              <span className="fpCity">{data[i]?.city}</span>
              <span className="fpPrice">Starting from ₹ {data[i]?.cheapestPrice}</span>
             {item.rating && <div className="fpRating">
                <button>{data[i]?.rating}⭐</button>
                <span>{data[i]?.rating===1 ? "Not Recommended" : data[i].rating===2 ? "Good" : data[i].rating===3 ? "Very Good" : data[i].rating===4 ? "Superb" : "Excellent"}</span>
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
