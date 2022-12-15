import { useState } from "react"
import { connect } from "react-redux"
import { changeUserSettings } from "../reducers/loginReducer"
import { notify } from "../reducers/notificationReducer"
import "../styles/userSettings.css"

import { ReactComponent as ReturnIcon } from "../resources/arrow_back.svg"

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
    //console.log("deleting account")
    //TODO
  }

  const modifyConfirmClick = async (event) => {
    //console.log("attempting profile modification")
    event.preventDefault()
    if(event.target.firstName.value === "" && event.target.lastName.value === "" && event.target.email.value === "" && event.target.city.value === "" && event.target.dob.value === "")
    {
       props.notify(props.settings.strings["no_new_changes"], false, 5)
    }
    else
    {

    
        const modifiedUser = {
          "new_firstName": event.target.firstName.value,
          "new_lastName": event.target.lastName.value,
          "new_country": event.target.country.value,
          "new_city": event.target.city.value,
          "new_dob": event.target.dob.value
        }

        
          // const ok = await modifyService.modifyRequest(modifiedUser)
          props.changeUserSettings(modifiedUser.new_firstName, modifiedUser.new_lastName, modifiedUser.new_country, modifiedUser.new_city, modifiedUser.new_dob)
          //console.log(modifiedUser)
          props.notify(props.settings.strings["account_modify_ok"], false, 8)
          props.history.push("/my-account/")

    }

  }

{/*
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
  }else{ */}
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
       {/* <div className="deleteAccountButtonContainerMobile">
          <button className="rippleButton" onClick={toggleDeleteAccount}>{props.settings.strings["delete_account"]}</button>
        </div>*/}

        <form className="userSettingsFormMobile" onSubmit={modifyConfirmClick}>

            <div>
                <div className="infoTextContainer">
                  <p className="normalText">{props.settings.strings["enter_values_to_change"]}</p>
                </div>
                <div className="inputContainer">

                  <input name="firstName" className="input" required placeholder={props.user !== null && props.user.first_name !== "" ?  props.settings.strings["first_name"] + ": " + props.user.first_name : props.settings.strings["first_name"]} maxLength="32"/>
                  <div className="inputFocusLine"/>
                </div>
                <div className="inputContainer">
                  <input name="lastName" className="input" required placeholder={props.user !== null && props.user.last_name !== "" ? props.settings.strings["last_name"] + ": " + props.user.last_name : props.settings.strings["last_name"]} maxLength="32"/>
                  <div className="inputFocusLine"/>
                </div>

                <div className="inputContainer">
                  <input name="country" className="input" required placeholder={props.user !== null && props.user.country !== "" ? props.settings.strings["country"] + ": " + props.user.country : props.settings.strings["country"]} maxLength="2"/>
                  <div className="inputFocusLine"/>
                </div>

                <div className="inputContainer">
                  <input name="city" className="input" required placeholder={props.user !== null && props.user.city !== "" ? props.settings.strings["city"] + ": " + props.user.city : props.settings.strings["city"]} maxLength="32"/>
                  <div className="inputFocusLine"/>
                </div>

                <div className="inputContainer">
                  <input type="date" name="dob" className="input" required maxLength="32"/>
                  <div className="inputFocusLine"/>
                </div>
              </div>

        
        <div className="dualButtonContainer">
          <button className="positiveButton rippleButton fillButton">{props.settings.strings["confirm"]}</button>
          <button className="negativeButton rippleButton fillButton" onClick={() => props.history.push("/my-account/")}>{props.settings.strings["cancel"]}</button>
        </div>
        </form>
      </div>
    )
  }

//}
const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
    user: state.user
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  changeUserSettings
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettingsMobile)