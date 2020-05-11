import React from "react";
// components
import Comment from "../comment/Comment";
//styles
import "./comment-list.scss";

const CommentList = function ({ commentObj }) {
  return (
    <div className="comments-list-wrapper">
      {commentObj.edge_media_to_caption.edges.length ? (
        <div className="comments-caption">
          <Comment
            userName={commentObj.owner.username}
            profilePic={commentObj.owner.profile_pic_url}
            comment={commentObj.edge_media_to_caption.edges[0].node.text}
            timeStamp={commentObj.taken_at_timestamp}
          />
        </div>
      ) : (
        ""
      )}
      {commentObj.edge_media_to_parent_comment.edges.map((parentCommentObj) => {
        return (
          <Comment
            key={parentCommentObj.node.id}
            userName={parentCommentObj.node.owner.username}
            profilePic={parentCommentObj.node.owner.profile_pic_url}
            comment={parentCommentObj.node.text}
            timeStamp={parentCommentObj.node.created_at}
            threadComments={parentCommentObj.node.edge_threaded_comments}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
