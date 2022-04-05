// By: Niklas Impiö
// Edited:
// - joniumGit
import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {BrowserRouter as Router, Route} from "react-router-dom"
import axios from "axios"

//import dispatch methods
import {notify} from "./reducers/notificationReducer"
import {initLoggedUser, login, logout} from "./reducers/loginReducer"
import {initPosts} from "./reducers/postReducer"
import {initProjects} from "./reducers/projectReducer"
import {initSettings} from "./reducers/settingsReducer"

//import components
import Notification from "./components/Notification"
import NavMenu from "./components/NavMenu"
import "./styles/containers.css"
import ContentArea from "./components/ContentArea"
import ContentAreaMobile from "./componentsMobile/ContentAreaMobile"
import NotificationMobile from "./componentsMobile/NotificationMobile"
import {log} from "./services/settings";

const App = (props) => {
    const [postsInit, setPostsInitialized] = useState(false)
    const [projectsInit, setProjectsInitialized] = useState(false)
    const [settingsInit, setSettingsInitialized] = useState(false)
    const [userInit, setUserInitialized] = useState(false)
    const isMobile = window.innerWidth <= 500
    // Use local
    axios.defaults.baseURL = "http://localhost:5600"

    const whash = window.location.hash
    if (whash && whash.startsWith("#email-login:")) {
        const query = whash.replace("#email-login:", "").split("&");
        (async () => {
            const token = (await axios.post("/login/email-only/exchange", null, {
                    params: {
                        user: query.filter((o, _, __) => o.startsWith("user")).map(o => o.split("=")[1])[0],
                        token: query.filter((o, _, __) => o.startsWith("token")).map(o => o.split("=")[1])[0]
                    }
                })
            ).headers.authorization
            if (token) {
                window.localStorage.setItem('ChimneysGoToken', token)
            }
        })();
        if (window.history.replaceState) {
            window.history.replaceState(null, null, "#");
        } else {
            window.location.hash = "#";
        }
    }

    useEffect(() => {
        log("Pääsilmukka aktivoitu");
        log(props)
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
            props.initSettings(settingsJSON)
            setSettingsInitialized(true)
        }

        if (!projectsInit) {
            log("Ladataan projektit")
            props.initProjects(activeProjectJSON)
            setProjectsInitialized(true)
        }

        if (!postsInit && props.projects.active && props.projects.active.title) {
            //console.log("Ladataan aktiivisen projektin kohteet...")
            //Rajattava vain kartalla näkyviin vielä!
            var params = {projectId: props.projects.active.id};
            props.initPosts(params)
            setPostsInitialized(true)
        }

        document.title = "Muistot kartalla"
    }, [props, postsInit, projectsInit, settingsInit,userInit]) //Added seconds and minutes

    if (isMobile) {
        return (
            <div className="appContainer">
                <Router>
                    <Route path="/" render={({history}) => (<ContentAreaMobile history={history}/>)}/>
                    {props.notification.message !== null ? <NotificationMobile/> : <div/>}
                </Router>
            </div>
        )
    } else {
        return (
            //returns what to render
            <div className="appContainer">
                <Router>
                    <Route path="/" render={({history}) => (<NavMenu history={history}/>)}/>
                    <ContentArea/>
                    {props.notification.message !== null ? <Notification/> : <div/>}
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

