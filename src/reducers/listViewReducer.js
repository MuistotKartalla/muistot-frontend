const initialState = 0
const SET_POPUPS = "SET_POPUPS"

const listViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LISTVIEW":
            return action.data
        default:
            return state
        }

    }


// This is used for remembering where users scroll was in listview. This gets reseted when listview is exited
export const updateListView = (post) => {
    return (dispatch) => {
        dispatch({
            type: "SET_LISTVIEW",
            data: post
        })
    }
}
export default listViewReducer