import React from "react";
// utils
import { readableCount } from "../../../../core/utils";
// styles
import "./profile-details.scss";

const DETAIL_SECTION_DISPLAY_STRING = {
  edge_owner_to_timeline_media: "posts",
  edge_followed_by: "followers",
  edge_follow: "following",
};

function ProfileDetails({ detailsObj, isCurrentUser }) {
  return (
    <div className="profile-details-wrapper">
      <div className="columns is-multiline fade-in-up">
        <div className="column is-full">
          <div className="profile-details-pic">
            <img
              className="profile-details-pic-image"
              src={detailsObj.profile_pic_url_hd}
            ></img>
          </div>
          <div className="profile-details-follow-setcion">
            <div className="profile-details-follow-setcion-items-wrapper">
              {Object.keys(DETAIL_SECTION_DISPLAY_STRING).map((key) => {
                return (
                  <div
                    key={key}
                    className="profile-details-follow-setcion-items"
                  >
                    <div className="profile-details-follow-setcion-items-count bold">
                      {readableCount(detailsObj[key].count)}
                    </div>
                    <div className="profile-details-follow-setcion-items-label">
                      {DETAIL_SECTION_DISPLAY_STRING[key]}
                    </div>
                  </div>
                );
              })}
              {isCurrentUser ? <div></div> : ""}
            </div>
          </div>
        </div>
        <div className="column is-full">
          <div className="">
            <div className="profile-bio-section-name">
              {detailsObj.full_name}
            </div>
            <div className="profile-bio-section-bio">
              {detailsObj.biography}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
