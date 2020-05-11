import React from "react";
// components
import ImageTile from "../imageTile/ImageTile";

const MediaList = function ({ mediaList, clickHandler }) {
  return (
    <div className="columns fade-in-up">
      <div className="column is-full">
        <div className="columns is-multiline is-mobile">
          {mediaList.map((mediaObj) => {
            return (
              <ImageTile
                key={mediaObj.node.id}
                imageObj={mediaObj.node}
                onClickHandler={clickHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MediaList;
