// By: Niklas Impiö, Lassi Tölli
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useRef, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents,ZoomControl } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { connect } from "react-redux"
import iconGreen from "../resources/marker-green.png"
import icon from "../resources/marker-icon.png"
import iconShadow from "../resources/marker-shadow.png"
import "../styles/buttons.css"
import "../styles/mapContainer.css"
import "../styles/markerCluster.css"
import "../styles/popupContainer.css"
import "../styles/utils.css"


import tempIconMarker from "../resources/temp_marker.svg"
import userIconMarker from "../resources/user_icon_custom.svg"

import { usePosition } from "../hooks/LocationHook"
import { updateMapLocation } from "../reducers/mapLocationReducer"
import { notify } from "../reducers/notificationReducer"
import { createSite } from "../reducers/postReducer"
import { setTempSite } from "../reducers/tempSiteReducer"
import { updateUserLocation } from "../reducers/userLocationReducer"
import FloatingSearch from "./FloatingSearchKiosk"
import {ReactComponent as ListIcon} from "../resources/list_icon.svg";
import {Utils} from "./UtilsKiosk";
//david
import { ReactComponent as InfoButton } from "../resources/info_font.svg"
import "../styles/navMenu.css"

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
  const itemsRef = useRef([]);
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
      setZoom(18)
      setPosition(props.mapLocation) 
      props.updateMapLocation(null)
      setmoveToPosition(true)
    }

  }, [props, posts, followUser, userLocation])

    // Erilaisia ikonivalintoja:
    // <Marker key={index} position={element.location} icon={element.muistoja==null?emptyIcon:(index<2?star3Icon:(index<4?star2Icon:(index<6?starIcon:defaultIcon)))} onClick={() => onPostClick(element)}
 
  //open list view
  const toListView = (event) => {
    event.preventDefault()
    props.history.push("/kiosk/list-view/"+props.posts[0].id)
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

  // Handles visualizing the location names 
  const UpdatePopups = () => {
    const map = useMap()
    var visible = [];
    useEffect(() => {
      
      var i ;
      var j;

      // close previous popups
      for(i=0; i < itemsRef.current.length; i++){
        const marker = itemsRef.current[i]
        //to prevent errors, make sure marker isn't null
        if (marker !== null){
          marker.closePopup();
        }
        visible = [];
        }
      
      // If user enables location names, get markers that are visible on the screen.
      if(props.popups) {
        for(i=0; i < itemsRef.current.length; i++){
          //to prevent errors, make sure itemsRef.current[i] isn't null
          if (itemsRef.current[i] !== null) {
            if(map.getBounds().contains(itemsRef.current[i].getLatLng()))
              visible.push(itemsRef.current[i]);
          }
        }
      // Take the pixel distance between all visible markers and open their corresponding popups if they are not too close to eachother
        loop1:
          for(i=0; i < visible.length; i++){  
        loop2:
            for(j=0; j < visible.length; j++){  
              if(i !== j && visible.length > 1){
                if (map.latLngToLayerPoint(visible[i].getLatLng()).distanceTo(map.latLngToLayerPoint(visible[j].getLatLng())) < 125) { continue loop1; }
              }
            }
            const marker = visible[i]
            marker.openPopup()}
          }

    }, [map,props.popups,zoom])
    return null;
  }

  const toProjectMenu = (event) => {
    event.preventDefault()
	if(props.history.location.pathname === "/kiosk/project-info/")
		{
		props.history.push("/kiosk")
		}
	else
		{
		props.history.push("/kiosk/project-info/")
		}
  }

  return(
    <div className="mapContainer">
      <MapContainer className="fullscreenMap" center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          
        />
        <ZoomControl position="bottomright" />
        <UpdateMapCenter/>
        <HandleMapEvents/>
        <UpdatePopups/>

        <MarkerClusterGroup className="markerCluster" maxClusterRadius="60">
          {posts.map((element, index) =>
            <Marker key={index} ref={el => itemsRef.current[index] = el}
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
            <Popup className="popupContainer"
                autoClose={false}
                autoPan={false}
                closeOnClick={false}
                offset = {[0,-40]}
                maxWidth = "element.title.length"
                closeButton={false}
                >     
                <b>{element.title}</b>
                </Popup> 
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

      <Utils items={[<InfoButton className="projectInfoButtonContainer" onClick={toProjectMenu}></InfoButton>, <ListIcon className="floatingList" onClick={toListView}>{props.settings.strings["list_view"]}</ListIcon>]}></Utils>

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
  updateMapLocation
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainerOpen)



// MapContainerOpen: It is used in ContentArea.js . The component defines a function to handle user clicks on the map, which will create a temporary marker that can be used to create a new post. It also defines
//  a function to confirm the location of the temporary marker and navigate to a new post form.
