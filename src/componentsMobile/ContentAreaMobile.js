// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import {Route} from "react-router-dom"

import MapContainerMobile from "./MapContainerMobile"
import NavMenuMobile from "./NavMenuMobile"


import {notify} from "../reducers/notificationReducer"
import PostViewMobile from "./PostViewMobile"
import LoginFormMobile from "./LoginFormMobile"
import ListViewMobile from "./ListViewMobile"
import NewPostMobile from "./NewPostMobile"
import NewMementoMobile from "./NewMementoMobile"
import MyPostsMobile from "./MyPostsMobile"
import SignUpMobile from "./SignUpMobile"
import UserSettingsMobile from "./UserSettingsMobile"
import ProjectInfoMobile from "./ProjectInfoMobile"
import AboutMobile from "./AboutMobile"
import ReportPostMobile from "./ReportPostMobile"
import ReportedPostsListMobile from "./ReportedPostsListMobile"
import ProjectStatsMobile from "./ProjectStatsMobile"

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
      <Route path="/sign-up/" render={({history}) => (
        <SignUpMobile history={history}/>
      )}/>
      <Route path="/new-post/" render={({history}) => (
        <NewPostMobile history={history}/>
      )}/>
      <Route path="/new-memento/:id/" render={({match,history}) => (
          <NewMementoMobile match={match} history={history}/>
      )}/>

      <Route path="/my-posts/" render={({history}) => (
        <MyPostsMobile history={history}/>
      )}/>
      <Route path="/account-settings/" render={({history}) => (
        <UserSettingsMobile history={history}/>
      )}/>
      <Route path="/about/" render={({history}) => (
        <AboutMobile history={history}/>
      )}/>
      <Route path="/project-info/" render={({history}) => (
        <ProjectInfoMobile history={history}/>
      )}/>
      <Route exact path="/post-view/:id/report" render={({match,history}) => (
        <ReportPostMobile match={match} history={history}/>
      )}/>
      <Route exact path="/reports/" render={({history}) => (
        <ReportedPostsListMobile history={history}/>
      )}/>
      <Route exact path="/project-stats/" render={({history}) => (
        <ProjectStatsMobile history={history}/>
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
