import React from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"

import "../styles/postView.css"
import "../styles/buttons.css"
import "../styles/texts.css"


import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"
import {ReactComponent as ClearIcon} from "../resources/clear.svg"


export const PostView = (props) => {
  //gets the post to show based on the id that is set on the url field.
  const post = props.posts.find(item => "" + item.id === props.match.params.id)

  post.uusi = 0

  const changeImage = (postId) =>{
    props.history.push(`/edit-image/${postId}`)
  }

  const changeSiteLocation= (postId) => {
    props.history.push(`/edit-location/${postId}`)
  }

  const changeSiteTitle= (postId) => {
    props.history.push(`/edit-title/${postId}`)
  }

  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    props.history.push("/")
  }

  const backClick = (event) => {
    event.preventDefault()
    props.history.push(`/post-view/${post.id}`)
  }

  if(props.user && (post.own === true || props.currentProject.moderators.find(user => user === props.user.username))){
    return (
      <div className="userInformationContainerMobile">
        <div className="titleContainerMobile"> 
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={backClick}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{props.settings.strings["edit_post"]}</h1>
          </div>
          <button className="mobileButtonContainer">
            <ClearIcon className="mobileIcon" onClick={closeClick}/>
          </button>
        </div>
          <div className="userInfoButtonsContainerMobile">
            <button className="rippleButton" onClick={() => changeImage(post.id)}>{props.settings.strings["change_image"]}</button>
            <button className="rippleButton" onClick={() => changeSiteTitle(post.id)}>{props.settings.strings["change_title"]}</button>
            <button className="rippleButton" onClick={() => changeSiteLocation(post.id)}>{props.settings.strings["change_location"]}</button>
          </div>
      </div>
    );
  }
  else {
    return (
      <div className="userInformationContainerMobile">
        <div className="titleContainerMobile">
        <div className="titleHeaderMobile">
          <h1 className="titleTextMobile">{props.settings.strings["no_permission"]}</h1>
        </div>
        <button className="mobileButtonContainer">
          <ClearIcon className="mobileIcon" onClick={closeClick}/>
        </button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    posts: state.posts,
    settings: state.settings,
    currentProject: state.projects.active
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
