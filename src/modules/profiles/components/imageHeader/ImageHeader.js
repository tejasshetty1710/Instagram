import React from "react";
// styles
import "./image-header.scss";

const ImageHeader = function ImageHeader({
  location,
  userName,
  profilePicSrc,
  clickHandler,
}) {
  return (
    <div onClick={clickHandler} className="image-header-wrapper">
      <div className="image-header-profile-pic">
        <img
          className="image-header-profile-pic-image"
          src={profilePicSrc}
        ></img>
      </div>
      <div className="image-header-details">
        <p onClick={clickHandler} className="image-header-user bold">
          {userName}
        </p>
        {location && <p className="image-header-user">{location}</p>}
      </div>
    </div>
  );
};

export default ImageHeader;
