import React from "react";
import "./skeleton.scss"; 

const Skeleton = ({width, height}) => {
  return (
    <div style={{ padding: "20px"}}>
        <div className="skeleton-container">
          <div className="skeleton rectangular" style={{ width: width, height: height }}></div>
          <div className="skeleton text" style={{ width: "60%" }}></div>
          <div className="skeleton text" style={{ width: "80%" }}></div>
        </div>
    </div>
    );
};

export default Skeleton;
