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
  const [projectTitle, setProjectTitle] = useState(props.projects.active.title)

  useEffect(() => {
    if(!project.title){
      //console.log("no active project")
      setProject(props.projects.active)
    }
    //if active project is piiput or parantolat, set title according to stringStorage
    if (project.id === "piiput" || project.id === "parantolat"){
      setProjectTitle(props.settings.strings[project.id])
    }
    //for other projects use project title determined in the database
    else {
      setProjectTitle(props.projects.active.title)
    }
  }, [props, project.title, project.id])

  // const closeClick = (event) => {
  //   //go back to the previous page
  //   event.preventDefault()
  //   //console.log("closebutton clicked")
  //   props.history.goBack()
  // }

  //check if current user is project moderator
  if(props.user && project.moderators.find(user => user === props.user.username)){
    return(
      <div className="projectInfoContainerMobile">
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{projectTitle}</h1>
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
          <div className="projectInfoDownloadButton">
            <button className="rippleButton" onClick={(event) => {event.preventDefault(); props.history.push("/project-management/")}}>
              {props.settings.strings["project_management"]}
            </button>
          </div>
        </div>
      </div> 
    )
  }
  else if(project.title){
    return(
      <div className="projectInfoContainerMobile">
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{projectTitle}</h1>
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
)(ProjectInfoMobile)
