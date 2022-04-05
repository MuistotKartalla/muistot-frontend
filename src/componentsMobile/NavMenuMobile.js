// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import {logout,logoutS} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"


import "../styles/navMenu.css"
import "../stylesMobile/navMenuMobile.css"
import {ReactComponent as MenuIcon} from "../resources/menu.svg"

import LanguageDropDown from "../components/LanguageDropDown"
import ThemeToggleSwitch from "../components/ThemeToggleSwitch"
import DropDownSelectProject from "../components/DropDownSelectProject"
import {setActiveProject} from "../reducers/projectReducer"
import {initPosts} from "../reducers/postReducer"


export const NavMenuMobile = (props) => {
  const [visible, setVisible] = useState(false)
  //Nav menu container component that has the menu components embedded.

  const toggleVisibity = () => {
    setVisible(!visible)
  }

  const toAboutClick = (event) => {
    event.preventDefault()
    props.history.push("/about/")
    toggleVisibity()

  }

  const toMyPostsClick = (event) => {
    event.preventDefault()
    props.history.push("/my-posts/")
    toggleVisibity()
  }
  const toUnverifiedPostsClick = (event) => {
    event.preventDefault()
    props.history.push("/unverified-posts/")
    toggleVisibity()
  }
  const logoutClick = (event) => {
    event.preventDefault()
    //console.log("Logging out")
    props.logout(props.notify, "Logout complete.")
    var params = {projectId: props.projects.active.id};  
    props.initPosts(params)
    toggleVisibity()
  }
  const toLoginClick = (event) => {
    event.preventDefault()
    props.logoutS(props.notify)
    props.history.push("/login")
    toggleVisibity()
  }

  const toProjectMenu = (event) => {
    event.preventDefault()
    props.history.push("/project-info/")
    toggleVisibity()
  }

  

  const toRoot = (event) => {
    //pushes url route to root or "/", might change later when different projects implemented.
    event.preventDefault()
    props.history.push("/")
    toggleVisibity()
  }

  const changeProject = (project) => {
    props.setActiveProject(project)
    var params = {projectId: project.id};  
    props.initPosts(params)
  }

  
  if(visible){
    return (
      <div className="mobileMenuContainerOuter">
        <div className="popUpBackground" onClick={toggleVisibity}/>
        <div className="mobileMenuContainer">
          <div className="mobileMenuLogoContainer">
            <button className="mobileMenuToggleButton">
              <MenuIcon onClick={toggleVisibity} className="menuIconInverted"/>
            </button>
            <div className="menuLogoMobile" >
              <h1 className="logoTextMobile" onClick={toRoot}>{props.settings.strings["app_name"]}</h1>
            </div>

          </div>
          {props.user?
            <div className="mobileMenuNavigationContainer">
              <p className="userNameText">{props.user.username}</p>
              <div className="divider"/>
              <button className="mobileMenuButton" onClick={toMyPostsClick}>{props.settings.strings["my_posts"]}</button>
              </div>
            :<></>}
          
          <div className="mobileMenuProjectContainer">
            <DropDownSelectProject items={props.projects.projects} active={props.projects.active} change={changeProject}/>
            <button className="mobileMenuButton" onClick={toProjectMenu}>{props.settings.strings["project_info"]}</button>
            <button className="mobileMenuButton" onClick={toAboutClick}>{props.settings.strings["about"]}</button>
            <div className="divider"/>
          <div className="preferencesContainer">
            <LanguageDropDown/>
            <ThemeToggleSwitch/>
          </div>
          <div className="divider"/>
          </div>
          {props.user?
            <div className="mobileMenuNavigationContainer">
              <button className="mobileMenuButton" onClick={logoutClick}>{props.settings.strings["log_out"]}</button>
              {props.currentProject.moderators.find(user => user === props.user.username)?
              <div className="mobileMenuUserNameContainer">
              <div className="divider"/>
              <button className="mobileMenuButton" onClick={toUnverifiedPostsClick}>{props.settings.strings["unverified-posts"]}</button>
              </div>
              :
              <></>
          }
            </div>
            :
            <div className="mobileMenuNavigationContainer">
              <button className="mobileMenuButton" onClick={toLoginClick}>{props.settings.strings["log_in"]}</button>
            </div>
          }


        </div>

      </div>
    )
  }else{
    return(
      <div className="mobileMenuContainerHidden">
        <button className="mobileMenuToggleButton">
          <MenuIcon onClick={toggleVisibity} className="menuIcon"/>
        </button>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    settings: state.settings,
    projects: state.projects,
    currentProject: state.projects.active
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  logout,
  setActiveProject,
  initPosts,
  logoutS
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenuMobile)
