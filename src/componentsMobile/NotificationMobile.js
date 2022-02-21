// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {cancelNotification} from "../reducers/notificationReducer"
import "../styles/notification.css"


const NotificationMobile = (props) => {

  console.log(`setting notification timer animation duration for ${props.notification.seconds} seconds;`)
  if(document.getElementById("notificationTimer") !== null){
    //notification is currently rendered.

    //deleting and adding the element restarts the animation.
    let element = document.getElementById("notificationTimer")
    let parent = element.parentElement
    parent.removeChild(element)
    parent.appendChild(element)
    //works.
  }



  const closeNotification = (event) => {
    //remove the timed task that would hide the notification  after the duration.
    // then call reducer function cancelNotification that replaces the current state.notification value with the default one.

    event.preventDefault()
    clearTimeout(props.notification.cancel)
    props.cancelNotification()

  }
  return (
    <div name="notificationContainerInner" className="notificationContainerInnerMobile">
      <div className="notificationGrid">
        {props.notification.error?
          <p className="notificationHeaderText">Error</p>
          :
          <p className="notificationHeaderText">Notification</p>
        }

        <p className="notificationDescription">{props.notification.message}</p>
        <button onClick={closeNotification} className="notificationButton rippleButton">Close</button>
      </div>
      <div className="notificationTimer">
        <div id="notificationTimer" className="timeRemaining" style={{"animationDuration": `${props.notification.seconds}s`}}></div>
      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  //assign notification to props from state
  return {
    notification: state.notification
  }

}

export default connect(
  mapStateToProps,
  {cancelNotification}
)(NotificationMobile)