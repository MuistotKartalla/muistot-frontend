// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {Route, Link} from "react-router-dom"

import "../styles/containers.css"
import "../styles/texts.css"

import notificationReducer, {notify} from "../reducers/notificationReducer"
import NewPostCombined from "./NewPostCombined"
import NewMemento from "./NewMemento"
import PostView from "./PostView"
import ListView from "./ListView"
import MyPosts from "./MyPosts"
import LoginForm from "./LoginForm"
import PopUpContainer from "./PopUpContainer"
import About from "./About"
import ProjectInfo from "./ProjectInfo"
import MapContainerOpen from "./MapContainerOpen"
import UnverifiedPosts from "./UnverifiedPosts"
import EditPost  from "./EditPost"
import ImagelessPosts from "./ImagelessPosts"
import UserSettings  from "./UserSettings"
import ChangeUserName from "./ChangeUserName"
import SetUserName from "./SetUserName"
import AccountInfo from "./AccountInfo"
import CookieConsent, { Cookies } from "react-cookie-consent";
import ProjectManagement from "./ProjectManagement"

const ContentArea = (props) => {
  // Ok this is just a container component for all the sub components that aren't NavBar or Notification.
  // Conditional rendering is done with react-router-dom Routes (URL address).

  //this might get little more complicated when listview is added. Currently map is always on the bg so it simple.


  //Just add Routes below for "pages"
  //Navigation can be done with props.history.push("/example-url/") [only the url after page name]
  //use pop container for pop up pages
  return (
    <div className="contentContainer">
      <Route path ="/" render={({history}) => (
        <MapContainerOpen history={history}/>
      )}/>
      <Route path="/login" render={({history}) => (
        <PopUpContainer history={history}>
          <LoginForm history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/about" render={({history}) => (
        <PopUpContainer history={history}>
          <About history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/project-info" render={({history}) => (
        <PopUpContainer history={history}>
          <ProjectInfo history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/new-post" render={({history}) => (
        <PopUpContainer history={history}>
          <NewPostCombined history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/edit-post/:id/" render={({match,history}) => (
        <PopUpContainer history={history}>
          <EditPost match={match} history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/new-memento/:id/" render={({match,history}) => (
        <PopUpContainer history={history}>
          <NewMemento match={match} history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/list-view/:id/" render={({match,history}) => (
        <PopUpContainer history={history}>
          <ListView match={match} history={history}/>
        </PopUpContainer>
      )}/>
      <Route exact path="/post-view/:id" render={({match,history}) => (
        <PopUpContainer history={history}>
          <PostView match={match} history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/my-posts/" render={({history}) => (
        <PopUpContainer history={history}>
          <MyPosts history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/unverified-posts/" render={({history}) => (
        <PopUpContainer history={history}>
          <UnverifiedPosts history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/imageless-posts/" render={({history}) => (
        <PopUpContainer history={history}>
          <ImagelessPosts history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/usersettings" render={({history}) => (
        <PopUpContainer history={history}>
          <UserSettings history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/change-username" render={({history}) => (
        <PopUpContainer history={history}>
          <ChangeUserName history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/set-username" render={({history}) => (
        <PopUpContainer history={history}>
          <SetUserName history={history}/>
        </PopUpContainer>
      )}/> 
      <Route path="/my-account" render={({history}) => (
        <PopUpContainer history={history}>
          <AccountInfo history={history}/>
        </PopUpContainer>
      )}/>
      <Route path="/project-management" render={({history}) => (
        <PopUpContainer history={history}>
          <ProjectManagement history={history}/>
        </PopUpContainer>
      )}/>
        <CookieConsent  //TODO: modelize, styles
          location="bottom"
          buttonText="I understand"
          cookieName="consentCookie"
          style={{ background: "#181818", fontFamily: "sans-serif"}}
          buttonStyle={{ background: "#03FFFF", fontSize: "1em", border: "none", borderRadius: "7px", fontWeight: "700", padding: "0.5em 1em 0.5em 1em"}}>
          This website uses cookies to enhance the user experience.
          <Link to="/about">
              <span style={{float: "right", color: "#FFFFFF", textDecoration: "underline"}}>Privacy Policy</span> 
          </Link>
        </CookieConsent>         
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
