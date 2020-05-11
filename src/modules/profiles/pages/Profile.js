import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// services
import profileApis from "../services";
// utitlties
import { useEffectOnce } from "react-use";
// components
import BaseContainer from "../../../core/containers/BaseContainer";
import ProfileDetails from "../components/profileDetails/ProfileDetails";
import MediaList from "../components/mediaList/MediaList";
// contexts
import ProfileContext from "../ProfileContext";
// constants
import { APP_ROUTES } from "../../../core/constants";

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [profileContext, setProfileContext] = useContext(ProfileContext);
  const history = useHistory();
  async function getProfile() {
    try {
      const response = await profileApis.getProfileData();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async function init() {
    if (
      profileContext.profileData &&
      Object.keys(profileContext.profileData).length
    ) {
      setProfile(() => {
        return { ...profileContext.profileData };
      });
    } else {
      const response = await getProfile();
      setProfile(() => response.graphql.user);
      setProfileContext((profileContext) => {
        profileContext.profileData = response.graphql.user;
        return profileContext;
      });
    }
  }

  function mediaClickHandler(e) {
    const id = e.currentTarget.dataset.id;
    history.push(`${APP_ROUTES.IMAGE}${id}`);
  }

  useEffectOnce(() => {
    init();
  });

  return (
    <BaseContainer
      pageName={Object.keys(profile).length ? profile.username : "profile"}
      showBackButton={false}
    >
      {Object.keys(profile).length ? (
        <>
          <ProfileDetails
            className="fade-in-up"
            detailsObj={profile}
          ></ProfileDetails>
          <MediaList
            mediaList={profile.edge_owner_to_timeline_media.edges}
            clickHandler={mediaClickHandler}
          />
        </>
      ) : (
        <div className="center-window">loading...</div>
      )}
    </BaseContainer>
  );
}

export default ProfilePage;
