// By: Niklas Impiö
import { useEffect, useState } from "react"
import { connect } from "react-redux"

import { notify } from "../reducers/notificationReducer"
import { createSite } from "../reducers/postReducer"
import { setTempSite } from "../reducers/tempSiteReducer"
import "../styles/buttons.css"
import "../styles/newPost.css"
import SiteImageUploadMobile from "./SiteImageUploadMobile"


import { ReactComponent as ReturnIcon } from "../resources/arrow_back.svg"


//combined new post where everything is in a single window. Toggle buttons for which location selection method chosen.
// aka if "live location" button is highlighted the it uses your current location. if map button highlighted then it uses selected location.

export const NewPostMobile = (props) => {
  const [titleField, setTitleField] = useState("")
  const [location, setLocation] = useState(false)
  const [image, setImage] = useState(null)

  useEffect(() => {
    setLocation(props.tempSite.location)
    setTitleField(props.tempSite.title)
    if(props.tempSite.image){
      setImage(props.tempSite.image.data
        )}else{setImage(props.tempSite.image)}
  }, [props])


  const cancelClick = (event) => {
    event.preventDefault()
    setTitleField("")
    setLocation(false)
    setImage(null)
    props.setTempSite({"title": "", "location":false, "image": null})
    props.history.push("/")
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
    props.setTempSite({"title": "", "location":null, "image": null})
    props.history.push("/")
  }

  const selectOnMap = (event) => {
    //save already filled value to redux state, while the user selects the location on map
    //show the map and notify the user with instructions.
    event.preventDefault()
    props.setTempSite({"title": titleField, "location":location})
    props.history.push("/select-location/")
    //props.notify(props.settings.strings["choose_on_map_notification"], false, 10)
  }

  const TitleFieldChangeHandler = (event) => {
    event.preventDefault()
    setTitleField(event.target.value)
    const temp = {...props.tempSite}
    temp.title = event.target.value
    props.setTempSite(temp)
  }

  return(
    <div className="newPostContainerMobile">
      <div>
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={cancelClick}/>
          </button>
          <h1 className="titleTextMobile">{props.settings.strings["new_post"]}</h1>
        </div>

        {!location?
	<div>
          <div className="newPostTabSwitchContainer">
            <p className="normalText textCenter">{`${props.settings.strings["choose_on_map_mobile"]}`}</p>
            <button className="rippleButton negativeButton fillButton" onClick={selectOnMap}>{props.settings.strings["choose_on_map"]}</button>
          </div>
	      <form className="postFormMobile" onSubmit={confirmPost}>
	        <div className="postFormButtonContainer">
	          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
	        </div>
	      </form>
	</div>
          :
	<div>
          <div className="newPostTabSwitchContainer">
            <button className="rippleButton positiveButton fillButton" onClick={selectOnMap}>{props.settings.strings["re_choose_on_map"]}</button>
          </div>
      		<form className="postFormMobile" onSubmit={confirmPost}>
      		  <div className="inputContainer">
	          <p className="normalText textCenter">{props.settings.strings["give_name_for_location"]}</p>
      		    <input name="title" id="titleField" className="input" placeholder={props.settings.strings["title"]} maxLength="100" autoComplete="off" onChange={TitleFieldChangeHandler} value={titleField}/>
      		    <div className="inputFocusLine"/>
              <SiteImageUploadMobile change={imageOnChangeHandler}/>
      		  </div>

	        <div className="postFormButtonContainer">
	          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
	          <button className="rippleButton positiveButton fillButton">{props.settings.strings["submit"]}</button>
	        </div>
	      </form>
	</div>
        }
      </div>
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
)(NewPostMobile)
