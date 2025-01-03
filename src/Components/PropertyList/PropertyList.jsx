import useFetch from '../../hooks/useFetch';
import Skeleton from '../SkeletonLoader/Skeleton';
import "./propertylist.scss"
import { useNavigate } from 'react-router-dom';

const PropertyList = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch(`${process.env.REACT_APP_BACKEND_SERVER}/hotels/countByType`);
  const dates = [
    {
        startDate : new Date(),
        endDate: new Date(),
        key : 'selection'
    }
  ]
  
  const options = {
    adults : 1,
    childrens : 0,
    rooms : 1
  }
  
  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
  ];


  const handleClick=(type)=>{
    navigate("/hotels", {state:{type, dates, options}})
  }

  return (
    <div className='pList'>
      {loading ? (
        <div style={{display: 'flex'}}>
          {Array(5).fill(0).map((_, index) => (<Skeleton key={index} width={165} height={120} />))}
        </div>
        ) : (
        data &&
        images.map((img, i) => (
          <div 
            onClick={() => handleClick(data[i]?.type)} 
            className="pListItem" 
            key={i}
          >
            <img 
              src={img} 
              alt={data[i]?.type || "Image"} 
              className="pListImg" 
            />
            <div className="pListTitles">
              <h1>{data[i]?.type || "Unknown Type"}</h1>
              <h2 className="hcount">
                {data[i]?.count || 0} {data[i]?.type || "Items"}
              </h2>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default PropertyList
