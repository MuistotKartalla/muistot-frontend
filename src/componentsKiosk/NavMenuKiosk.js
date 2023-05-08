// By: Niklas Impiö
//import React, {useState, useEffect} from "react"
//useState useEffect not used yet
import { useEffect, useState } from "react"
import { connect } from "react-redux"

import "../stylesKiosk/navMenuKios.css"

import { initPosts } from "../reducers/postReducer"
import { setActiveProject } from "../reducers/projectReducer"



export const NavMenu = (props) => {
  const [project, setProject] = useState({
    ...props.projects.active,
    additionalMetadata: {}
  })
  project.additionalMetadata = {};


  const [projectTitle, setProjectTitle] = useState(props.projects.active.title)

  useEffect(() => {
    if (!project.title) {
      setProject(props.projects.active)
    }
    //if active project is piiput or parantolat, set title according to stringStorage
    if (project.id === "piiput" || project.id === "parantolat") {
      setProjectTitle(props.settings.strings[project.id])
    }
    //for other projects use project title determined in the database
    else {
      setProjectTitle(props.projects.active.title)
    }
  }, [props, project.title, project.id])



  return (
    <div className="menuContainer">
      <div className="menuInnerContainer">

        <div className="centerContainer">
          <h1 className="projectTitle">{projectTitle}</h1>
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

  setActiveProject,
  initPosts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu)


// NavMenu: This component renders a menu bar at the top of the page, It is usen inside of App.js. The menu includes a logo,
// a dropdown to select a project, a button to view project information, and a list of horizontal links. 
