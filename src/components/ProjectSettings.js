import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import { changeProjectSettings } from "../reducers/projectReducer"
import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import "../styles/userSettings.css"

export const ProjectSettings = (props) => {
  const project = props.projects.active

  const modifyConfirmClick = async (event) => {
    event.preventDefault()
    //save old values
    let new_title = project.title
    let new_abs = project.description
    let new_desc = project.contentDescription
    if (event.target.project_title.value === "" 
      && event.target.project_abstract.value === "" 
      && event.target.project_description.value === ""
    ) {
      props.notify(props.settings.strings["no_new_changes"], false, 5)
    } else {
      //replace old value with new value, if new value isn't empty
      if (event.target.project_title.value !== "") {
        new_title = event.target.project_title.value 
      }
      if (event.target.project_abstract.value !== "") {
        new_abs = event.target.project_abstract.value 
      }
      if (event.target.project_description.value !== "") {
        new_desc = event.target.project_description.value 
      }
      const modifiedProject = {
        "id": project.id,
        "name": new_title,
        "abstract": new_abs,
        "description": new_desc
      }
      props.changeProjectSettings(modifiedProject)
      props.notify(props.settings.strings["project_modify_ok"], false, 8)
      props.history.push("/project-management")
    }
  }

  if (props.user && project.moderators.find(user => user === props.user.username)) {
    return (
      <div className="userSettingsContainer centerAlignWithPaddingContainer">
        <div className="titleContainer">
          <h1 className="titleText">{props.settings.strings["configure_project"]}</h1>
        </div>
        <form className="userSettingsForm" onSubmit={modifyConfirmClick}>
          <div>
            <div className="infoTextContainer">
              <p className="normalText">{props.settings.strings["enter_values_to_change"]}</p>
            </div>
            <div className="inputContainer">
              <input 
                name="project_title"
                className="input"
                placeholder={
                  project.title !== null
                  ? props.settings.strings["project_title"] + ": " + project.title
                  : props.settings.strings["project_title"]
                }
                maxLength="150"
              />
              <div className="inputFocusLine"/>
            </div>
            <div className="inputContainer">
              <input 
                name="project_abstract"
                className="input"
                placeholder={
                  project.description !== null
                  ? props.settings.strings["abstract"] + ": " + project.description
                  : props.settings.strings["abstract"]
                }
                maxLength="500"
              />
              <div className="inputFocusLine"/>
            </div>
            <div className="inputContainer">
              <input
                name="project_description"
                className="input"
                placeholder={
                  project.contentDescription !== null
                  ? props.settings.strings["project_description"] + ": " + project.contentDescription
                  : props.settings.strings["project_description"]
                }
                maxLength="1000"
              />
              <div className="inputFocusLine"/>
            </div>
          </div>
          <div className="dualButtonContainer">
            <button type="submit" className="positiveButton rippleButton fillButton">
              {props.settings.strings["confirm"]}
            </button>
            <button 
              type="button"
              className="negativeButton rippleButton fillButton"
              onClick={() => props.history.push("/project-management")}
            >
              {props.settings.strings["cancel"]}
            </button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className="userInformationContainer centerAlignWithPaddingContainer">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">
            {props.settings.strings["not_moderator"]}
          </h1>
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
    user: state.user,
    posts: state.posts
  }
}

const mapDispatchToProps = {
  notify,
  changeProjectSettings
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSettings)

// ProjectSettings: This component is used in ContentArea.js. The modifyConfirmClick function is defined to modify the project settings when the user submits the form. The function first checks whether any changes
//  have been made or not. If no changes have been made, the user is notified with a message. Otherwise, the function creates a modified project object and calls the changeProjectSettings function to update the project settings.
