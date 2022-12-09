import { connect } from "react-redux";
import { ReactComponent as ReturnIcon } from "../resources/arrow_back.svg";
import "../styles/about.css";
const ReactMarkdown = require("react-markdown");

export const AboutMobile = (props) => {
  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault();
    //console.log("closebutton clicked")
    props.history.goBack();
  };

  //html stuff here
  return (
    <div className="aboutContainerMobile">
      <div className="titleContainerMobile">
        <button className="mobileButtonContainer">
          <ReturnIcon className="mobileIcon" onClick={closeClick} />
        </button>
        <div className="titleHeaderMobile">
          <h1 className="titleTextMobile">{props.settings.strings["about"]}</h1>
        </div>
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
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
  };
};

export default connect(mapStateToProps, null)(AboutMobile);
