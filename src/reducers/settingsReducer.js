// By: Niklas Impiö
import axios from "axios"
import languages from "../strings/stringStorage.json"
import {log} from "../services/settings";


const {language_strings, supported_languages} = languages
const INIT_SETTINGS = "INIT_SETTINGS"
const SET_ACTIVE_LANGUAGE = "SET_ACTIVE_LANGUAGE"
const SET_ACTIVE_THEME = "SET_ACTIVE_THEME"

const initialState = {
    languages: supported_languages,
    activeLanguage: supported_languages[0],
    strings: language_strings[supported_languages[0]],
    themes: ["dark", "light"],
    activeTheme: "dark",
    version: null,
    update: false
}

const changeThemeInCSS = (theme) => {
    if (theme === "dark"){
        document.documentElement.style.setProperty("--primary-color", "#3E4144")
        document.documentElement.style.setProperty("--primary-static-color", "#535B61")
        document.documentElement.style.setProperty("--secondary-color", "#585755")
        document.documentElement.style.setProperty("--primary-text-color", "#e1e1e1")
        document.documentElement.style.setProperty("--secondary-text-color", "#ffffff")
        document.documentElement.style.setProperty("--accent-color", "#f9f9f9")
        document.documentElement.style.setProperty("--accent-color-dark", "#000000")
        document.documentElement.style.setProperty("--accent-color-light", "#808080")
        document.documentElement.style.setProperty("--effect-color", "#cecece")
        document.documentElement.style.setProperty("--activity-color", "#000000")
        document.documentElement.style.setProperty("--title-color", "#ffffff")
        document.documentElement.style.setProperty("--hover-text-color", "#3E4144")
    }
    else{
        document.documentElement.style.setProperty("--primary-color", "#D3D3D3")
        document.documentElement.style.setProperty("--primary-static-color", "#DCDCDC")
        document.documentElement.style.setProperty("--secondary-color", "#dddddd")
        document.documentElement.style.setProperty("--primary-text-color", "#060303")
        document.documentElement.style.setProperty("--secondary-text-color", "#505050")
        document.documentElement.style.setProperty("--accent-color", "#b1b1b1")
        document.documentElement.style.setProperty("--accent-color-dark", "#e0e0e0")
        document.documentElement.style.setProperty("--accent-color-light", "#ffffff")
        document.documentElement.style.setProperty("--activity-color", "#ffffff")
        document.documentElement.style.setProperty("--title-color", "#262222")
        document.documentElement.style.setProperty("--hover-text-color", "#cfcfcf")
    }
}


const settingsReducer = (state = initialState, action) => {
    // dispatch actions defined here.
    switch (action.type) {
        case INIT_SETTINGS:
            log("Ladataan asetukset")
            var new_state = {languages: state.languages, themes: state.themes, update: false}
            //Asetetaan kielivalinta
            if (state.languages.includes(action.data.language)) {
                axios.defaults.headers.common['Accept-Language'] = action.data.language
                new_state["activeLanguage"] = action.data.language
                new_state["strings"] = language_strings[action.data.language]
            } else {
                new_state["activeLanguage"] = state.activeLanguage
                new_state["strings"] = state.strings
            }
            if (state.themes.includes(action.data.theme)) {
                changeThemeInCSS(action.data.theme)
                new_state["activeTheme"] = action.data.theme
            } else {
                changeThemeInCSS(state.activeTheme)
                new_state["activeTheme"] = state.activeTheme
            }
            return new_state
        case SET_ACTIVE_LANGUAGE:
            if (state.languages.includes(action.data)) {
                //Asetetaan Accept-Language API-pyyntöjä varten
                axios.defaults.headers.common['Accept-Language'] = action.data
                //Tallennetaan asetus paikallismuistiin
                window.localStorage.setItem("ChimneysGoLanguage", action.data)
                //Ladataan nykyisen projektin kohteet uudella kielellä?
                return {
                    languages: state.languages,
                    activeLanguage: action.data,
                    strings: language_strings[action.data],
                    themes: state.themes,
                    activeTheme: state.activeTheme,
                    version: state.version,
                    update: true
                }
            }
            return state
        case SET_ACTIVE_THEME:
            if (state.themes.includes(action.data)) {
                window.localStorage.setItem("ChimneysGoTheme", action.data)
                changeThemeInCSS(action.data)
                return {
                    languages: state.languages,
                    activeLanguage: state.activeLanguage,
                    strings: state.strings,
                    themes: state.themes,
                    activeTheme: action.data,
                    version: state.version,
                    update: false
                }
            }
            return state
        default:
            return state
    }
}

export const initSettings = (settingsJSON) => {
    return dispatch => {
        dispatch({
            type: INIT_SETTINGS,
            data: settingsJSON
        })
    }
}

export const setActiveLanguage = (languageCode) => {
    return dispatch => {
        dispatch({
            type: SET_ACTIVE_LANGUAGE,
            data: languageCode
        })
    }
}


export const setActiveTheme = (theme) => {
    return dispatch => {
        dispatch({
            type: SET_ACTIVE_THEME,
            data: theme
        })
    }
}

export default settingsReducer


