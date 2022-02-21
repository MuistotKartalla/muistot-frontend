import React, {useState} from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import "../styles/userSettings.css"

import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"

export const UserSettingsMobile = (props) => {
  /*
  Component for configuring user settings. Change password etc.
  */

  const [deleteAccount, setDeleteAccount] = useState(false)

  const toggleDeleteAccount = (event) => {
    event.preventDefault()
    setDeleteAccount(!deleteAccount)

  }
  const deleteAccountConfirmClick = (event) => {
    event.preventDefault()
    console.log("deleting account")
    //TODO
  }


  if(deleteAccount){
    return(
      <div className="userSettingsContainerMobile">
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={toggleDeleteAccount}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{props.settings.strings["delete_account"]}</h1>
          </div>
        </div>

        <form className="userSettingsFormMobile">

          <div>
            <div className="infoTextContainer">
              <p className="normalText"></p>
              <p className="normalText">{props.settings.strings["delete_account_confirm"]}</p>
              <p className="normalText">{props.settings.strings["enter_pass_to_confirm"]}</p>
            </div>

            <div className="inputContainer">
              <input name="password" className="input" type="password" placeholder={props.settings.strings["password"]} maxLength="64"/>
              <div className="inputFocusLine"></div>
            </div>
          </div>


        </form>
        <div className="dualButtonContainer">
          <button className="positiveButton rippleButton fillButton" onClick={deleteAccountConfirmClick}>{props.settings.strings["confirm"]}</button>
          <button className="negativeButton rippleButton fillButton" onClick={toggleDeleteAccount}>{props.settings.strings["cancel"]}</button>
        </div>
      </div>
    )
  }else{
    return(
      <div className="userSettingsContainerMobile">
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={() => props.history.goBack()}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{props.settings.strings["account_settings"]}</h1>
          </div>
        </div>
        <div className="deleteAccountButtonContainerMobile">
          <button className="rippleButton" onClick={toggleDeleteAccount}>{props.settings.strings["delete_account"]}</button>
        </div>

        <form className="userSettingsFormMobile">

          <div>
            <div className="infoTextContainer">
              <p className="normalText">{props.settings.strings["enter_values_to_change"]}</p>
            </div>
            <div className="inputContainer">
              <input name="firstName" className="input" placeholder={props.settings.strings["first_name"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>
            <div className="inputContainer">
              <input name="lastName" className="input" placeholder={props.settings.strings["last_name"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input type="email" name="email" className="input" placeholder={props.settings.strings["email"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input name="username" className="input" placeholder={props.settings.strings["user_name"]} maxLength="32"/>
              <div className="inputFocusLine"/>
            </div>

            <div className="inputContainer">
              <input name="password" className="input" type="password" placeholder={props.settings.strings["new_password"]} maxLength="64"/>
              <div className="inputFocusLine"></div>
            </div>

            <div className="inputContainer">
              <input name="password2" className="input" type="password" placeholder={`${props.settings.strings["confirm"]} ${props.settings.strings["new_password"]}`} maxLength="64"/>
              <div className="inputFocusLine"></div>
            </div>

          </div>
          <div>
            <div className="infoTextContainer">
              <p className="normalText">{props.settings.strings["enter_pass_to_confirm"]}</p>
            </div>

            <div className="inputContainer">
              <input name="password" className="input" type="password" placeholder={props.settings.strings["new_password"]} maxLength="64"/>
              <div className="inputFocusLine"></div>
            </div>
          </div>


        </form>
        <div className="dualButtonContainer">
          <button className="positiveButton rippleButton fillButton">{props.settings.strings["confirm"]}</button>
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
)(UserSettingsMobile)