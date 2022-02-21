import userLocationReducer from "../userLocationReducer"
import deepFreeze from "deep-freeze"


describe("User Location Reducer", () => {
  test("returns the new state after SET_USER_LOCATION", () => {
    const state = []
    const action = {
      type: "SET_USER_LOCATION",
      data:
      {
        lat: 85.22,
        lng: 25.22
      }
    }
    deepFreeze(state)
    const newState = userLocationReducer(state, action)
    expect(newState).toEqual(action.data)
  })


})