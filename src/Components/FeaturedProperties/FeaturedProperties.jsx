import useFetch from '../../hooks/useFetch';
import Loader from '../Loader/Loader';
import Skeleton from '../SkeletonLoader/Skeleton';
import "./featuredProperties.scss"
import { useNavigate } from 'react-router-dom';

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_BACKEND_SERVER}/hotels?featured=true`
  );
  const handleClick=(id)=>{
    navigate(`/hotels/${id}`);
  }
    
  const {data: hotelData} = data;
  
  return (
    <div className="fp">
    {loading ? <div style={{display: 'flex'}}>
          <Skeleton width={300} height={200} loading={loading}/>
          <Skeleton width={300} height={200} loading={loading}/>
          <Skeleton width={300} height={200} loading={loading}/>
        </div>:
      (<>
        {
          hotelData?.map((item, i)=>(
            <div className="fpItem" key={i} onClick={()=>handleClick(item._id)}>
              <img
                src={item?.images[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item?.name}</span>
              <span className="fpCity">{item?.city}</span>
              <span className="fpPrice">Starting from ₹ {item?.cheapestPrice}</span>
             {item.rating && <div className="fpRating">
                <button>{item.rating}⭐</button>
                <span>{item.rating===1 ? "Not Recommended" : item.rating===2 ? "Good" : item.rating===3 ? "Very Good" : item.rating===4 ? "Superb" : "Excellent"}</span>
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
