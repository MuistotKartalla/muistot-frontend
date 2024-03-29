import L from "leaflet"
import { useState } from "react"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import { ChangeSiteLocation } from "../reducers/postReducer"

import "leaflet/dist/leaflet.css"
import tempIconMarker from "../resources/temp_marker.svg"
import "../styles/buttons.css"
import "../styles/mapContainer.css"
import "../styles/newPost.css"

const tempIcon = L.icon({
  iconUrl: tempIconMarker,
  iconAnchor: [16,32]
})

export const EditLocation = (props) => {
  const post = props.posts.find(item => "" + item.id === props.match.params.id)
  const [position, setPosition] = useState({lat: 65.01157565139543, lng: 25.470943450927738})
  const [tempMarker, setTempMarker] = useState(null)
  const [newLat, setNewLat] = useState(null)
  const [newLng, setNewLng] = useState(null)

  const ConfirmNewLocation = (event) => {
    event.preventDefault()
    //if there are no new coordinates
    if(newLat === null || newLng === null)
    {
      props.notify(props.settings.strings["no_new_changes"], false, 5)
    }
    //if there are new coordinates
    else {
      props.ChangeSiteLocation(post, newLat, newLng)
      props.notify(props.settings.strings["site_modify_ok"], false, 5)
    }
    props.history.push(`/edit-post/${post.id}`)
  }

  //function for handling events on the map
  const HandleMapEvents = () => {
    useMapEvents({
      click: (e) => {
        if(props.user !== null) {
          setNewLat(e.latlng.lat)
          setNewLng(e.latlng.lng)
          setPosition(e.latlng)
          setTempMarker(e.latlng)
        }
      }
    });
    return null;
  }

  const redirectToLoginPage = () => {
    props.history.push("/login")
  }

  // If user is not logged in redirect to login page
  if (!props.user) {
    redirectToLoginPage()
    return <div />
  }

  return(
    <div className="userSettingsContainer centerAlignWithPadding">
        <div className="titleContainer">
          <h1 className="titleText">{props.settings.strings["choose_new_location"]}</h1>
        </div>
        <div className="mapContainerSmall">
          <MapContainer className="smallMap" center={position} zoom={5}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HandleMapEvents/>
          {tempMarker !== null && props.currentProject.id !== "parantolat"?
            <Marker position={tempMarker} icon={tempIcon}></Marker>
            :
            <></>
          }
          </MapContainer>
        </div>
        <div className="userInformation">
          <table>
            <tbody>
              <tr className="userInfoRows">
                <th className="userInfoValues">Latitude</th>
                <th className="userInfoValues">{newLat !== null? newLat : "-"}</th>
              </tr>
              <tr className="userInfoRows">
                <th className="userInfoValues">Longitude</th>
                <th className="userInfoValues">{newLng !== null? newLng : "-"}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dualButtonContainer">
          <button className="positiveButton rippleButton fillButton" onClick={ConfirmNewLocation}>{props.settings.strings["confirm"]}</button>
          <button className="negativeButton rippleButton fillButton" onClick={() => props.history.push(`/edit-post/${post.id}`)}>{props.settings.strings["cancel"]}</button>
        </div>
      </div>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
    posts: state.posts,
    currentProject: state.projects.active
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  notify,
  ChangeSiteLocation
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLocation)



// EditLocation: The main component in this code is EditLocation, which renders a map and allows the user to select a new location.
//  The selected coordinates are then used to modify the location of a post. Finally, the mapStateToProps and mapDispatchToProps
//  functions are used to map the component's props to the Redux store and dispatch actions, respectively.This component is used in ContentArea.js
