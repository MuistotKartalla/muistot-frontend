// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"
import {deletePost, toggleVerify,} from "../reducers/postReducer"
import {updateMapLocation} from "../reducers/mapLocationReducer"



import "../styles/postView.css"
import "../styles/buttons.css"
import "../styles/texts.css"
import "../styles/someSignUp.css"

import {ReactComponent as Verified} from "../resources/verified.svg"
import {ReactComponent as TwitterIcon} from "../resources/twitter_icon.svg"
import {ReactComponent as FacebookIcon} from "../resources/facebook_icon.svg"
import {ReactComponent as ClearIcon} from "../resources/clear.svg"
import {getImageURL} from "../services/images";


export const PostViewLW = (props) => {
  const [deleteState, setDeleteState] = useState(false)
  //gets the post to show based on the id that is set on the url field.
  const post = props.posts.find(item => "" + item.id === props.match.params.id)

  const getDateFromUnixStamp = (unix) => {
    //returns date in format dd.mm.yyyy
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }

  const deletePost = (event) => {
    event.preventDefault()
    console.log("postView deleting post", post.id)
    props.deletePost(post.id)
    props.history.goBack()
    props.notify(`${props.settings.strings["post"]}: "${post.title}" ${props.settings.strings["delete_success"]}`, false, 5)

  }
  const showOnMap = (event) => {
    event.preventDefault()
    console.log(`Centering Map to ${post.title} coordinates.`)
    props.updateMapLocation(post.location)
    props.history.push("/")
  }
  const showDetails = (event) => {
    event.preventDefault()
    props.history.push(`/post-view/${post.id}`)
  }
  const closeClick = (event) => {
    //eventhandler for close button
    event.preventDefault()
    console.log("closeClick")
    props.history.push("/")
  }

  const reportClick = (event) => {
    event.preventDefault()
    props.history.push(`/post-view/${post.id}/report/`)
  }

  const verifyClick = (event) => {
    event.preventDefault()
    props.toggleVerify(post)

  }

  const copyclipboard = (event) => {
    navigator.clipboard.writeText(window.location.href).then(function() {
      console.log('Copying URI is successful');
    }, function(err) {
      console.error('Copying URI is unseccessful', err);
    });
  
  }

  const twitterShareClick = (event) => {
    event.preventDefault()
    window.open(`https://twitter.com/intent/tweet?text=${window.location.href}`, "_blank", )
  }

  const facebookShareClick = (event) => {
    event.preventDefault()
    window.open(`https://facebook.com/sharer/sharer.php?text=${window.location.href}`, "_blank")
  }

  
  //console.log(props)
  if(post && props.currentProject.title !== "project 2"){
    //if post is defined return the actual post view else empty div.
    return(  
      <div className="postViewContainerLW">
        <div className="postTitleContainer">
          
          {post.verified?
            <Verified className="verifiedIcon"/>
            :
            <div/>
          }
          <h1 className="titleText">{post.title}</h1>

        <div className="postCloseButtonContainer">
        <ClearIcon className="clearIcon" onClick={closeClick}/>
        </div>
        </div>

        <div className="postImageContainer">
          <img className="postImage" src={getImageURL(post.image)} alt=""></img>
        </div>
        
        <div className="postContextContainer">
          <div className="infoContainer">
            {post.authorText?
              <p className="normalTextNoMargin">{`${props.settings.strings["by"]}: ${post.authorText}`}</p>
              :
              <p className="normalTextNoMargin">{`${props.settings.strings["by"]}: ${props.settings.strings["anonymous"]}`}</p>
            }
          </div>
          <div className="postButtonsContainer">
            {props.user !== null?
            // multilevel conditional rendering
            // visitor sees no buttons
            // author sees delete button
            // user sees report button
            // admin sees delete and verify buttons.
              (props.currentProject.moderators.find(user => user === props.user.username)? 
                <div className="postButtonsContainerInner">
                  <button className="rippleButton smallButton negativeButton" onClick={() => setDeleteState(true)}>{props.settings.strings["delete_post"]}</button>
                  
                  {post.verified?
                    <button className="rippleButton smallButton negativeButton" onClick={verifyClick}>{props.settings.strings["unverify"]}</button>
                    :
                    <button className="rippleButton smallButton negativeButton" onClick={verifyClick}>{props.settings.strings["verify"]}</button>
                  }
                </div>
                :
                (props.user.username === post.author?
                  <div className="postButtonsContainerInner">
                    <button className="rippleButton smallButton negativeButton" onClick={() => setDeleteState(true)}>{props.settings.strings["delete_post"]}</button>
                  </div>
                  :
                  (post.verified?
                    <div/>
                    :
                    <div className="postButtonsContainerInner">
                      <button className="rippleButton smallButton negativeButton" onClick={reportClick}>{props.settings.strings["report"]}</button>
                    </div>
                  )
                )
              )
            
              :
              <div/>
            }
            <button className="rippleButton" onClick={copyclipboard}>Copy URI</button>
            <TwitterIcon className="mobileIconSmall" onClick={twitterShareClick}/>
            <FacebookIcon className="mobileIconSmall" onClick={facebookShareClick}/>
            
          </div>
        </div>
        <div className="storyContainer">
          <p className="normalText">{post.story}</p>
        </div>
        {deleteState?
        <div className="postCloseContainer">
            <button className="rippleButton fillButton bigButton pulsingButton" onClick={deletePost}>{props.settings.strings["confirm_delete"]}</button>
        </div>
            :
        <div className="postCloseContainer">
          
            <button className="rippleButton fillButton" onClick={showDetails}>{props.settings.strings["look_at_mementos"]}</button>
 
		<hr></hr>
            <button className="rippleButton fillButton" onClick={showOnMap}>{props.settings.strings["show_on_map"]}</button>        
        </div>
          }
      </div>
    )
  }
  if(post && props.currentProject.title === "project 2"){
    //if post is defined return the actual post view else empty div.
    return(  
      <div className="postViewContainerLW">
        <div className="postTitleContainer">
          
          {post.published?
            <Verified className="verifiedIcon"/>
            :
            <div/>
          }
          <h1 className="titleText">{post.title}</h1>

        <div className="postCloseButtonContainer">
        <ClearIcon className="clearIcon" onClick={closeClick}/>
        </div>
        </div>
        
        <div className="storyContainer" style={{padding: "20px"}}>
          <p className="normalText">{post.description}</p>
        </div>

        <div className="postContextContainer">
          <div className="infoContainer">
            {post.authorText?
              <p className="normalTextNoMargin">{`${props.settings.strings["by"]}: ${post.authorText}`}</p>
              :
              <p className="normalTextNoMargin">{`${props.settings.strings["by"]}: ${props.settings.strings["anonymous"]}`}</p>
            }
          </div>
          <div className="postButtonsContainer">

            <button className="rippleButton" onClick={copyclipboard}>Copy URI</button>
            <TwitterIcon className="mobileIconSmall" onClick={twitterShareClick}/>
            <FacebookIcon className="mobileIconSmall" onClick={facebookShareClick}/>
            
          </div>
        </div>
        <div className="storyContainer">
          <p className="normalText">{post.story}</p>
        </div>
          
        <div className="postCloseContainer">
          
            
          : <div/>
		<hr></hr>
            <button className="rippleButton fillButton" onClick={showOnMap}>{props.settings.strings["show_on_map"]}</button>        
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
  updateMapLocation
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostViewLW)


