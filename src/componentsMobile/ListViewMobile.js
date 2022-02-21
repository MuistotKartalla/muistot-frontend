// By: Niklas Impiö
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"


import "../styles/listView.css"
import "../styles/postView.css"
import "../styles/postList.css"



import {ReactComponent as AddIcon} from "../resources/add_circle.svg"
import {ReactComponent as MapViewIcon} from "../resources/map_view_icon.svg"
import {getImageURL} from "../services/images";



export const ListViewMobile = (props) => {
  /*
    Mobile version of listview component, doesn't include postview, every list entry will
    navigate to relevant postview id via router.
  */
  const [posts, setPosts] = useState(props.posts)

  useEffect(() => {
    if(posts.length === 0){
      setPosts(props.posts)

    }


  }, [props, posts.length])

  const onItemClick = (post) => {
    props.history.push(`/post-view/${post.id}`)
  }

  const getDateFromUnixStamp = (unix) => {
    //returns date in format dd.mm.yyyy
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }

  const toMapView = (event) => {
    event.preventDefault()

    props.history.push("/")
  }
  const newPostClick = (event) => {
    //New post onClick event handler.
    event.preventDefault()
    console.log("Adding new post")
    if(props.user !== null){
      console.log("Adding new post")
      props.history.push("/new-post/")
    }else{
      //if not logged in, redirect to login page
      props.history.push("/login/")
      props.notify(props.settings.strings["login_required_to_post"], false, 5)
    }
  }


  return (

    <div className="postListContainerMobile">
      <div className="postListContainerInner">
        <ul className="postSearchList">
          {posts.map((post,index) =>
            <li key={index} className="postViewListItem" onClick={() => onItemClick(post)}>
              <div className="postListItemImageContainer">
                <img className="postListImagePreview" src={getImageURL(post.image)} alt=""></img>
              </div>
              <div className="postListItemInfo">
                <h2 className="postListTitle">{post.title}</h2>
              </div>
            </li>
          )}
        </ul>
      </div>
      <button className="mobileNewButton" onClick={newPostClick}>
        <AddIcon className="mobileIconSecondary"/>
      </button>
      <button className="mobileListViewButton" onClick={toMapView}>
        <MapViewIcon className="mobileIconSecondary"/>
      </button>
    </div>



  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    settings: state.settings,
    posts: state.posts,
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListViewMobile)
