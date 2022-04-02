// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"


import "../styles/reportPost.css"
import "../styles/buttons.css"
import "../styles/texts.css"




export const ReportPost = (props) => {
  /*
  Report Component
  Pop Up style window that contains Title, Reported post title, few check boxes, text area and buttons
  TODO sends report request to backend.

  TODO Doesn't connect to redux correctly for some reason!!!
  */
  const [reportField, setReportField] = useState("")
  const [imageContentCheck, setImageContentCheck] = useState(false)
  const [textContentCheck, setTextContentCheck] = useState(false)

  const [otherCheck, setOtherCheck] = useState(false)




  const cancelClick = (event) => {
    event.preventDefault()
    props.history.goBack()

  }

  const submitClick = (event) => {
    event.preventDefault()
    //TODO SUBMIT REPORT
    props.history.goBack()
    props.notify(props.settings.strings["report_submitted"], false, 5)
  }
  //console.log(props)
  if(props.posts){
    const post = props.posts.find(item => "" + item.id === props.match.params.id)
    return(
      <div className="reportPostContainer centerAlignWithPadding">
        <h1 className="headerText">{props.settings.strings["report"]}</h1>
        <h2 className="normalText">{post.title}</h2>
        <h2 className="boldText">{`${props.projects.active.title}'s Content Guidelines:`}</h2>
        <p className="smallText noMarginText">{props.projects.active.contentDescription}</p>

        <h2 className="normalText">{props.settings.strings["report_info2"]}</h2>
        <div className="inputContainer">
          <input name="image_check" type="checkbox" onChange={() => setImageContentCheck(!imageContentCheck)}/>
          {props.settings.strings["image_report_info"]}
        </div>
        <div className="inputContainer">
          <input className="checkbox" name="text_check" type="checkbox" onChange={() => setTextContentCheck(!textContentCheck)}/>
          {props.settings.strings["text_report_info"]}
        </div>
        <div className="inputContainer">
          <input name="other_check" type="checkbox" onChange={() => setOtherCheck(!otherCheck)}/>
          {props.settings.strings["other"]}
        </div>
        <div className="inputContainer">
          <textarea name="report_field" id="reportField" className="input" rows="2" placeholder={props.settings.strings["description_optional"]} maxLength="128" autoComplete="off" value={reportField} onChange={(event) => {setReportField(event.target.value)}}/>
          <div className="inputFocusLine"/>
        </div>

        <div className="postFormButtonContainer">
          <button className="rippleButton positiveButton fillButton" onClick={submitClick}>{props.settings.strings["submit"]}</button>
          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
        </div>

      </div>
    )
  }
  return(
    <div/>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
    posts: state.posts,
    projects: state.projects

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
)(ReportPost)