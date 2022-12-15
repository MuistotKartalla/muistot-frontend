import { connect } from "react-redux"
import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import "../styles/accountInfo.css"
import "../styles/buttons.css"
import "../styles/postView.css"

export const AccountInfo = (props) => {
    const changeInfo = (event) => {
        event.preventDefault()
        props.history.push("/usersettings/")
    }

    const editUsername = (event) => {
            event.preventDefault()
            props.history.push("/change-username/")
    }

    const goToMyPosts = (event) => {
        event.preventDefault()
        props.history.push("/my-posts/")
    }

    const closeClick = (event) => {
      //go back to the previous page
      event.preventDefault()
      props.history.push("/")
    }

    return(
        <div className="userInformationContainer centerAlignWithPadding">
            <div className="postTitleContainer">
              <h1 className="titleText centerAlignWithPadding">{props.user !== null && props.user.username !== "" ? props.user.username : props.settings.strings["profile"]}</h1>
              <ClearIcon className="clearIcon" onClick={closeClick}/>
            </div>
            <div className="userInformation">
                <table>
                    <tbody>
                        <tr className="userInfoRows">
                            <th className="userInfoValues">{props.settings.strings["first_name"]}</th>
                            <th className="userInfoValues">{props.user !== null && props.user.first_name !== "" ? props.user.first_name : "-"}</th>
                        </tr>
                        <tr className="userInfoRows">
                            <th className="userInfoValues">{props.settings.strings["last_name"]}</th>
                            <th className="userInfoValues">{props.user !== null && props.user.last_name !== "" ? props.user.last_name : "-"}</th>
                        </tr>
                        <tr className="userInfoRows">
                            <th className="userInfoValues">{props.settings.strings["email"]}</th>
                            <th className="userInfoValues">{props.user !== null && props.user.email !== "" ? props.user.email : "-"}</th>
                        </tr>
                        <tr className="userInfoRows">
                            <th className="userInfoValues">{props.settings.strings["country_name"]}</th>
                            <th className="userInfoValues">{props.user !== null && props.user.country !== "" ? props.user.country : "-"}</th>
                        </tr>
                        <tr className="userInfoRows">
                            <th className="userInfoValues">{props.settings.strings["city"]}</th>
                            <th className="userInfoValues">{props.user !== null && props.user.city !== "" ? props.user.city : "-"}</th>
                        </tr>
                        <tr className="userInfoRows">
                            <th className="userInfoValues">{props.settings.strings["birthday"]}</th>
                            <th className="userInfoValues">{props.user !== null && props.user.birth_date !== null ? props.user.birth_date : "-"}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="userInfoButtonsContainer">
                <button className="rippleButton" onClick={changeInfo}>{props.settings.strings["change_information"]}</button>
                <button className="rippleButton" onClick={goToMyPosts}>{props.settings.strings["my_posts"]}</button>
                <button className="rippleButton" onClick={editUsername}>{props.settings.strings["change_username"]}</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        //maps state to props, after this you can for example call props.notification
        settings: state.settings,
        user: state.user
    }
}

export default connect(
    mapStateToProps
)(AccountInfo)
