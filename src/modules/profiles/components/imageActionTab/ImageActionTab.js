import React from "react";
import { Heart, Menu } from "react-feather";
// styels
import "./image-action-tab.scss";
// utils
import { timeFromNowFoImages } from "../../../../core/utils";

const generateLikeString = function (likeObj) {
  let likeString = "";
  if (likeObj.count) {
    likeString = "Liked by ";
    likeString = likeObj.edges.reduce((likeString, likeMetaObj, index) => {
      if (likeObj.edges.length === 1 && likeObj.count === 1) {
        likeString += `${likeMetaObj.node.username}`;
        return likeString;
      } else {
        if (
          likeObj.edges.length < likeObj.count &&
          index === likeObj.edges.length - 1
        ) {
          likeString += `${likeMetaObj.node.username} and ${
            likeObj.count - 1
          } others`;
        } else {
          likeString += `${likeMetaObj.node.username}, `;
        }
        return likeString;
      }
    }, likeString);
  }

  return likeString;
};

const ImageActionTab = function ({
  likeHandler,
  commentHandler,
  imageObj,
  userName,
  likedByCurrentUser,
}) {
  return (
    <>
      <div className="action-tab-top-section">
        <div className="action-tab-icon-items">
          <Heart
            onClick={likeHandler}
            className={`action-tab-icon-items-content heart ${
              likedByCurrentUser ? "liked" : ""
            }`}
          />
        </div>
        <div className="action-tab-icon-items">
          <Menu
            onClick={commentHandler}
            className="action-tab-icon-items-content"
          />
        </div>
      </div>
      <div className="action-tab-bottom-section">
        <div className="action-tab-like-string bold">
          {generateLikeString(imageObj.edge_media_preview_like)}
        </div>
        <div className="action-tab-caption">
          {imageObj.edge_media_to_caption.edges.length > 0 ? (
            <>
              <span className="action-tab-caption-username bold">
                {userName}
              </span>
              <span className="action-tab-caption-content">
                {imageObj.edge_media_to_caption.edges[0].node.text}
              </span>
            </>
          ) : (
            ""
          )}
        </div>
        {imageObj.edge_media_preview_comment.count >
        imageObj.edge_media_preview_comment.edges.length ? (
          <div
            onClick={commentHandler}
            className="image-action-tab-view-all-comments"
          >{`View all ${imageObj.edge_media_preview_comment.count} comments`}</div>
        ) : (
          ""
        )}
        <div className="image-action-tab-preview-comments-wrapper">
          {imageObj.edge_media_preview_comment.edges.map(
            (previewCommentObj) => {
              return (
                <div key={previewCommentObj.node.id}>
                  <span className="action-tab-caption-username bold">
                    {previewCommentObj.node.owner.username}
                  </span>
                  <span className="action-tab-caption-content">
                    {previewCommentObj.node.text}
                  </span>
                </div>
              );
            }
          )}
        </div>
        <div className="taken-at-timestamp">
          {timeFromNowFoImages(
            imageObj.taken_at_timestamp * 1000
          ).toUpperCase()}
        </div>
      </div>
    </>
  );
};

export default ImageActionTab;
