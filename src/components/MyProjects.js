// Based on the MyPosts component
// Borrows MyPosts component's styles
import { useState } from "react"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import { setActiveProject } from "../reducers/projectReducer"
import { initPosts } from "../reducers/postReducer"
import { getImageURL } from "../services/images"
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

  const [usersProjects] = useState(props.projects?.projects?.filter((project) => (
    project.moderators?.find((moderator) => moderator === props.user?.username)
  )))

  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    props.history.push("/")
  }

  const onProjectClick = (project) => {
    props.setActiveProject(project)
    var params = {projectId: props.projects?.active?.id};
    props.initPosts(params)
    props.history.push("/")
  }

  if (usersProjects.length > 0) {
    return (
      <div className="myPostsContainer centerAlignWithPadding">
      <div className="postTitleContainer">
        <h1 className="titleText centerAlignWithPadding">{props.settings.strings["my_projects"]}</h1>
        <ClearIcon className="clearIcon rightAlignWithPadding" onClick={closeClick}/>
      </div>
      <ul className="myPostsList">
        {usersProjects.map((project, index) =>
          <li key={index} className="postViewListItem" onClick={() => onProjectClick(project)}>
            <div className="postListItemImageContainer">
              <img className="postListImagePreview" src={getImageURL(project.image)} alt=""></img>
            </div>
            <div className="postListItemInfo">
              <h2 className="postListTitle">{project.title}</h2>
            </div>
          </li>
        )}
      </ul>
    </div>
    )
  } else {
    return (
      <div className="myPostsContainer centerAlignWithPaddingContainer">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings["my_projects"]}</h1>
          <ClearIcon className="clearIcon rightAlignWithPadding" onClick={closeClick}/>
        </div>
        <h2 className="headerText">{props.settings.strings["empty_list"]}</h2>
      </div>
    )
  }
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
  notify,
  setActiveProject,
  initPosts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProjects)
