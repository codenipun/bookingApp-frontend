import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loader = ({width='50px', height='100px'}) => {
  return (
    // <div className='loader'>
    //   {/* <h2>Loading in ReactJs - GeeksforGeeks</h2> */}
    //   {/* <ReactLoading type="balls" color="#febb02" 
    //     height={100} width={50} /> */}

    //   {/* <ReactLoading type="bars" color="#febb02"
    //     height={100} width={50} /> */}

    //   {/* <ReactLoading type="bubbles" color="#febb02" /> */}

    //   {/* <ReactLoading type="cubes" color="#febb02"
    //     height={0} width={50} /> */}

    //   {/* <ReactLoading type="cylon" color="#febb02" height={height} width={width}/>  */}

    //   {/* <ReactLoading  type="spin" color='#febb02'
    //     height={100} width={50} /> */}

    //   {/* <ReactLoading type="spokes" color="#febb02"
    //     height={100} width={50} /> */}

    //   {/* <ReactLoading
    //     type="spinningBubbles"
    //     color="#febb02"
    //     height={100}
    //     width={50}
    //   /> */}
    // </div>
    
    <div style={{display:'flex',justifyContent:'center', alignItems:'center', height:height, width:width}}>
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 50,
            color: "#0071c2",
          }}
          height={10}
          spin
        />
      }
    />
  </div>
  )
}

export default Loader
