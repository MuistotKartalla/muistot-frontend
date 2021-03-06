// By: Niklas Impiö
import React from "react"
import {connect} from "react-redux"
import useComponentVisible from "../hooks/OutsideClick"

import DropDownList from "./DropDownList"
import {ReactComponent as DropDownIcon} from "../resources/arrow_drop_down-24px.svg"
import "../styles/dropDownSelect.css"

import {setActiveProject} from "../reducers/projectReducer"



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

          <DropDownIcon className="dropDownIconActive"></DropDownIcon>
        </div>
        <DropDownList items={genListOptions()}/>
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