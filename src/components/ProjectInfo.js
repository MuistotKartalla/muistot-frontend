import React, {useEffect, useState} from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import "../styles/projectInfo.css"
import "../styles/containers.css"
import "../styles/postView.css"
import {ReactComponent as ClearIcon} from "../resources/clear.svg"
import {getImageURL} from "../services/images";

const ReactMarkdown = require('react-markdown')

export const ProjectInfo = (props) => {
  /*
  Some initial stuff for project info component
  */

  const [project, setProject] = useState(props.projects.active)

  useEffect(() => {
    if(!project.title){
      //console.log("no active project")
      setProject(props.projects.active)
    }

  }, [props, project.title])

  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    //console.log("closebutton clicked")
    props.history.goBack()
  }

  if(project.title){
    return(
      <div className="projectInfoContainer centerAlignWithPadding">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">{project.title}</h1>
          <ClearIcon className="clearIcon" onClick={closeClick}/>
        </div>
        <div className="projectInfoContentContainer">
        <div className="projectInfoDescriptionContainer normalText">
		<ReactMarkdown source={project.description} />
        </div>
        <div className="projectInfoImageContainer">
          <img className="projectInfoImage" src={getImageURL(project.image)} alt=""></img>
        </div>
        <div className="projectInfoContentDescriptionContainer normalText">
		<ReactMarkdown source={project.contentDescription} />
        </div>
        </div>
      </div>
    )
  }else{
    return(
      <div className="projectInfoContainer centerAlignWithPadding">
        <div className="titleContainer">
          <h1 className="titleText">{props.settings.strings["project_info"]}</h1>
        </div>
        <div className="closeButtonContainer">
          <button className="rippleButton fillButton bigButton" onClick={closeClick}>{props.settings.strings["close"]}</button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    projects: state.projects,
    settings: state.settings
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
