import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import { ChangeSiteTitle } from "../reducers/postReducer"
import "../styles/buttons.css"
import "../styles/newPost.css"

export const EditSiteTitle = (props) => {
  const post = props.posts.find(item => "" + item.id === props.match.params.id)

  const ConfirmNewTitle = (event) => {
    event.preventDefault()
    if (event.target.newTitle.value === "") {
       props.notify(props.settings.strings["no_new_changes"], false, 5)
    } else {
      props.ChangeSiteTitle(post, event.target.newTitle.value)
      props.notify(props.settings.strings["site_modify_ok"], false, 5)
    }
    props.history.push(`/edit-post/${post.id}`)
  }

  return (
    <div className="userSettingsContainer centerAlignWithPadding">
      <div className="titleContainer">
        <h1 className="titleText">{props.settings.strings["change_title"]}</h1>
      </div>
      <form className="userSettingsForm" onSubmit={ConfirmNewTitle}>
        <div className="inputContainer">
          <input
            name="newTitle"
            className="input"
            placeholder={post.title || "New Title"}
            maxLength="200"
          />
          <div className="inputFocusLine"/>
        </div>
        <div className="dualButtonContainer">
          <button type="submit" className="positiveButton rippleButton fillButton">
            {props.settings.strings["confirm"]}
          </button>
          <button 
            type="button"
            className="negativeButton rippleButton fillButton"
            onClick={() => props.history.push(`/edit-post/${post.id}`)}
          >
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
    posts: state.posts
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,
  ChangeSiteTitle
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSiteTitle)

// EditSiteTitle: The component retrieves the post object to edit from the Redux store based on the id parameter passed in the URL.
//  It then defines a function ConfirmNewTitle which will be called when the form is submitted. The function first checks if the new title is empty and, if so, displays a notification message
//  This is used in CotentArea. 
