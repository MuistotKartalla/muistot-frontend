// By: Niklas Impiö
//import React, {useState, useEffect} from "react"
//useState useEffect not used yet
import { connect } from "react-redux"
import { logout } from "../reducers/loginReducer"
import { notify } from "../reducers/notificationReducer"

import { ReactComponent as InfoButton } from "../resources/info_font.svg"
import "../styles/navMenu.css"

import HorizontalMenuList from "./HorizontalMenuListKiosk"

import { initPosts } from "../reducers/postReducer"
import { setActiveProject } from "../reducers/projectReducer"
import DropDownSelectProject from "./DropDownSelectProjectKiosk"


export const NavMenu = (props) => {
  //Nav menu container component that has the menu components embedded.


  const toProjectMenu = (event) => {
    event.preventDefault()
	if(props.history.location.pathname === "/kiosk/project-info/")
		{
		props.history.push("/kiosk/")
		}
	else
		{
		props.history.push("/kiosk/project-info/")
		}
  }
  const toRoot = (event) => {
    //pushes url route to root or "/", might change later when different projects implemented.
    event.preventDefault()
    props.history.push("/kiosk/")
  }

  const changeProject = (project) => {
    props.setActiveProject(project)
    var params = {projectId: project.id};
    props.initPosts(params)
  	
  }
  return (
    <div className="menuContainer">
      <div className="menuInnerContainer">
        <div className="menuLogo" >
          <p className="logoText" onClick={toRoot}>{props.settings.strings["app_name"]}</p>
        </div>

        <div className="centerContainer">
          <DropDownSelectProject  items={props.projects.projects} active={props.projects.active} change={changeProject}/>
        </div>
      </div>
    </div>


  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    settings: state.settings,
    projects: state.projects
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  setActiveProject,
  initPosts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu)


// NavMenu: This component renders a menu bar at the top of the page, It is usen inside of App.js. The menu includes a logo, a dropdown to select a project, a button to view project information, and a list of horizontal links. 
