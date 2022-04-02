// By: Niklas Impiö
import React from "react"
//import React, {useState} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"


import "../styles/reportedPostsList.css"
import "../styles/buttons.css"
import "../styles/texts.css"
import {getImageURL} from "../services/images";
import {ReactComponent as ClearIcon} from "../resources/clear.svg"



export const ReportedPostsList = (props) => {

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
  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    props.history.push("/")
  }

  return(
    <div className="reportedPostsListContainer centerAlignWithPadding">
      <div className="postTitleContainer">
      <h1 className="titleText centerAlignWithPadding">{props.settings.strings["reported_posts"]}</h1>
      <ClearIcon className="clearIcon rightAlignWithPadding" onClick={closeClick}/>
      </div>
      <div className="postListListAdmin">
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
              <p className="postListText">{props.settings.strings["reports"]}: 5</p>
              <p className="postListText">{props.settings.strings["image_reports"]}: #</p>
              <p className="postListText">{props.settings.strings["text_reports"]}: #</p>
              <p className="postListText">{props.settings.strings["other"]}: #</p>

            </div>
          </li>
        )}
      </div>
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
)(ReportedPostsList)
