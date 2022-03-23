// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"

import "../styles/myPosts.css"
import "../styles/buttons.css"
import "../styles/texts.css"


import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"
import {getImageURL} from "../services/images";



export const MyPostsMobile = (props) => {
  /*
  Component that shows list of all components by the current user.
  Clicking a post in the list redirects to the post page.
  Out of focus click closes the pop up.
  */

  const posts = props.posts.filter(post => post.author ===  props.user.UID)
  console.log(posts)

  const getDateFromUnixStamp = (unix) => {
    //returns date in format dd.mm.yyyy
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }


  const onPostClick = (post) => {
    //event handler for post marker clicks. Routes to post view.
    console.log(`Clicked post: ${post}`, post)
    props.history.push(`/post-view/${post.id}/`)
  }
  if(posts && posts.length > 0){
    //if user has posts render the lsit

    return(
      <div className="myPostsContainerMobile">
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={() => props.history.goBack()}/>
          </button>
          <h1 className="titleTextMobile">{props.settings.strings["my_posts"]}</h1>
        </div>

        <ul className="myPostsList">
          {posts.map((post,index) =>
            <li key={index} className="myPostsListItem" onClick={() => onPostClick(post)}>
              <div className="postListItemImageContainer">
                <img className="postListImagePreview" src={getImageURL(post.image)} alt=""></img>
              </div>
              <div className="postListItemInfo">
                <h2 className="postListTitle">{post.title}</h2>
                <p className="postListText">{post.author}</p>
                <p className="postListText">{getDateFromUnixStamp(post.date)}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
  //if user doesn't have any posts, tell them
  return(
    <div className="myPostsContainerMobile">
      <div className="titleContainerMobile">
        <button className="mobileButtonContainer">
          <ReturnIcon className="mobileIcon" onClick={() => props.history.goBack()}/>
        </button>
        <h1 className="titleTextMobile">{props.settings.strings["my_posts"]}</h1>
      </div>
      <ul className="myPostsList">
        <li>
          <h2 className="headerText">{props.settings.strings["empty_list"]}</h2>
        </li>
      </ul>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    posts: state.posts,
    settings: state.settings

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPostsMobile)
