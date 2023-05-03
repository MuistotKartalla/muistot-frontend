// By: Niklas Impiö
// Edited:
// - joniumGit
// - Aapo2001
import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import axios from "axios"

//import dispatch methods
import {notify} from "./reducers/notificationReducer"
import {initLoggedUser, login, logout} from "./reducers/loginReducer"
import {initPosts} from "./reducers/postReducer"
import {initProjects} from "./reducers/projectReducer"
import {initSettings, setActiveLanguage, setActiveTheme} from "./reducers/settingsReducer"

//import components
import Notification from "./components/Notification"
import NavMenu from "./components/NavMenu"
import "./styles/containers.css"
import ContentArea from "./components/ContentArea"
import ContentAreaMobile from "./componentsMobile/ContentAreaMobile"
import ContentAreaKiosk from "./componentsKiosk/ContentAreaKiosk"

import {log} from "./services/settings";
import {checkLocation} from "./services/initialurl";
import NavMenuKiosk from "./componentsKiosk/NavMenuKiosk"

const App = (props) => {
    const [postsInit, setPostsInitialized] = useState(false)
    const [projectsInit, setProjectsInitialized] = useState(false)
    const [settingsInit, setSettingsInitialized] = useState(false)
    const [userInit, setUserInitialized] = useState(false)
    const [verified, setVerified] = useState(true)
    const isMobile = window.innerWidth <= 500
    const [isKiosk, setIsKiosk] = useState(false);
    // Use local
    axios.defaults.baseURL = "http://localhost:5600"

    checkLocation(async () => setVerified(false))

    useEffect(() => {
        log("Pääsilmukka aktivoitu");
        log(props)
        const hash = window.location.hash
        const piiput = hash.startsWith("#init-project=piiput")
        const parantolat = hash.startsWith("#init-project=parantolat")
        const userToken = window.localStorage.getItem('ChimneysGoToken')        
        const activeProjectJSON = window.localStorage.getItem("ChimneysGoProject")
        const settingsJSON = {
            language: window.localStorage.getItem("ChimneysGoLanguage"),
            theme: window.localStorage.getItem("ChimneysGoTheme")
        }

        if (userToken && !userInit) {
            axios.defaults.headers.common['Authorization'] = userToken
            props.initLoggedUser(userToken)
            setUserInitialized(true)          
        }

        if (!settingsInit && settingsJSON) {
            log("Aktivoidaan asetukset:")
            log(settingsJSON)
            if(settingsJSON.language && settingsJSON.theme){
                props.initSettings(settingsJSON)
            }else{
                const language = "fi"
                const theme = "dark"
                const settings = {
                    language: language,
                    theme: theme
                }

                props.initSettings(settings)
                props.setActiveLanguage(language)
                props.setActiveTheme(theme)

            }

            setSettingsInitialized(true)
        }

        if(parantolat && !projectsInit){
            window.localStorage.setItem("ChimneysGoProject", "parantolat")
            props.initProjects("parantolat")
            setProjectsInitialized(true)
        }

        if(piiput && !projectsInit){
            window.localStorage.setItem("ChimneysGoProject", "piiput")
            props.initProjects("piiput")
            setProjectsInitialized(true)
        }

        if (!projectsInit && !parantolat && !piiput) {
            props.initProjects(activeProjectJSON)
            setProjectsInitialized(true)
        }

        if (!postsInit && props.projects.active && props.projects.active.title) {
            var params = {projectId: props.projects.active.id};
            props.initPosts(params)
            setPostsInitialized(true)
        }

        document.title = "Muistot kartalla"
    }, [props, postsInit, projectsInit, settingsInit,userInit]) 

    useEffect(() => {
        if (window.location.pathname === '/kiosk') {
          setIsKiosk(true);
        }
      }, []);

      if (isMobile) {
        return (
            <div className="appContainer">
                <Router>
                    <Route path="/" render={({history}) => (<ContentAreaMobile history={history}/>)}/>
                    {!verified? <Redirect to="/set-username" /> : <></>}
                    {/* {props.notification.message !== null ? <NotificationMobile/> : <div/>} */}
                </Router>
            </div>
        )
    } else if (isKiosk){
        return(
            <div className="appContainer">
                <Router>
                <Route path="/kiosk" render={({history}) => (<NavMenuKiosk history={history}/>)}/>
                    <ContentAreaKiosk/>
                </Router>
            </div>
        )
    }else{
        return (
            //returns what to render
            <div className="appContainer">
                <Router>
                    <Route path="/" render={({history}) => (<NavMenu history={history}/>)}/>
                    {!verified? <Redirect to="/set-username" /> : <></>}
                    <ContentArea/>
                    {/* {props.notification.message !== null ? <Notification/> : <div/>} */}
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //maps state to props, after this you can for example call props.notification
        notification: state.notification,
        user: state.user,
        posts: state.posts,
        projects: state.projects,
        update: state.settings.update,
        strings: state.settings.strings,
        settings: state.settings
    }
}

const mapDispatchToProps = {
    //connect reducer functions/dispatchs to props
    notify,
    login,
    logout,
    initLoggedUser,
    initPosts,
    initProjects,
    initSettings,
    setActiveLanguage,
    setActiveTheme
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
