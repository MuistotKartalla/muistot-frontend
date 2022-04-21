// By: Niklas Impiö
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

import "../styles/newPost.css"
import "../styles/buttons.css"
import {setTempSite} from "../reducers/tempSiteReducer"
import { changeSitePicture } from "../reducers/postReducer"
import SiteImageUploadMobile from "./SiteImageUploadMobile"


import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"


//combined new post where everything is in a single window. Toggle buttons for which location selection method chosen.
// aka if "live location" button is highlighted the it uses your current location. if map button highlighted then it uses selected location.

export const EditPostMobile = (props) => {
  const [image, setImage] = useState(null)
  const post = props.posts.find(item => "" + item.id === props.match.params.id)

  useEffect(() => {
    if(props.tempSite.image){
      setImage(props.tempSite.image.data
        )}else{setImage(props.tempSite.image)}
  }, [props])


  const cancelClick = (event) => {
    event.preventDefault()
    setImage(null)
    props.setTempSite({"title": "", "location":false, "image": null})
    props.history.push("/")
  }

  const imageOnChangeHandler = (image) => {
    setImage(image)
  }

  const confirmPost = (event) => {
    event.preventDefault()  
    props.changeSitePicture(post, image)
    setImage(null)
    props.setTempSite({"title": "", "location":false, "image": null})
    props.history.goBack()
  }


  return(
    <div className="newPostContainerMobile">
      <div>
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={cancelClick}/>
          </button>
          <h1 className="titleTextMobile">{props.settings.strings["change_image"]}</h1>
        </div>

	<div>
      		<form className="postFormMobile" onSubmit={confirmPost}>
      		  <div className="inputContainer">
              <SiteImageUploadMobile change={imageOnChangeHandler}/>
      		  </div>
	        <div className="postFormButtonContainer">
	          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
	          <button className="rippleButton positiveButton fillButton">{props.settings.strings["submit"]}</button>
	        </div>
	      </form>
	</div>
        
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
    settings: state.settings,
    posts: state.posts
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  setTempSite,
  changeSitePicture
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostMobile)
