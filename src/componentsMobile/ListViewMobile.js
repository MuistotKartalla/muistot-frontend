// By: Niklas Impiö
import React, {useState, useEffect,useRef} from "react"
import {connect} from "react-redux"
import {updateListView} from "../reducers/listViewReducer"
import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"


import "../styles/listView.css"
import "../styles/postView.css"
import "../styles/postList.css"
import "../styles/buttons.css"
import "../styles/texts.css"



import {ReactComponent as AddIcon} from "../resources/add_circle.svg"
import {ReactComponent as MapViewIcon} from "../resources/map_view_icon.svg"
import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"
import {getImageURL} from "../services/images";



export const ListViewMobile = (props) => {
  /*
    Mobile version of listview component, doesn't include postview, every list entry will
    navigate to relevant postview id via router.
  */
  const [posts, setPosts] = useState(props.posts)
  const myRef = useRef(props.listView)
  const itemsRef = useRef([]);

  useEffect(() => {
    if(itemsRef !== [] && props.listView !== 0)
    {
      console.log(props.listView);
      itemsRef.current[props.listView].scrollIntoView()
    }

  
  }, [])

  useEffect(() => {
    if(posts.length === 0){
      setPosts(props.posts)

    }


  }, [props, posts.length])

  const onItemClick = (post) => {
    props.history.push(`/post-view/${post.id}`)
  }

    /* const getDateFromUnixStamp = (unix) => {
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }*/

  const toMapView = (event) => {
    event.preventDefault()
    props.history.push("/")
    props.updateListView(0)
  }
  const newPostClick = (event) => {
    //New post onClick event handler.
    event.preventDefault()
    //console.log("Adding new post")
    if(props.user !== null){
      //console.log("Adding new post")
      props.history.push("/new-post/")
    }else{
      //if not logged in, redirect to login page
      props.history.push("/login/")
      props.notify(props.settings.strings["login_required_to_post"], false, 5)
    }
  }


  return (

    <div className="postListContainerMobile">
      <div className="postTitleContainerMobile">
      <button className="mobileButtonContainer">
        <ReturnIcon className="mobileIcon" onClick={toMapView}/>
      </button>
      <div className="postTitleHeader">
      <h1 className="postTitleTextMobile">{props.settings.strings["list_view"]}</h1>
      </div>
      </div>
      <div className="postListContainerInner">
        <ul className="postSearchList">
          {posts.map((post,index) =>
            <li key={index} tabIndex="1" ref={el => itemsRef.current[index] = el} className="postViewListItem" 
            onClick={() => {onItemClick(post); itemsRef.current[index].scrollIntoView({behavior: 'smooth'}); props.updateListView(index)}}>
              <div className="postListItemImageContainer">
                <img className="postListImagePreview" src={getImageURL(post.image)} alt=""></img>
              </div>
              <div className="postListItemInfo">
                <h2 className="postListTitle">{post.title}</h2>
                <p className="normalText">{`${props.settings.strings["number_of_memories"]}: ${post.muistoja}`}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
      {props.currentProject.id !== "parantolat"?
      <button className="mobileNewButton" onClick={newPostClick}>
        <AddIcon className="mobileIconSecondary"/>
      </button>
      :
      <></>}

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
    currentProject: state.projects.active,
    listView: state.listView
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  logout,
  updateListView
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListViewMobile)
