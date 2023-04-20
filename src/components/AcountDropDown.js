 import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"
import {logout, logoutS} from "../reducers/loginReducer"
import {initPosts} from "../reducers/postReducer"

import useComponentVisible from "../hooks/OutsideClick"
// import "../styles/horizontalMenuList.css"
import "../styles/acountDropDown.css"

import { ReactComponent as DropDownIcon } from "../resources/arrow_drop_down-24px.svg"
import { ReactComponent as PersonIcon } from "../resources/person.svg"
import DropDownList from "./DropDownList";
import NameToggleSwitch from './NameToggleSwitch';
import ThemeToggleSwitch from './ThemeToggleSwitch'
import About from './About';
import {useState} from "react";





export const  AcountDropDown = (props) => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

    const toggleVisibility = () => {
        setIsComponentVisible(!isComponentVisible)
    }

    const genItems = () => {

   }

    return (
        <div className="acountDDContainerActive" ref={ref}>
            <div className="acountDDCurrentItemContainer" onClick={toggleVisibility}>
                {isComponentVisible?
                    <li className="accountItemActive">
                        <PersonIcon className="personIconActive"/>
                        <DropDownIcon className="dropDownIconActive"/>
                    </li>
                    :
                    <li className="accountItem">
                        <PersonIcon className="personIcon"/>
                        <DropDownIcon className="dropDownIcon"/>
                    </li>
                }
            </div>

            {isComponentVisible?
                <div>

                    <div className="dropDownContainer">
                        <ul className="dropDownList">
                            {props.children}
                            <ThemeToggleSwitch/>
                            <NameToggleSwitch/>
                            {props.items.map((element,index) =>
                                <div key={index}>
                                    {element.divider?
                                        <div className="divider"></div>
                                        :
                                        <li key={index} className="dropDownListItem" onClick={element.onClickHandler}>
                                            <p className="dropDownItemText">{element.string}</p>
                                        </li>
                                    }
                                </div>

                            )}
                        </ul>
                    </div>
                </div>
                :
                <div/>
            }
        </div>
    )
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


export default connect(mapStateToProps, null)(AcountDropDown)




// // AcountDropDown: This component is a dropdown menu and shows the user options. 
// It defines a component called ContentArea, which is a container for all sub-components of a web page,
//  except for the navigation bar and notifications.The ContentArea component contains several Route components, which are 
//  used to render different components based on the URL path. For example, if the URL path is /login, the LoginForm component is rendered.