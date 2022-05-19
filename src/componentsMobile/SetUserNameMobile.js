import React, {useState} from "react"
import {connect} from "react-redux"
import {changeUsernameReducer} from "../reducers/loginReducer"
import {initPosts} from "../reducers/postReducer"
import {notify} from "../reducers/notificationReducer"
import "../styles/loginForm.css"


export const SetUserNameMobile = (props) => {

    const [username, setUsername] = useState("")
    
    const cancelClick = (event) => {
        event.preventDefault()
        props.history.goBack()
    }
    const UsernameChangeHandler = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }
    const confirmUser = (event) => {
        event.preventDefault()
        props.changeUsernameReducer(username)
        setUsername("")
        props.history.push("/usersettings/")
    }


    return (
        <div className="loginContainerMobile">
            <h1 className="headerText">{props.settings.strings["set_username"]}</h1>

            <form className="loginForm" onSubmit={confirmUser}>
                <div className="inputContainer">
                <input name="username" id="username" className="input" placeholder={props.settings.strings["user_name"]} maxLength="100" autoComplete="off" onChange={UsernameChangeHandler} value={username}/>
                </div>
                <div className="postFormButtonContainer">
                    <button type="submit"
                            className="positiveButton rippleButton fillButton">{props.settings.strings["continue"]}</button>
                    <button className="negativeButton rippleButton fillButton"
                            onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
                </div>
            </form>
        </div>
    )
}
    


const mapStateToProps = (state) => {
    return {
        //maps state to props, after this you can for example call props.notification
        settings: state.settings,
        projects: state.projects,
        user: state.user
    }
}

const mapDispatchToProps = {
    //connect reducer functions/dispatchs to props
    //notify (for example)
    notify,
    initPosts,
    changeUsernameReducer
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetUserNameMobile)
