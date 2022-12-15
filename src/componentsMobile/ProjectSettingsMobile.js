import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import { changeProjectSettings } from "../reducers/projectReducer"
import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import "../styles/userSettings.css"

export const ProjectSettings = (props) => {
  const [project, setProject] = useState(props.projects.active)
  const [posts, setPosts] = useState(props.posts)

  //in useEffect, check if we have some active project
  useEffect(() => {
    if(!project.title){
      setProject(props.projects.active)
    }
    //check that we have all correct posts
    if(props.posts !== posts){
      setPosts(props.posts)
    }
  }, [props, project.title, posts])

  const modifyConfirmClick = async (event) => {
    event.preventDefault()
    //save old values
    let new_title = project.title
    let new_abs = project.description
    let new_desc = project.contentDescription
    //set default language to the language that the user has chosen on website
    let new_lang = props.settings.activeLanguage
    if(event.target.project_title.value === "" && event.target.project_abstract.value === "" && event.target.project_description.value === "" && event.target.project_language.value === "")
    {
      props.notify(props.settings.strings["no_new_changes"], false, 5)
    }
    else
    {
      //check that the chosen language is supported
      if (event.target.project_language.value !== "en" && event.target.project_language.value !== "fi" && event.target.project_language.value !== ""){
        props.notify(props.settings.strings["invalid_language"], false, 8)
        props.history.push("/project-management")
      }
      //replace old value with new value, if new value isn't empty
      if(event.target.project_title.value !== "") {
        new_title = event.target.project_title.value 
      }
      if(event.target.project_abstract.value !== "") {
        new_abs = event.target.project_abstract.value 
      }
      if(event.target.project_description.value !== "") {
        new_desc = event.target.project_description.value 
      }
      if(event.target.project_language.value !== "") {
        new_lang = event.target.project_language.value 
      }
      const modifiedProject = {
        "id": project.id,
        "lang": new_lang,
        "name": new_title,
        "abstract": new_abs,
        "description": new_desc
      }
      props.changeProjectSettings(modifiedProject)
      props.notify(props.settings.strings["project_modify_ok"], false, 8)
      props.history.push("/project-management")
    }
  }

  if(props.user && project.moderators.find(user => user === props.user.username)){
    return(
      <div className="userSettingsContainerMobile">
        <div className="titleContainerMobile">
          <h1 className="titleTextMobile">{props.settings.strings["configure_project"]}</h1>
        </div>
        <form className="userSettingsFormMobile" onSubmit={modifyConfirmClick}>
          <div>
            <div className="infoTextContainer">
              <p className="normalText">{props.settings.strings["enter_values_to_change"]}</p>
            </div>
            <div className="inputContainer">
              <input name="project_title" className="input" placeholder={project.title !== null ?  props.settings.strings["project_title"] + ": " + project.title : props.settings.strings["project_title"]} maxLength="150"/>
              <div className="inputFocusLine"/>
            </div>
            <div className="inputContainer">
              <input name="project_language" className="input" placeholder={props.settings.strings["choose_language"]} maxLength="2"/>
              <div className="inputFocusLine"/>
            </div>
            <div className="inputContainer">
              <input name="project_abstract" className="input" placeholder={project.description !== null ? props.settings.strings["abstract"] + ": " + project.description : props.settings.strings["abstract"]} maxLength="500"/>
              <div className="inputFocusLine"/>
            </div>
            <div className="inputContainer">
              <input name="project_description" className="input" placeholder={project.contentDescription !== null ? props.settings.strings["project_description"] + ": " + project.contentDescription : props.settings.strings["project_description"]} maxLength="1000"/>
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
      <div className="userInformationContainer centerAlignWithPaddingContainer">
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