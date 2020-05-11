import React from "react";
import { Heart, Menu } from "react-feather";
// styles
import "./image-tile.scss";

const getImageSrc = function (thumbnailSet) {
  const defaultSize = 320;
  const largeSize = 640;
  const windowBreakpoint = 2400;
  const screenWidth = window.innerWidth;
  const thumbnailSize =
    screenWidth >= windowBreakpoint ? largeSize : defaultSize;
  const thumbnailObj = thumbnailSet.filter((set) => {
    return set.config_width === thumbnailSize;
  })[0];
  return thumbnailObj.src;
};

const ImageTile = function ({ imageObj, onClickHandler }) {
  return (
    <div
      onClick={onClickHandler}
      data-id={imageObj.id}
      className="column is-4 is-4-mobile image-tile-wrapper"
    >
      <div className="image-tile-img-wrapper">
        <img
          className="image-tile"
          src={getImageSrc(imageObj.thumbnail_resources)}
        />
      </div>
      <div data-id={imageObj.id} className="overlay-wrapper center">
        <div className="center overlay-meta">
          <div className="overlay-items">
            <Heart className="overlay-items-content bold" />
            <span className="overlay-items-content bold">
              {imageObj.edge_media_preview_like.count}
            </span>
          </div>
          <div className="overlay-items">
            <Menu className="overlay-items-content bold" />
            <span className="overlay-items-content bold">
              {imageObj.edge_media_to_comment.count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTile;
