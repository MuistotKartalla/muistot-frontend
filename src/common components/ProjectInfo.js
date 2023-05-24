import { useEffect, useState } from "react"
import { connect } from "react-redux"



import { useLocation } from 'react-router-dom'

import { notify } from "../reducers/notificationReducer"
import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import { getImageURL } from "../services/images"
import "../styles/containers.css"
import "../styles/postView.css"
import "../styles/projectInfo.css"

const ReactMarkdown = require('react-markdown')

export const ProjectInfo = (props) => {
  /*
  Some initial stuff for project info component
  */
  //declare some variables
  const [project, setProject] = useState({
    ...props.projects.active,
    additionalMetadata: {}
  })
  project.additionalMetadata = {};


  const [projectTitle, setProjectTitle] = useState(props.projects.active.title)

  useEffect(() => {
    if (!project.title) {
      setProject(props.projects.active)
    }
    //if active project is piiput or parantolat, set title according to stringStorage
    if (project.id === "piiput" || project.id === "parantolat") {
      setProjectTitle(props.settings.strings[project.id])
    }
    //for other projects use project title determined in the database
    else {
      setProjectTitle(props.projects.active.title)
    }
  }, [props, project.title, project.id])

  //david
  const location = useLocation();
  const isKiosk = location.pathname.startsWith('/kiosk');

  const closeClick = (event) => {
    event.preventDefault()
    isKiosk?
     props.history.push("/kiosk")
     :
    props.history.push("/")
  }
  //go to project management page
  const toManagement = (event) => {
    event.preventDefault()
    props.history.push("/project-management")
  }
  //full description
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [textToggleButton, setTextToggleButton] = useState(props.settings.strings["info_button_more"])
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
    showFullDescription ?
    setTextToggleButton(props.settings.strings["info_button_more"])
    :
    setTextToggleButton(props.settings.strings["info_button_less"])
  };

  //check if current user is project moderator
  if (project.title) {
    return (
      <div className="projectInfoContainer centerAlignWithPaddingContainer">
        <div className="postTitleContainer">
          <div className="projectInfoImageContainer">
            <h1 className="titleText centerAlignWithPadding">{projectTitle}</h1>
          </div>
          <ClearIcon className="clearIcon" onClick={closeClick} />
        </div>
        <div className="divider"></div>
        <div className="projectInfoContentContainer">
          <div className="projectInfoText">
            <ReactMarkdown source={project.description} />
          </div>
        </div>
        <div className="divider"></div> 

        {isKiosk? (
          <div className="projectInfoDescriptionContainer normalText">
            <div className="projectInfoDescriptionContainer normalText">
              <ReactMarkdown source={project.description} />
            </div>
            <div className="projectInfoContentDescriptionContainer normalText">
              <ReactMarkdown source={project.contentDescription} />
            </div>
          </div>
        ):(
          <>
          <div className="toggleDescriptionButtonContainer">
          <button onClick={toggleDescription} className="showMore rippleButton ">{textToggleButton}</button>
          </div>
          
        {showFullDescription && (
          <div className="projectInfoDescriptionContainer normalText">
            <div className="projectInfoDescriptionContainer normalText">
              <ReactMarkdown source={project.description} />
            </div>
            <div className="projectInfoContentDescriptionContainer normalText">
              <ReactMarkdown source={project.contentDescription} />
            </div>
          </div>
        )}
        </>
        )}
      </div>
    );
  } 

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    projects: state.projects,
    settings: state.settings,
    user: state.user,
  }
}
const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectInfo)



// ProjectInfo: This component is used in ContentArea.js. The useState hook is used to manage state in the component. The useEffect hook is used to update the component when the props change. 
//  The component also has a toggleDescription function that toggles the showFullDescription state when the "Large description" button is clicked. When the showFullDescription state is true, the full project description
//  is displayed. Otherwise, only the project image and title are displayed.