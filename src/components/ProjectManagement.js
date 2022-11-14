import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {notify} from "../reducers/notificationReducer"
import { CSVLink } from "react-csv"

import {ReactComponent as ClearIcon} from "../resources/clear.svg"
import "../styles/projectManagement.css"
import "../styles/postView.css"
import "../styles/accountInfo.css"

export const ProjectManagement = (props) => {
  //declare some variables
  const [project, setProject] = useState(props.projects.active)
  const [posts, setPosts] = useState(props.posts)
  const [csvData, setCsvData] = useState([])

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
      console.log(project)
      const postsData = [["Project", "Project moderator", "Site ID", "Site title", "Site creator", "Last modifier", "Memories", "Location latitude", "Location longitude", "Abstract"]]
      posts.map((post) => postsData.push([project.title, project.moderators, post.id, post.title, post.creator, post.modifier, post.muistoja, post.location.lat, post.location.lng, post.abstract]))
      //update data to csvData variable
      setCsvData(postsData)
    }
  }, [props, project.title, posts, csvData.length, project.moderators])

  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    props.history.push("/")
  }

  if(props.user && project.moderators.find(user => user === props.user.username)){
    return (
      <div className="projectManagementContainer centerAlignWithPadding">
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
                  <th className="userInfoValues">{project.moderators !== null ? project.moderators : "-"}</th>
                </tr>
                <tr className="userInfoRows">
                  <th className="userInfoValues">{props.settings.strings["project_sites"]}</th>
                  <th className="userInfoValues">{csvData.length  > 1 ? csvData.length - 1 : "-"}</th>
                </tr>
                </tbody>
            </table>
          </div>
          <div className="userInfoButtonsContainer">
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
      <div className="projectManagementContainer centerAlignWithPadding">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding" onClick={() => props.history.push("/login")}>{props.settings.strings["login_or_register"]}</h1>
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