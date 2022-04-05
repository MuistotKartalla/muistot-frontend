// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"
import {deletePost, toggleVerify} from "../reducers/postReducer"
import {updateMapLocation} from "../reducers/mapLocationReducer"

import "../styles/postView.css"
import "../styles/buttons.css"
import "../styles/texts.css"

import MementoList from "../components/MementoList"

import {ReactComponent as Verified} from "../resources/verified.svg"
import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"
import {ReactComponent as TwitterIcon} from "../resources/twitter_icon.svg"
import {ReactComponent as FacebookIcon} from "../resources/facebook_icon.svg"
import {ReactComponent as InstagramIcon} from "../resources/instagram_icon.svg"
import {getImageURL} from "../services/images";



export const PostViewMobile = (props) => {
  /*
    Modified Postview to be used as part of listview, gets post as props. 
  */
  const [deleteState, setDeleteState] = useState(false)
  const post = props.posts.find(item => "" + item.id === props.match.params.id)
  post.uusi = 0
 //console.log(post)

  const deletePost = (event) => {
    event.preventDefault()
    //console.log("postView deleting post", post.id)
    props.deletePost(post.id)
    props.history.goBack()
    props.notify(`${props.settings.strings["post"]}: "${post.title}" ${props.settings.strings["delete_success"]}`, false, 5)

  }

  const showOnMap = (event) => {
    event.preventDefault()
    //console.log(`Centering Map to ${post.title} coordinates.`)
    props.updateMapLocation(post.location)
    props.history.push("/")
  }

    /* const getDateFromUnixStamp = (unix) => {
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }*/

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
  }
  const instagramShareClick = (event) => {
    event.preventDefault()
    window.open(`https://instragram.com/sharer/sharer.php?u=${window.location.href}`, "_blank")
  }

  if(post && props.currentProject.title !== "project 2"){
    //if post is defined return the actual post view else empty div.

    return(
      <div className="postViewContainerMobile">
        <div className="postTitleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={() => props.history.goBack()}/>
          </button>
          <div className="postTitleHeader">
            {!post.waiting_approval?
              <Verified className="verifiedIconMobile"/>
              :
              <div/>
            }
            <h1 className="postTitleTextMobile noHorizontalMargin">{post.title}</h1>
          </div>

        </div>
        <div className="postImageContainer">
          <img className="postImage" src={getImageURL(post.image)} alt=""></img>
        </div>
        <div className="postContextContainer">
          <div className="infoContainer">
            {post.authorText?
              <p className="normalText">{`${props.settings.strings["by"]}: ${post.authorText}`}</p>
              :
              <p className="normalText">{`${props.settings.strings["by"]}: ${props.settings.strings["anonymous"]}`}</p>
            }
          </div>
          <div className="postButtonsContainer">

            <TwitterIcon className="mobileIconSmall"/>
            <FacebookIcon className="mobileIconSmall"/>
            <InstagramIcon className="mobileIconSmall"/>
          </div>
        </div>
        <div className="postCloseContainer">
          {props.user?
            // multilevel conditional rendering
            // visitor sees no buttons
            // author sees delete button
            // user sees report button
            // admin sees delete and verify buttons.
              (props.currentProject.moderators.find(user => user === props.user.username)?
                <div className="postButtonsContainerInnerMobile">
                  <div className="postButtonsContainerInnerMobile">
                    <button className="rippleButton fillButton bigButton"onClick={() => setDeleteState(true)}>{props.settings.strings["delete_post"]}</button>
                    <div className="divider"/>
                  </div>
                  {!post.waiting_approval?
                  <div className="postButtonsContainerInnerMobile">
                    <button className="rippleButton fillButton bigButton" onClick={verifyClick}>{props.settings.strings["unverify"]}</button>
                    <div className="divider"/>
                  </div>  
                    :
                  <div className="postButtonsContainerInnerMobile">
                    <button className="rippleButton fillButton bigButton" onClick={verifyClick}>{props.settings.strings["verify"]}</button>
                    <div className="divider"/>
                  </div> 
                  }
                </div>
                :
                (post.own === true?
                  <div className="postButtonsContainerInnerMobile">
                    <button className="rippleButton fillButton bigButton"onClick={() => setDeleteState(true)}>{props.settings.strings["delete_post"]}</button>
                    <div className="divider"/>
                  </div>
                  :
                  <></>
                )
              )
              :
              <div/>
            }
            <button className="rippleButton fillButton bigButton" onClick={showOnMap}>{props.settings.strings["show_on_map"]}</button>
            {deleteState?
              <div className="postButtonsContainerInnerMobile">
                <div className="divider"/>
                <button className="rippleButton fillButton bigButton pulsingButton" onClick={deletePost}>{props.settings.strings["confirm_delete"]}</button>
              </div> 
              :
              <></>
            }
        </div>
        <div className="storyContainer">
          <MementoList posts={post} history={props.history}/> 
        </div>
      </div>
)
}
if(post && props.currentProject.title === "project 2"){
    
  return(
    <div className="postViewContainerMobile">
      <div className="postTitleContainerMobile">
        <button className="mobileButtonContainer">
          <ReturnIcon className="mobileIcon" onClick={() => props.history.goBack()}/>
        </button>
        <div className="postTitleHeader">
          {!post.waiting_approval?
            <Verified className="verifiedIconMobile"/>
            :
            <div/>
          }
          <h1 className="postTitleTextMobile noHorizontalMargin">{post.title}</h1>
        </div>

      </div>
      <div className="postImageContainer">

      <img className="postImage" src={getImageURL(post.image)} alt=""></img>

      </div>
      <div className="postContextContainer">
        <div className="infoContainer">
          {post.authorText?
            <p className="normalText">{`${props.settings.strings["by"]}: ${post.authorText}`}</p>
            :
            <p className="normalText">{`${props.settings.strings["by"]}: ${props.settings.strings["anonymous"]}`}</p>
          }
        </div>
        <div className="postButtonsContainer">
          <div className="postButtonsContainerInner">
            <TwitterIcon className="mobileIconSmall" onClick={twitterShareClick}/>
            <FacebookIcon className="mobileIconSmall" onClick={facebookShareClick}/>
            <InstagramIcon className="mobileIconSmall" onClick={instagramShareClick}/>
          </div>
        </div>        
      </div>
      <div className="postCloseContainer">
      <button className="rippleButton fillButton bigButton" onClick={showOnMap}>{props.settings.strings["show_on_map"]}</button>
      </div>
      <div className="storyContainer">
        <div className="normalText" style={{padding:"10px"}}>{post.description}</div>
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
  updateMapLocation,
  toggleVerify

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostViewMobile)
