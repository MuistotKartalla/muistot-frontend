import React, {useState} from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import * as signUpService from "../services/register"
import "../styles/signUp.css"
import "../styles/inputs.css"

import GoogleLogin from "react-google-login"
import FacebookLogin from "react-facebook-login"
import Recaptcha from "react-recaptcha"

const ReactMarkdown = require("react-markdown")

let newUser = {
    "firstName": "",
    "lastName": "",
    "dob": "",
    "email": "",
    "username": "",
    "password": "",
    "kunta": "",
    "logintype": ""
}
let usesSome = false;

export const SignUp = (props) => {

    /*
        Sign up component
        has two sections:
        1. the form to fill all necessary details before signing up.
        2. Scrollable text box containing the terms of service.
    */

    const [isSome, setIsSome] = useState(false)
    const [isSomeWorking, setIsSomeWorking] = useState(false)
    const [isVerified, setVerified] = useState(false)
    const [showRecaptcha, setShowRecaptcha] = useState(false)


    const someClick = (event) => {
        event.preventDefault()
        setShowRecaptcha(!showRecaptcha)
    }

    const recaptchacallback = () => {
        setVerified(!isVerified)
        setIsSome(!isSome)
        setShowRecaptcha(!showRecaptcha)
    }

    const recaptchacaLoaded = () => {
        //console.log('recaptcha loaded')
    }

    const someFail = () => {
        props.history.push("/" + props.settings.strings["cancel"])
        props.notify("Social media authentication failed please try again", false, 5)
    }


    const signUpClick = async (event) => {
        //TODO
        event.preventDefault()
        const year = (new Date()).getFullYear();
        if (!usesSome) {
            if (event.target.firstName.value === "" || event.target.lastName.value === "" || event.target.dob.value === "" || event.target.city.value === "" || event.target.email.value === "" || event.target.username.value === "" || event.target.password.value === "" || event.target.password2.value === "") {
                props.notify(props.settings.strings["unfilled_fields"], true, 8)
            }
            //don't accept all whitespace characters as valid values either
            else if (event.target.firstName.value.trim() === "" || event.target.lastName.value.trim() === "" || event.target.dob.value.trim() === "" || event.target.city.value.trim() === "" || event.target.email.value.trim() === "" || event.target.username.value.trim() === "" || event.target.password.value.trim() === "" || event.target.password2.value.trim() === "") {
                props.notify(props.settings.strings["unfilled_fields"], true, 8)
            } else if (event.target.dob.value < (year - 120)) {
                //dob check, valid range starts from current year - 120
                props.notify(props.settings.strings["invalid_dob"], true, 8)
            } else if (event.target.dob.value > (year - 13)) {
                //user must be older than 13 years
                props.notify(props.settings.strings["user_too_young"], true, 8)
            } else if (event.target.tos_check.checked === false) {
                //tos check
                props.notify(props.settings.strings["tos_unchecked"], true, 8)
            } else if (event.target.password.value.length < 8) {
                //pass length check
                event.target.password.value = ""
                event.target.password2.value = ""
                props.notify(props.settings.strings["password_reqs_not_met"], true, 8)
            } else if (event.target.password.value !== event.target.password2.value) {
                // password match check
                event.target.password.value = ""
                event.target.password2.value = ""
                props.notify(props.settings.strings["passwords_dont_match"], true, 8)
            } else {

                newUser.firstName = event.target.firstName.value
                newUser.lastName = event.target.lastName.value
                newUser.dob = event.target.dob.value
                newUser.kunta = event.target.city.value
                newUser.email = event.target.email.value
                newUser.username = event.target.username.value
                newUser.password = event.target.password.value

                //set type so UserSettings shows the right option
                newUser.logintype = "regular"


                try {
                    await signUpService.register(newUser)
                    props.notify(props.settings.strings["creation_ok_send_link"], false, 5)
                    props.history.push("/")
                } catch (error) {
                    //if the loginservice returns error or doesn't answer error is catched and user notified..
                    //console.log(error.response['data'])
                    props.notify(error.response['data']['error'] + ": " + error.response['data']['msg'], false, 5)
                }

            }
        } else {
            if (event.target.dob.value === "" || event.target.city.value === "" || event.target.dob.value.trim() === "" || event.target.city.value.trim() === "") {
                props.notify(props.settings.strings["unfilled_fields"], true, 8)
            } else if (event.target.dob.value < (year - 120)) {
                //dob check, valid range starts from current year - 120
                props.notify(props.settings.strings["invalid_dob"], true, 8)
            } else if (event.target.dob.value > (year - 13)) {
                //user must be older than 13 years
                props.notify(props.settings.strings["user_too_young"], true, 8)
            } else if (event.target.tos_check.checked === false) {
                //tos check
                props.notify(props.settings.strings["tos_unchecked"], true, 8)
            } else {
                newUser.dob = event.target.dob.value
                newUser.kunta = event.target.city.value
                //set type so UserSettings shows the right option
                newUser.logintype = "some"

                try {
                    await signUpService.register(newUser)
                    props.notify(props.settings.strings["account_creation_ok"], false, 5)
                    props.history.push("/")
                } catch (error) {
                    //if the loginservice returns error or doesn't answer error is catched and user notified..
                    //console.log(error.response['data'])
                    props.notify(error.response['data']['error'] + ": " + error.response['data']['msg'], false, 5)
                }
            }

        }

    }


    const responseGoogle = async (response) => {
        // TODO
        let profile = response.getBasicProfile();

        newUser.firstName = profile.getGivenName()
        newUser.lastName = profile.getFamilyName()
        newUser.email = profile.getEmail()
        newUser.username = profile.getName()
        newUser.password = profile.getId()

        //moved here, so user info can be shown in the form
        setIsSome(!isSome)
        setIsSomeWorking(!isSomeWorking)
        usesSome = true

    }

    const responseFacebook = async (response) => {
        // TODO
        setIsSome(!isSome)
        setIsSomeWorking(!isSomeWorking)

        newUser.firstName = response.name
        newUser.lastName = response.name
        newUser.email = response.email
        newUser.username = response.name
        newUser.password = response.userID
        usesSome = true
    }

    if (showRecaptcha) {
        return (
            <div className="loginContainer centerAlignWithPadding">
                <div className="signUpTitleContainer">
                    <Recaptcha
                        sitekey="6Lc_DA0aAAAAAGMuVtmxyhVoyNjF7aq87Ee_7eNw"
                        render="explicit"
                        verifyCallback={recaptchacallback}
                        onloadCallback={recaptchacaLoaded}
                    />
                </div>
                <div className="postFormButtonContainer">
                    <button className="negativeButton rippleButton fillButton"
                            onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
                </div>
            </div>
        )
    }

    if (isSome) {
        return (
            <div className="loginContainer centerAlignWithPadding">
                <div className="signUpTitleContainer">
                    <h1 className="titleText">Valitse Tili</h1>
                    <GoogleLogin
                        className="someButtonGoogle"
                        clientId="472567314178-p1qosj4m14piq95sn4ef35frp2i5bsgm.apps.googleusercontent.com"
                        buttonText="Login With Google"
                        onSuccess={responseGoogle}
                        onFailure={someFail}
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
                <div className="postFormButtonContainer">
                    <button className="negativeButton rippleButton fillButton"
                            onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
                </div>
            </div>
        )
    }

    if (isSomeWorking) {
        return (
            <div className="signUpContainer centerAlignWithPadding">
                <div className="signUpTitleContainer">
                    <h1 className="titleText">{props.settings.strings["sign_up"]}</h1>
                </div>

                <div className="signUpContainerInner">

                    <form className="signUpForm" onSubmit={signUpClick}>
                        <div className="signUpInputsContainer">
                            <div className="inputContainer">
                                <p> {props.settings.strings["name"] + " : " + newUser.firstName + " " + newUser.lastName}</p>
                                <p> {props.settings.strings["email"] + " : " + newUser.email}</p>
                            </div>

                            <div className="inputContainer">
                                <input name="dob" type="year" className="input"
                                       placeholder={props.settings.strings["dob"]} maxLength="32"/>
                                <div className="inputFocusLine"/>
                            </div>
                        </div>
                        <div className="inputContainer">
                            <input name="city" className="input" placeholder={props.settings.strings["city"]}
                                   maxLength="32"/>
                            <div className="inputFocusLine"/>
                        </div>
                        <div>
                            <div className="inputContainer">
                                <input name="tos_check" type="checkbox"/>
                                {props.settings.strings["tos_checkbox_text"]}
                            </div>
                        </div>
                        <div className="postFormButtonContainer">
                            <button
                                className="positiveButton rippleButton fillButton">{props.settings.strings["sign_up"]}</button>
                            <button className="negativeButton rippleButton fillButton"
                                    onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
                        </div>
                    </form>
                    <div className="signUpTerms">
                        <div className="termsContainer">
                            <h2 className="titleText">{props.settings.strings["tos_title"]}</h2>
                            <p className="normalText"><ReactMarkdown source={props.settings.strings["tos_text"]}/></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="signUpContainer centerAlignWithPadding">
            <div className="signUpTitleContainer">
                <h1 className="titleText">{props.settings.strings["sign_up"]}</h1>
            </div>
            <div>
                <button className="rippleButton fillButton"
                        onClick={someClick}>{props.settings.strings["use_some_signup"]}</button>
            </div>
            <div className="signUpContainerInner">

                <form className="signUpForm" onSubmit={signUpClick}>
                    <div className="signUpInputsContainer">
                        <div className="inputContainer">
                            <input name="firstName" className="input" placeholder={props.settings.strings["first_name"]}
                                   maxLength="32"/>
                            <div className="inputFocusLine"/>
                        </div>
                        <div className="inputContainer">
                            <input name="lastName" className="input" placeholder={props.settings.strings["last_name"]}
                                   maxLength="32"/>
                            <div className="inputFocusLine"/>
                        </div>
                        <div className="inputContainer">
                            <input name="dob" type="year" className="input" placeholder={props.settings.strings["dob"]}
                                   maxLength="32"/>
                            <div className="inputFocusLine"/>
                        </div>
                        <div className="inputContainer">
                            <input name="city" className="input" placeholder={props.settings.strings["city"]}
                                   maxLength="32"/>
                            <div className="inputFocusLine"/>
                        </div>
                        <div className="inputContainer">
                            <input type="email" name="email" className="input"
                                   placeholder={props.settings.strings["email"]} maxLength="32"/>
                            <div className="inputFocusLine"/>
                        </div>
                    </div>
                    <div>
                        <div className="inputContainer">
                            <input name="username" className="input" placeholder={props.settings.strings["user_name"]}
                                   maxLength="32"/>
                            <div className="inputFocusLine"/>
                        </div>

                        <div className="inputContainer">
                            <input name="password" className="input" type="password"
                                   placeholder={props.settings.strings["password"]} maxLength="64"/>
                            <div className="inputFocusLine"/>
                        </div>
                        <div className="inputContainer">
                            <input name="password2" className="input" type="password"
                                   placeholder={`${props.settings.strings["confirm"]} ${props.settings.strings["password"]}`}
                                   maxLength="64"/>
                            <div className="inputFocusLine"/>
                        </div>
                        <div className="inputContainer">
                            <input name="tos_check" type="checkbox"/>
                            {props.settings.strings["tos_checkbox_text"]}
                        </div>
                    </div>
                    <div className="postFormButtonContainer">
                        <button
                            className="positiveButton rippleButton fillButton">{props.settings.strings["sign_up"]}</button>
                        <button type="button" className="negativeButton rippleButton fillButton"
                                onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
                    </div>
                </form>
                <div className="signUpTerms">
                    <div className="termsContainer normalText">
                        <h2 className="titleText">{props.settings.strings["tos_title"]}</h2>
                        <ReactMarkdown source={props.settings.strings["tos_text"]}/>
                    </div>
                </div>
            </div>
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        //maps state to props, after this you can for example call props.notification
        settings: state.settings
    }
}

const mapDispatchToProps = {
    //connect reducer functions/dispatchs to props
    //notify (for example)
    notify
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)
