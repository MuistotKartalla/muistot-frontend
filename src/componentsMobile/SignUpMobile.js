import React, {useState} from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import "../styles/signUp.css"
import "../styles/inputs.css"

import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"
const ReactMarkdown = require('react-markdown')

export const SignUpMobile = (props) => {
  const [showTerms, setShowTerms] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [DOB, setDOB] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [tosCheck, setTosCheck] = useState(false)


  /*
  Sign up component for mobile

  */



  const signUpClick = (event) => {
    //check Values locally, if ok send to backend, otherwise notify.
    //TODO

    event.preventDefault()
    // const newUser = {
    //   "firstName": firstName,
    //   "lastName": lastName,
    //   "dob": DOB,
    //   "email": email,
    //   "username": username,
    //   "password": password
    // }

    if(firstName === "" || lastName === "" || DOB === "" || email === "" || username === "" || password === "" || password2 === ""){
      props.notify(props.settings.strings["unfilled_fields"], true, 8)
    }else if(event.target.tos_check.checked === false){
      //tos check
      props.notify(props.settings.strings["tos_unchecked"], true, 8)
    }else if(password.length < 8){
      //pass length check
      setPassword("")
      setPassword2("")
      props.notify(props.settings.strings["password_reqs_not_met"], true, 8)
    }else if(password !== password2){
      // password match check
      setPassword("")
      setPassword2("")
      props.notify(props.settings.strings["passwords_dont_match"], true, 8)
    }
  }

  const toggleTermsClick = (event) => {
    event.preventDefault()
    setShowTerms(!showTerms)
  }
  if(showTerms){
    return(
      <div className="termsPageContainer">
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={toggleTermsClick}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{props.settings.strings["tos_title"]}</h1>
          </div>
        </div>
        <div className="signUpTermsMobile">
          <div className="termsContainerMobile normalText">
		<ReactMarkdown source={props.settings.strings["tos_text"]} /> 
          </div>
        </div>
      </div>

    )
  }else{
    return(
      <div className="signUpContainerMobile">
        <form className="signUpFormMobile">
          <div className="titleContainerMobile">
            <button className="mobileButtonContainer">
              <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
            </button>
            <div className="titleHeaderMobile">
              <h1 className="titleTextMobile">{props.settings.strings["sign_up"]}</h1>
            </div>
          </div>
          <div className="signUpInputsContainer">
            <div className="inputContainer">
              <input name="firstName" className="input" value={firstName} placeholder={props.settings.strings["first_name"]} maxLength="32" onChange={(event) => {setFirstName(event.target.value)}}/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input name="lastName" className="input" value={lastName} placeholder={props.settings.strings["last_name"]} maxLength="32" onChange={(event) => {setLastName(event.target.value)}}/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input name="dob" type="date" className="input" value={DOB} placeholder={props.settings.strings["dob"]} maxLength="32" onChange={(event) => {setDOB(event.target.value)}}/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input type="email" name="email" className="input" value={email} placeholder={props.settings.strings["email"]} maxLength="32" onChange={(event) => {setEmail(event.target.value)}}/>
              <div className="inputFocusLine"/>
            </div>
          </div>

          <div>
            <div className="inputContainer">
              <input name="username" className="input" value={username} placeholder={props.settings.strings["user_name"]} maxLength="32" onChange={(event) => {setUsername(event.target.value)}}/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input name="password" className="input" type="password" value={password} placeholder={props.settings.strings["password"]} maxLength="128" onChange={(event) => {setPassword(event.target.value)}}/>
              <div className="inputFocusLine"></div>
            </div>

            <div className="inputContainer">
              <input name="password2" className="input" type="password" value={password2} placeholder={`${props.settings.strings["confirm"]} ${props.settings.strings["password"]}`} maxLength="128" onChange={(event) => {setPassword2(event.target.value)}}/>
              <div className="inputFocusLine"></div>
            </div>
            <button className="rippleButton fillButton" onClick={toggleTermsClick}>{props.settings.strings["read_tos"]}</button>
            <div className="inputContainer">
              <input name="tos_check" type="checkbox" checked={tosCheck} onChange={(event) => {setTosCheck(event.target.checked)}}/>
              {props.settings.strings["tos_checkbox_text"]}
            </div>

          </div>

        </form>
        <div className="postFormButtonContainer">
          <button className="positiveButton rippleButton fillButton" onClick={signUpClick}>{props.settings.strings["sign_up"]}</button>
          <button className="negativeButton rippleButton fillButton" onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
        </div>




      </div>

    )
  }

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
)(SignUpMobile)
