// By: Niklas Impiö
import React from "react"
import {render, fireEvent} from "@testing-library/react"
import configureStore from "redux-mock-store"
import {Provider} from "react-redux"
import Notification from "../Notification"
//import {cancelNotification} from "../../reducers/notificationReducer"


import "@testing-library/jest-dom/extend-expect"

const mockStore = configureStore([])

const cancelFunction = () => {console.log("cancel")}
const notification = {message: "testing", error: false, seconds: 5, cancel: cancelFunction}

describe("Redux connected notificationReducer", () => {
  let store
  let component
  beforeEach(() => {
    store = mockStore({
      notification: notification
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <Notification/>
      </Provider>
    )

  })
  it("renders notification content", () => {

    expect(component.container).toHaveTextContent("Notification")
    expect(component.container).toHaveTextContent("testing")
  })


  it("calls cancel function when close clicked", () => {
    fireEvent.click(component.container.querySelector("button"))
    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })
})




