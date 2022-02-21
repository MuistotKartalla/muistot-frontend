// By: Niklas Impiö
import * as loginService from "../services/login"
import {sendVerifyLink as svlService} from "../services/email"
import axios from 'axios'
import {log} from "../services/settings";

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const INIT_USER = "INIT_USER"
const RENEW_EXP = "RENEW_EXP"
const RENEW_LINK = "RENEW_LINK"

const loginReducer = (state = null, action) => {
    // Different action types defined here. returned value will be set as redux state.
    switch (action.type) {
        case LOGIN:
            return action.data
        case LOGOUT:
            return null
        case INIT_USER:
            return action.data
        case RENEW_EXP:
            return action.data
        case RENEW_LINK:
            return null
        default:
            return state
    }
}

export const login = (username, password, notify) => {
    return async (dispatch) => {
        try {
            const token = await loginService.login({
                username,
                password
            })

            //Aseta pyyntöihin auktorisoinniksi
            axios.defaults.headers.common['Authorization'] = token;

            //Dispatch the action and data to the actual reducer (loginReducer)
            dispatch({
                type: "LOGIN",
                data: token
            })

            return true
        } catch (error) {
            log(error)
            //if the loginservice returns error or doesn't answer error is catched and user notified..
            notify(error.response['data']['error'] + ": " + error.response['data']['msg'], false, 5)
        }
        return null
    }
}

export const logout = (notify, notifymsg) => {
    //remove user from state, localstorage and remove all tokens from services.
    return (dispatch) => {
        delete axios.defaults.headers.common["Authorization"];
        window.localStorage.removeItem('ChimneysGoToken')
        dispatch({
            type: "LOGOUT",
            data: null
        })
        notify(notifymsg, false, 5)
    }
}

export const initLoggedUser = (user) => {
    //just a way to init logged user from outside the reducer with for example value from localstorage.
    return (dispatch) => {
        dispatch({
            type: INIT_USER,
            data: user

        })
    }
}


export const sendverifylink = (email, notify) => {

    return async (dispatch) => {
        try {
            //send link request
            await svlService(email)
            dispatch({
                type: RENEW_LINK,
                data: null
            })
            notify("Verification link sent.", false, 5)
        } catch (error) {
            notify(error.response['data']['error'] + ": " + error.response['data']['msg'], false, 5)
        }
    }
}

export default loginReducer
