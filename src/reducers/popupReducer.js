const initialState = false
const SET_POPUPS = "SET_POPUPS"

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POPUPS":
            return action.data
        default:
            return state
    }

}

export const updatePopups = (popups) => {
    return (dispatch) => {
        dispatch({
            type: "SET_POPUPS",
            data: popups
        })
    }
}

export default popupReducer