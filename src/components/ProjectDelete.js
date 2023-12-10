import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import { deleteProject } from "../reducers/projectReducer"
import "../styles/inputs.css"
import "../styles/deleteProject.css"

export const ProjectDelete = (props) => {
  const [text, setText] = useState("")
  // const [accountForPosting, setAccountForPosting] = useState(props.settings.strings["only_users_can_post"])
  const [validation, setValidation] = useState(false);
  const [project, setProject] = useState(props.projects.active)

  //in useEffect, check if we have some active project
  useEffect(() => {
    if (!project.title) {
      setProject(props.projects.active)
    }
  }, [props, project.title])


  const deleteProjectClick = (event) => {
    event.preventDefault()
    console.log(props)
    if (text === props.settings.strings["confirm_delete_text"]) {
      setValidation(false)
      let new_mods = []
      new_mods.push(props.user.username)

      props.deleteProject(project.id)
      console.log(project)
      props.notify(`Project "${project.title}" Delete.`, 5)
      // props.history.push("/")
    }
    else setValidation(true)
  }

  const textChangeHandler = (event) => {
    event.preventDefault()
    setText(event.target.value)
  }

  return (
    <div className="deleteProjectContainer centerAlignWithPadding">
      <h1 className="headerText">{props.settings.strings["confirm_delete_project"]}</h1>
      <form className="deleteProjectForm">
        <div className="section1">
          <div className="inputContainer">
            <input name="text" className="input" placeholder={props.settings.strings["confirm_delete_text"]} maxLength="32" onChange={textChangeHandler} value={text} />
            <div className="inputFocusLine" />
            {validation && <div className="error">"Wrong input, write again"</div>}
          </div>

        </div>

      </form>
      <div className="dualButtonContainer">
        <button className="positiveButton rippleButton fillButton" onClick={deleteProjectClick}>{props.settings.strings["confirm"]}</button>
        <button className="negativeButton rippleButton fillButton" onClick={() => props.history.push("/project-management")}>{props.settings.strings["cancel"]}</button>
      </div>
    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
    projects: state.projects,
    user: state.user
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  deleteProject
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDelete)



// DeleteProject: The DeleteProject component is defined, which renders a form that ask user to type 'comfirm delete', preventing authorized user from unwanted deletion.
// The state of the component is managed using the useState hook.
// The current delete is appeard to all project's admin and moderators. Need to check whether it is user owner or not (only owner can delete). 
