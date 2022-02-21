import React from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import signUpService from "../services/register"
import "../styles/someSignUp.css"
import "../styles/inputs.css"

import ReactDOM from "react-dom"

const ReactMarkdown = require("react-markdown")
export const SoMeSignUpFirstTime = (props) => {

    /*
    Sign up component
    has two sections:
    1. the form to fill all necessary details before signing up.
    2. Scrollable text box containing the terms of service.
    */
    props.settings.strings["firstLogin"] = false

    let userReady = false
    let newUser = {
      "firstName": "",
      "lastName": "",
      "dob": "",
      "city": "",
      "email": "",
      "username": "",
      "password": ""
    }

    const signUpClick = async (event) => {
      //check Values locally, if ok send to backend, otherwise notify.
      //TODO
      event.preventDefault()

      const year = (new Date()).getFullYear()
      const years = Array.from(new Array(20),( val, index) => index + year)

      if(event.target.dob.value === "" || event.target.city.value === "" || newUser.firstName === ""){
        props.notify(props.settings.strings["unfilled_fields"], true, 8)
      }else if(event.target.tos_check.checked === false){
        //tos check
        props.notify(props.settings.strings["tos_unchecked"], true, 8)
      }else{
          newUser.dob = event.target.dob.value
          newUser.city = event.target.city.value
          userReady = true
      }

      if(userReady === true){
          console.log('tällänen uuseri tuloillaan: ' + JSON.stringify(newUser))

          /*try{
            const ok = await signUpService.signUpRequest(newUser)
            props.notify("Account Creation Succesfull.", false, 5)
            props.history.push("/")
          }catch(error){
            //if the loginservice returns error or doesn't answer error is catched and user notified..
            console.log('error: ' + JSON.stringify(error));
            console.log(error.response['data'])
            props.notify(error.response['data']['error'] + ": " + error.response['data']['msg'], false, 5)
          }*/
      }

    }

    return(
        <div className="signUpContainer centerAlignWithPadding">
            <div className="signUpTitleContainer">
                <h1 className="titleText">Social Media Signup</h1>
            </div>
                
            <div className="signUpContainerInner">
            <form className="signUpForm" onSubmit={signUpClick}>
                <div className="signUpInputsContainer">
                    <div className="inputContainer">
                        <input name="dob" type="year" className="input" placeholder={props.settings.strings["dob"]} maxLength="32"/>
                        <div className="inputFocusLine"/>
                        </div>
                    </div>
                    <div className="inputContainer">
                        <input name="city" className="input" placeholder={props.settings.strings["city"]} maxLength="32"/>
                        <div className="inputFocusLine"/>
                        </div>
                    <div>
                    <div className="inputContainer">
                      <input name="tos_check" type="checkbox"/>
                      {props.settings.strings["tos_checkbox_text"]}
                    </div>
                </div>
                <div className="postFormButtonContainer">
                    <button className="positiveButton rippleButton fillButton">{props.settings.strings["sign_up"]}</button>
                    <button className="negativeButton rippleButton fillButton" onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
                </div>
            </form>
            <div className="signUpTerms">
                <div className="termsContainer">
                    <h2 className="titleText">{props.settings.strings["tos_title"]}</h2>
                    <p className="normalText"><ReactMarkdown source={props.settings.strings["tos_text"]} /></p>
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
)(SoMeSignUpFirstTime)
