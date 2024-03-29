import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import { addNewModerator } from "../reducers/projectReducer"
import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import "../styles/userSettings.css"

export const ProjectModerators = (props) => {
  const [project, setProject] = useState(props.projects.active)
  //in useEffect, check if we have some active project
  useEffect(() => {
    if (!project.title) {
      setProject(props.projects.active)
    }
  }, [props, project.title])

  const modifyConfirmClick = async (event) => {
    //replace hashtags with %23, because url can't read hashtags in usernames correctly
    let new_mod = event.target.new_moderator.value.replace(/#/g, "%23")
    event.preventDefault()
    //if inputted username isn't empty, try to add it as a new moderator
    if (event.target.new_moderator.value !== "") {
      props.addNewModerator(project.id, new_mod)
      props.notify(props.settings.strings["project_modify_ok"], false, 8)
    }
    //if it is empty, notificate user that no new changes to make
    else {
      props.notify(props.settings.strings["no_new_changes"], false, 5)
      // console.log("No new changes to make");
      // console.log(project.moderators);
    }
    props.history.push("/project-management")
  }

  if (props.user && project.moderators.find(user => user === props.user.username)) {
    return (
      <div className="userSettingsContainer centerAlignWithPaddingContainer">
        <div className="titleContainer">
          <h1 className="titleText">{props.settings.strings["add_new_moderator"]}</h1>
        </div>
        <form className="userSettingsForm" onSubmit={modifyConfirmClick}>
          <div>
            <div className="infoTextContainer">
              <p className="normalText">{props.settings.strings["new_moderator_instructions"]}</p>
            </div>
            <div className="inputContainer">
              <input name="new_moderator" className="input" placeholder={props.settings.strings["new_mod_placeholder"]} maxLength="150" />
              <div className="inputFocusLine" />
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
      <div className="userInformationContainer centerAlignWithPaddingContainer">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings["not_moderator"]}</h1>
          <ClearIcon className="clearIcon" onClick={() => props.history.push("/")} />
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
)(ProjectModerators)



// ProjectModerators: This component is used in ContentArea.js.The component conditionally renders different UI depending on whether the logged-in user is a moderator for the active project or not. If the user is
//  a moderator, it displays a form with an input for the new moderator's username and two buttons: one for submitting the form, and another for cancelling the operation. If the user is not a moderator, it displays
//  a message informing the user that they are not authorized to perform this action, along with a button to return to the homepage.

