import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"
import "../styles/userSettings.css"
import {ReactComponent as ClearIcon} from "../resources/clear.svg"
import {addNewModerator} from "../reducers/projectReducer"

export const ProjectModeratorsMobile = (props) => {
  const [project, setProject] = useState(props.projects.active)

  //in useEffect, check if we have some active project
  useEffect(() => {
    if(!project.title){
      setProject(props.projects.active)
    }
  }, [props, project.title])

  const modifyConfirmClick = async (event) => {
    //replace hashtags with %23, because url can't read hashtags in usernames correctly
    let new_mod = event.target.new_moderator.value.replace(/#/g, "%23")
    event.preventDefault()
    //if inputted username isn't empty, try to add it as a new moderator
    if(event.target.new_moderator.value !== "") {
      props.addNewModerator(project.id, new_mod)
      props.notify(props.settings.strings["project_modify_ok"], false, 8)
    }
    //if it is empty, notificate user that no new changes to make
    else {
      props.notify(props.settings.strings["no_new_changes"], false, 5)
    }
    props.history.push("/project-management")
  }

  if(props.user && project.moderators.find(user => user === props.user.username)){
    return(
      <div className="loginContainerMobile">
        <div className="titleContainerMobile">
          <h1 className="titleTextMobile">{props.settings.strings["add_new_moderator"]}</h1>
        </div>
        <form className="userSettingsFormMobile" onSubmit={modifyConfirmClick}>
          <div>
            <div className="infoTextContainer">
              <p className="normalText">{props.settings.strings["new_moderator_instructions"]}</p>
            </div>
            <div className="inputContainer">
              <input name="new_moderator" className="input" placeholder={props.settings.strings["new_mod_placeholder"]} maxLength="150"/>
              <div className="inputFocusLine"/>
            </div>
          </div>

          <div className="dualButtonContainer">
            <button type="submit" className="positiveButton rippleButton fillButton">{props.settings.strings["confirm"]}</button>
            <button type="button" className="negativeButton rippleButton fillButton" onClick={() => props.history.push("/project-management")}>{props.settings.strings["cancel"]}</button>
          </div>
        </form>
      </div>
    )
  }
  else {
    return (
      <div className="userSettingsContainerMobile">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings["not_moderator"]}</h1>
          <ClearIcon className="clearIcon" onClick={() => props.history.push("/")}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    settings: state.settings,
    user: state.user
  }
}

const mapDispatchToProps = {
  notify, 
  addNewModerator
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectModeratorsMobile)
