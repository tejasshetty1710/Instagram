// import apiBase from "../../core/services/base";
// const RESOURCE = "profile";
import {
  profileResponseData,
  individualImageData,
  individualCommentsData,
} from "./data";

const profileApis = {
  getProfileData(id) {
    // return apiBase.get(`${RESOURCE}/${id}`);
    return new Promise(function (resolve) {
      setTimeout(() => resolve(profileResponseData), 1000);
    });
  },
  getImageData(id) {
    // return apiBase.get(`${RESOURCE}/${id}`);
    return new Promise(function (resolve) {
      setTimeout(
        () => resolve(individualImageData[id].data.shortcode_media),
        1000
      );
    });
  },
  getCommentsData(id) {
    // return apiBase.get(`${RESOURCE}/${id}`);
    return new Promise(function (resolve) {
      setTimeout(
        () => resolve(individualCommentsData[id].graphql.shortcode_media),
        1000
      );
    });
  },
};

export default profileApis;
