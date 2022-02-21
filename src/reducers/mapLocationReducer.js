// By: Niklas Impiö
const initialState = null
const SET_MAP_LOCATION = "SET_MAP_LOCATION"

// Stores a location in state that the map should center on.
// Other components can that way control the map. (Show on Map)
const mapLocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAP_LOCATION:
            return action.data
        default:
            return state
    }

}

export const updateMapLocation = (location) => {
    //function containing the dispatch call, can be called anywhere.
    return (dispatch) => {
        dispatch({
            type: SET_MAP_LOCATION,
            data: location
        })
    }
}

export default mapLocationReducer