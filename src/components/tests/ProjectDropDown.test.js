// By: Niklas Impiö
import React from "react"
import {render, fireEvent} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"


import configureStore from "redux-mock-store"
import {Provider} from "react-redux"
import "@testing-library/jest-dom/extend-expect"

import ProjectDropDown from "../ProjectDropDown"

const mockStore = configureStore([])
const projects = {projects:["Chimney Project", "Scaffolding Project", "Ice Age Project"], active:"Chimney Project"}
describe("Tests for DropDownSelect Component", () => {
  let store
  let component
  beforeEach(() => {
    store = mockStore({
      projects: projects
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <ProjectDropDown/>
      </Provider>
    )
  })

  it("Renders only currently active item when not expanded.", () => {
    expect(component.container).toHaveTextContent("Chimney Project")
    expect(component.container.querySelector(".dropDownList")).toBeNull()
  })

  it("Renders the dropdown list after click event", () => {
    expect(component.container.querySelector(".dropDownList")).toBeNull()
    fireEvent.click(component.container.querySelector(".dropDownSelectCurrentItemContainer"))
    expect(component.container.querySelector(".dropDownList"))
    expect(component.container).toHaveTextContent("Scaffolding Project")
    expect(component.container).toHaveTextContent("Ice Age Project")
  })

  it("Clicking dropdown item changes the active item and hides dropdown", () => {
    expect(component.container.querySelector(".dropDownList")).toBeNull()
    fireEvent.click(component.container.querySelector(".dropDownSelectCurrentItemContainer"))
    expect(component.container.querySelector(".dropDownList"))
    expect(component.container).toHaveTextContent("Scaffolding Project")
    expect(component.container).toHaveTextContent("Ice Age Project")
    fireEvent.click(component.container.querySelector(".dropDownListItem"))
    expect(component.container.querySelector(".dropDownList")).toBeNull()
    expect(component.container).toHaveTextContent("Scaffolding Project")

  })

  it("out of focus click hides the dropdown", () => {
    component = render(
      <Provider store={store}>
        <div className="testingBG">
          <ProjectDropDown/>
        </div>
      </Provider>
    )
    expect(component.container.querySelector(".dropDownList")).toBeNull()
    fireEvent.click(component.container.querySelector(".dropDownSelectCurrentItemContainer"))
    expect(component.container.querySelector(".dropDownList"))
    fireEvent.click(component.container.querySelector(".testingBG"))
    expect(component.container.querySelector(".dropDownList")).toBeNull()
  })

})