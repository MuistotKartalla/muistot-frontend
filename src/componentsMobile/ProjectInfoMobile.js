import React, {useEffect, useState} from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"

import "../styles/projectInfo.css"
import "../styles/containers.css"

import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"
import {getImageURL} from "../services/images";
const ReactMarkdown = require('react-markdown')

export const ProjectInfoMobile = (props) => {
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

  // const closeClick = (event) => {
  //   //go back to the previous page
  //   event.preventDefault()
  //   //console.log("closebutton clicked")
  //   props.history.goBack()
  // }

  if(project.title){
    return(
      <div className="projectInfoContainerMobile">
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{project.title}</h1>
          </div>
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
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{props.settings.strings["project_info"]}</h1>
          </div>
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
)(ProjectInfoMobile)
