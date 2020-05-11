import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// services
import profileApis from "../services";
// utitlties
import { useEffectOnce } from "react-use";
import { useParams } from "react-router-dom";
import { generateId } from "../../../core/utils";
// components
import BaseContainer from "../../../core/containers/BaseContainer";
import CommentBox from "../components/commentBox/CommentBox";
// contexts
import ProfileContext from "../ProfileContext";
// constants
import { APP_ROUTES } from "../../../core/constants";

// styles
import "./comments-page.scss";
import CommentList from "../components/commentList/CommentList";

function generateCommentObj(ownerObj, text) {
  const newComment = {
    node: {
      owner: ownerObj,
      text,
      created_at: Date.now() / 1000,
      id: generateId(),
    },
  };
  return newComment;
}

function CommentPage() {
  const history = useHistory();
  const [profileContextData, setProfileContext] = useContext(ProfileContext);
  const imageId = useParams().imageId;

  async function getCommentsData(id) {
    try {
      const response = await profileApis.getCommentsData(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async function init() {
    if (
      !(
        profileContextData.profileData &&
        Object.keys(profileContextData.profileData).length
      )
    ) {
      history.push(`${APP_ROUTES.PROFILE}`);
      return;
    }
    if (
      !(
        profileContextData.viewedComments &&
        profileContextData.viewedComments[imageId]
      )
    ) {
      const response = await getCommentsData(imageId);
      setProfileContext((profileContextData) => {
        profileContextData.viewedComments = {
          ...profileContextData.viewedComments,
          [imageId]: response,
        };
        return { ...profileContextData };
      });
    }
  }

  function postHandler(inputValue) {
    const ownerObj = profileContextData.viewedComments[imageId].owner;
    const newCommentObj = generateCommentObj(ownerObj, inputValue);
    setProfileContext((profileContextData) => {
      profileContextData.viewedComments = {
        ...profileContextData.viewedComments,
        [imageId]: {
          ...profileContextData.viewedComments[imageId],
          edge_media_to_parent_comment: {
            count:
              profileContextData.viewedComments[imageId]
                .edge_media_to_parent_comment.count + 1,
            edges: [
              ...profileContextData.viewedComments[imageId]
                .edge_media_to_parent_comment.edges,
              newCommentObj,
            ],
          },
        },
      };
      profileContextData.viewedImages = {
        ...profileContextData.viewedImages,
        [imageId]: {
          ...profileContextData.viewedImages[imageId],
          edge_media_preview_comment: {
            ...profileContextData.viewedImages[imageId]
              .edge_media_preview_comment,
            count:
              profileContextData.viewedImages[imageId]
                .edge_media_preview_comment.count + 1,
          },
        },
      };
      profileContextData.profileData.edge_owner_to_timeline_media.edges = profileContextData.profileData.edge_owner_to_timeline_media.edges.map(
        (previewImgObj) => {
          if (imageId === previewImgObj.node.id) {
            previewImgObj.node.edge_media_to_comment =
              profileContextData.viewedComments[
                imageId
              ].edge_media_to_parent_comment;
          }
          return previewImgObj;
        }
      );

      return { ...profileContextData };
    });

    setProfileContext((profileContextData) => {
      return { ...profileContextData };
    });
  }

  useEffectOnce(() => {
    init();
  });

  return (
    <BaseContainer pageName="Comments">
      {profileContextData.viewedComments[imageId] &&
      Object.keys(profileContextData.viewedComments[imageId]).length &&
      profileContextData.profileData ? (
        <>
          <CommentBox
            config={{
              autoComplete: "off",
              placeHolder: "Add a comment..",
              spellCheck: false,
              autoFocus: true,
            }}
            commentsObj={profileContextData.viewedComments[imageId]}
            clickHandler={postHandler}
          />
          <div className="">
            <CommentList
              commentObj={profileContextData.viewedComments[imageId]}
            />
          </div>
        </>
      ) : (
        <div className="center-window">loading...</div>
      )}
    </BaseContainer>
  );
}

export default CommentPage;
