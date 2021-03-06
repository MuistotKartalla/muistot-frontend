import * as projectService from "../services/projects"
import {log} from "../services/settings";

const INIT_PROJECT = "INIT_PROJECTS"
const CREATE_PROJECT = "CREATE_PROJECT"
const SET_ACTIVE_PROJECT = "SET_ACTIVE_PROJECT"


const projectReducer = (state = {projects: [], active: {}}, action) => {
    //dispatch actions defined here.
    switch (action.type) {
        case INIT_PROJECT:
            return {
                projects: action.data.projects,
                active: action.data.active
            }
        case CREATE_PROJECT:
            return {
                projects: state.projects.concat(action.data),
                active: action.data
            }
        case SET_ACTIVE_PROJECT:
            return {
                projects: state.projects,
                active: action.data
            }
        default:
            return state
    }
}

export const initProjects = (activeProjectId) => {
    //Currently loads all projects and their data.
    log("Loading projects")
    log("Active project:" + activeProjectId)

    return async dispatch => {
        const projects = (await projectService.getAllProjects())
        let activeProject = null

        if (activeProjectId) {
            activeProject = projects.find(project => project.id.toString() === activeProjectId)
        }

        if (!activeProject) {
            activeProject = projects[0]
            log("Active project not found")
        }

        dispatch({
            type: INIT_PROJECT,
            data: {
                projects,
                active: activeProject
            }
        })
    }
}

export const setActiveProject = (project) => {
    window.localStorage.setItem("ChimneysGoProject", project.id)
    return dispatch => {
        dispatch({
            type: SET_ACTIVE_PROJECT,
            data: project
        })
    }
}

export const getActiveProject = () => {
    return window.localStorage.getItem("ChimneysGoProject")
}

export const createProject = (object) => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_PROJECT,
                data: object
            })
        } catch (exception) {
            log(exception)
        }
    }
}

export default projectReducer
