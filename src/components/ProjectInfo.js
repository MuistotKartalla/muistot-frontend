import React, {useEffect, useState} from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import "../styles/projectInfo.css"
import "../styles/containers.css"
import "../styles/postView.css"
import {ReactComponent as ClearIcon} from "../resources/clear.svg"
import {ReactComponent as SettingIcon} from "../resources/setting_cog.svg"
import {getImageURL} from "../services/images";

const ReactMarkdown = require('react-markdown')

export const ProjectInfo = (props) => {
  /*
  Some initial stuff for project info component
  */
  //declare some variables
  const [project, setProject] = useState(props.projects.active)

  useEffect(() => {
    if(!project.title){
      setProject(props.projects.active)
    }
  }, [props, project.title])

  const closeClick = (event) => {
    event.preventDefault()
    props.history.push("/")
  }

  //go to project management page
  const toManagement = (event) => {
    event.preventDefault()
    props.history.push("/project-management")
  }
  
  //check if current user is project moderator
  if(props.user && project.moderators.find(user => user === props.user.username)){
    return(
      <div className="projectInfoContainer centerAlignWithPadding">
        <div className="postTitleContainer">
          <SettingIcon className="settingIcon" onClick={toManagement}></SettingIcon>
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings[project.id]}</h1>
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
  }
  else if(project.title){
    return(
      <div className="projectInfoContainer centerAlignWithPadding">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings[project.id]}</h1>
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
