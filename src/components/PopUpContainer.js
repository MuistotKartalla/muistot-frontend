// By: Niklas Impiö
import React from "react"

import "../styles/containers.css"



const PopUpContainer = (props) => {
  /*
  Container component for Pop Up windows/components.
  Alpha layer (modal?) background that closes the pop up if clicked.
  */

  const unfocusClick = (event) => {
    //background click
    if(event.target.id === "popUpBackground"){
      props.history.push("/")
      console.log("unfocus click")
    }
  }

  return(
    <div className="popUpContainer">
      <div id ="popUpBackground" className="popUpBackground" onClick={unfocusClick}>
        {props.children}
      </div>
    </div>
  )

}

export default PopUpContainer
