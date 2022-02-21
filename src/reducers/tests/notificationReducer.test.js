import notificationReducer from "../notificationReducer"

const cancelFunction = () => {console.log("cancel")}
const initialState = {message: null, error: false, seconds: 0, cancel: null}
const notification = {message: "testing", error: false, seconds: 5, cancel: cancelFunction}

//tests for notificationReducer that go through all the dispatch actions.

describe("notificationReducer", () => {

  it("Should return initialState", () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState)
  })

  it("Should handle SET_NOTIFICATION", () => {
    const setAction = {
      type: "SET_NOTIFICATION",
      data: notification
    }
    expect(notificationReducer([], setAction)).toEqual(notification)
  })

  it("Should hande CANCEL_NOTIFICATION", () => {
    const cancelAction = {
      type: "CANCEL_NOTIFICATION",
    }
    expect(notificationReducer([notification], cancelAction)).toEqual(initialState)
  })
})

