import React, { useState } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import ProfileContext from "./modules/profiles/ProfileContext";

// Pages
import Profile from "./modules/profiles/pages/Profile";
import ImagePage from "./modules/profiles/pages/ImagePage";
import CommentPage from "./modules/profiles/pages/CommentPage";
// styles
import "./app.scss";
// constants
import { APP_ROUTES } from "./core/constants";

export const pages = [
  {
    pageLink: APP_ROUTES.PROFILE,
    view: Profile,
    displayName: "Profile",
    navbar: {
      icon: "Users",
    },
  },
  {
    pageLink: `${APP_ROUTES.IMAGE}:imageId`,
    view: ImagePage,
    displayName: "Image",
    navbar: {
      icon: "Image",
    },
  },
  {
    pageLink: `${APP_ROUTES.COMMENTS}:imageId`,
    view: CommentPage,
    displayName: "Comments",
    navbar: {
      icon: "comments",
    },
  },
];

const initialProfileContext = {
  profileData: null,
  viewedImages: {},
  viewedComments: {},
};

function App() {
  const profileHook = useState(initialProfileContext);
  return (
    <div id="app-wrapper">
      <ProfileContext.Provider value={profileHook}>
        <Router>
          <Route
            render={({ location }) => (
              <div className="router-wrapper columns is-mobile is-centered is-multiline">
                <Switch location={location}>
                  {pages.map((page, index) => {
                    return (
                      <Route
                        exact
                        path={page.pageLink}
                        render={() => <page.view key={index} />}
                        key={index}
                      />
                    );
                  })}
                  <Redirect to="/" />
                </Switch>
              </div>
            )}
          />
        </Router>
      </ProfileContext.Provider>
    </div>
  );
}

render(<App />, document.getElementById("root"));
