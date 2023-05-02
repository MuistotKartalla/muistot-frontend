// By: Niklas Impiö
import { useEffect, useState } from "react"
import { connect } from "react-redux"

import { notify } from "../reducers/notificationReducer"
import { getActiveProject } from "../reducers/projectReducer"
import { setTempPost } from "../reducers/tempPostReducer"
import * as postService from "../services/posts"
import "../styles/buttons.css"
import "../styles/newPost.css"
import ImageUpload from "./ImageUploadKiosk"

export const NewMemento = (props) => {
  const [titleField, setTitleField] = useState("")
  const [storyField, setStoryField] = useState("")
  const [image, setImage] = useState(null)

  const post = props.posts.find(item => "" + item.id === props.match.params.id)
  //console.log(post)
  //console.log("NewMemento launched")


  useEffect(() => {
    //console.log("NewMemento useEffect")
    setTitleField(props.tempPost.title)
    setStoryField(props.tempPost.story)
    setImage(props.tempPost.image)

  }, [props])



  const cancelClick = (event) => {
    event.preventDefault()
    props.history.goBack()
    setStoryField("")
    setTitleField("")
    setImage(null)
    props.setTempPost({"title": "", "story":"", "image": null})


  }

  const imageOnChangeHandler = (image) => {
    setImage(image)
  }

  const confirmPost = (event) => {
    event.preventDefault()
    //console.log("creating new memento")

    if(titleField.length < 5){
      props.notify(props.settings.strings["title_length"], true, 5)
      return
    }
    if((image === null && props.tempPost.image === null) && storyField.length < 20){
      props.notify(props.settings.strings["image_missing"], true, 5)
      return
    }

      //console.log(image);
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
    props.setTempPost(temp)
    //event.target.setAttribute("rows", parseInt((storyField.content.scrollHeight) / 18))
  }

  return(
    <div className="newPostContainer centerAlignWithPaddingContainer">
      <h1 className="titleText">{props.settings.strings["new_memento"]} {post.title}</h1>
      <ImageUpload change={imageOnChangeHandler}/>
      <form className="postForm" onSubmit={confirmPost}>
        <div className="inputContainer">
          <input name="title" id="titleField" className="input" placeholder={props.settings.strings["title"]} maxLength="100" autoComplete="off" onChange={TitleFieldChangeHandler} value={titleField}/>
          <div className="inputFocusLine"/>
        </div>
        <div className="inputContainer">
          <textarea name="story" id="storyField" className="input" rows="4" placeholder={props.settings.strings["description"]} maxLength="10000" autoComplete="off" onChange={StoryFieldChangeHandler} value={storyField}/>
          <div className="inputFocusLine"/>
        </div>

        <div className="postFormButtonContainer">
          <button className="rippleButton positiveButton fillButton">{props.settings.strings["submit"]}</button>
          <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>

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
)(NewMemento)



// NewMemento: This component is used in ContentArea.js. This component renders a form where a user can create a new "memento" (memory). It receives various props from its parent component, including the current user,
//  temporary post data, project data, post data, user location data, and app settings.