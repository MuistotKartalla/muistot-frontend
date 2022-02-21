// By: Niklas Impiö

// This is used to store new post form data
// while selecting location on map and
// the selected map coordinates are added here as well.
// stored object = { state: INT, title: STR, story: STR, img: file reference, location: { lat lng } }
// states:
//          0 = nothing is happening yet.
//          1 = waiting for the user to select coordinates from map.
//          2 =

const tempPostReducer = (state = {
    "title": "",
    "story": "",
    "location": null,
    "image": null,
    "useLive": true
}, action) => {
    switch (action.type) {
        case "SET_TEMP_POST":
            return action.data
        default:
            return state
    }
}

export const setTempPost = (object) => {
    return dispatch => {
        dispatch({
            type: "SET_TEMP_POST",
            data: object
        })
    }

}


export default tempPostReducer
