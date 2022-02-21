// By: Niklas Impiö
import React from "react"
import {render, fireEvent} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import {shallow, mount, configure} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import PopUpContainer from "../PopUpContainer"

configure({ adapter: new Adapter() })

describe("Testing popup container component", () => {
  let component
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PopUpContainer/>)
    component = render(
      <PopUpContainer>
        <div>TEST CONTAINER TEXT</div>
      </PopUpContainer>
    )
  })


  it("renders inner content", () => {

    expect(component.container).toHaveTextContent("TEST CONTAINER TEXT")
  })

  /*
  it("calls cancel function when background clicked", () => {
    //doesn't work yet wrapper.instance() returns null. enzyme doesn't like stateless functional components... looking for work around.
    const mockHandler = jest.fn()
    const component_mocked = render(
      <PopUpContainer>
        <div>TEST CONTAINER TEXT</div>
      </PopUpContainer>
    )
    //how do I replace the current event handler with my mock function???
    //component_mocked.container.querySelector(".popUpBackground").pendingProps.onClick = mockHandler
    fireEvent.click(component_mocked.container.querySelector(".popUpBackground"))

    expect(mockHandler.mock.calls.length).toBe(1)
  })
  */


})