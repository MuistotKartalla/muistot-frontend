// By: Niklas Impiö
// In the list view handles the left scrollable side

//import React, {useState} from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { connect } from "react-redux"
import { updateListView } from "../reducers/listViewReducer"
import { notify } from "../reducers/notificationReducer"

import { useEffect, useRef } from "react"
import { getImageURL } from "../services/images"
import "../styles/listView.css"
import "../styles/postList.css"

export const PostList = (props) => {
  const myRef = useRef(props.listView)
  const itemsRef = useRef([]);

    /* const getDateFromUnixStamp = (unix) => {
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }*/
 

  useEffect(() => {
    if(itemsRef !== [] && props.listView !== 0)
    {
      itemsRef.current[props.listView].scrollIntoView()
      itemsRef.current[props.listView].focus()
      
    }
  }, [props.listView])

  return (

    <div className="postListContainer">
      <ul className="postSearchList">
        {props.posts.map((post,index) =>
          <li key={index} tabIndex="1" ref={el => itemsRef.current[index] = el} className="postViewListItem"
          onClick={() => {props.click(post); itemsRef.current[index].scrollIntoView({behavior: 'smooth'}); props.updateListView(index); console.log(post)}}>
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
    listView: state.listView
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  updateListView
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
