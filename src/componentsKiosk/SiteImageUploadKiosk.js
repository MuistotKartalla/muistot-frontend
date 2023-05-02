import { useEffect, useState } from "react"
import { connect } from "react-redux"

import { notify } from "../reducers/notificationReducer"

import { setTempSite } from "../reducers/tempSiteReducer"

import "../styles/imageUpload.css"

//inspiration from
//https://codepen.io/hartzis/pen/VvNGZP
export const SiteImageUpload = (props) => {
  //Initial component image uploading and previewing. Might add drag-and-drop later.

  const [image, setImage] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)

  useEffect(() => {
    //hook for getting already filled fields from temp post if for example closed the pop up to choose new location on map.
    if(props.tempSite.image !== null && props.tempSite.image !== undefined){
      const file = props.tempSite.image.file
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(file)
        setImagePreviewUrl(reader.result)

      }
      reader.readAsDataURL(file)
    }

  }, [props])

  const handleImageChange = (event) => {
    //loads preview image
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setImage(file)
      let result = reader.result
      setImagePreviewUrl(result)
      props.change(reader.result)
      setTempSiteImage({file:file, data:reader.result})
    }
    reader.readAsDataURL(file)
  }

  const setTempSiteImage = (image) => {
    //update image to temp post
    const temp = {...props.tempSite}
    temp.image = image
    props.setTempSite(temp)
  }



  return(
    <div className="imageUploadContainer">
      <div className="imagePreviewContainer">
        {imagePreviewUrl !== null?
          <img className="previewImage" src={imagePreviewUrl} alt=""></img>
          :
          <div className="previewText normalText">{props.settings.strings["no_image_selected"]}</div>
        }
      </div>
      <div className="selectImageContainer">

        <label className="rippleButton"> {props.settings.strings["choose_file"]}
          <input type="file" accept="image/*" onChange={handleImageChange}/>
        </label>

      </div>
    </div>
  )

}


const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    tempSite: state.tempSite,
    userLocation: state.userLocation,
    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,
  setTempSite
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteImageUpload)




// SiteImageUpload: This component is used in EditImage.js. This is a React component that allows users to upload and preview images. It makes use of the useState and useEffect hooks from React, as well as the
//  connect function from the react-redux library.