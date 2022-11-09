import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import { CSVLink } from "react-csv";

import {notify} from "../reducers/notificationReducer"
import "../styles/projectInfo.css"
import "../styles/containers.css"
import "../styles/postView.css"
import {ReactComponent as ClearIcon} from "../resources/clear.svg"
import {getImageURL} from "../services/images";

const ReactMarkdown = require('react-markdown')

export const ProjectInfo = (props) => {
  /*
  Some initial stuff for project info component
  */
  //declare some variables
  const [project, setProject] = useState(props.projects.active)
  const [posts, setPosts] = useState(props.posts)
  const [csvData, setCsvData] = useState([])

  //in useEffect, check if we have some active project, check its posts and update data for csv download
  useEffect(() => {
    if(!project.title){
      setProject(props.projects.active)
    }
    if(props.posts !== posts){
      setPosts(props.posts)
    }
    if(csvData.length <= 1){
      GenerateCSVData()
    }
  }, [props, project.title, posts, csvData.length])

  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    props.history.goBack()
  }

  //generate csv data from current project's sites
  const GenerateCSVData = () => {
    const postsData = [["Project", "Project moderator", "Site ID", "Site title", "Site creator", "Last modifier", "Memories", "Location latitude", "Location longitude", "Abstract"]]
    posts.map((post) => postsData.push([project.title, project.moderators, post.id, post.title, post.creator, post.modifier, post.muistoja, post.location.lat, post.location.lng, post.abstract]))
    //update data to csvData variable
    setCsvData(postsData)
    return null
  }
  
  //check if current user is project moderator
  if(props.user && project.moderators.find(user => user === props.user.username)){
    return(
      <div className="projectInfoContainer centerAlignWithPadding">
        <div className="postTitleContainer">
        <CSVLink
              data={csvData}
              filename={project.id + '-sites.csv'}
              className='rippleButton'
              target='_blank'
            >{props.settings.strings["download_project"]}
        </CSVLink>
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings[project.id]}</h1>
          <ClearIcon className="clearIcon" onClick={closeClick}/>
        </div>
        <div className="projectInfoContentContainer">
          <div className="projectInfoDescriptionContainer normalText">
		        <ReactMarkdown source={project.description} />
          </div>
          <div className="projectInfoImageContainer">
            <img className="projectInfoImage" src={getImageURL(project.image)} alt=""></img>
          </div>
          <div className="projectInfoContentDescriptionContainer normalText">
		        <ReactMarkdown source={project.contentDescription} />
          </div>
        </div>
      </div>
      
    )
  }
  else if(project.title){
    return(
      <div className="projectInfoContainer centerAlignWithPadding">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings[project.id]}</h1>
          <ClearIcon className="clearIcon" onClick={closeClick}/>
        </div>
        <div className="projectInfoContentContainer">
          <div className="projectInfoDescriptionContainer normalText">
		        <ReactMarkdown source={project.description} />
          </div>
          <div className="projectInfoImageContainer">
            <img className="projectInfoImage" src={getImageURL(project.image)} alt=""></img>
          </div>
          <div className="projectInfoContentDescriptionContainer normalText">
		        <ReactMarkdown source={project.contentDescription} />
          </div>
        </div>
      </div>
    )
  }else{
    return(
      <div className="projectInfoContainer centerAlignWithPadding">
        <div className="titleContainer">
          <h1 className="titleText">{props.settings.strings["project_info"]}</h1>
        </div>
        <div className="closeButtonContainer">
          <button className="rippleButton fillButton bigButton" onClick={closeClick}>{props.settings.strings["close"]}</button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    projects: state.projects,
    settings: state.settings,
    user: state.user,
    posts: state.posts
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectInfo)
