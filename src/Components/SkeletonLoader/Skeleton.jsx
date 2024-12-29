import React, { useState, useEffect } from "react";
import "./skeleton.scss"; 

const Skeleton = ({width, height, loading}) => {
  return (
    <div style={{ padding: "20px"}}>
      {loading ? (
        <div className="skeleton-container">
          <div className="skeleton rectangular" style={{ width: width, height: height }}></div>
          <div className="skeleton text" style={{ width: "60%" }}></div>
          <div className="skeleton text" style={{ width: "80%" }}></div>
        </div>
      ) : (
        <div>
          <img
            src="https://via.placeholder.com/300"
            alt="Loaded content"
            style={{ width: 300, height: 200 }}
          />
          <p>This is the loaded content!</p>
        </div>
      )}
    </div>
  );
};

export default Skeleton;
