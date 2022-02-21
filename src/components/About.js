import React from "react"
import {connect} from "react-redux"
import "../styles/about.css"
import "../styles/postView.css"
import {ReactComponent as ClearIcon} from "../resources/clear.svg"
const ReactMarkdown = require('react-markdown')
//probably make individual css files for all you use here.

export const About = (props) => {
  // only takes Router history as props to manage the router state and url address.
  // about probably gets its content from some string file, since that doesn't need to be in the database.
  // just write some placeholder strings on variables.
  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    console.log("closebutton clicked")
    props.history.goBack()
  }

  //html stuff here
  return(
    <div className="aboutContainer centerAlignWithPadding">
      <div className="postTitleContainer">
        <h1 className="titleText centerAlignWithPadding">{props.settings.strings["about"]}</h1>
        <ClearIcon className="clearIcon rightAlignWithPadding" onClick={closeClick}/>
      </div>
      <div className="aboutContentContainer normalText">
		<ReactMarkdown source={props.settings.strings["about_text"]} />
            <h2 className="titleText">{props.settings.strings["tos_title"]}</h2>
		<ReactMarkdown source={props.settings.strings["tos_text"]} />    
      </div>
    
    





    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings
  }
}


export default connect(
  mapStateToProps,
  null
)(About)
