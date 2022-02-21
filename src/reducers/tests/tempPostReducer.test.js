import postReducer from "../tempPostReducer"
import deepFreeze from "deep-freeze"
//tests for creating new items and retriving all items.

describe("Post Reducer", () => {
  test("returns new state with action CREATE_POST", () => {
    const state = []
    const action = {
      type: "SET_TEMP_POST",
      data:
      {
        "title": "Example Post",
        "story": "This Post was made created with New Post Choose On Map.",
        "image": {},
        "useLive": true
      }
    }
    deepFreeze(state)
    const newState = postReducer(state, action)
    expect(newState).toEqual(action.data)
  })
})