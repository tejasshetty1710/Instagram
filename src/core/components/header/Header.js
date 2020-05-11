import React from "react";
import { useHistory } from "react-router-dom";
// styles
import "./header.scss";
import { ChevronLeft } from "react-feather";

const Header = ({ centerText, showBackButton }) => {
  const history = useHistory();
  function routeBack() {
    history.goBack();
  }
  return (
    <div className="header-wrapper">
      {showBackButton ? (
        <div onClick={routeBack} className="header-back-button">
          <ChevronLeft size={40} />
        </div>
      ) : (
        ""
      )}
      <div className="header-app-name bold">{centerText}</div>
    </div>
  );
};

export default Header;
