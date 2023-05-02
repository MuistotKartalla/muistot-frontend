//import React, {useState} from "react"
import { connect } from "react-redux"

import { notify } from "../reducers/notificationReducer"

import "../styles/inputs.css"
import "../styles/projectStatistics.css"



export const projectStats = (props) => {

  /*

  */

  const closeClick = (event) => {
    event.preventDefault()
    props.history.push("/")
  }

  return(
    <div className="projectStatsContainer centerAlignWithPadding">
      <div className="statsHeaderContainer">
        <h1 className="headerText">{`${props.projects.active.title} ${props.settings.strings["statistics"]}`}</h1>
        <button className="rippleButton fitButton rightButton">{props.settings.strings["download_project"]}</button>
      </div>

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
        <button className="rippleButton fillButtonWithoutMargin" onClick={closeClick}>{props.settings.strings["close"]}</button>
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
)(projectStats)



// ProjectStats: The component takes props as input, which include the current active project and settings, and renders a table of statistics for the project, such as the number of new posts in the last 24 hours,
//  7 days, and 30 days, as well as total posts, contributors, and reports.
//  It is not used.