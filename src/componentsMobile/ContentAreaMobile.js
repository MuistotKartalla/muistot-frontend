// By: Niklas Impiö
import { connect } from "react-redux"
import { Route } from "react-router-dom"

import MapContainerMobile from "./MapContainerMobile"
import NavMenuMobile from "./NavMenuMobile"


import { notify } from "../reducers/notificationReducer"
import About from "../common components/About"
import AccountInfoMobile from "./AccountInfoMobile"
import ChangeUserNameMobile from "./ChangeUserNameMobile"
import EditImageMobile from "./EditImageMobile"
import EditLocationMobile from "./EditLocationMobile"
import EditPostMobile from "./EditPostMobile"
import EditSiteTitleMobile from "./EditSiteTitleMobile"
import ListViewMobile from "./ListViewMobile"
import LoginFormMobile from "./LoginFormMobile"
import MyPostsMobile from "./MyPostsMobile"
import NewMementoMobile from "./NewMementoMobile"
import NewPostMobile from "./NewPostMobile"
import PostViewMobile from "./PostViewMobile"
import ProjectInfoMobile from "./ProjectInfoMobile"
import ProjectManagementMobile from "./ProjectManagementMobile"
import ProjectModeratorsMobile from "./ProjectModeratorsMobile"
import ProjectSettingsMobile from "./ProjectSettingsMobile"
import SetUserNameMobile from "./SetUserNameMobile"
import UnverifiedPostsMobile from "./UnverifiedPostsMobile"
import UserSettingsMobile from "./UserSettingsMobile"

const ContentAreaMobile = (props) => {
  // Ok this is just a container component for all the sub components except notification.
  //Mobile version
  // Conditional rendering is done with react-router-dom Routes (URL address).

  //this might get little more complicated when listview is added. Currently map is always on the bg so it simple.

  //Just add Routes below for "pages"
  //Navigation can be done with props.history.push("/example-url/") [only the url after page name]
  return (
    <div className="contentContainer">
      <Route path ="/" render={({history}) => (
        <div>
          <NavMenuMobile history={history}/>
          <MapContainerMobile history={history}/>
        </div>
      )}/>

      <Route path="/list-view/" render={({history}) => (
        <ListViewMobile history={history}/>
      )}/>
      <Route exact path="/post-view/:id" render={({match,history}) => (
        <PostViewMobile match={match} history={history}/>
      )}/>
      <Route path="/login/" render={({history}) => (
        <LoginFormMobile history={history}/>
      )}/>
      <Route path="/new-post/" render={({history}) => (
        <NewPostMobile history={history}/>
      )}/>
      <Route path="/edit-post/:id/" render={({match,history}) => (
          <EditPostMobile match={match} history={history}/>
      )}/>
      <Route path="/edit-image/:id/" render={({match,history}) => (
          <EditImageMobile match={match} history={history}/>
      )}/>
      <Route path="/edit-title/:id/" render={({match,history}) => (
          <EditSiteTitleMobile match={match} history={history}/>
      )}/>
      <Route path="/edit-location/:id/" render={({match,history}) => (
          <EditLocationMobile match={match} history={history}/>
      )}/>
      <Route path="/new-memento/:id/" render={({match,history}) => (
          <NewMementoMobile match={match} history={history}/>
      )}/>
      <Route path="/unverified-posts/" render={({history}) => (
        <UnverifiedPostsMobile history={history}/>
      )}/>
      <Route path="/my-posts/" render={({history}) => (
        <MyPostsMobile history={history}/>
      )}/>
      <Route path="/about/" render={({history}) => (
        <About history={history}/>
      )}/>
      <Route path="/project-info/" render={({history}) => (
        <ProjectInfoMobile history={history}/>
      )}/>
      <Route path="/usersettings/" render={({history}) => (
        <UserSettingsMobile history={history}/>
      )}/>
      <Route path="/change-username/" render={({history}) => (
        <ChangeUserNameMobile history={history}/>
      )}/>
      <Route path="/set-username/" render={({history}) => (
        <SetUserNameMobile history={history}/>
      )}/>
      <Route path="/my-account/" render={({history}) => (
        <AccountInfoMobile history={history}/>
      )}/>
      <Route path="/project-management/" render={({history}) => (
        <ProjectManagementMobile history={history}/>
      )}/>
      <Route path="/project-settings/" render={({history}) => (
        <ProjectSettingsMobile history={history}/>
      )}/>
      <Route path="/project-moderators/" render={({history}) => (
        <ProjectModeratorsMobile history={history}/>
      )}/>
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
)(ContentAreaMobile)
