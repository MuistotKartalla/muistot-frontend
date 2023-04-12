import React, { useState } from 'react';
import {connect} from "react-redux";

import NameToggleSwitch from './NameToggleSwitch';
import ThemeToggleSwitch from './ThemeToggleSwitch'
import About from './About';

import useComponentVisible from "../hooks/OutsideClick"
import DropDownList from "./DropDownList";
import "../styles/horizontalMenuList.css"

import { ReactComponent as DropDownIcon } from "../resources/arrow_drop_down-24px.svg"
import { ReactComponent as PersonIcon } from "../resources/person.svg"


export const  AcountDropDown = (props) => {

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

    const toggleVisibility = () => {
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
            toggleVisibility()
        }
    }

    const myPostsClick = (event) => {
        event.preventDefault()
        props.history.push("/my-posts/")
        if(isComponentVisible){
            toggleVisibility()
        }
    }
    const UnverifiedPostsClick = (event) => {
        event.preventDefault()
        props.history.push("/unverified-posts/")
        if(isComponentVisible){
            toggleVisibility()
        }
    }

    const ImagelessPostsClick = (event) => {
        event.preventDefault()
        props.history.push("/imageless-posts/")
        if(isComponentVisible){
            toggleVisibility()
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
            toggleVisibility()
        }
    }

    const ManagementClick = (event) => {
        event.preventDefault()
        props.history.push("/project-management/")
        if(isComponentVisible){
            toggleVisibility()
        }
    }
    const logoutClick = (event) => {
        event.preventDefault()
        //console.log("Logging out")
        props.logout(props.notify, props.settings.strings["logout_notification"])
        var params = {projectId: props.projects.active.id};
        props.initPosts(params)
        toggleVisibility()
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


    const genAccountOptions = () => {
        return [
           {
               name: "About",
               component: () => <About/>
           },
           {
               name: "Name Toggle",
               component: () => <NameToggleSwitch/>
           },
           {
               name: "Theme Toggle",
               component: () => <ThemeToggleSwitch/>
           }
       ]
   }

    return (
        <div className="languageDDContainerActive" ref={ref}>
            <div className="languageDDCurrentItemContainer" onClick={toggleVisibility}>
                {isComponentVisible?
                    <li className="accountItemActive" onClick={toggleVisibility}>
                        <PersonIcon className="personIconActive"/>
                        <DropDownIcon className="dropDownIconActive"/>
                    </li>
                    :
                    <li className="accountItem" onClick={toggleVisibility}>
                        <PersonIcon className="personIcon"/>
                        <DropDownIcon className="dropDownIcon"/>
                    </li>
                }
        </div>

            {isComponentVisible?
                <div>
                    <DropDownList  items={[{string:props.settings?.strings?.["about"], onClickHandler:aboutClick}]}>
                        <ThemeToggleSwitch/>
                        <NameToggleSwitch/>
                    </DropDownList>
                </div>
                :
                <div/>
            }
        </div>
    )
}



const mapStateToProps = (state) => {
    //console.log(state)
    return {
        //maps state to props, after this you can for example call props.notification
        settings: state.settings
    }
}





export default connect(
    mapStateToProps,
)(AcountDropDown)
