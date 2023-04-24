// button for toggling site names on and off
import { useState } from "react"
import { connect } from "react-redux"

import { updatePopups } from "../reducers/popupReducer"
import "../styles/themeToggleSwitch.css"

export const NameToggleSwitch = (props) => {
  const [open, set] = useState(props.popups)

  const toggleNames = () => {
    if(!open){
      props.updatePopups(true)
      set(true)
    }else{
      props.updatePopups(false)
      set(false)
    }
  }




  return(
    <div className="ttsContainer">
      <span className="themeLabelText">{props.settings.strings["location_names"]}</span>
      <label className="switch">
        <input type="checkbox" checked={open} onChange={toggleNames}/>
        <span className="sliderRound"></span>
      </label>
    </div>
  )


}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
    popups: state.popups
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  updatePopups

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameToggleSwitch)



// NameToggleSwitch: This is used in AcountDropDown.js and the  main propose is just to show the names over the marker on the map, to do this has function updates the state and dispatches an
//  action to update the state in the store.
