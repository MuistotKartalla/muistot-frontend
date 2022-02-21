import React, {useState, useEffect} from "react"
import {connect} from "react-redux"



import * as postService from "../services/posts"
import {notify} from "../reducers/notificationReducer"

import "../styles/listView.css"
import "../styles/postList.css"
import {getImageURL} from "../services/images";


export const MementoList = (props) => {
  const [mementos, setMementos] = useState([])  
  console.log("MementoList constructor launched")
  console.log(mementos)

  useEffect(() => {
    console.log("MementoList useEffect")
    console.log(props.posts.id)
    postService.getMemories(
        props.posts.projectId,
        props.posts.id
    ).then(data => {setMementos(data)})
  }, [props])

  const newMementoClick = (kohdeid) => {
	console.log(kohdeid)
   if(props.user !== null){
      console.log("Adding new memento")
      props.history.push(`/new-memento/${kohdeid}`)
    }else{
      //if not logged in, redirect to login page
      props.history.push("/login/")
      props.notify(props.settings.strings["login_required_to_post"], false, 5)
    }

  }

  return(
    <div className="postListContainer">
      <ul className="postListList">
          <li className="postListItem" onClick={() => newMementoClick(props.posts.id)}>
            <div className="postListItemImageContainer">
              <img className="postListImagePreview" src={getImageURL("placeholder.jpg")} alt=""></img>
            </div>
            <div className="postListItemInfo">
              <h2 className="postListTitle">{`${props.settings.strings["add_your_memento"]}`}</h2>
              <p className="normalText">{`${props.settings.strings["add_your_memento_info"]}`}</p>
            </div>
          </li>
        {mementos.map((memento,index) =>
          <li key={index} className="postListItem">
            <div className="postListItemImageContainer">
              <img className="postListImagePreview" src={getImageURL(memento.image)} alt=""></img>
            </div>
            <div className="postListItemInfo">
              <h2 className="postListTitle">{memento.title}</h2>
              <p className="normalText">{memento.story}</p>
              
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
)(MementoList)
