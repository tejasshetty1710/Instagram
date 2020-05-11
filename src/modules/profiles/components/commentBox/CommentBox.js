import React, { Component } from "react";

// styles
import "./comment-box.scss";

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    this.setState({ enteredValue: inputValue });
  }

  handleClick() {
    this.setState({ enteredValue: "" });
    this.props.clickHandler(this.state.enteredValue);
  }

  render() {
    const {
      props: {
        config: { autoComplete, placeHolder, spellCheck },
        commentsObj,
      },
      state: { enteredValue },
      handleChange,
    } = this;
    return (
      <div className="comments-input-wrapper">
        <div className="comments-input-image-section">
          <img
            className="comments-input-image-img"
            src={commentsObj.owner.profile_pic_url}
          ></img>
        </div>
        <div className="comments-input-section">
          <div className="comments-input-box-wrapper">
            <input
              className="comments-input"
              type="text"
              onChange={handleChange}
              value={enteredValue}
              autoComplete={autoComplete}
              placeholder={placeHolder || "Add a comment..."}
              spellCheck={spellCheck}
              autoFocus={true}
            />
            <div
              onClick={this.handleClick}
              className="comments-post-button bold"
            >
              Post
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentBox;
