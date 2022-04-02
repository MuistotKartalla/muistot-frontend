// By: Niklas Impiö
import * as postService from "../services/posts"
import {getActiveProject} from "./projectReducer";
import {log} from "../services/settings";

const INIT_POSTS = "INIT_POSTS"
const ADD_POSTS = "ADD_POSTS"
const EDIT_POST = "EDIT_POST"
const CREATE_POST = "CREATE_POST"
const CREATE_SITE = "CREATE_SITE"
const DELETE_POST = "DELETE_POST"

const postReducer = (state = [], action) => {
    // dispatch actions defined here.
    switch (action.type) {
        case INIT_POSTS:
            return action.data
        case ADD_POSTS:
            return state.concat(action.data)
        case EDIT_POST:
            return state.filter(post => post.id !== action.data)
        case CREATE_POST:
            return state.concat(action.data)
        case CREATE_SITE:
            return state.concat(action.data)
        case DELETE_POST:
            return state.filter(item => item.id !== action.data)
        default:
            return state
    }
}

export const initPosts = (params) => {
    return async dispatch => {
        try {
            const posts = await postService.getSites(getActiveProject() || params.projectId, null)
            dispatch({
                type: INIT_POSTS,
                data: posts
            })
        } catch (e) {
            log(e)
        }
    }
}


export const createSite = (object) => {
    /*
        {
            projectId,
            title,
            location
        }

        POST request to postService with the new post object.
        If successful, updates redux state so that it contains the new object.
    */
    return async dispatch => {
        try {
            const newPost = await postService.createSite(object.projectId, object)
            dispatch({
                type: CREATE_SITE,
                data: newPost
            })
        } catch (exception) {
            log(exception)
        }

    }
}

export const deletePost = (id) => {
    log("deleting post " + id.toString())
    return async dispatch => {
        try {
            const response = await postService.deleteSite(getActiveProject(), id)
            log(response)
            if (response.status === 200) {
                dispatch({
                    type: DELETE_POST,
                    data: id
                })
            }

        } catch (exeption) {
            log(exeption)
        }
    }
}

export const toggleVerify = (site) => {
    // sends verify request to backend,
    // backend returns the modified object,
    // it is then updated to redux state
    // post = {...post, verify: !post.verify}
    return async dispatch => {
        try {
            const response = await postService.toggleVerifySite(
                getActiveProject(),
                site.id,
                site.waiting_approval
            )
            dispatch({
                type: EDIT_POST,
                data: response.data
            })
        } catch (exeption) {
            log(exeption)
        }
    }
}

export const toggleVerifyMemento = (site, memento) => {
    // sends verify request to backend,
    // backend returns the modified object,
    // it is then updated to redux state
    return async dispatch => {
            try {
                const response = await postService.toggleVerifyMemory(
                    getActiveProject(),
                    site.id,
                    memento.id,
                    memento.waiting_approval
                )
                dispatch({
                    type: EDIT_POST,
                    data: response.data
                })
            } catch (exeption) {
                log(exeption)
            }
    }
}
export default postReducer
