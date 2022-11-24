// By: Niklas Impiö, Lassi Tölli
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {MapContainer, TileLayer, Marker, useMapEvents, useMap} from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import L from "leaflet"
import "../styles/mapContainer.css"
import "leaflet/dist/leaflet.css"
import "../styles/buttons.css"
import "../styles/markerCluster.css"

import icon from "../resources/marker-icon.png"
import iconShadow from "../resources/marker-shadow.png"
import iconGreen from "../resources/marker-green.png"
//import iconN from "../resources/marker-icon-new.png"
//import iconT from "../resources/marker-transp.png"
//import iconTN from "../resources/marker-transp-new.png"
//import iconY from "../resources/marker-yellow.png"
//import iconH from "../resources/marker-hilite.png"
//import iconP from "../resources/marker-piippu.png"
//import iconPT from "../resources/marker-piippu-tp.png"
//import iconPS from "../resources/marker-piippu-star.png"
//import iconPS2 from "../resources/marker-piippu-star2.png"
//import iconPS3 from "../resources/marker-piippu-star3.png"
//import iconS from "../resources/marker-star.png"
//import iconS2 from "../resources/marker-star2.png"
//import iconS3 from "../resources/marker-star3.png"
//import iconx2 from "../resources/marker-icon-2x.png"
//import iconPShadow from "../resources/marker-piippu-shadow.png"

import userIconMarker from "../resources/user_icon_custom.svg"
import tempIconMarker from "../resources/temp_marker.svg"

import {notify} from "../reducers/notificationReducer"
import {createSite} from "../reducers/postReducer"
import {updateUserLocation} from "../reducers/userLocationReducer"

import {usePosition} from "../hooks/LocationHook"
import {setTempSite} from "../reducers/tempSiteReducer"
import {updateMapLocation} from "../reducers/mapLocationReducer"
import FloatingSearch from "./FloatingSearch"

var IconMarker = L.Icon.extend({
        options: {
                shadowUrl: iconShadow,
                iconAnchor: [12, 41]
        }
});

//initialize markers
let defaultIcon = new IconMarker({iconUrl: icon})
L.Marker.prototype.options.icon = defaultIcon

//const emptyIcon = new IconMarker({iconUrl: iconT})
//const emptyIconNew = new IconMarker({iconUrl: iconTN})
//const newIcon = new IconMarker({iconUrl: iconN})
const greenIcon = new IconMarker({iconUrl: iconGreen})

const userIcon = L.icon({
  iconUrl: userIconMarker,
  iconAnchor: [16,16]
})

const tempIcon = L.icon({
  iconUrl: tempIconMarker,
  iconAnchor: [16,32]
})

const MapContainerOpen = (props) => {
  //state variables
  const [position, setPosition] = useState({lat: 65.01157565139543, lng: 25.470943450927738})
  const [tempMarker, setTempMarker] = useState(null)
  const [zoom, setZoom] = useState(5)
  const [posts, setPosts] = useState([])
  const [moveToPosition, setmoveToPosition] = useState(false)

  //Wheather the map constantly centers to user location. Enabled when user clics their own avatar. Disabled when map manually moved.
  const [followUser, setFollowUser] = useState(true)

  //users custom location hook
  const {userLocation} = usePosition(5)

  useEffect(() => {
    //hook for initializing state variable posts. And sets map position to user location if location access.
    if(props.userLocation !== userLocation && userLocation !== null){
      //triggers every 5 sec on firefox, but not on chrome???
      props.updateUserLocation(userLocation)
    }
    if(props.posts !== posts){
      setPosts(props.posts)
    }
    if(props.mapLocation !== null){
      setZoom(13)
      setPosition(props.mapLocation) 
      props.updateMapLocation(null)
      setmoveToPosition(true)
    }
  }, [props, posts, followUser, userLocation])

    // Erilaisia ikonivalintoja:
    // <Marker key={index} position={element.location} icon={element.muistoja==null?emptyIcon:(index<2?star3Icon:(index<4?star2Icon:(index<6?starIcon:defaultIcon)))} onClick={() => onPostClick(element)}>

  const confirmNewLocationMarker = () => {
    //confirm select on map event handler. Button is visible only when correct url.
    if(props.user !== null) {
      const tempSite = {...props.tempSite}
      tempSite.location = tempMarker
      props.setTempSite(tempSite)
      props.history.push("/new-post/")
    }
    else{
      //if not logged in, redirect to login page
      props.history.push("/login/")
      props.notify(props.settings.strings["login_required_to_post"], false, 5)
    }

  }

  //open list view
  const toListView = (event) => {
    event.preventDefault()
    props.history.push("/list-view/"+props.posts[0].id)
  }

  //function for handling events on the map
  const HandleMapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        if(props.user !== null) {
          if (!tempMarker) {
            setPosition(e.latlng)
            setTempMarker(e.latlng)
          } else {
            setTempMarker(null)
          }
        }
        else {
          setPosition(e.latlng)
        }
        setmoveToPosition(true)
      },
      drag: (e) => {
        //if followUser is active, disable it.
        if(followUser){
          setFollowUser(false)
          setTempMarker(null)
        }
        setTempMarker(null)
      },
      zoomend: (e) => {
        setZoom(map.getZoom())
        setTempMarker(null)
      }
    });
    return null;
  }

  //function for updating map center
  const UpdateMapCenter = () => {
    const map = useMap()
    useEffect(() => {
      //do it only if moveToPosition is true
      if (moveToPosition) {
        map.setView(position, zoom, {
          "animate": true,
          "pan": {
            "duration": 0.5
        }})
        setmoveToPosition(false)
      }
    }, [map])
    return null;
  }

  return(
    <div className="mapContainer">
      <MapContainer className="fullscreenMap" center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UpdateMapCenter/>
        <HandleMapEvents/>

        <MarkerClusterGroup className="markerCluster" maxClusterRadius="60">
          {posts.map((element, index) =>
            <Marker key={index} 
              position={element.location} 
              //if site is created by current user, use green marker. else, use default marker
              icon={props.user===null?defaultIcon:(element.own?greenIcon:defaultIcon)}
              //for testing purposes:
              //icon={element.id==="74b2332118cb"?greenIcon:defaultIcon}
              //icon={element.uusi===1?(element.muistoja===null?emptyIconNew:newIcon):(element.muistoja===null?emptyIcon:defaultIcon)} 
              eventHandlers={{
                click: (e) => {
                  //handle click event on marker
                  //console.log(element.id)
                  props.history.push(`/post-view/${element.id}/`)
                  setFollowUser(false)
                  setPosition(element.location)
                  setmoveToPosition(true)
                  setTempMarker(null)
                },
              }}>
            </Marker>
          )}
        </MarkerClusterGroup>
        {userLocation !== null? 
          <Marker position={userLocation} icon={userIcon}
            eventHandlers={{
              click: (e) => {
                //when user avatar clicked the map centers to user and followUser is activated.
                if(!followUser){
                  //console.log("Following User")
                  setFollowUser(true)
                  props.notify(props.settings.strings["user_follow"], false, 5)
                }
                setPosition(userLocation)
                setmoveToPosition(true)
              },
            }}>
          </Marker>
          :
          <></>
         
        }
        {tempMarker !== null? props.currentProject.id !== "parantolat"? 
          <Marker position={tempMarker} icon={tempIcon}></Marker>
          :
          <></>
          :
          <></>
        }
      </MapContainer>
      <div className="floatingSearchContainerMap">
        <FloatingSearch history={props.history}/>
      </div>
      
      <button className="overlayButtonLeft rippleButton" onClick={toListView}>{props.settings.strings["list_view"]}</button>
      {tempMarker ?  props.user ? props.currentProject.id !== "parantolat"? !followUser?
      <button className="overlayButtonCenter pulsingButton rippleButton smallButton" onClick={confirmNewLocationMarker}>{props.settings.strings["new_post"]}</button>
      :
      <></>
      : 
      <></>
      :
      <></>
      :
      <></>
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
)(MapContainerOpen)
