// By: Niklas Impiö
import React from "react"
//import React, {useState} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"
import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"

import "../styles/reportedPostsList.css"
import "../styles/buttons.css"
import "../styles/texts.css"
import {getImageURL} from "../services/images";




export const ReportedPostsListMobile = (props) => {

  //TODO change after reporting implemented.
  //TODO switch to string storage!!!

  //implementation idea: get all report objects from backend, create list of posts that appear in those reports (combine multiple reports for same post).

  const posts = props.posts

    /* const getDateFromUnixStamp = (unix) => {
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }*/

  const onItemClick = (post) => {
    props.history.push(`/post-view/${post.id}/`)
  }

  return(
    <div className="reportedPostsListContainerMobile">
      <div className="titleContainerMobile">
        <button className="mobileButtonContainer">
          <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
        </button>
        <div className="titleHeaderMobile">
          <h1 className="titleTextMobile">{props.settings.strings["reports"]}</h1>
        </div>
      </div>
      <ul className="postListListAdmin">
        {posts.map((post,index) =>
          <li key={index} className="postListItem" onClick={() => onItemClick(post)}>
            <div className="postListItemImageContainer">
              <img className="postListImagePreview" src={getImageURL(post.image)} alt=""></img>
            </div>
            <div className="postListItemInfo">
              <h2 className="postListTitle">{post.title}</h2>
              <p className="postListText">{post.author}</p>
              
            </div>
            <div className="postListReportFlags">
              <p className="postListText">{props.settings.strings["NSFW_content"]}: #</p>
              <p className="postListText">{props.settings.strings["profanity"]}: #</p>
              <p className="postListText">{props.settings.strings["offensive_language"]}: #</p>
              <p className="postListText">{props.settings.strings["off_topic_content"]}: #</p>
              <p className="postListText">{props.settings.strings["other"]}: #</p>

            </div>
          </li>
        )}
      </ul>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
    posts: state.posts

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
)(ReportedPostsListMobile)
