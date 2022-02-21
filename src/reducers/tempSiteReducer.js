// By: Niklas Impiö

// This is used to store new post form data while selecting location on
// map and the selected map coordinates are added here as well.
// stored object = { state: INT, title: STR, story: STR, img: file reference, location: {lat, lng}}
// states:
//          0 = nothing is happening yet.
//          1 = waiting for the user to select coordinates from map.
//          2 =

const tempSiteReducer = (state = {"title": "", "location": null}, action) => {
    switch (action.type) {
        case "SET_TEMP_SITE":
            return action.data
        default:
            return state
    }
}

export const setTempSite = (object) => {
    return dispatch => {
        dispatch({
            type: "SET_TEMP_SITE",
            data: object
        })
    }

}


export default tempSiteReducer
