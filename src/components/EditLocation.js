import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"

import "../styles/newPost.css"
import "../styles/buttons.css"
import { ChangeSiteLocation } from "../reducers/postReducer"



export const EditLocation = (props) => {
  const post = props.posts.find(item => "" + item.id === props.match.params.id)

  const ConfirmNewLocation = (event) => {
    event.preventDefault()
    //if input fields were empty
    if(event.target.newLatitude.value === "" || event.target.newLongitude.value === "")
    {
      props.notify(props.settings.strings["no_new_changes"], false, 5)
    }
    //if inputted values aren't numeric
    else if (isNaN(event.target.newLatitude.value) || isNaN(event.target.newLongitude.value)) {
      props.notify(props.settings.strings["invalid_new_location"], false, 5)
    }
    //if some new values were entered
    else {
      props.ChangeSiteLocation(post, event.target.newLatitude.value, event.target.newLongitude.value)
    }
    props.history.push(`/edit-post/${post.id}`)
  }

  return(
    <div className="userSettingsContainer centerAlignWithPadding">
        <div className="titleContainer">
          <h1 className="titleText">{props.settings.strings["change_location"]}</h1>
        </div>
        <form className="userSettingsForm" onSubmit={ConfirmNewLocation}>
          <div className="inputContainer">
            <input name="newLatitude" className="input" placeholder={post.location !== null? "Latitude: " + post.location.lat : "New latitude"} maxLength="200"/>
            <div className="inputFocusLine"/>
          </div>
          <div className="inputContainer">
            <input name="newLongitude" className="input" placeholder={post.location !== null? "Longitude: " + post.location.lng : "New longitude"} maxLength="200"/>
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
  ChangeSiteLocation
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLocation)
