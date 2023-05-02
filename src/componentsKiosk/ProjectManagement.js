import { useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"

import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import "../styles/accountInfo.css"
import "../styles/postView.css"

export const ProjectManagement = (props) => {
  //declare some variables
  const [project, setProject] = useState(props.projects.active)
  const [posts, setPosts] = useState(props.posts)
  const [csvData, setCsvData] = useState([])
  const [moderatorList, setModeratorList] = useState([])

  //in useEffect, check if we have some active project, check its posts and update data for csv download
  useEffect(() => {
    if(!project.title){
      setProject(props.projects.active)
    }
    //check that we have all correct posts
    if(props.posts !== posts){
      setPosts(props.posts)
    }
    //if there is no csv data, generate it
    if(csvData.length <= 1){
      const postsData = [["Project", "Project moderators", "Site ID", "Site title", "Site creator", "Last modifier", "Memories", "Location latitude", "Location longitude", "Abstract"]]
      posts.map((post) => postsData.push([project.title, project.moderators, post.id, post.title, post.creator, post.modifier, post.muistoja, post.location.lat, post.location.lng, post.abstract]))
      //update data to csvData variable
      setCsvData(postsData)
    }
    //initialize new list of moderators with ',' between items for display purposes
    if (moderatorList.length <= 1) {
      const modlist = []
      project.moderators.map((value) => modlist.push(value + ", "))
      //remove ',' from last item and add it back
      let lastItem = modlist.pop().slice(0, -2)
      modlist.push(lastItem)
      setModeratorList(modlist)
    }
  }, [props, project.title, posts, csvData.length, project.moderators, moderatorList.length])

  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    props.history.push("/")
  }

  const changeProjectInfo = (event) => {
    //go to project settings page
    event.preventDefault()
    props.history.push("/project-settings")
  }

  const addModeratorClick = (event) => {
    //go to moderator settings page
    event.preventDefault()
    props.history.push("/project-moderators")
  }

  if(props.user && project.moderators.find(user => user === props.user.username)){
    return (
      <div className="userInformationContainer centerAlignWithPaddingContainer">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings["project_management"]}</h1>
          <ClearIcon className="clearIcon" onClick={closeClick}/>
        </div>
        <div className="userInformation">
          <table>
              <tbody>
                <tr className="userInfoRows">
                  <th className="userInfoValues">{props.settings.strings["project_id"]}</th>
                  <th className="userInfoValues">{project.id !== null ? project.id : "-"}</th>
                </tr>
                <tr className="userInfoRows">
                  <th className="userInfoValues">{props.settings.strings["project_title"]}</th>
                  <th className="userInfoValues">{project.title !== null ? project.title : "-"}</th>
                </tr>
                <tr className="userInfoRows">
                  <th className="userInfoValues">{props.settings.strings["project_mod"]}</th>
                  <th className="userInfoValues">{project.moderators !== null ? moderatorList : "-"}</th>
                </tr>
                <tr className="userInfoRows">
                  <th className="userInfoValues">{props.settings.strings["project_sites"]}</th>
                  <th className="userInfoValues">{posts.length  > 1 ? posts.length : "-"}</th>
                </tr>
                <tr className="userInfoRows">
                  <th className="userInfoValues">{props.settings.strings["abstract"]}</th>
                  <th className="userInfoValues">{project.description !== null ? (project.description.length > 150 ? project.description.slice(0, 150) + '...': project.description) : "-"}</th>
                </tr>
                <tr className="userInfoRows">
                  <th className="userInfoValues">{props.settings.strings["description"]}</th>
                  <th className="userInfoValues">{project.contentDescription !== null ? (project.contentDescription.length > 150 ? project.contentDescription.slice(0, 150) + '...': project.contentDescription) : "-"}</th>
                </tr>
                </tbody>
            </table>
          </div>
          <div className="userInfoButtonsContainer">
          <button className="rippleButton" onClick={changeProjectInfo}>{props.settings.strings["change_information"]}</button>
          <button className="rippleButton" onClick={addModeratorClick}>{props.settings.strings["add_new_moderator"]}</button>
          <CSVLink
                data={csvData}
                filename={project.id + '-sites.csv'}
                className='rippleButton'
                target='_blank'
              >{props.settings.strings["download_project"]}
          </CSVLink>
          </div>
      </div>
    );
  }
  else {
    return (
      <div className="userInformationContainer centerAlignWithPadding">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings["not_moderator"]}</h1>
          <ClearIcon className="clearIcon" onClick={closeClick}/>
        </div>
      </div>
    );
  }

  
};

const mapStateToProps = (state) => {
    return {
      //maps state to props, after this you can for example call props.notification
      projects: state.projects,
      user: state.user,
      posts: state.posts,
      settings: state.settings
    }
  }
  
  const mapDispatchToProps = {
    //connect reducer functions/dispatchs to props
    notify,
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectManagement)



//   ProjectManagement: This component is used in ContentArea.js. The component returns a JSX template that displays information about the active project, such as its ID, title, moderators, number of sites, abstract,
//  and description. It also displays buttons to download the project's CSV data, change project information, and add a new moderator if the current user is one of the moderators of the project. If the current user
//  is not a moderator of the project, the template only displays a message saying that the user is not authorized to view this page.
