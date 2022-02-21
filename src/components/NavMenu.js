// By: Niklas Impiö
import React from "react"
//import React, {useState, useEffect} from "react"
//useState useEffect not used yet
import {connect} from "react-redux"
import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"


import "../styles/navMenu.css"

import HorizontalMenuList from "./HorizontalMenuList"

import {setActiveProject} from "../reducers/projectReducer"
import {initPosts} from "../reducers/postReducer"
import DropDownSelectProject from "./DropDownSelectProject"


export const NavMenu = (props) => {
  //Nav menu container component that has the menu components embedded.


  const toProjectMenu = (event) => {
    event.preventDefault()
	if(props.history.location.pathname === "/project-info/")
		{
		props.history.push("/")
		}
	else
		{
		props.history.push("/project-info/")
		}
  }
  const toRoot = (event) => {
    //pushes url route to root or "/", might change later when different projects implemented.
    event.preventDefault()
    props.history.push("/")
  }

  const changeProject = (project) => {
    if(props.user && props.user.username === "admin" && project===props.settings.strings["new_project"])
	{
      	props.history.push("/new-project/")
    	}
     else
	{
      	props.setActiveProject(project)
      	var params = {projectId: project.id};
      	props.initPosts(params)
  	}
  }
  return (
    <div className="menuContainer">
      <div className="menuInnerContainer">
        <div className="menuLogo" >
          <p className="logoText" onClick={toRoot}>{props.settings.strings["app_name"]}</p>
        </div>

        <div className="projectSelectContainer">
          {props.user && props.user.username === "admin"?
            //if user is admin (CHANGE LOGIC LATER) show new project option in the project LIST.
            <DropDownSelectProject items={props.projects.projects.concat("divider").concat(props.settings.strings["new_project"])} active={props.projects.active} change={changeProject}/>
            :
            <DropDownSelectProject items={props.projects.projects} active={props.projects.active} change={changeProject}/>
          }
          <div className="projectInfoButtonContainer">
            <button className="projectInfoButton" onClick={toProjectMenu}>{props.settings.strings["project_info"]}</button>
          </div>
        </div>
        <HorizontalMenuList history={props.history}/>
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
  logout,
  setActiveProject,
  initPosts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu)
