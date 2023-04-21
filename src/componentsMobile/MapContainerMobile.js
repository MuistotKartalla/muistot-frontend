// By: Niklas Impiö, Lassi Tölli
import L from "leaflet"
import { useEffect, useRef, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { connect } from "react-redux"

import "leaflet/dist/leaflet.css"
import "../styles/markerCluster.css"
import "../styles/popupContainer.css"
import "../stylesMobile/mapContainerMobile.css"

import icon from "../resources/marker-icon.png"
//import iconN from "../resources/marker-icon-new.png"
//import iconT from "../resources/marker-transp.png"
//import iconTN from "../resources/marker-transp-new.png"
import iconGreen from "../resources/marker-green.png"
import iconShadow from "../resources/marker-shadow.png"

import { ReactComponent as AddIcon } from "../resources/add_circle.svg"
import tempIconMarker from "../resources/temp_marker.svg"
import userIconMarker from "../resources/user_icon_custom.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactComponent as AccountIcon } from "../resources/account_icon.svg"


import { notify } from "../reducers/notificationReducer"
import { createSite } from "../reducers/postReducer"
import { updateUserLocation } from "../reducers/userLocationReducer"

import { usePosition } from "../hooks/LocationHook"
import { updateMapLocation } from "../reducers/mapLocationReducer"
import { setTempSite } from "../reducers/tempSiteReducer"

import DropDownSelectProject from "../components/DropDownSelectProject"
import { setActiveProject } from "../reducers/projectReducer"
import { initPosts } from "../reducers/postReducer"


var IconMarker = L.Icon.extend({
  options: {
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
  }
});

//initialize markers
let defaultIcon = new IconMarker({ iconUrl: icon })
L.Marker.prototype.options.icon = defaultIcon

//const emptyIcon = new IconMarker({iconUrl: iconT})
//const emptyIconNew = new IconMarker({iconUrl: iconTN})
//const newIcon = new IconMarker({iconUrl: iconN})
const greenIcon = new IconMarker({ iconUrl: iconGreen })

const userIcon = L.icon({
  iconUrl: userIconMarker,
  iconAnchor: [16, 16]
})

const tempIcon = L.icon({
  iconUrl: tempIconMarker,
  iconAnchor: [16, 32]
})

const MapContainerMobile = (props) => {
  //state variables
  const [position, setPosition] = useState({ lat: 65.01157565139543, lng: 25.470943450927738 })
  const [tempMarker, setTempMarker] = useState(null)
  const [zoom, setZoom] = useState(5)
  const [posts, setPosts] = useState([])
  const [moveToPosition, setmoveToPosition] = useState(false)
  const itemsRef = useRef([]);

  //Wheather the map constantly centers to user location. Enabled when user clics their own avatar. Disabled when map manually moved.
  const [followUser, setFollowUser] = useState(true)

  const toProfileClick = (event) => {
    event.preventDefault()
    props.history.push("/my-account/")
  }

  //users custom location hook
  const { userLocation } = usePosition(5)

  if (props.userLocation !== userLocation && userLocation !== null) {
    props.updateUserLocation(userLocation)
  }
  const changeProject = (project) => {
    props.setActiveProject(project)
    var params = { projectId: project.id };
    props.initPosts(params)
  }

  useEffect(() => {
    //hook for initializing state variable posts. And sets map position to user location if location access.
    if (props.userLocation !== userLocation && userLocation !== null) {
      //triggers every 5 sec on firefox, but not on chrome???
      props.updateUserLocation(userLocation)
    }
    if (props.posts !== posts) {
      setPosts(props.posts)
    }

    if (props.mapLocation !== null) {
      setZoom(18)
      setPosition(props.mapLocation)
      props.updateMapLocation(null)
      setmoveToPosition(true)
    }

  }, [props, posts, followUser, userLocation])

  const confirmNewLocationMarker = () => {
    //confirm select on map event handler. Button is visible only when correct url
    const tempSite = { ...props.tempSite }
    tempSite.location = tempMarker
    props.setTempSite(tempSite)
    props.history.push("/new-post/")
    setTempMarker(null)
  }
  const tempIcon = () => {
    return (
      <div className="icon-container">
        <FontAwesomeIcon icon={tempIcon} className="icon" />
      </div>
    );
  };

  //open list view
  const toListView = (event) => {
    event.preventDefault()
    props.history.push("/list-view/")
  }

  const newPostClick = (event) => {
    //New post onClick event handler.
    event.preventDefault()
    if (props.user !== null) {
      props.history.push("/new-post/")
    }
    else {
      //if not logged in, redirect to login page
      props.history.push("/login/")
      props.notify(props.settings.strings["login_required_to_post"], false, 5)
    }
  }

  //function for handling events on the map
  const HandleMapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        //unfocus click or logo click doesn't reset TempMarker.
        setFollowUser(false)
        if (props.history.location.pathname === "/select-location/") {
          setTempMarker(e.latlng)
          setPosition(e.latlng)
        }
        else {
          setPosition(e.latlng)
        }
        setmoveToPosition(true)
      },
      drag: (e) => {
        //if followUser is active, disable it.
        if (followUser) {
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
          }
        })
        setmoveToPosition(false)
      }
    }, [map])
    return null;
  }

  const UpdatePopups = () => {
    const map = useMap()
    var visible = [];
    useEffect(() => {

      var i;
      var j;

      // close previous popups
      for (i = 0; i < itemsRef.current.length; i++) {
        const marker = itemsRef.current[i]
        //to prevent errors, make sure marker isn't null
        if (marker !== null) {
          marker.closePopup();
        }
        visible = [];
      }

      // If user enables location names, get markers that are visible on the screen.
      if (props.popups) {
        for (i = 0; i < itemsRef.current.length; i++) {
          //to prevent errors, make sure itemsRef.current[i] isn't null
          if (itemsRef.current[i] !== null) {
            if (map.getBounds().contains(itemsRef.current[i].getLatLng()))
              visible.push(itemsRef.current[i]);
          }
        }
        // Take the pixel distance between all visible markers and open their corresponding popups if they are not too close to eachother
        loop1:
        for (i = 0; i < visible.length; i++) {
          loop2:
          for (j = 0; j < visible.length; j++) {
            if (i !== j && visible.length > 1) {
              if (map.latLngToLayerPoint(visible[i].getLatLng()).distanceTo(map.latLngToLayerPoint(visible[j].getLatLng())) < 110) { continue loop1; }
            }
          }
          const marker = visible[i]
          marker.openPopup()
        }
      }

    }, [map, props.popups, zoom])
    return null;
  }

  return (
    <div className="mapContainerMobile">
      <MapContainer className="fullscreenMap" zoomControl={false} center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UpdateMapCenter />
        <HandleMapEvents />
        <UpdatePopups />

        <MarkerClusterGroup maxClusterRadius="60">
          {posts.map((element, index) =>
            <Marker key={index} ref={el => itemsRef.current[index] = el}
              position={element.location}
              //if site is created by current user, use green marker. else, use default marker
              icon={props.user === null ? defaultIcon : (element.own ? greenIcon : defaultIcon)}
              //icon={element.uusi===1?(element.muistoja===null?emptyIconNew:newIcon):(element.muistoja===null?emptyIcon:defaultIcon)} 
              eventHandlers={{
                //handle click event on marker
                click: (e) => {
                  props.history.push(`/post-view/${element.id}/`)
                  setFollowUser(false)
                  setPosition(element.location)
                  setmoveToPosition(true)
                  setTempMarker(null)
                }
              }}>
              <Popup className="popupContainer"
                autoClose={false}
                autoPan={false}
                closeOnClick={false}
                offset={[0, -40]}
                maxWidth="element.title.length"
                closeButton={false}
              >
                <i><b>{element.title}</b></i>
              </Popup>
            </Marker>
          )}
        </MarkerClusterGroup>
        {userLocation !== null ?
          <Marker position={userLocation} icon={userIcon}
            eventHandlers={{
              click: (e) => {
                //when user avatar clicked the map centers to user and followUser is activated.
                if (!followUser) {
                  setFollowUser(true)
                  props.notify(props.settings.strings["user_follow"], false, 5)
                }
                setPosition(userLocation)
                setmoveToPosition(true)
              }
            }}>
          </Marker>
          :
          <></>

        }
        <div className="leftBar">{tempMarker !== null ?
          <Marker position={tempMarker} icon={tempIcon}></Marker>
          :
          <></>

        }
        </div>

      </MapContainer>

      {props.currentProject.id !== "parantolat" ?
        <button className="mobileProjectButton ">
          <DropDownSelectProject items={props.projects.projects} active={props.projects.active} change={changeProject} />
        </button>
        :
        <></>
      }
      <div className="accountInfoContainer">
        <AccountIcon className="accountInfoButton" onClick={toProfileClick}></AccountIcon>
      </div>


      {props.history.location.pathname !== "/select-location/" ?
        <div>
          {props.currentProject.id !== "parantolat" ?
            <button className="mobileNewButton" onClick={newPostClick}>
              <AddIcon className="addIcon" />
            </button>
            :
            <></>
          }

        </div>
        :
        tempMarker === null ?
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
    projects: state.projects,
    currentProject: state.projects.active,
    popups: state.popups

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  createSite,
  updateUserLocation,
  setTempSite,
  setActiveProject,
  updateMapLocation,
  tempIcon,
  initPosts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainerMobile)
