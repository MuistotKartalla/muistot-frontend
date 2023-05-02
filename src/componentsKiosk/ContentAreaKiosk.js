// By: Niklas Impiö
import { connect } from "react-redux"
import { Link, Route } from "react-router-dom"

import "../styles/containers.css"
import "../styles/texts.css"

import CookieConsent from "react-cookie-consent"
import { notify } from "../reducers/notificationReducer"


import EditLocation from "./EditLocationKiosk"

import ImagelessPosts from "./ImagelessPostsKiosk"
import ListView from "./ListViewKiosk"

import NewMemento from "./NewMementoKiosk"

import PopUpContainer from "./PopUpContainerKiosk"
import PostView from "./PostViewKiosk"
import ProjectInfo from "./ProjectInfoKiosk"
import ProjectManagement from "./ProjectManagementKiosk"
import MapContainerKiosk from "./MapContainerKiosk";
import NavMenuKiosk from "./NavMenuKiosk";
import ProjectInfoKiosk from "./ProjectInfoKiosk"
import PopUpContainerKiosk from "./PopUpContainerKiosk"
import ListViewKiosk from "./ListViewKiosk"


const ContentArea = (props) => {
  // Ok this is just a container component for all the sub components that aren't NavBar or Notification.
  // Conditional rendering is done with react-router-dom Routes (URL address).

  //this might get little more complicated when listview is added. Currently map is always on the bg so it simple.


  //Just add Routes below for "pages"
  //Navigation can be done with props.history.push("/example-url/") [only the url after page name]
  //use pop container for pop up pages
  return (
    <div className="contentContainer">
      <Route path="/kiosk" render={({ history }) => (
        
        <MapContainerKiosk history={history} />
        
      )} />


      <Route path="/kiosk/project-info" render={({ history }) => (
        <PopUpContainerKiosk history={history}>
          <ProjectInfoKiosk history={history} />
        </PopUpContainerKiosk>
      )} />
      <Route path="/kiosk/edit-location/:id/" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <EditLocation match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route path="/kiosk/new-memento/:id/" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <NewMemento match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route path="/kiosk/list-view/:id/" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <ListViewKiosk match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route exact path="/kiosk/post-view/:id" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <PostView match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route path="/kiosk/imageless-posts/" render={({ history }) => (
        <PopUpContainer history={history}>
          <ImagelessPosts history={history} />
        </PopUpContainer>
      )} />
      <Route path="/kiosk/project-management" render={({ history }) => (
        <PopUpContainer history={history}>
          <ProjectManagement history={history} />
        </PopUpContainer>
      )} />
    
    </div>

  )

}


const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    notification: state.notification,
    user: state.user,
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentArea)



// ContentArea: The ContentArea component contains several Route components, which are used to render different components based on the URL path.
//  For example, if the URL path is /login, the LoginForm component is rendered.
//  There are also several PopUpContainer components, which are used to render components in a popup window.