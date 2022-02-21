// By: Niklas Impiö
const initialState = {}

// Stores the user's location if the user allows location access.
// By saving the location to redux state all components can access the same
// location with only one hw location query.
// (Location hook can be found in hooks folder. Currently, updates every 5 secs)
const userLocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_LOCATION":
            return action.data
        default:
            return state
    }

}

export const updateUserLocation = (location) => {
    return (dispatch) => {
        dispatch({
            type: "SET_USER_LOCATION",
            data: location
        })
    }
}

export default userLocationReducer