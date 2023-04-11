import React, { useState } from 'react';
import NameToggleSwitch from './NameToggleSwitch';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import useComponentVisible from "../hooks/OutsideClick"
import About from './About';

import {connect} from "react-redux";


export const  AcountDropDown = (props) => {

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

    const toggleVisibility = () => {
        setIsComponentVisible(!isComponentVisible)
    }

   const genAccountOptions = () => {
       return [
           {
               name: "About",
               component: <About />
           },
           {
               name: "Name Toggle",
               component: <NameToggleSwitch />
           },
           {
               name: "Theme Toggle",
               component: <ThemeToggleSwitch />
           }
       ]
   }

    return (
        <div className="accountDDContainer" ref={ref}>
            <div className="accountDDCurrentItemContainer" onClick={toggleVisibility}>
                <div className="accountDDCurrentItem">
                    <span className="accountDDText">Account</span>
                    <DropDownIcon className="dropDownIcon" />
                </div>
            </div>

            {isComponentVisible ?
                <div className="dropDownList" >
                    <DropDownList items={genAccountOptions()} />
                </div>
                :
                <div />
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
