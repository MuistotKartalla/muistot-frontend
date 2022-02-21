import postReducer from "../postReducer"
import deepFreeze from "deep-freeze"
//tests for creating new items and retriving all items.

describe("Post Reducer", () => {
  test("returns new state with action CREATE_POST", () => {
    const state = []
    const action = {
      type: "CREATE_POST",
      data:
      {
        "author": "test_user",
        "title": "Example Post",
        "story": "This Post was made created with New Post Choose On Map.",
        "image": {},
        "location": {
          "lat": 65.01099551869925,
          "lng": 25.47008514404297
        },
        "date": 1572697670452,
        "id": 1
      }
    }
    deepFreeze(state)
    const newState = postReducer(state, action)
    expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
  })

  test("returns all posts with GET_ALL_POSTS", () => {
    const state = [
      {
        "author": "test_user",
        "title": "Example Post",
        "story": "This Post was made created with New Post Choose On Map.",
        "image": {},
        "location": {
          "lat": 65.01099551869925,
          "lng": 25.47008514404297
        },
        "date": 1572697670452,
        "id": 1
      },
      {
        "author": "Niklas",
        "title": "This is the post title.",
        "story": "Here I could write a story or description about the chimney.",
        "image": {},
        "location": {
          "lat": 64.99169892880357,
          "lng": 25.488967895507816
        },
        "date": 1572951418240,
        "id": 2
      }
    ]

    const action = {
      type: "GET_ALL"
    }

    deepFreeze(state)
    const newState = postReducer(state, action)

    expect(newState.length).toBe(2)
    expect(newState).toEqual(state)
  })
})