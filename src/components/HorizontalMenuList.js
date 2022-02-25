// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"
import {initPosts} from "../reducers/postReducer"

import "../styles/horizontalMenuList.css"
import useComponentVisible from "../hooks/OutsideClick"

import DropDownList from "./DropDownList"
import {ReactComponent as DropDownIcon} from "../resources/arrow_drop_down-24px.svg"
import {ReactComponent as PersonIcon} from "../resources/person.svg"
import ThemeToggleSwitch from "./ThemeToggleSwitch"
import LanguageDropDown from "./LanguageDropDown"

const HorizontalMenuList = (props) => {
  //Hardcoded horizontal menu list for the nav bar. Maybe a separate component is not necessary but to keep components concise, it currently is.
  //Has all the menu buttons and event handlers for clicks that activate router navigation.
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

  const toggleDDV = () => {
    //DDV = dropDownVisibility
    //event.preventDefault()
    console.log("toggling dropdown visibility")
    setIsComponentVisible(!isComponentVisible)
  }

  const aboutClick = (event) => {
    event.preventDefault()
	if(props.history.location.pathname === "/about")
 		{
 		props.history.push("/")
 		}
 	else
 		{
 		props.history.push("/about")
 		}
    if(isComponentVisible){
      toggleDDV()
    }
  }

  const accountSettingsClick = (event) => {
    event.preventDefault()
    props.history.push("/user-settings/")
    if(isComponentVisible){
      toggleDDV()
    }
  }

  const myPostsClick = (event) => {
    event.preventDefault()
    props.history.push("/my-posts/")
    if(isComponentVisible){
      toggleDDV()
    }
  }
  const reportsClick = (event) => {
    event.preventDefault()
    props.history.push("/reports/")
    if(isComponentVisible){
      toggleDDV()
    }
  }
  const statsClick = (event) => {
    event.preventDefault()
    props.history.push("/project-stats/")
    if(isComponentVisible){
      toggleDDV()
    }
  }
  const configureProjectClick = (event) => {
    event.preventDefault()
    props.history.push("/configure-project/")
    if(isComponentVisible){
      toggleDDV()
    }
  }

  const logoutClick = (event) => {
    event.preventDefault()
    console.log("Logging out")
    props.logout(props.notify, props.settings.strings["logout_notification"])
    var params = {projectId: props.projects.active.id};
    props.initPosts(params) 
   toggleDDV()
  }
  const toLoginClick = (event) => {
    event.preventDefault()
	if(props.history.location.pathname === "/login")
 		{
 		props.history.push("/")
 		}
 	else
 		{
 		props.history.push("/login")
 		}

  }

  const toSignUp = (event) => {
    event.preventDefault()
	if(props.history.location.pathname === "/sign-up")
 		{
 		props.history.push("/")
 		}
 	else
 		{
 		props.history.push("/sign-up")
 		}
  }
  if(props.user){
    return(
      <div className="horizontalMenuContainerLogged" ref={ref}>
        <ul className="menuButtonList">
          {isComponentVisible?
            <li className="accountItemActive" onClick={toggleDDV}>
              <PersonIcon className="personIconActive"/>
              <DropDownIcon className="dropDownIconActive"/>
            </li>
            :
            <li className="accountItem" onClick={toggleDDV}>
              <PersonIcon className="personIcon"/>
              <DropDownIcon className="dropDownIcon"/>
            </li>

          }
          <li className="menuListItem">
            <LanguageDropDown/>
          </li>
        </ul>
        {isComponentVisible?
          <div className="accountDropDownContainer">
            {props.user.username === "admin"?
              <DropDownList  items={[{string:props.settings.strings["my_posts"], onClickHandler: myPostsClick}, {string:props.settings.strings["account_settings"], onClickHandler: accountSettingsClick},{string:props.settings.strings["about"], onClickHandler:aboutClick}, {string:props.settings.strings["log_out"], onClickHandler: logoutClick},{divider:true}, {string:props.settings.strings["reports"], onClickHandler: reportsClick},{string:props.settings.strings["project_statistics"], onClickHandler: statsClick},{string:props.settings.strings["configure_project"], onClickHandler: configureProjectClick}]}>
                <p className="userNameText">{props.user.username}</p>
                <ThemeToggleSwitch/>
              </DropDownList>
              :
              <DropDownList  items={[{string:props.settings.strings["my_posts"], onClickHandler: myPostsClick}, {string:props.settings.strings["account_settings"], onClickHandler: accountSettingsClick},{string:props.settings.strings["about"], onClickHandler:aboutClick}, {string:props.settings.strings["log_out"], onClickHandler: logoutClick}]}>
                <p className="userNameText">{props.user.username}</p>
                <ThemeToggleSwitch/>
              </DropDownList>
            }
          </div>
          :
          <div/>
        }
      </div>

    )
  }else{
    return(
      <div className="horizontalMenuContainer" ref={ref}>
        <ul className="menuButtonList">


          <div>
            {isComponentVisible?
              <li className="accountItemActive" onClick={toggleDDV}>
                <PersonIcon className="personIconActive"/>
                <DropDownIcon className="dropDownIconActive"/>
              </li>
              :
              <li className="accountItem" onClick={toggleDDV}>
                <PersonIcon className="personIcon"/>
                <DropDownIcon className="dropDownIcon"/>
              </li>
            }
            <li className="menuListItem" onClick={toLoginClick}>
              <p className="menuItemText">{props.settings.strings["log_in"]}</p>
            </li>

            <li className="menuListItem">
              <LanguageDropDown/>
            </li>

          </div>


        </ul>
        {isComponentVisible?
          <div className="accountDropDownContainer">
            {props.user?
              <DropDownList  items={[{string:props.settings.strings["account_activity"], onClickHandler: null}, {string:props.settings.strings["configure_account"], onClickHandler: null},{string:props.settings.strings["about"], onClickHandler:aboutClick}, {string:props.settings.strings["log_out"], onClickHandler: logoutClick}]}>
                <p className="userNameText">{props.user.username}</p>
                <ThemeToggleSwitch/>
              </DropDownList>
              :
              <DropDownList  items={[{string:props.settings.strings["about"], onClickHandler:aboutClick}]}>
                <ThemeToggleSwitch/>
              </DropDownList>
            }


          </div>
          :
          <div/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.user
    user: state.user,
    settings: state.settings,
    projects: state.projects
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,
  initPosts,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HorizontalMenuList)
