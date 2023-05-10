import { connect } from "react-redux"
import { ReactComponent as ReturnIcon } from "../resources/arrow_back.svg"
import "../styles/accountInfo.css"
import "../styles/buttons.css"

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
    if (props.user && (post.own === true || props.currentProject.moderators.find(user => user === props.user.username))) {
        return (
            <div className="userInformationContainerMobile">
                <div className="titleContainerMobile">
                    <div className="userInformationButtonMobile">
                        <button className="mobileButtonContainer">
                            <ReturnIcon className="mobileIcon" onClick={() => props.history.push("/")} />
                        </button>
                    </div>
                    <div className="userInformationTitleMobile">
                        <h1 className="titleTextMobile">{props.user !== null && props.user.username !== "" ? props.user.username : props.settings.strings["profile"]}</h1>
                    </div>
                </div>
                <div className="userInformationMobile">
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
                <div className="userInfoButtonsContainerMobile">
                    <button className="rippleButton" onClick={editUsername}>{props.settings.strings["change_username"]}</button>
                    <button className="rippleButton" onClick={changeInfo}>{props.settings.strings["change_information"]}</button>
                    <button className="rippleButton" onClick={goToMyPosts}>{props.settings.strings["my_posts"]}</button>
                </div>
            </div>
        )
    }else{
        
    }
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
