import React, {useState} from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import signUpService from "../services/register"
import "../styles/someSignUp.css"
import "../styles/inputs.css"

import ReactDOM from "react-dom"
import GoogleLogin from "react-google-login"
import FacebookLogin from "react-facebook-login"

const ReactMarkdown = require("react-markdown")
export const SoMeSignUp = (props) => {

    /*
    Sign up component
    has two sections:
    1. the form to fill all necessary details before signing up.
    2. Scrollable text box containing the terms of service.
    */

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

    const responseGoogle = async (response) => {
      console.log('tällänen vastaus: ' + JSON.stringify(response))
      let profile = response.getBasicProfile()
      console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName())
      console.log('Etu Name: ' + profile.getGivenName())
      console.log('Suku Name: ' + profile.getFamilyName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
      console.log('Id Token: ' + response.getAuthResponse().id_token) // This is null if the 'email' scope is not present.

      props.settings.strings["firstLogin"] = true
      console.log('pliis pelaa saatana ' + props.settings.strings["firstLogin"])

      newUser.firstName = profile.getGivenName()
      newUser.lastName = profile.getFamilyName()
      newUser.email = profile.getEmail()
      newUser.username = profile.getName()
      newUser.password = profile.getId()

      console.log('tällänen uuseri tuloillaan: ' + JSON.stringify(newUser))
      //props.history.push("/some-sign-up-first-time")

    }
    const responseFacebook = async (response) => {
      console.log('tällänen vastaus fabolt: ' + JSON.stringify(response))
      console.log('nimi: ' + response.name)
      console.log('mail:: ' + response.email)
      console.log('uid: ' + response.userID)

      newUser.firstName = response.name
      newUser.lastName = response.name
      newUser.email = response.email
      newUser.username = response.name
      newUser.password = response.userID

      console.log('tällänen uuseri tuloillaan: ' + JSON.stringify(newUser))
      props.history.push("/some-sign-up-first-time")
    }
    return(
        <div className="signUpContainer centerAlignWithPadding">
            <div className="signUpTitleContainer">
                <h1 className="titleText">Social Media Signup</h1>
                <GoogleLogin
                    clientId="1056928503625-pfglb3ec89lrg0legamfpg2h1c44au4v.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                    appId="1184501228565589"
                    autoLoad={false}
                    fields="birthday,hometown,name,email,picture"
                    callback={responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"
                />
            </div>
            <div className="postFormButtonContainer">
                <button className="negativeButton rippleButton fillButton" onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
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
)(SoMeSignUp)
