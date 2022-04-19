// By: Niklas Impiö
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

import "../styles/newPost.css"
import "../styles/buttons.css"
import {createSite} from "../reducers/postReducer"
import {notify} from "../reducers/notificationReducer"
import {setTempSite} from "../reducers/tempSiteReducer"

import SiteImageUpload from "./SiteImageUpload"

//combined new post where everything is in a single window. Toggle buttons for which location selection method chosen.
// aka if "live location" button is highlighted the it uses your current location. if map button highlighted then it uses selected location.

export const NewPostCombined = (props) => {
  const [titleField, setTitleField] = useState("")
  const [location, setLocation] = useState(false)
  const [image, setImage] = useState(null)
  //console.log("NewPostCombined constructor launched")

  useEffect(() => {
    //console.log("NewPostCombined useEffect")      
    setLocation(props.tempSite.location)
    setTitleField(props.tempSite.title)
    if(props.tempSite.image){
      setImage(props.tempSite.image.data
        )}else{setImage(props.tempSite.image)}
        
  }, [props])


  const cancelClick = (event) => {
    event.preventDefault()
    props.history.push("/")
    setTitleField("")
    setLocation(false)
    setImage(null)
    props.setTempSite({"title": "", "location":false, "image": null})
  
  }
  const imageOnChangeHandler = (image) => {
    setImage(image)
  }
  const confirmPost = (event) => {
    event.preventDefault()
    //console.log("creating new post")

    if(titleField.length < 5){
      props.notify(props.settings.strings["title_length"], true, 5)
      return
    }
    if(location === false){
      props.notify(props.settings.strings["location_valid"], true, 5)

      return
    }
  

    props.createSite({projectId:props.projects.active.id, title:titleField, location:location, image: image})

    props.notify(`"${titleField}" ${props.settings.strings["created"]}`, false, 5)
    setTitleField("")
    setLocation(false)
    setImage(null)
    props.setTempSite({"title": "", "location":false, "image": null})
    console.log({projectId:props.projects.active.id, title:titleField, location:location, image: image})
    props.history.push("/")


  }


  const TitleFieldChangeHandler = (event) => {
    event.preventDefault()
    setTitleField(event.target.value)
    const temp = {...props.tempSite}
    temp.title = event.target.value
    props.setTempSite(temp)
  }

  return(
    <div className="newPostContainer centerAlignWithPaddingLean">
      <h1 className="headerText">{props.settings.strings["new_post"]}</h1>
      {!location?
	<div>
        <div className="newPostTabSwitchContainer">
	  <p className="normalText textCenter">{props.settings.strings["choose_location_first"]}</p>
        </div>
      <form className="postForm" onSubmit={confirmPost}>
        <div className="postFormButtonContainer">
          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["choose_on_map"]}</button>
        </div>
      </form>
	</div>
        :
	<div>

      <form className="postForm" onSubmit={confirmPost}>
        <div className="inputContainer">
	  <p className="normalText textleft">{props.settings.strings["give_name_for_location"]}</p>
          <input name="title" id="titleField" className="input" placeholder={props.settings.strings["name"]} maxLength="100" autoComplete="off" onChange={TitleFieldChangeHandler} value={titleField}/>
          <div className="inputFocusLine"/>
          <SiteImageUpload change={imageOnChangeHandler}/>
        </div>
        <div className="postFormButtonContainer">
          <button className="rippleButton positiveButton fillButton">{props.settings.strings["submit"]}</button>
          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
        </div>
      </form>
	</div>
      }


    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    tempSite: state.tempSite,
    projects: state.projects,
    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,
  createSite,
  setTempSite
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostCombined)
