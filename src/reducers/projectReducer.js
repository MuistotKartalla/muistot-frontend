import * as projectService from "../services/projects"
import {log} from "../services/settings";

const INIT_PROJECT = "INIT_PROJECTS"
const CREATE_PROJECT = "CREATE_PROJECT"
const SET_ACTIVE_PROJECT = "SET_ACTIVE_PROJECT"
const EDIT_PROJECT = "EDIT_PROJECT"


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
        case EDIT_PROJECT:
          return {
              projects: action.data.projects,
              active: action.data.active
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

export const createProject = (project_id, object) => {
    return async dispatch => {
        try {
          const projects = (await projectService.getAllProjects())
          projects.push(object)
          console.log("New projects: ", projects)
          const newProject = await projectService.createNewProject(projects)
          let activeProject = null
          if (project_id) {
              activeProject = projects.find(project => project.id.toString() === project_id)
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
        } catch (exception) {
            log(exception)
        }
    }
}

export const changeProjectSettings = (modifiedproject) => {
  return async dispatch => {
      try{
          //get language from current project settings
          const oldProject = await projectService.getSingleProject(modifiedproject.id)
          await projectService.changeSettings(modifiedproject.id, oldProject.info.lang, modifiedproject.name, modifiedproject.abstract, modifiedproject.description)
          const projects = (await projectService.getAllProjects())
          let activeProject = null
          if (modifiedproject.id) {
              activeProject = projects.find(project => project.id.toString() === modifiedproject.id)
          }
          if (!activeProject) {
              activeProject = projects[0]
              log("Active project not found")
          }
          dispatch({
              type: EDIT_PROJECT,
              data: {
                projects,
                active: activeProject
              }
          })
      }catch (error) {
          log(error)
      }
  }
}

export const addNewModerator = (project_id, new_moderator) => {
  return async dispatch => {
      try{
        await projectService.addNewMod(project_id, new_moderator)
        const projects = (await projectService.getAllProjects())
        let activeProject = null
        if (project_id) {
            activeProject = projects.find(project => project.id.toString() === project_id)
        }
        if (!activeProject) {
            activeProject = projects[0]
            log("Active project not found")
        }
        dispatch({
            type: EDIT_PROJECT,
            data: {
              projects,
              active: activeProject
            }
        })
      }catch (error) {       
          log(error)
      }
  }
}

export default projectReducer
