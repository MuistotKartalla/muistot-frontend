// By: Niklas Impiö
import { connect } from "react-redux"
import { logout, logoutS } from "../reducers/loginReducer"
import { notify } from "../reducers/notificationReducer"
import { initPosts } from "../reducers/postReducer"


import useComponentVisible from "../hooks/OutsideClick"
import "../styles/horizontalMenuList.css"


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




// HorizontalMenuList: This component is used in NavMenu.js as part of it. This component  imports several other components, including DropDownList, LanguageDropDown, and AcountDropDown,
//  which are used to render drop-down menus for some of the menu buttons.The component uses the useComponentVisible hook to track whether the drop-down menus are visible or not and to toggle their
//  visibility when needed. Finally, uses "mapStateToProps" to mapthe state of the Redux store to ist props, which allows it to acces the necesarry data to render the menu buttons. 
