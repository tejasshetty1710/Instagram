import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// services
import profileApis from "../services";
// utitlties
import { useEffectOnce } from "react-use";
import { useParams } from "react-router-dom";
// components
import BaseContainer from "../../../core/containers/BaseContainer";
import ImageHeader from "../components/imageHeader/ImageHeader";
import ImageActionTab from "../components/imageActionTab/ImageActionTab";
// contexts
import ProfileContext from "../ProfileContext";
// constants
import { APP_ROUTES } from "../../../core/constants";

// styles
import "./image-page.scss";

const getImageSrc = function (displayUrlSet) {
  const defaultSize = 1080;
  const largeSize = 1080;
  const windowBreakpoint = 2400;
  const screenWidth = window.innerWidth;
  const thumbnailSize =
    screenWidth >= windowBreakpoint ? largeSize : defaultSize;
  const thumbnailObj = displayUrlSet.filter((set) => {
    return set.config_width === thumbnailSize;
  })[0];
  return thumbnailObj.src;
};

function ImagePage() {
  const history = useHistory();
  const [profileContextData, setProfileContext] = useContext(ProfileContext);
  const imageId = useParams().imageId;

  async function getImageData(id) {
    try {
      const response = await profileApis.getImageData(id);
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
        profileContextData.viewedImages &&
        profileContextData.viewedImages[imageId]
      )
    ) {
      const response = await getImageData(imageId);
      setProfileContext((profileContextData) => {
        profileContextData.viewedImages = {
          ...profileContextData.viewedImages,
          [imageId]: response,
        };
        return { ...profileContextData };
      });
    }
  }

  function clickHandler() {
    history.push(`${APP_ROUTES.PROFILE}`);
  }
  function commentHandler() {
    history.push(`${APP_ROUTES.COMMENTS}${imageId}`);
  }

  function likeHandler() {
    setProfileContext((profileContextData) => {
      const toggledLike = !profileContextData.viewedImages[imageId]
        .viewer_has_liked;
      profileContextData.viewedImages = {
        ...profileContextData.viewedImages,
        [imageId]: {
          ...profileContextData.viewedImages[imageId],
          viewer_has_liked: toggledLike,
          edge_media_preview_like: {
            ...profileContextData.viewedImages[imageId].edge_media_preview_like,
            count: toggledLike
              ? profileContextData.viewedImages[imageId].edge_media_preview_like
                  .count + 1
              : profileContextData.viewedImages[imageId].edge_media_preview_like
                  .count - 1,
          },
        },
      };
      profileContextData.profileData.edge_owner_to_timeline_media.edges = profileContextData.profileData.edge_owner_to_timeline_media.edges.map(
        (previewImgObj) => {
          if (imageId === previewImgObj.node.id) {
            previewImgObj.node.edge_media_preview_like =
              profileContextData.viewedImages[imageId].edge_media_preview_like;
          }
          return previewImgObj;
        }
      );
      return { ...profileContextData };
    });
  }

  useEffectOnce(() => {
    init();
  });

  return (
    <BaseContainer pageName="Photo">
      {profileContextData.profileData &&
      profileContextData.viewedImages &&
      Object.keys(profileContextData.viewedImages).length &&
      profileContextData.viewedImages[imageId] ? (
        <>
          <ImageHeader
            location={profileContextData.profileData.location}
            profilePicSrc={profileContextData.profileData.profile_pic_url_hd}
            userName={profileContextData.profileData.username}
            clickHandler={clickHandler}
          />
          <img
            className="image-page-display-image"
            src={getImageSrc(
              profileContextData.viewedImages[imageId].display_resources
            )}
          ></img>
          <ImageActionTab
            userName={profileContextData.profileData.username}
            imageObj={profileContextData.viewedImages[imageId]}
            likeHandler={likeHandler}
            commentHandler={commentHandler}
            likedByCurrentUser={
              profileContextData.viewedImages[imageId].viewer_has_liked
            }
          />
        </>
      ) : (
        <div className="center-window">loading...</div>
      )}
    </BaseContainer>
  );
}

export default ImagePage;
