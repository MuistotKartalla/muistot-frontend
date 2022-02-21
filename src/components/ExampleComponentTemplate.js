/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {cancelNotification, notify} from "../reducers/notificationReducer"



const ExampleComponentTemplate = (props) => {
  //if the component needs state variables that only this component uses and that need to be kept between renders
  // for example counter with button that increases counter value.
  const [stateVarInt, setStateVarInt] = useState(3)
  const [stateVarBool, setStateVarBool] = useState(true)
  const [stateVarArray, setStateVarArray] = useState([])
  const [stateVarObject, setStateVarObject] = useState({})
  const [fieldValue, setFieldValue] = useState("")

  //if you need to initialize stuff, use react hook
  useEffect(() => {
    console.log("effect hook called")
    //props.initializeContent

  }, [])


  const exampleOnClick = (event) => {
    //event function that does stuff on click
    event.preventDefault()
    console.log("button pressed")
  }

  const exampleOnChange = (event) => {
    //for text fields and stuff you can add onChange event listener to your html component
    event.preventDefault()
    console.log(event.target.value)
    setFieldValue(event.target.value)
  }

  const exampleOnSubmit = (event) => {
    console.log("submitting stuff")
    //save the field value
    const value = fieldValue
    //reset the actual field
    setFieldValue("")
    //DO stuff with the value.
  }



  //rendering stuff aka html/components here.
  return (
    <div>

    </div>
  )
}
const mapDispatchToProps = {
  //dispatch methods here if you use any,
  cancelNotification,
  notify
}

const mapStateToProps = (state) => {
  //assign notification to props from state
  return {
    notification: state.notification
  }

}

//if your component needs global state stuff, use redux connect export thingy below.
//if your component doesn't use one of the following: dispatchs, redux state. You can replace them with null
/*
export default connect(
  null,
  mapDispatchToProps
)(Notification)
*/

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

//else use the default export

//export default Notification