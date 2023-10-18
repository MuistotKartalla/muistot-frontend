// Based on the MyPosts component
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import "../styles/buttons.css"
import "../styles/myPosts.css"
import "../styles/postList.css"
import "../styles/texts.css"

/*
* Component that shows list of all projects the current user is admin/manager in.
* Clicking a project in the list redirects to the project page.
* Out of focus click closes the pop up.
*/
export const MyProjects = (props) => {

  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    props.history.push("/")
  }

  /*  TODO
  const onProjectClick = (project) => {
  }
  */

  return (
    /* TODO: Add actual list. Currently only returns the empty list message */
    <div className="myPostsContainer centerAlignWithPaddingContainer">
      <div className="postTitleContainer">
        <h1 className="titleText centerAlignWithPadding">{props.settings.strings["my_projects"]}</h1>
        <ClearIcon className="clearIcon rightAlignWithPadding" onClick={closeClick}/>
      </div>
      <h2 className="headerText">{props.settings.strings["empty_list"]}</h2>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    projects: state.projects,
    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProjects)
