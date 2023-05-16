import { useState } from "react"
import { connect } from "react-redux"
import { login, sendverifylink } from "../reducers/loginReducer"
import { notify } from "../reducers/notificationReducer"
import { initPosts } from "../reducers/postReducer"
import "../styles/loginForm.css"

//import GoogleLogin from "react-google-login"
//import FacebookLogin from "react-facebook-login"
import axios from "axios"
import { EMAIL_ONLY_LOGIN } from "../services/paths"

export const LoginForm = (props) => {

    const [loginSuccessful, setLoginSuccessful] = useState(false)

    const cancelClick = (event) => {
        event.preventDefault()
        props.history.push("/")
    }
/*
    const someFail = () => {
        props.history.push("/" + props.settings.strings["cancel"])
        props.notify("Social media authentication failed please try again", false, 5)
    }

    const responseGoogle = async (response) => {
    }

    const responseFacebook = async (response) => {
    }
*/

    if (loginSuccessful) {
        return (
            <div className="loginContainer centerAlignWithPaddingContainer">
                <h1 className="headerText2 BottomPadding30">{props.settings.strings["login_or_register"]}</h1>
                <div className="normalText textCenter bottomPadding30">{props.settings.strings["link_info"]}</div>
                <div className="postFormButtonContainer">
                    <button className="positiveButton rippleButton fillButton" onClick={cancelClick}>{props.settings.strings["continue"]}</button>
                </div>
            </div>
        )
    }

    return (
        <div className="loginContainer centerAlignWithPaddingContainer">
            <h1 className="headerText2 bottomPadding30">{props.settings.strings["login_or_register"]}</h1>
{/*             TODO: fix social media integration             

                <div className="signUpTitleContainer">
                <GoogleLogin
                    clientId="472567314178-p1qosj4m14piq95sn4ef35frp2i5bsgm.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    onSuccess={responseGoogle}
                    onFailure={e => //console.log(e)}
                    cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                    appId="392311575419876"
                    autoLoad={false}
                    fields="birthday,hometown,name,email,picture"
                    callback={responseFacebook}
                    onFailure={someFail}
                    cssClass="someButtonFacebook"
                    icon="fa-facebook"
                />
            </div>
            <div className="separatorLine"><span className="separatorText">{props.settings.strings["or"]}</span></div> */}
            <form className="loginForm" name="loginForm" onSubmit={e => {
                e.preventDefault();
                const email = document.getElementById("email-input-field-0").value;
                (async () => await axios.post(EMAIL_ONLY_LOGIN, null, {params: {email: email}}))();
                setLoginSuccessful(true);
            }}>
                <div className="inputContainer">
                    <input id="email-input-field-0" className="inputLogIn" type="email" placeholder={props.settings.strings["email"]}
                           maxLength="32" required/>
                    <div className="inputFocusLine"/>
                    <div className="infoText">{props.settings.strings["login_info"]}</div>
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
        projects: state.projects
    }
}

const mapDispatchToProps = {
    //connect reducer functions/dispatchs to props
    //notify (for example)
    login,
    notify,
    initPosts,
    sendverifylink
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)



// LoginForm: It is used in ContentArea.js.The LoginForm component takes in props as input, including history, which is used to navigate to other pages, and settings, which is an object containing various settings.
//  It renders a form for users to log in with their email address. If the login is successful, the component renders a confirmation message and a button to continue. 
