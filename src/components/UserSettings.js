import { connect } from "react-redux"
import { changeUserSettings, logout } from "../reducers/loginReducer"
import { notify } from "../reducers/notificationReducer"
import "../styles/userSettings.css"

/* 
TODO: FIX THIS IMPLEMENTATION WHEN THE REDUCER IS FIXED.
GITHUB ISSUE #139
*/
export const UserSettings = (props) => {
  /*
  Component for configuring user settings. Change password etc.
  */
  /*
    const [deleteAccount, setDeleteAccount] = useState(false)
    let logintype = props.user !== null ? props.user.Logintype : "regular"
    console.log(props.user)

    const toggleDeleteAccount = (event) => {
      event.preventDefault()
      setDeleteAccount(!deleteAccount)

    }
    const deleteAccountConfirmClick = async (event) => {
      event.preventDefault()
      if(event.target.password.value === "")
      {
         props.notify("Enter password to proceed.", false, 5)
      }
      else{

          const deletedUser = {
            "username": props.user.Tunnus,                        //needed for identifying user
            "password": event.target.password.value
          }

          try{
            // const ok = await deleteService.deleteRequest(deletedUser)
            props.history.push("/")
            props.logout(props.notify, props.settings.strings["account_delete_ok"])
          }catch(error){
            console.log(error.response['data'])
            props.notify(error.response['data']['error'] + ": " + error.response['data']['msg'], false, 5)
          }
      }
    }

    const deleteAccountConfirmClickSoMe = async (event) => {
      event.preventDefault()

      const deletedUser = {
        "username": props.user.Tunnus                       //needed for identifying user
      }

      try{
        // const ok = await deleteSoMeService.deleteSoMeRequest(deletedUser)
        props.history.push("/")
        props.logout(props.notify, props.settings.strings["account_delete_ok"])
      }catch(error){
        console.log(error.response['data'])
        props.notify(error.response['data']['error'] + ": " + error.response['data']['msg'], false, 5)
      }

    }
  */
  const modifyConfirmClick = async (event) => {

    event.preventDefault()
    if (event.target.city.value === "" && event.target.dob.value === "") {
      props.notify(props.settings.strings["no_new_changes"], false, 5)
    } else {
      const modifiedUser = {
        "new_country": event.target.country.value,
        "new_city": event.target.city.value,
        "new_dob": event.target.dob.value,
      }
      // const ok = await modifyService.modifyRequest(modifiedUser)
      props.changeUserSettings(modifiedUser.new_country, modifiedUser.new_city, modifiedUser.new_dob)
      props.notify(props.settings.strings["account_modify_ok"], false, 8)
      props.history.push("/my-account/")
    }
  }
  /*
    const modifyConfirmClickSoMe = async (event) => {
    //console.log("attempting profile modification")
    event.preventDefault()
    if(event.target.city.value === "")
    {
       props.notify("No changes to make.", false, 5)
    }
    else
    {
        const modifiedUser = {
          "new_city": event.target.city.value,
          "username": props.user.Tunnus                        //needed for identifying user
        }

        try{
          // const ok = await modifySoMeService.modifySoMeRequest(modifiedUser)
          props.notify(props.settings.strings["account_modify_ok"], false, 8)
          props.history.push("/")
        }catch(error){
          console.log(error.response['data'])
          props.notify(error.response['data']['error'] + ": " + error.response['data']['msg'], false, 5)
        }
    }

  }


  if(logintype === "some")
 {
     if(deleteAccount){
        return(
          <div className="userSettingsContainer">
            <div className="titleContainer">
              <h1 className="titleText">{props.settings.strings["delete_account"]}</h1>
            </div>

            <form className="userSettingsForm" onSubmit={deleteAccountConfirmClickSoMe}>
              <div>
                <div className="infoTextContainer">
                  <p className="normalText"/>
                  <p className="normalText">{props.settings.strings["delete_account_confirm"]}</p>
                </div>
              </div>

              <div className="dualButtonContainer">
                <button className="positiveButton rippleButton fillButton">{props.settings.strings["confirm"]}</button>
                <button className="negativeButton rippleButton fillButton" onClick={toggleDeleteAccount}>{props.settings.strings["cancel"]}</button>
              </div>

            </form>
          </div>
        )
      }
       else{
        return(
          <div className="userSettingsContainer centerAlignWithPadding">
            <div className="titleContainer">
              <h1 className="titleText">{props.settings.strings["account_settings"]}</h1>
            </div>
            <div className="deleteAccountButtonContainer">
              <button className="rippleButton" onClick={toggleDeleteAccount}>{props.settings.strings["delete_account"]}</button>
            </div>

            <form className="userSettingsForm" onSubmit={modifyConfirmClickSoMe}>

              <div>
                <div className="infoTextContainer">
                  <p className="normalText">{props.settings.strings["enter_values_to_change"]}</p>
                  <p className="normalText">{props.settings.strings["enter_values_to_change_some"]}</p>
                </div>
                <div className="inputContainer">
                  <p>{props.user !== null && props.user.Etunimi !== "" ?  props.settings.strings["first_name"] + ": " + props.user.Etunimi : props.settings.strings["first_name"]}</p>
                  <p>{props.user !== null && props.user.Sukunimi !== "" ? props.settings.strings["last_name"] + ": " + props.user.Sukunimi : props.settings.strings["last_name"]}</p>
                  <p>{props.user !== null && props.user.email !== "" ? props.settings.strings["email"] + ": " + props.user.email : props.settings.strings["email"]}</p>
                </div>

                <div className="inputContainer">
                  <input name="city" className="input" placeholder={props.user.Paikkakunta !== "" ? props.settings.strings["city"] + ": " + props.user.Paikkakunta : props.settings.strings["city"]} maxLength="32"/>
                  <div className="inputFocusLine"/>
                </div>

              </div>

              <div className="dualButtonContainer">
                <button className="positiveButton rippleButton fillButton">{props.settings.strings["confirm"]}</button>
                <button className="negativeButton rippleButton fillButton" onClick={() => props.history.push("/")}>{props.settings.strings["cancel"]}</button>
              </div>


            </form>
          </div>
        )
      }
 }
 else
 {
      if(deleteAccount){
        return(
          <div className="userSettingsContainer">
            <div className="titleContainer">
              <h1 className="titleText">{props.settings.strings["delete_account"]}</h1>
            </div>

            <form className="userSettingsForm" onSubmit={deleteAccountConfirmClick}>

              <div>
                <div className="infoTextContainer">
                  <p className="normalText"/>
                  <p className="normalText">{props.settings.strings["delete_account_confirm"]}</p>
                  <p className="normalText">{props.settings.strings["enter_pass_to_confirm"]}</p>
                </div>

                <div className="inputContainer">
                  <input name="password" className="input" type="password" placeholder={props.settings.strings["password"]} maxLength="64"/>
                  <div className="inputFocusLine"/>
                </div>
              </div>

              <div className="dualButtonContainer">
                <button className="positiveButton rippleButton fillButton">{props.settings.strings["confirm"]}</button>
                <button className="negativeButton rippleButton fillButton" onClick={toggleDeleteAccount}>{props.settings.strings["cancel"]}</button>
              </div>

            </form>
          </div>
        )
      }


      else{ */

  const redirectToLoginPage = () => {
    props.history.push("/login")
  }

  // If user is not logged in redirect to login page
  if (!props.user) {
    redirectToLoginPage()
    return <div />
  }

  return (
    <div className="userSettingsContainer centerAlignWithPadding">
      <div className="titleContainer">
        <h1 className="titleText">{props.settings.strings["account_settings"]}</h1>
      </div>
      {/*<div className="deleteAccountButtonContainer">
            <button className="rippleButton" onClick={toggleDeleteAccount}>{props.settings.strings["delete_account"]}</button>
      </div> */}
      <form className="userSettingsForm" onSubmit={modifyConfirmClick}>
        <div>
          <div className="infoTextContainer">
            <p className="normalText">{props.settings.strings["enter_values_to_change"]}</p>
          </div>
          <div className="inputContainer">
            <input 
              name="country"
              className="input"
              placeholder={props.user !== null && props.user.country !== ""
                ? props.settings.strings["country"] + ": " + props.user.country
                : props.settings.strings["country"]} 
              maxLength="2"
            />
            <div className="inputFocusLine"/>
          </div>
          <div className="inputContainer">
            <input
              name="city"
              className="input"
              placeholder={props.user !== null && props.user.city !== ""
                ? props.settings.strings["city"] + ": " + props.user.city
                : props.settings.strings["city"]} 
              maxLength="32"
            />
            <div className="inputFocusLine"/>
          </div>
          <div className="inputContainer">
            <input type="month" name="dob" className="input" maxLength="32"/>
            <div className="inputFocusLine"/>
          </div>
        </div>
        <div className="dualButtonContainer">
          <button className="positiveButton rippleButton fillButton">
            {props.settings.strings["confirm"]}
          </button>
          <button
            className="negativeButton rippleButton fillButton"
            onClick={() => props.history.push("/my-account/")}
          >
            {props.settings.strings["skip"]}
          </button>
        </div>
      </form>
    </div>
  )
}
//}

//}
const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    user: state.user
  }
}

const mapDispatchToProps = {
  notify,
  logout,
  changeUserSettings
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettings)
