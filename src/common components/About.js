import { connect } from "react-redux";
import { ReactComponent as ReturnIcon } from "../resources/arrow_back.svg";
import { ReactComponent as ClearIcon } from "../resources/clear.svg";
import "../styles/about.css";
import "../styles/texts.css";
const ReactMarkdown = require("react-markdown");

const About = (props) => {
  const isMobile = window.innerWidth < 768; // check if screen width is less than 768px

  const closeClick = (event) => {
    event.preventDefault();
    props.history.goBack();
  };

  return (
    <div className={isMobile ? "aboutContainerMobile" : "aboutContainer centerAlignWithPadding"}>
      <div className="postTitleContainer">
        <h1 className="titleText centerAlignWithPadding">
          {props.settings.strings["about"]}
        </h1>
        {isMobile ? (
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={closeClick} />
          </button>
        ) : (
          <ClearIcon className="clearIcon rightAlignWithPadding" onClick={closeClick} />
        )}
      </div>
      <div className="aboutContentContainer normalText">
        <ReactMarkdown source={props.settings.strings["about_text"]} />
        <h2 className="titleText">{props.settings.strings["tos_title"]}</h2>
        <ReactMarkdown source={props.settings.strings["tos_text"]} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  };
};

export default connect(mapStateToProps, null)(About);



// This component is created to render the website's purpose and show the terms of service.