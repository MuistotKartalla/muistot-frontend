// By: Niklas Impiö
import React from "react"
//import React, {useState} from "react"
import {connect} from "react-redux"
import { LazyLoadImage} from 'react-lazy-load-image-component';

import {notify} from "../reducers/notificationReducer"


import "../styles/listView.css"
import "../styles/postList.css"
import {getImageURL} from "../services/images";




export const PostList = (props) => {


    /* const getDateFromUnixStamp = (unix) => {
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }*/
  return (

    <div className="postListContainer">
      <ul className="postSearchList">
        {props.posts.map((post,index) =>
          <li key={index} className="postViewListItem" onClick={() => {props.click(post)}}>
            <div className="postListItemImageContainer">
              <LazyLoadImage height={75} width={75} src={getImageURL(post.image)} alt=""/>
            </div>
            <div className="postListItemInfo">
              <h2 className="postListTitle">{post.title}</h2>
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
    user: state.user,
    settings: state.settings,
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
)(PostList)
