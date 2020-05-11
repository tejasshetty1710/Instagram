import React from "react";
// utils
import { timeFromNow } from "../../../../core/utils";
// styles
import "./comment.scss";

const Comment = function ({
  timeStamp,
  userName,
  profilePic,
  comment,
  isThreaded,
  threadComments,
}) {
  return (
    <>
      <div className={`comments-wrapper ${isThreaded ? "child" : ""}`}>
        <div className="comment-profile-section">
          <img className="comment-profile-pic" src={profilePic}></img>
        </div>
        <div className="comment-details-section">
          <div>
            <span className="comment-username bold">{userName}</span>
            <span className="comment-content">{comment}</span>
          </div>
          <p className="comment-timestamp">{timeFromNow(timeStamp * 1000)}</p>
        </div>
      </div>
      {threadComments &&
        threadComments.edges.map((threadCommentObj) => {
          return (
            <Comment
              key={threadCommentObj.node.id}
              userName={threadCommentObj.node.owner.username}
              timeStamp={threadCommentObj.node.created_at}
              comment={threadCommentObj.node.text}
              profilePic={threadCommentObj.node.owner.profile_pic_url}
              isThreaded={true}
            />
          );
        })}
    </>
  );
};

export default Comment;
