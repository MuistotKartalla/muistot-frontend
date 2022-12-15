import React from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"

import "../styles/newPost.css"
import "../styles/buttons.css"
import { ChangeSiteTitle } from "../reducers/postReducer"
import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"

export const EditSiteTitle = (props) => {
  const post = props.posts.find(item => "" + item.id === props.match.params.id)

  const ConfirmNewTitle = (event) => {
    event.preventDefault()
    if(event.target.newTitle.value === "")
    {
       props.notify(props.settings.strings["no_new_changes"], false, 5)
    }
    else {
      props.ChangeSiteTitle(post, event.target.newTitle.value)
    }
    props.history.push(`/edit-post/${post.id}`)
  }

  return(
    <div className="userSettingsContainerMobile">
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={() => props.history.goBack()}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{props.settings.strings["change_title"]}</h1>
          </div>
        </div>
        <form className="userSettingsFormMobile" onSubmit={ConfirmNewTitle}>
          <div className="inputContainer">
            <input name="newTitle" className="input" placeholder={post.title !== null? post.title : "New Title"} maxLength="200"/>
            <div className="inputFocusLine"/>
          </div>

          <div className="dualButtonContainer">
            <button type="submit" className="positiveButton rippleButton fillButton">{props.settings.strings["confirm"]}</button>
            <button type="button" className="negativeButton rippleButton fillButton" onClick={() => props.history.push(`/edit-post/${post.id}`)}>{props.settings.strings["cancel"]}</button>
          </div>
        </form>
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
  notify,
  ChangeSiteTitle
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSiteTitle)
