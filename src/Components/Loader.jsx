import React from 'react'
import ReactLoading from "react-loading";
const Loader = () => {
  return (
    <div className='loader'>
      {/* <h2>Loading in ReactJs - GeeksforGeeks</h2>
      <ReactLoading type="balls" color="#0000FF" 
        height={100} width={50} />
      <ReactLoading type="bars" color="#0000FF"
        height={100} width={50} />
      <ReactLoading type="bubbles" color="#0000FF"
        height={100} width={50} />
      <ReactLoading type="cubes" color="#0000FF"
        height={100} width={50} />
      <ReactLoading type="cylon" color="#0000FF" 
        height={100} width={50} /> */}
      <ReactLoading  type="spin" color='#003580'
        height={100} width={50} />
      {/* <ReactLoading type="spokes" color="#0000FF"
        height={100} width={50} />
      <ReactLoading
        type="spinningBubbles"
        color="#0000FF"
        height={100}
        width={50}
      /> */}
    </div>
  )
}

export default Loader
