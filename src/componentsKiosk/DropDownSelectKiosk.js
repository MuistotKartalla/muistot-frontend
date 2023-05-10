// By: Niklas Impiö
import { connect } from "react-redux"
import useComponentVisible from "../hooks/OutsideClick"

import { ReactComponent as DropDownIcon } from "../resources/arrow_drop_down-24px.svg"
import "../styles/dropDownSelect.css"
import DropDownList from "./DropDownListKiosk"

import { setActiveProject } from "../reducers/projectReducer"



export const DropDownSelect = (props) => {

  //todo for making new project
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

  const toggleVisibility = () => {

    //console.log("toggling visibility")
    setIsComponentVisible(!isComponentVisible)
  }

  const genListOptions = () => {
    const strings = props.items.filter(item => item !== props.active)
    let list = []
    strings.map(element => {
      if(element ==="divider"){
        //if the element name is "divider" dropdownlist adds divider there.
        list.push({divider:true})
      }else if (element === props.settings.strings["new_project"]){
        list.push({string: element, onClickHandler: () => {
          props.change(element)
          setIsComponentVisible(!isComponentVisible)
        }
        })

      }else{

        list.push({string: element, onClickHandler: () => {
          props.change(element)
          setIsComponentVisible(!isComponentVisible)
          //console.log(element.title, " clicked")
        }
        })

      }
    })
    return list
  }


  if(!isComponentVisible){
    return(
      <div className="dropDownSelectHidden" ref={ref}>
        <div className="dropDownSelectCurrentItem" onClick={toggleVisibility}>

          <span className="activeItemText">{props.active}</span>

          <DropDownIcon className="dropDownIcon"></DropDownIcon>
        </div>
      </div>
    )
  }else{
    return(
      <div className="dropDownSelectVisible" ref={ref}>
        <div className="dropDownSelectCurrentItem" onClick={toggleVisibility}>

          <span className="activeItemText">{props.active}</span>

      
        </div>
  
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    settings: state.settings,
    projects: state.projects
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  setActiveProject

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDownSelect)



// DropDownSelect: The component receives the following props:
//  1.items: an array of strings representing the dropdown options
//  2.active: a string representing the currently selected dropdown option
//  3.change: a function that is called when an option is selected, with the selected option as an argument
//  The component defines the following state variables using the useState hook:
//   - isComponentVisible: a boolean indicating whether the dropdown list is visible or not
//   - toggleVisibility: a function that toggles the visibility of the dropdown list when called
//   - genListOptions: a function that generates an array of objects representing the dropdown options,
//     with each object containing a string property for the option text and an onClickHandler property for the function to be called when the option is clicked
