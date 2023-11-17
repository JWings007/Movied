import React, { useEffect } from "react";
import { apis } from "../api/apiFatcher";

function ImageViewer(props) {
  return (
    <>
      <div className="full-image-container">
        <span>
          <i
            className="fa-regular fa-circle-xmark"
            onClick={() => {
              const container = document.querySelector(".full-image-container");
              container.style.display = "none";
            }}
          ></i>
        </span>
        <img src={props.src} alt="" id="view-img" />
      </div>
    </>
  );
}

export default ImageViewer;
