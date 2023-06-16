import React, {useState, useEffect} from "react"
import {connect} from "react-redux"


import * as postService from "../services/posts"
import {notify} from "../reducers/notificationReducer"

import "../styles/listView.css"
import "../styles/postList.css"
import "../styles/postView.css"
import {getImageURL} from "../services/images"
import { deleteMemory, toggleVerifyMemento } from "../reducers/postReducer"
import placeholderImage from "../resources/logoIcon.png";


export const MementoListMobile = (props) => {
  const [mementos, setMementos] = useState([])
  //boolean for checking, if user has clicked delete memory
  const [deleteState, setDeleteState] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
      postService.getMemories(
          props.posts.projectId,
          props.posts.id
      ).then(data => {setMementos(data)})
  }, [props])

  const newMementoClick = (kohdeid) => {
   if(props.user !== null){
     //console.log("Adding new memento")
      props.history.push(`/new-memento/${kohdeid}`)
    }else{
      //if not logged in, redirect to login page
      props.history.push("/login/")
      props.notify(props.settings.strings["login_required_to_post"], false, 5)
    }

  }

  const verifyClickMemento = (memento) => {
    props.toggleVerifyMemento(props.posts, memento)
  }

  //function for changing values of deleteState and Id
  const changeDelete = (memento) => {
    if(deleteState === true) {
      setDeleteState(false)
      setDeleteId(null)
    }
    else {
      setDeleteState(true)
      setDeleteId(memento.id)
    }
    
  }

  //function for deleting a memory
  const deleteMemento = (memento) => {
    props.deleteMemory(props.posts.id, memento.id)
    setDeleteState(false)
    //refresh page after deleting memory
    window.location.reload(false);
  }

  return(
    <div className="postListContainer">
      <ul className="postListList">
          <li className="postListItem" onClick={() => newMementoClick(props.posts.id)}>
            <div className="postListItemImageContainer">
              <img className="postListImagePreview" src={placeholderImage} alt=""></img>
            </div>
            <div className="postListItemInfo">
              
              <p className="normalText">{`${props.settings.strings["add_your_memento_info"]}`}</p>
            </div>
          </li>
        {mementos.map((memento,index) =>
            <li key={index} className="postListItemMobile">
              <div className="postListItemImageContainer">
                <img className="postListImagePreview" src={getImageURL(memento.image)} alt=""></img>  
                <h2 className="postListTitleMobile">{memento.title}</h2> 
              </div>
              <div className="postListItemInfo">  
                {props.user?
                (props.currentProject.moderators.find(user => user === props.user.username)?
                <div className="postButtonsContainerInner">
                {memento.waiting_approval?             
                <button className="rippleButton Button negativeButton" onClick={() => verifyClickMemento(memento)}>{props.settings.strings["verify"]}</button>
                :
                <button className="rippleButton Button negativeButton" onClick={() => verifyClickMemento(memento)}>{props.settings.strings["unverify"]}</button>
                }
                </div>
                : <div/>)
                :
                <></>}
                <p className="normalText">{memento.story}</p>
                {props.user? 
                memento.own === true?
                  deleteState && memento.id === deleteId?
                    <div className="memoryOwnerButtonsContainer">
                      <button className="rippleButton memoryOwnerButton negativeButton" onClick={() => changeDelete(memento)}>{props.settings.strings["cancel"]}</button> 
                      <button className="rippleButton memoryOwnerButton negativeButton" onClick={() => deleteMemento(memento)}>{props.settings.strings["confirm"]}</button> 
                    </div>
                    :
                    <div className="memoryOwnerButtonsContainer">
                      <button className="rippleButton memoryOwnerButton negativeButton" onClick={() => changeDelete(memento)}>{props.settings.strings["delete_post"]}</button>
                    </div>
                  : 
                  <></>
                : 
                <></>}
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
    currentProject: state.projects.active
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  toggleVerifyMemento,
  deleteMemory
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MementoListMobile)