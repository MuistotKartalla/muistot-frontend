import React, {useState} from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import {createProject} from "../reducers/projectReducer"

import "../styles/inputs.css"
import "../styles/newProject.css"
import ImageUpload from "./ImageUpload"
import DropDownSelect from "./DropDownSelect"

export const NewProject = (props) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [contentDescription, setContentDescription] = useState("")
  const [image, setImage] = useState(null)
  //const [moderators, setModerators] = useState([]) // implementation???
  const [accountForPosting,setAccountForPosting] = useState(props.settings.strings["only_users_can_post"])

  /*

  */

  const createNewProjectClick = (event) => {
    event.preventDefault()
    const object = {
      "title": title,
      "description": description,
      "contentDescription": contentDescription,
      "visitorPosting": accountForPosting === props.settings.strings["only_users_can_post"],
      "moderators": [],
      "image": image
    }
    props.createProject(object)
    props.notify(`Project "${object.title}" Created.`, false, 5)
    props.history.push("/")

  }

  const titleChangeHandler = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const descriptionChangeHandler = (event) => {
    event.preventDefault()
    setDescription(event.target.value)
  }

  const contentDescChangeHandler = (event) => {
    event.preventDefault()
    setContentDescription(event.target.value)
  }
  const changeContentPolicy = (value) => {
    setAccountForPosting(value)
  }

  const imageOnChangeHandler = (image) => {
    //console.log(image)
    setImage(image)
  }


  return(
    <div className="newProjectContainer centerAlignWithPadding">
      <h1 className="headerText">{props.settings.strings["new_project"]}</h1>
      <form className="newProjectForm">
        <div className="section1">
          <div className="inputContainer">
            <input name="title" className="input" placeholder={props.settings.strings["title"]} maxLength="32" onChange={titleChangeHandler} value={title}/>
            <div className="inputFocusLine"/>
          </div>
          <div className="inputContainer">
            <textarea name="description" id="descField" className="input" rows="4" placeholder={props.settings.strings["description"]} maxLength="256" autoComplete="off" onChange={descriptionChangeHandler} value={description}/>
            <div className="inputFocusLine"/>
          </div>
          <ImageUpload change={imageOnChangeHandler}/>
        </div>
        <div className="section2">
          <DropDownSelect items={[props.settings.strings["only_users_can_post"],props.settings.strings["visitors_can_post"]]} active={accountForPosting} change={changeContentPolicy}/>
          <div className="inputContainer">
            <textarea name="contentDesc" id="contentDescField" className="input" rows="4" placeholder={props.settings.strings["description"]} maxLength="256" autoComplete="off" onChange={contentDescChangeHandler} value={contentDescription}/>
            <div className="inputFocusLine"/>
          </div>

        </div>

      </form>
      <div className="dualButtonContainer">
        <button className="positiveButton rippleButton fillButton" onClick={createNewProjectClick}>{props.settings.strings["confirm"]}</button>
        <button className="negativeButton rippleButton fillButton" onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
      </div>
    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  createProject
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject)