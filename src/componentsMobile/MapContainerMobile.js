// By: Niklas Impiö
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {Map, TileLayer, Marker} from "react-leaflet"
import L from "leaflet"

import "../stylesMobile/mapContainerMobile.css"
import "leaflet/dist/leaflet.css"

import icon from "../resources/marker-icon.png"
import iconN from "../resources/marker-icon-new.png"
import iconT from "../resources/marker-transp.png"
import iconTN from "../resources/marker-transp-new.png"
import iconShadow from "../resources/marker-shadow.png"



import userIconMarker from "../resources/user_icon_custom.svg"
import tempIconMarker from "../resources/temp_marker.svg"
import {ReactComponent as AddIcon} from "../resources/add_circle.svg"
import {ReactComponent as ListViewIcon} from "../resources/view_list.svg"

import {notify} from "../reducers/notificationReducer"
import {createSite} from "../reducers/postReducer"
import {updateUserLocation} from "../reducers/userLocationReducer"

import {usePosition} from "../hooks/LocationHook"
import {setTempSite} from "../reducers/tempSiteReducer"
import {updateMapLocation} from "../reducers/mapLocationReducer"
import FloatingSearch from "../components/FloatingSearch"

var IconMarker = L.Icon.extend({
        options: {
                shadowUrl: iconShadow,
                iconAnchor: [12, 41]
        }
});

let defaultIcon = new IconMarker({iconUrl: icon})
L.Marker.prototype.options.icon = defaultIcon

const emptyIcon = new IconMarker({iconUrl: iconT})
const emptyIconNew = new IconMarker({iconUrl: iconTN})
const newIcon = new IconMarker({iconUrl: iconN})

const userIcon = L.icon({
  iconUrl: userIconMarker,
  iconAnchor: [16,16]
})

const tempIcon = L.icon({
  iconUrl: tempIconMarker,
  iconAnchor: [16,32]
})


const MapContainerMobile = (props) => {
  //state variables
  const [position, setPosition] = useState({lat: 65.01157565139543, lng: 25.470943450927738})
  const [tempMarker, setTempMarker] = useState(null)
  const [zoom, setZoom] = useState(5)
  const [posts, setPosts] = useState([])


  //Wheather the map constantly centers to user location. Enabled when user clics their own avatar. Disabled when map manually moved.
  const [followUser, setFollowUser] = useState(true)

  //users custom location hook
  const {userLocation} = usePosition(5)

  //TEMP solution since I don't know how to access redux state from location hook directly
  //updates user state to redux from here, should find a better way, causes extra render.

  if(props.userLocation !== userLocation && userLocation !== null){
    props.updateUserLocation(userLocation)
  }

  useEffect(() => {
    //hook for initializing state variable posts. And sets map position to user location if location access.
    if(props.posts !== posts){
      setPosts(props.posts)
    }
    if(followUser){
      //console.log("centering map to user location")
      setPosition(userLocation)
    }

    if(props.mapLocation !== null){
      //console.log("setting map to location")
      setZoom(14)
      setPosition(props.mapLocation)
      props.updateMapLocation(null)
    }

  }, [props, posts, followUser,userLocation ])




  const onPostClick = (post) => {
    //event handler for post marker clicks. Routes to post view.
    //console.log(`Clicked post: ${post}`, post)
    props.history.push(`/post-view/${post.id}/`)
    setFollowUser(false)
    setPosition(post.location)
  }


  const leftClick = (event) => {
    //unfocus click or logo click doesn't reset TempMarker.
    setFollowUser(false)
    if(props.history.location.pathname === "/select-location/"){
      setTempMarker(event.latlng)
      setPosition(event.latlng)
    }
    else{setPosition(event.latlng)}
  }

  const rightClick = (event) => {
    setPosition(event.latlng)
    setFollowUser(false)
  }


  const confirmNewLocationMarker = () => {
    //confirm select on map event handler. Button is visible only when correct url.

    const tempSite = {...props.tempSite}
    tempSite.location = tempMarker
    //console.log(tempSite)
    props.setTempSite(tempSite)
    props.history.push("/new-post/")
    setTempMarker(null)
  }

  const toListView = (event) => {
    event.preventDefault()
    //console.log("to list view")
    props.history.push("/list-view/")
  }

  const newPostClick = (event) => {
    //New post onClick event handler.
    event.preventDefault()
    //console.log("Adding new post")
    if(props.user !== null){
      //console.log("Adding new post")
      props.history.push("/new-post/")
    }else{
      //if not logged in, redirect to login page
      props.history.push("/login/")
      props.notify(props.settings.strings["login_required_to_post"], false, 5)
    }
  }

  const userClick = () => {
    //when user avatar clicked the map centers to user and followUser is activated.
    if(!followUser){
      //console.log("Following User")
      setFollowUser(true)
      props.notify(props.settings.strings["user_follow"], false, 5)
    }
    setPosition(userLocation)
  }

  const dragEvent = (event) => {
    //if followUser is active, disable it.
    if(followUser){
      //console.log("Disabling Follow User")
      setFollowUser(false)
    }
    setPosition(event.target.getCenter())
  }

  const scrollListener = (event) => {
    //dunno if needed updates the state for the zoom level.
    //console.log(`Setting zoom to ${event.target._zoom}`)
    setZoom(event.target._zoom)
  }
  return(
    <div className="mapContainerMobile">
      <Map className="fullscreenMap" zoomControl={false} center={position} zoom={zoom} onClick={leftClick} oncontextmenu={rightClick} onZoom={scrollListener} ondrag={dragEvent}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {posts.map((element, index) =>
         <Marker key={index} position={element.location} icon={element.uusi===1?(element.muistoja===null?emptyIconNew:newIcon):(element.muistoja===null?emptyIcon:defaultIcon)} onClick={() => onPostClick(element)}>
          </Marker>
        )}
        {userLocation !== null? 
          <Marker position={userLocation} icon={userIcon} onClick={userClick}>
          </Marker>
          :
          <></>
        
        }
        {tempMarker !== null? 
          <Marker position={tempMarker} icon={tempIcon}></Marker>
          :
          <></>
         
        }
      </Map>
      <div className="floatingSearchContainerMapMobile">
        <FloatingSearch history={props.history}/>
      </div>
      {props.history.location.pathname !== "/select-location/"? 
        <div>
      {props.currentProject.title !== "project 2"?     
          <button className="mobileNewButton" onClick={newPostClick}>
            <AddIcon className="addIcon"/>
          </button>
        :
        <></>
        }
          <button className="mobileListViewButton" onClick={toListView}>
            <ListViewIcon className="listIcon"/>
          </button>
        </div>
        :
        tempMarker === null? 
          <button className="overlayButtonRight rippleButton" onClick={newPostClick}>{props.settings.strings["no_location_selected"]}</button>
          :
          <button className="overlayButtonRight pulsingButton rippleButton" onClick={confirmNewLocationMarker}>{props.settings.strings["confirm_location"]}</button>
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    userLocation: state.userLocation,
    tempSite: state.tempSite,
    settings: state.settings,
    posts: state.posts,
    user: state.user,
    mapLocation: state.mapLocation,
    currentProject: state.projects.active

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  createSite,
  updateUserLocation,
  setTempSite,
  updateMapLocation
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainerMobile)
