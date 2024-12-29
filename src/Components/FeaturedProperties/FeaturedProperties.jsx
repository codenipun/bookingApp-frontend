import useFetch from '../../hooks/useFetch';
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
  
  // Helper function for rating text
  const getRatingText = (rating) => {
    const ratingTexts = {
      1: "Not Recommended",
      2: "Good",
      3: "Very Good",
      4: "Superb",
      5: "Excellent",
    };
    return ratingTexts[rating] || "No Rating";
  };

  return (
    <div className="fp">
      {loading ? (
        <div style={{ display: "flex" }}>
          {Array.from({ length: 3 }).map((_, index) => ( <Skeleton key={index} variant="rectangular" width={300} height={200} />))}
        </div>
      ) : (
        hotelData?.map((item) => (
          <div 
            className="fpItem" 
            key={item._id} 
            onClick={() => handleClick(item._id)}
          >
            <img
              src={item?.images?.[0]}
              alt={item?.name || "Hotel"} 
              className="fpImg"
            />
            <span className="fpName">{item?.name || "Unnamed Hotel"}</span>
            <span className="fpCity">{item?.city || "Unknown City"}</span>
            <span className="fpPrice">
              Starting from ₹ {item?.cheapestPrice || "N/A"}
            </span>
            {item?.rating && (
              <div className="fpRating">
                <button>{item.rating} ⭐</button>
                <span>{getRatingText(item.rating)}</span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
export default FeaturedProperties
