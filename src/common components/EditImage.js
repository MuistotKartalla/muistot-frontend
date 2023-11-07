import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"

import { changeSitePicture } from "../reducers/postReducer"
import { setTempSite } from "../reducers/tempSiteReducer"
import "../styles/buttons.css"
import "../styles/newPost.css"
import SiteImageUpload from "./SiteImageUpload"
import { isMobile } from "react-device-detect"
import { ReactComponent as ReturnIcon } from "../resources/arrow_back.svg"


export const EditImage = (props) => {
  const [image, setImage] = useState(null)
  const post = props.posts.find(item => "" + item.id === props.match.params.id)

  useEffect(() => {
    if (props.tempSite.image) {
      setImage(props.tempSite.image.data
      )
    } else { setImage(props.tempSite.image) }
  }, [props])


  const cancelClick = (event) => {
    event.preventDefault()
    setImage(null)
    props.setTempSite({ "title": "", "location": false, "image": null })
    props.history.goBack()
  }

  const imageOnChangeHandler = (image) => {
    setImage(image)
  }

  const confirmPost = (event) => {
    event.preventDefault()
    props.changeSitePicture(post, image)
    setImage(null)
    props.setTempSite({ "title": "", "location": false, "image": null })
    props.notify(props.settings.strings["site_modify_ok"], false, 5)
    props.history.goBack()
  }


  return (
    isMobile ? (<div className="newPostContainerMobile">
      <div>
        <div className="titleContainerMobile">
          <button className="mobileButtonContainer">
            <ReturnIcon className="mobileIcon" onClick={cancelClick} />
          </button>
          <h1 className="titleTextMobile">{props.settings.strings["change_image"]}</h1>
        </div>

        <div>
          <form className="postFormMobile" onSubmit={confirmPost}>
            <div className="inputContainer">
              <SiteImageUpload change={imageOnChangeHandler} />
            </div>
            <div className="postFormButtonContainer">
              <button className="rippleButton positiveButton fillButton">{props.settings.strings["submit"]}</button>
              <button className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
            </div>
          </form>
        </div>

      </div>
    </div>) : (
      <div className="newPostContainer centerAlignWithPaddingLean">
        <h1 className="headerText">{props.settings.strings["change_image"]}</h1>
        <div>
          <form className="postForm" onSubmit={confirmPost}>
            <div className="inputContainer">
              <SiteImageUpload change={imageOnChangeHandler} />
            </div>
            <div className="postFormButtonContainer">
              <button type="submit" className="rippleButton positiveButton fillButton">{props.settings.strings["submit"]}</button>
              <button type="button" className="rippleButton negativeButton fillButton" onClick={cancelClick}>{props.settings.strings["cancel"]}</button>
            </div>
          </form>
        </div>
      </div>
    )

  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    tempSite: state.tempSite,
    projects: state.projects,
    settings: state.settings,
    posts: state.posts
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  setTempSite,
  changeSitePicture,
  notify
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditImage)


// EditImage: This is a React component that allows users to edit the image of a site. It imports various modules including useEffect, useState, connect from "react"
//  and some reducers for state management. It is used in ContentArea.