import { useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"

import { ReactComponent as ReturnIcon } from "../resources/arrow_back.svg"
import "../styles/accountInfo.css"
import "../styles/postView.css"

export const ProjectManagementMobile = (props) => {
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
      <div className="userInformationContainerMobile">
        <div className="titleContainerMobile">
          <div className="userInformationButtonMobile">
            <button className="mobileButtonContainer">
              <ReturnIcon className="mobileIcon" onClick={() => props.history.push("/")}/>
            </button>
          </div>
          <div className="userInformationTitleMobile">
            <h1 className="titleTextMobile">{props.settings.strings["project_management"]}</h1>
          </div>
        </div>
        <div className="userInformationMobile">
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
                  <th className="userInfoValues">{csvData.length  > 1 ? csvData.length - 1 : "-"}</th>
                </tr>
                <tr className="userInfoRows">
                  <th className="userInfoValues">{props.settings.strings["abstract"]}</th>
                  <th className="userInfoValues">{project.description !== null ? (project.description.length > 50 ? project.description.slice(0, 50) + '...': project.description) : "-"}</th>
                </tr>
                <tr className="userInfoRows">
                  <th className="userInfoValues">{props.settings.strings["description"]}</th>
                  <th className="userInfoValues">{project.contentDescription !== null ? (project.contentDescription.length > 70 ? project.contentDescription.slice(0, 70) + '...': project.contentDescription) : "-"}</th>
                </tr>
                </tbody>
            </table>
          </div>
          <div className="userInfoButtonsContainerMobile">
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
      <div className="userInformationContainerMobile">
        <div className="titleContainerMobile">
        <div className="userInformationButtonMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={() => props.history.push("/")}/>
          </button>
          </div>
          <div className="userInformationTitleMobile">
            <h1 className="titleTextMobile">{props.settings.strings["not_moderator"]}</h1>
          </div>
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
  )(ProjectManagementMobile)
