// By: Niklas Impiö
import { connect } from "react-redux"
import { Link, Route } from "react-router-dom"

import "../styles/containers.css"
import "../styles/texts.css"

import CookieConsent from "react-cookie-consent"
import { notify } from "../reducers/notificationReducer"
import About from "../common components/About"
import AccountInfo from "./AccountInfo"
import ChangeUserName from "./ChangeUserName"
import EditImage from "../common components/EditImage"
import EditLocation from "./EditLocation"
import EditPost from "./EditPost"
import EditSiteTitle from "./EditSiteTitle"
import ImagelessPosts from "./ImagelessPosts"
import ListView from "../common components/ListView"
import LoginForm from "./LoginForm"
import MapContainerOpen from "./MapContainerOpen"
import MyPosts from "./MyPosts"
import MyProjects from "./MyProjects"
import NewMemento from "./NewMemento"
import NewPostCombined from "./NewPostCombined"
import PopUpContainer from "../common components/PopUpContainer"
import PostView from "./PostView"
import ProjectInfo from "../common components/ProjectInfo"
import ProjectManagement from "./ProjectManagement"
import ProjectModerators from "./ProjectModerators"
import ProjectSettings from "./ProjectSettings"
import SetUserName from "./SetUserName"
import UnverifiedPosts from "./UnverifiedPosts"
import UserSettings from "./UserSettings"
import NewProject from "./NewProject"
import ProjectDelete from "./ProjectDelete"

const ContentArea = (props) => {
  // Ok this is just a container component for all the sub components that aren't NavBar or Notification.
  // Conditional rendering is done with react-router-dom Routes (URL address).

  //this might get little more complicated when listview is added. Currently map is always on the bg so it simple.


  //Just add Routes below for "pages"
  //Navigation can be done with props.history.push("/example-url/") [only the url after page name]
  //use pop container for pop up pages
  return (
    <div className="contentContainer">
      <Route path="/" render={({ history }) => (
        <MapContainerOpen history={history} />
      )} />
      <Route path="/login" render={({ history }) => (
        <PopUpContainer history={history}>
          <LoginForm history={history} />
        </PopUpContainer>
      )} />
      <Route path="/about" render={({ history }) => (
        <PopUpContainer history={history}>
          <About history={history} />
        </PopUpContainer>
      )} />
      <Route path="/project-info" render={({ history }) => (
        <PopUpContainer history={history}>
          <ProjectInfo history={history} />
        </PopUpContainer>
      )} />
      <Route path="/new-project" render={({ history }) => (
        <PopUpContainer history={history}>
          <NewProject history={history} />
        </PopUpContainer>
      )} />
      <Route path="/new-post" render={({ history }) => (
        <PopUpContainer history={history}>
          <NewPostCombined history={history} />
        </PopUpContainer>
      )} />
      <Route path="/edit-post/:id/" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <EditPost match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route path="/edit-image/:id/" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <EditImage match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route path="/edit-title/:id/" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <EditSiteTitle match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route path="/edit-location/:id/" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <EditLocation match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route path="/new-memento/:id/" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <NewMemento match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route path="/list-view/:id/" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <ListView match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route exact path="/post-view/:id" render={({ match, history }) => (
        <PopUpContainer history={history}>
          <PostView match={match} history={history} />
        </PopUpContainer>
      )} />
      <Route path="/my-projects/" render={({ history }) => (
        <PopUpContainer history={history}>
          <MyProjects history={history} />
        </PopUpContainer>
      )} />
      <Route path="/my-posts/" render={({ history }) => (
        <PopUpContainer history={history}>
          <MyPosts history={history} />
        </PopUpContainer>
      )} />
      <Route path="/unverified-posts/" render={({ history }) => (
        <PopUpContainer history={history}>
          <UnverifiedPosts history={history} />
        </PopUpContainer>
      )} />
      <Route path="/imageless-posts/" render={({ history }) => (
        <PopUpContainer history={history}>
          <ImagelessPosts history={history} />
        </PopUpContainer>
      )} />
      <Route path="/usersettings" render={({ history }) => (
        <PopUpContainer history={history}>
          <UserSettings history={history} />
        </PopUpContainer>
      )} />
      <Route path="/change-username" render={({ history }) => (
        <PopUpContainer history={history}>
          <ChangeUserName history={history} />
        </PopUpContainer>
      )} />
      <Route path="/set-username" render={({ history }) => (
        <PopUpContainer history={history}>
          <SetUserName history={history} />
        </PopUpContainer>
      )} />
      <Route path="/my-account" render={({ history }) => (
        <PopUpContainer history={history}>
          <AccountInfo history={history} />
        </PopUpContainer>
      )} />
      <Route path="/project-management" render={({ history }) => (
        <PopUpContainer history={history}>
          <ProjectManagement history={history} />
        </PopUpContainer>
      )} />
      <Route path="/project-settings" render={({ history }) => (
        <PopUpContainer history={history}>
          <ProjectSettings history={history} />
        </PopUpContainer>
      )} />
      <Route path="/project-moderators" render={({ history }) => (
        <PopUpContainer history={history}>
          <ProjectModerators history={history} />
        </PopUpContainer>
      )} />
      <Route path="/project-delete" render={({ history }) => (
        <PopUpContainer history={history}>
          <ProjectDelete history={history} />
        </PopUpContainer>
      )} />
      <CookieConsent  //TODO: modelize, styles, add to mobile as well
        location="bottom"
        buttonText="I understand"
        cookieName="consentCookie"
        style={{ background: "#181818", fontFamily: "sans-serif" }}
        buttonStyle={{ background: "#03FFFF", fontSize: "1em", border: "none", borderRadius: "7px", fontWeight: "700", padding: "0.5em 1em 0.5em 1em" }}>
        This website uses cookies to enhance the user experience.
        <Link to="/about">
          <span style={{ float: "right", color: "#FFFFFF", textDecoration: "underline" }}>Privacy Policy</span>
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



// ContentArea: The ContentArea component contains several Route components, which are used to render different components based on the URL path.
//  For example, if the URL path is /login, the LoginForm component is rendered.
//  There are also several PopUpContainer components, which are used to render components in a popup window.