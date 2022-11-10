import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import { CSVLink } from "react-csv"

import {notify} from "../reducers/notificationReducer"

import "../styles/projectInfo.css"
import "../styles/containers.css"

import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"
import {getImageURL} from "../services/images";
const ReactMarkdown = require('react-markdown')

export const ProjectInfoMobile = (props) => {
  /*
  Some initial stuff for project info component
  */

  const [project, setProject] = useState(props.projects.active)
  const [posts, setPosts] = useState(props.posts)
  const [csvData, setCsvData] = useState([])

  //in useEffect, check if we have some active project, check its posts and update data for csv download
  useEffect(() => {
    if(!project.title){
      //console.log("no active project")
      setProject(props.projects.active)
    }
    //check that we have all correct posts
    if(props.posts !== posts){
      setPosts(props.posts)
    }
    //if there is no csv data, generate it
    if(csvData.length <= 1){
      const postsData = [["Project", "Project moderator", "Site ID", "Site title", "Site creator", "Last modifier", "Memories", "Location latitude", "Location longitude", "Abstract"]]
      posts.map((post) => postsData.push([project.title, project.moderators, post.id, post.title, post.creator, post.modifier, post.muistoja, post.location.lat, post.location.lng, post.abstract]))
      //update data to csvData variable
      setCsvData(postsData)
    }
  }, [props, , project.title, posts, csvData.length, project.moderators])

  // const closeClick = (event) => {
  //   //go back to the previous page
  //   event.preventDefault()
  //   //console.log("closebutton clicked")
  //   props.history.goBack()
  // }

  //check if current user is project moderator
  if(props.user && project.moderators.find(user => user === props.user.username)){
    return(
      <div className="projectInfoContainerMobile">
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{props.settings.strings[project.id]}</h1>
          </div>
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
          <div className="projectInfoDownloadButton">
            <button className="mobileButtonContainer">
              <CSVLink
                  data={csvData}
                  filename={project.id + '-sites.csv'}
                  className='rippleButton'
                  target='_blank'
                >{props.settings.strings["download_project"]}
              </CSVLink>
            </button>
          </div>
        </div>
        
      </div> 
    )
  }
  else if(project.title){
    return(
      <div className="projectInfoContainerMobile">
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{props.settings.strings[project.id]}</h1>
          </div>
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
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={(event) => {event.preventDefault(); props.history.goBack()}}/>
          </button>
          <div className="titleHeaderMobile">
            <h1 className="titleTextMobile">{props.settings.strings["project_info"]}</h1>
          </div>
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
)(ProjectInfoMobile)
