import React from 'react'
import ReactLoading from "react-loading";
import "./loader.scss"

const Loader = () => {
  return (
    <div className='loader'>
      {/* <h2>Loading in ReactJs - GeeksforGeeks</h2> */}
      {/* <ReactLoading type="balls" color="#febb02" 
        height={100} width={50} /> */}

      {/* <ReactLoading type="bars" color="#febb02"
        height={100} width={50} /> */}

      {/* <ReactLoading type="bubbles" color="#febb02" /> */}

      {/* <ReactLoading type="cubes" color="#febb02"
        height={0} width={50} /> */}

      <ReactLoading type="cylon" color="#febb02" 
        height={100} width={50} /> 

      {/* <ReactLoading  type="spin" color='#febb02'
        height={100} width={50} /> */}

      {/* <ReactLoading type="spokes" color="#febb02"
        height={100} width={50} /> */}

      {/* <ReactLoading
        type="spinningBubbles"
        color="#febb02"
        height={100}
        width={50}
      /> */}
    </div>
  )
}

export default Loader
