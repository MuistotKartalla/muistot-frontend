// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import useComponentVisible from "../hooks/OutsideClick"

import DropDownList from "./DropDownList"
import {ReactComponent as DropDownIcon} from "../resources/arrow_drop_down-24px.svg"
import "../styles/languageDropDown.css"

import {setActiveLanguage} from "../reducers/settingsReducer"



export const LanguageDropDown = (props) => {

  const [active, setActive] = useState(props.settings.activeLanguage)  //something wrong with this, active doesn't update right when activelanguage is en
  //Vertical dropdown select list where one entry is always selected. By pressing the currently selected entry a list expands below with all the options.
  //when one of the items is clicked it is now the currently selected element and the list shrinks.
  //Out of focus click also hides the expanded part.

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)
  // props should problbly have all the items and their click handlers. Like [{text: string/reference, "onClickHandler": [Function]}]


  const toggleVisibility = () => {
    // doesnt close the dropdown when clicking the selected one.
    //console.log("Kielivalikon näkymistä vaihdettu")
    setIsComponentVisible(!isComponentVisible)
  }


  const genListOptions = () => {

    const strings = props.settings.languages.filter(item => item !== props.settings.activeLanguage)
    let list = []
    strings.map(element => {
      list.push({string: element.toUpperCase(), onClickHandler: () => {
        props.setActiveLanguage(element)
        setActive(element)
        setIsComponentVisible(!isComponentVisible)
        //console.log(element, " klikattu")
      }
      })
    })
    return list
  }

  if(!isComponentVisible){
    //console.log(active)       //active is wrong here, use props.settings.activeLanguage
    return(
      <div className="languageDDContainer" ref={ref}>
        <div className="languageDDCurrentItemContainer" onClick={toggleVisibility}>
          <div className="languageDDCurrentItem">
            <span className="languageDDText">{props.settings.activeLanguage.toUpperCase()}</span> 
            <DropDownIcon className="dropDownIcon"/>
          </div>
        </div>

        {isComponentVisible?
          <div className="dropDownList" >
            <DropDownList items={genListOptions()}/>
          </div>
          :
          <div/>
        }
      </div>
    )
  }else{
    return(
      <div className="languageDDContainerActive" ref={ref}>
        <div className="languageDDCurrentItemContainer" onClick={toggleVisibility}>
          <div className="languageDDCurrentItem">
            <span className="languageDDTextActive">{props.settings.activeLanguage.toUpperCase()}</span>
            <DropDownIcon className="dropDownIconActive"/>
          </div>
        </div>

        {isComponentVisible?
          <div className="dropDownList" >
            <DropDownList items={genListOptions()}/>
          </div>
          :
          <div/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  setActiveLanguage,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageDropDown)
