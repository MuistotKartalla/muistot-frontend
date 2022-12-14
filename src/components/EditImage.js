import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

import "../styles/newPost.css"
import "../styles/buttons.css"
import {setTempSite} from "../reducers/tempSiteReducer"
import { changeSitePicture } from "../reducers/postReducer"
import SiteImageUpload from "./SiteImageUpload"



export const EditImage = (props) => {
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
    props.history.goBack()
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
    <div className="newPostContainer centerAlignWithPaddingLean">
    <h1 className="headerText">{props.settings.strings["change_image"]}</h1>
	<div>
      <form className="postForm" onSubmit={confirmPost}>
        <div className="inputContainer">
          <SiteImageUpload  change={imageOnChangeHandler}/>
        </div>
        <div className="postFormButtonContainer">
          <button type="submit" className="rippleButton positiveButton fillButton">{props.settings.strings["submit"]}</button>
          <button type="button" className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
        </div>
      </form>
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
)(EditImage)
