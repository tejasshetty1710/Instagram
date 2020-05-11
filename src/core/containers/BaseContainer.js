import React from "react";
import Header from "../components/header/Header";

const BaseContainer = ({ children, pageName, showBackButton = true }) => {
  return (
    <div className="column is-8-desktop is-full-mobile fade-in-up">
      <div className="columns is-centered fade-in-up">
        <div className="column is-8 is-full-mobile">
          <Header centerText={pageName} showBackButton={showBackButton} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseContainer;
