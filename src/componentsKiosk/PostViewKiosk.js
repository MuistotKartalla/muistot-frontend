// By: Niklas Impiö
import { useState } from "react"
import { connect } from "react-redux"
import { updateListView } from "../reducers/listViewReducer"
import { updateMapLocation } from "../reducers/mapLocationReducer"
import { notify } from "../reducers/notificationReducer"
import { changeSitePicture, deletePost, toggleVerify } from "../reducers/postReducer"

import "../styles/buttons.css"
// import "../styles/floatingSearch.css"
import "../styles/postView.css"
import "../styles/projectInfo.css"
import "../styles/texts.css"

import { ReactComponent as Arrow } from "../resources/arrow_back.svg"
import { ReactComponent as FacebookIcon } from "../resources/facebook_icon.svg"
import { ReactComponent as TwitterIcon } from "../resources/twitter_icon.svg"
import { ReactComponent as Verified } from "../resources/verified.svg"
import MementoList from "./MementoListKiosk"
//import {ReactComponent as InstagramIcon} from "../resources/instagram_icon.svg"
import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import { getImageURL } from "../services/images"
const ReactMarkdown = require('react-markdown')


export const PostView = (props) => {
  const [deleteState, setDeleteState] = useState(false)
  //gets the post to show based on the id that is set on the url field.
  const post = props.posts.find(item => "" + item.id === props.match.params.id)

  //post.uusi = 0

    /* const getDateFromUnixStamp = (unix) => {
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }*/
  const showOnMap = (event) => {
    event.preventDefault()
    //console.log(`Centering Map to ${post.title} coordinates.`)
    props.updateMapLocation(post.location)
    props.history.push("/")
  }
  const deletePost = (event) => {
    event.preventDefault()
    //console.log("postView deleting post", post.id)
    props.deletePost(post.id)
    props.history.goBack()
    props.notify(`${props.settings.strings["post"]}: "${post.title}" ${props.settings.strings["delete_success"]}`, false, 5)

  }
  const editPostClick = (postId) =>{
    props.history.push(`/edit-post/${postId}`)
  }

  const backClick = (event) => {
    //eventhandler for close button
    event.preventDefault()
    //console.log("closeClick")
    props.history.goBack()
  }

  const closeClick = (event) => {
    //eventhandler for close button
    event.preventDefault()
    //console.log("closeClick")
    props.history.push("/")
    props.updateListView(0)
  }

  const verifyClick = (event) => {
    event.preventDefault()
    props.toggleVerify(post)
  }

  const twitterShareClick = (event) => {
    event.preventDefault()
    window.open(`https://twitter.com/intent/tweet?text=${window.location.href}`, "_blank", )
  }
  const facebookShareClick = (event) => {
    event.preventDefault()
    window.open(`https://facebook.com/sharer/sharer.php?u=${window.location.href}`, "_blank")
  }/*
  const instagramShareClick = (event) => {
    event.preventDefault()
    window.open(`https://instragram.com/sharer/sharer.php?u=${window.location.href}`, "_blank")
  }*/

// Päivämäärät: <p className="normalTextNoMargin">{getDateFromUnixStamp(post.date)}</p>
//          {!post.waiting_approval?
//<Verified className="verifiedIcon"/>
//:
//<br/>
//}

  if(post && props.currentProject.id !== "parantolat"){
    //if post is defined return the actual post view else empty div.
    
    return(
      <div className="postViewContainer centerAlignWithPaddingLean">
        <div className="postTitleContainer">
        <div className="postCloseButtonContainer">
        <Arrow className="clearIcon" onClick={backClick}/>
            
            <br/>
            </div>
          <h1 className="titleText">{post.title}
          {!post.waiting_approval?
            <Verified className="verifiedIcon"/>
            :
            <br/>
          }
          </h1>
          <div className="postCloseButtonContainer">
          <ClearIcon className="clearIcon" onClick={closeClick}/>
          </div>
        </div>
        <div className="postImageContainer">

         <img className="postImage" src={getImageURL(post.image)} alt=""></img>

        </div>
        <div className="postContextContainer">
          <div className="infoContainer">
            {post.modifier?
              (post.modifier === post.creator?
              <p className="normalText">{`${props.settings.strings["by"]}: ${post.creator}`}</p>
              :
              <p className="normalText">{`${props.settings.strings["modified"]}: ${post.modifier}`}</p>
              )
              :
              <p className="normalText">{`${props.settings.strings["by"]}: ${props.settings.strings["anonymous"]}`}</p>
            }
            <p className="normalText">{`${props.settings.strings["number_of_memories"]}: ${post.muistoja}`}</p>

          </div>
          <div className="postButtonsContainer">
          {props.user?
            // multilevel conditional rendering
            // visitor sees no buttons
            // author sees delete button
            // user sees report button
            // admin sees delete and verify buttons.
              (props.currentProject.moderators.find(user => user === props.user.username)?
                <div className="postButtonsContainerInner">
                  <button className="rippleButton smallButton negativeButton" onClick={() => setDeleteState(true)}>{props.settings.strings["delete_post"]}</button>
                  {post.waiting_approval?
                    <button className="rippleButton smallButton negativeButton" onClick={verifyClick}>{props.settings.strings["verify"]}</button>
                    :
                    <button className="rippleButton smallButton negativeButton" onClick={verifyClick}>{props.settings.strings["unverify"]}</button>
                  }
                  <button className="rippleButton Button negativeButton" onClick={() => editPostClick(post.id)}>{props.settings.strings["change_information"]}</button>
                </div>
                :
                (post.own === true? 
                  <div className="postButtonsContainerInner">
                    <button className="rippleButton smallButton negativeButton" onClick={() => setDeleteState(true)}>{props.settings.strings["delete_post"]}</button>
                    <button className="rippleButton Button negativeButton" onClick={() => editPostClick(post.id)}>{props.settings.strings["change_information"]}</button>
                  </div>
                  :
                  <></>
                )

              )
              :
              <></>
            }

            <button className="rippleButton" onClick={showOnMap}>{props.settings.strings["show_on_map"]}</button>
          <TwitterIcon className="mobileIconSmall" onClick={twitterShareClick}/>
          <FacebookIcon className="mobileIconSmall" onClick={facebookShareClick}/>
          </div>
        </div>
        {deleteState? 
        <div className="postCloseContainer">
            <button className="rippleButton fillButton bigButton pulsingButton" onClick={deletePost}>{props.settings.strings["confirm_delete"]}</button> 
        </div>
        :
        <></>}
  
        
        <div className="storyContainer">
	        <MementoList posts={post} history={props.history}/>
        </div>
      </div>
    )
  }
  if(post && props.currentProject.id === "parantolat"){
    return(
      <div className="postViewContainer centerAlignWithPaddingLean">
        <div className="postTitleContainer">
          {!post.waiting_approval?
            <Verified className="verifiedIcon"/>
            :
            <br/>
          }
          <h1 className="titleText">{post.title}</h1>
          <div className="postCloseButtonContainer">
          <ClearIcon className="clearIcon" onClick={closeClick}/>
          </div>
        </div>
        <div className="storyContainer normalText" style={{padding:"10px"}}>
          <ReactMarkdown source={post.description} />
        </div>
          <div className="postCloseContainer">
            <hr></hr>
            <button className="rippleButton fillButton bigButton" onClick={showOnMap}>{props.settings.strings["show_on_map"]}</button>
            <div className="postButtonsParantolat">
              <TwitterIcon className="mobileIconSmall" onClick={twitterShareClick}/>
              <FacebookIcon className="mobileIconSmall" onClick={facebookShareClick}/>
            </div>
          </div>
    </div>
    )
  }
  return(
    <></>
  )

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
  notify,
  deletePost,
  toggleVerify,
  updateMapLocation,
  changeSitePicture,
  updateListView

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)



// PostView: This component is used in ContentArea.js. The component uses the useState hook to manage the state of the delete button, and finds the post to display based on the ID in the URL.
//  It defines several event handlers, such as for clicking the "show on map" button, deleting a post, editing a post, sharing on Twitter/Facebook, and verifying a post.
