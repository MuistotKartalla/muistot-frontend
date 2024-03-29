import { useState } from "react"
import { connect } from "react-redux"
import { changeUsernameReducer } from "../reducers/loginReducer"
import { notify } from "../reducers/notificationReducer"
import { initPosts } from "../reducers/postReducer"
import "../styles/loginForm.css"

export const SetUserName = (props) => {

	const [username, setUsername] = useState("")

	const cancelClick = (event) => {
		event.preventDefault()
		props.history.goBack()
	}

	const UsernameChangeHandler = (event) => {
		event.preventDefault()
		setUsername(event.target.value)
	}

	const confirmUser = (event) => {
		event.preventDefault()
		props.changeUsernameReducer(username)
		setUsername("")
		props.history.push("/usersettings/")
	}

	return (
		<div className="loginContainer centerAlignWithPaddingContainer">
			<h1 className="headerText bottomPadding30">{props.settings.strings["set_username"]}</h1>
			<form className="loginForm" onSubmit={confirmUser}>
				<div className="inputContainer">
					<input
						name="username"
						id="username"
						className="input"
						placeholder={props.settings.strings["user_name"]}
						maxLength="100"
						autoComplete="off"
						onChange={UsernameChangeHandler}
						value={username}
					/>
				</div>
				<div className="postFormButtonContainer">
					<button type="submit" className="positiveButton rippleButton fillButton">
						{props.settings.strings["continue"]}
					</button>
					<button className="negativeButton rippleButton fillButton" onClick={cancelClick}>
						{props.settings.strings["cancel"]}
					</button>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		//maps state to props, after this you can for example call props.notification
		settings: state.settings,
		projects: state.projects,
		user: state.user
	}
}

const mapDispatchToProps = {
	//connect reducer functions/dispatchs to props
	//notify (for example)
	notify,
	initPosts,
	changeUsernameReducer
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SetUserName)

// SetUserName: This component is used in ContentArea.js. The component uses the useState hook to manage the state of the input field for the username. When the form is submitted, it calls confirmUser function,
//  which dispatches an action to update the username in the store using changeUsernameReducer from the loginReducer.
