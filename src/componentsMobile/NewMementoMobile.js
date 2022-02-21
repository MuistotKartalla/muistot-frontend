import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

import "../styles/newPost.css"
import "../styles/buttons.css"
import * as postService from "../services/posts"
import {notify} from "../reducers/notificationReducer"
import {setTempPost} from "../reducers/tempPostReducer"
import ImageUploadMobile from "./ImageUploadMobile"

import {ReactComponent as ReturnIcon} from "../resources/arrow_back.svg"
import {getActiveProject} from "../reducers/projectReducer";


//combined new post where everything is in a single window. Toggle buttons for which location selection method chosen.
// aka if "live location" button is highlighted the it uses your current location. if map button highlighted then it uses selected location.

export const NewMementoMobile = (props) => {
  const [titleField, setTitleField] = useState("")
  const [storyField, setStoryField] = useState("")
  const [image, setImage] = useState(null)
  console.log(props)
  const post = props.posts.find(item => "" + item.id === props.match.params.id)
  console.log(post)

  useEffect(() => {
    setTitleField(props.tempPost.title)
    setStoryField(props.tempPost.story)
    console.log(props.tempPost.image)
    setImage(props.tempPost.image)

  }, [props])


  const cancelClick = (event) => {
    event.preventDefault()
    props.history.push("/")
    setStoryField("")
    setTitleField("")
    setImage(null)
    props.setTempPost({"title": "", "story":"", "image": null})
  }

  const confirmPost = (event) => {
    event.preventDefault()
    console.log("creating new memento")

    if(titleField.length < 5){
      props.notify(props.settings.strings["title_length"], true, 5)
      return
    }
    if((image === null && props.tempPost.image === null) && storyField.length < 20){
      props.notify(props.settings.strings["image_missing"], true, 5)
      return
    }

    console.log(image);
    (async () => await postService.createMemory(
            getActiveProject(),
            post.id,
            ({
              title: titleField,
              story: storyField,
              image: image
            })
        )
    )();
    props.notify(`"${titleField}" ${props.settings.strings["created"]}`, false, 5)

    setStoryField("")
    setTitleField("")
    setImage(null)
    props.setTempPost({"title": "", "story":"", "image": null})

    props.history.goBack()
  }

  const TitleFieldChangeHandler = (event) => {
    event.preventDefault()
    setTitleField(event.target.value)
    const temp = {...props.tempPost}
    temp.title = event.target.value
    props.setTempPost(temp)
  }
  const StoryFieldChangeHandler = (event) => {
    event.preventDefault()
    setStoryField(event.target.value)
    const temp = {...props.tempPost}
    temp.story = event.target.value
    props.setTempPost(temp)    //event.target.setAttribute("rows", parseInt((storyField.content.scrollHeight) / 18))
  }

  return(
    <div className="newPostContainerMobile">
      <div>
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={() => props.history.goBack()}/>
          </button>
	      <h1 className="titleTextMobile">{props.settings.strings["new_memento"]} {post.title}</h1>
        </div>
      </div>
      <ImageUploadMobile/>
      <form className="postFormMobile" onSubmit={confirmPost}>
        <div className="inputContainer">
          <input name="title" id="titleField" className="input" placeholder={props.settings.strings["title"]} maxLength="100" autoComplete="off" onChange={TitleFieldChangeHandler} value={titleField}/>
          <div className="inputFocusLine"/>
        </div>
        <div className="inputContainer">
          <textarea name="story" id="storyField" className="input" rows="4" placeholder={props.settings.strings["description"]} maxLength="10000" autoComplete="off" onChange={StoryFieldChangeHandler} value={storyField}/>
          <div className="inputFocusLine"/>
        </div>

        <div className="postFormButtonContainer">
          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
          <button className="rippleButton positiveButton fillButton">{props.settings.strings["submit"]}</button>
        </div>
      </form>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    tempPost: state.tempPost,
    projects: state.projects,
    posts: state.posts,
    userLocation: state.userLocation,
    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,
  setTempPost
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMementoMobile)
