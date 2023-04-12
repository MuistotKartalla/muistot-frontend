// By: Niklas Impiö
import { connect } from "react-redux"
import { logout, logoutS } from "../reducers/loginReducer"
import { notify } from "../reducers/notificationReducer"
import { initPosts } from "../reducers/postReducer"


import useComponentVisible from "../hooks/OutsideClick"
import "../styles/horizontalMenuList.css"

import { ReactComponent as DropDownIcon } from "../resources/arrow_drop_down-24px.svg"
import { ReactComponent as PersonIcon } from "../resources/person.svg"
import DropDownList from "./DropDownList"
import LanguageDropDown from "./LanguageDropDown"
import NameToggleSwitch from "./NameToggleSwitch"
import ThemeToggleSwitch from "./ThemeToggleSwitch"
import {AcountDropDown} from "./AcountDropDown";


const HorizontalMenuList = (props) => {
  //Hardcoded horizontal menu list for the nav bar. Maybe a separate component is not necessary but to keep components concise, it currently is.
  //Has all the menu buttons and event handlers for clicks that activate router navigation.
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

  //account settings not in use atm {string:props.settings.strings["account_settings"], onClickHandler: accountSettingsClick}
  // reports not in use atm ,{divider:true}, {string:props.settings.strings["reports"], onClickHandler: reportsClick}

  const toggleDDV = () => {
    //DDV = dropDownVisibility
    //event.preventDefault()
    //console.log("toggling dropdown visibility")
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

  const myPostsClick = (event) => {
    event.preventDefault()
    props.history.push("/my-posts/")
    if(isComponentVisible){
      toggleDDV()
    }
  }
  const UnverifiedPostsClick = (event) => {
    event.preventDefault()
    props.history.push("/unverified-posts/")
    if(isComponentVisible){
      toggleDDV()
    }
  }

  const ImagelessPostsClick = (event) => {
    event.preventDefault()
    props.history.push("/imageless-posts/")
    if(isComponentVisible){
      toggleDDV()
    }
  }
  /*
    const UserSettingsClick = (event) => {
      event.preventDefault()
      props.history.push("/usersettings/")
      if(isComponentVisible){
        toggleDDV()
      }
    }
    const ChangeUserNameClick = (event) => {
      event.preventDefault()
      props.history.push("/change-username/")
      if(isComponentVisible){
        toggleDDV()
      }
    }*/

  const ProfileClick = (event) => {
    event.preventDefault()
    props.history.push("/my-account/")
    if(isComponentVisible){
      toggleDDV()
    }
  }

  const ManagementClick = (event) => {
    event.preventDefault()
    props.history.push("/project-management/")
    if(isComponentVisible){
      toggleDDV()
    }
  }

  const logoutClick = (event) => {
    event.preventDefault()
    //console.log("Logging out")
    props.logout(props.notify, props.settings.strings["logout_notification"])
    var params = {projectId: props.projects.active.id};
    props.initPosts(params)
    toggleDDV()
  }
  const toLoginClick = (event) => {
    event.preventDefault()
    props.logoutS(props.notify)
    if(props.history.location.pathname === "/login")
    {
      props.history.push("/")
    }
    else
    {
      props.history.push("/login")
    }

  }


  if(props.user){
    return(
        <div className="horizontalMenuContainerLogged" ref={ref}>
          <ul className="menuButtonList">
            <li className="menuListItem">
              <AcountDropDown/>
            </li>
            <li className="menuListItem">
              <LanguageDropDown/>
            </li>
          </ul>
          {isComponentVisible?
              <div className="accountDropDownContainer">

                {props.currentProject.moderators.find(user => user === props.user.username)?
                    <DropDownList  items={[{string:props.settings.strings["my_posts"], onClickHandler: myPostsClick},{string:props.settings.strings["unverified-posts"], onClickHandler: UnverifiedPostsClick},{string:props.settings.strings["imageless_posts"], onClickHandler: ImagelessPostsClick},{string:props.settings.strings["about"], onClickHandler:aboutClick}, {string:props.settings.strings["profile"], onClickHandler:ProfileClick}, {string:props.settings.strings["project_management"], onClickHandler:ManagementClick}, {string:props.settings.strings["log_out"], onClickHandler: logoutClick}]}>
                      <AcountDropDown/>
                    </DropDownList>
                    :
                    <DropDownList  items={[{string:props.settings.strings["my_posts"], onClickHandler: myPostsClick},{string:props.settings.strings["about"], onClickHandler:aboutClick}, {string:props.settings.strings["profile"], onClickHandler:ProfileClick}, {string:props.settings.strings["log_out"], onClickHandler: logoutClick}]}>
                      <AcountDropDown/>
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
              <li className="menuListItem">
                <AcountDropDown/>
              </li>
              <li className="menuListItem" onClick={toLoginClick}>
                <p className="menuItemText">{props.settings.strings["log_in"]}</p>
              </li>

              <li className="menuListItem">
                <LanguageDropDown/>
              </li>

            </div>
          </ul>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.user
    user: state.user,
    settings: state.settings,
    projects: state.projects,
    currentProject: state.projects.active
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,
  initPosts,
  logout,
  logoutS

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HorizontalMenuList)