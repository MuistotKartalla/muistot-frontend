import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"

import "../styles/buttons.css"
import "../styles/postView.css"
import "../styles/texts.css"


import { ReactComponent as Arrow } from "../resources/arrow_back.svg"
import { ReactComponent as ClearIcon } from "../resources/clear.svg"


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
    //eventhandler for close button
    event.preventDefault()
    //console.log("closeClick")
    props.history.push(`/post-view/${post.id}`)
  }

  if(props.user && (post.own === true || props.currentProject.moderators.find(user => user === props.user.username))){
    return (
      <div className="userInformationContainer centerAlignWithPaddingContainer">
        <div className="postTitleContainer"> 
        
        <div className="postCloseButtonContainer">
          <Arrow className="clearIcon" onClick={backClick}/></div>
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings["edit_post"]}</h1>
          <ClearIcon className="clearIcon" onClick={closeClick}/>
        </div>
          <div className="userInfoButtonsContainer">
            <button className="rippleButton" onClick={() => changeImage(post.id)}>{props.settings.strings["change_image"]}</button>
            <button className="rippleButton" onClick={() => changeSiteTitle(post.id)}>{props.settings.strings["change_title"]}</button>
            <button className="rippleButton" onClick={() => changeSiteLocation(post.id)}>{props.settings.strings["change_location"]}</button>
          </div>
      </div>
    );
  }
  else {
    return (
      <div className="userInformationContainer centerAlignWithPaddingContainer">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings["no_permission"]}</h1>
          <ClearIcon className="clearIcon" onClick={closeClick}/>
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


// EditPost: The component receives props as its input parameter and uses the find method to search for a post with a matching ID in the props.posts array, based on the ID passed in the URL. 
//  It then sets a property called uusi to 0 on the found post object. This is used in ContentArea.js 
//  the component defines mapStateToProps and mapDispatchToProps functions, which are used to connect the component to the Redux store.
//  The mapStateToProps function maps the user, posts, settings, and currentProject objects in the store to the component's props. 
//  The mapDispatchToProps function connects the notify action creator from the notificationReducer to the component's props.
//  The connect function then connects the component to the Redux store by passing mapStateToProps and mapDispatchToProps as arguments.
