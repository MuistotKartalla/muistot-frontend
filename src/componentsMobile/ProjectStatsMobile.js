//import React, {useState} from "react"
import { connect } from "react-redux"

import { notify } from "../reducers/notificationReducer"

import { ReactComponent as ReturnIcon } from "../resources/arrow_back.svg"
import "../styles/inputs.css"
import "../styles/projectStatistics.css"



export const projectStatsMobile = (props) => {

  /*

  */

  const closeClick = (event) => {
    event.preventDefault()
    props.history.goBack()
  }


  return(
    <div className="projectStatsContainerMobile">
      <div className="titleContainerMobile">
        <button className="mobileButtonContainer">
          <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
        </button>
        <div className="titleHeaderMobile">
          <h1 className="titleTextMobile">{`${props.projects.active.title} ${props.settings.strings["statistics"]}`}</h1>
        </div>
      </div>
      <button className="rippleButton fitButton rightButton">{props.settings.strings["download_project"]}</button>

      <table className="projectStatsTable">
        <tr>
          <td className="leftCell">New Posts in Last 24h</td>
          <td className="rightCell">100</td>
        </tr>
        <tr>
          <td className="leftCell">New Posts in Last 7d</td>
          <td className="rightCell">200</td>
        </tr>
        <tr>
          <td className="leftCell">New Posts in Last 30d</td>
          <td className="rightCell">300</td>
        </tr>
        <tr>
          <td className="leftCell">Total Posts</td>
          <td className="rightCell">300</td>
        </tr>
        <tr>
          <td className="leftCell">Total Contributors</td>
          <td className="rightCell">100</td>
        </tr>
        <tr>
          <td className="leftCell">Total Reports</td>
          <td className="rightCell">5</td>
        </tr>
        <tr>
          <td className="leftCell">Total Contributors</td>
          <td className="rightCell">100</td>
        </tr>
        <tr>
          <td className="leftCell">Total Contributors</td>
          <td className="rightCell">100</td>
        </tr>
        <tr>
          <td className="leftCell">Total Contributors</td>
          <td className="rightCell">100</td>
        </tr>
        <tr>
          <td className="leftCell">Total Contributors</td>
          <td className="rightCell">100</td>
        </tr>
        <tr>
          <td className="leftCell">Total Contributors</td>
          <td className="rightCell">100</td>
        </tr>
        <tr>
          <td className="leftCell">Total Contributors</td>
          <td className="rightCell">100</td>
        </tr>
        <tr>
          <td className="leftCell">Total Contributors</td>
          <td className="rightCell">100</td>
        </tr>
        <tr>
          <td className="leftCell">Total Contributors</td>
          <td className="rightCell">100</td>
        </tr>
      </table>
      <div>
        <button className="rippleButton fillButton" onClick={closeClick}>{props.settings.strings["close"]}</button>
      </div>
    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
    projects: state.projects
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(projectStatsMobile)