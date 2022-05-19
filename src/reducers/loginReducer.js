// By: Niklas Impiö
import * as loginService from "../services/login"
import {sendVerifyLink as svlService} from "../services/email"
import axios from 'axios'
import {log} from "../services/settings";
import * as userService from "../services/user"

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const LOGOUTS = "LOGOUTS"
const INIT_USER = "INIT_USER"
const RENEW_EXP = "RENEW_EXP"
const RENEW_LINK = "RENEW_LINK"
const EDIT_USER = "EDIT_USER"


const loginReducer = (state = null, action) => {
    // Different action types defined here. returned value will be set as redux state.
    switch (action.type) {
        case LOGIN:
            return action.data
        case LOGOUT:
            return null
        case LOGOUTS:
            return null    
        case INIT_USER:
            return action.data
        case RENEW_EXP:
            return action.data
        case RENEW_LINK:
            return null
        case EDIT_USER:
            return state.filter(user => user.id !== action.data)      
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

export const logoutS = (notify) => {
    //remove user from state, localstorage and remove all tokens from services.
    return (dispatch) => {try{
        delete axios.defaults.headers.common["Authorization"];
        window.localStorage.removeItem('ChimneysGoToken')
        dispatch({
            type: LOGOUTS,
            data: null
        })}catch(e){
            notify(e.response['data']['error'] + ": " + e.response['data']['msg'], false, 5)
        }
    }
}



export const initLoggedUser = (user) =>{
    return async (dispatch) => {
        const res = await userService.getUser()
        if(res.status === 200 && user){
            dispatch({
                type: INIT_USER,
                data: res.data
            })
        }else {
            delete axios.defaults.headers.common["Authorization"];
            window.localStorage.removeItem('ChimneysGoToken')
            dispatch({
                type: LOGOUTS,
                data: null
            })

        }  
      
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

export const changeUsernameReducer = (username) => {
    // sends verify request to backend,
    // backend returns the modified object,
    // it is then updated to redux state
    return async dispatch => {
            try {
                const response = await 
                userService.changeUsername(username)
                dispatch({
                    type: EDIT_USER,
                    data: response.data
                })
            } catch (error) {              
                log(error)
            }
    }
}

export const changeUserSettings = (first_name, last_name, country, city, birth_date) => {
    return async dispatch => {
        try{
            const userSettings = await userService.changeUserSettings(
                first_name, last_name, country, city, birth_date)
            dispatch({
                type: EDIT_USER,
                data: userSettings
            })
        }catch (error) {              
            log(error)
        }
    }
}


export default loginReducer
