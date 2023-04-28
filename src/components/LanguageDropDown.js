// By: Niklas Impiö
import { useState } from "react"
import { connect } from "react-redux"
import useComponentVisible from "../hooks/OutsideClick"

import { ReactComponent as DropDownIcon } from "../resources/arrow_drop_down-24px.svg"
import { ReactComponent as TranslateIcon } from "../resources/translateIcon.svg"

import "../styles/languageDropDown.css"
import DropDownList from "./DropDownList"

import { setActiveLanguage } from "../reducers/settingsReducer"
import { isMobile } from "react-device-detect";


export const LanguageDropDown = (props) => {

  const [active, setActive] = useState(props.settings.activeLanguage)  //something wrong with this, active doesn't update right when activelanguage is en
  //Vertical dropdown select list where one entry is always selected. By pressing the currently selected entry a list expands below with all the options.
  //when one of the items is clicked it is now the currently selected element and the list shrinks.
  //Out of focus click also hides the expanded part.

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  // props should problbly have all the items and their click handlers. Like [{text: string/reference, "onClickHandler": [Function]}]


  const toggleVisibility = () => {
    // doesnt close the dropdown when clicking the selected one.
    //console.log("Kielivalikon näkymistä vaihdettu")
    setIsComponentVisible(!isComponentVisible)
  }


  const genListOptions = () => {

    const strings = props.settings.languages
    let list = []
    strings.map(element => {
      list.push({
        string: element.toUpperCase(), onClickHandler: () => {
          props.setActiveLanguage(element)
          setActive(element)
          setIsComponentVisible(!isComponentVisible)
          //console.log(element, " klikattu")
        }
      })
    })
    return list
  }

  if (!isComponentVisible) {
    return isMobile ? (

      <div className="languageDDContainer" ref={ref}>
        <div className="languageDDCurrentItemContainer" onClick={toggleVisibility}>
          <div className="languageDDCurrentItem">
            <span className="languageDDText">{props.settings.activeLanguage.toUpperCase()}</span>
            <DropDownIcon className="dropDownIcon" />
          </div>
        </div>

        {isComponentVisible ?
          <div className="dropDownList" >
            <DropDownList items={genListOptions()} />
          </div>
          :
          <div />
        }
      </div>
    ) : (

      <div className={`icon-containerlan ${isComponentVisible ? 'show' : ''}`} ref={ref}>
        <div className="acountDDCurrentItemContainer" onClick={toggleVisibility}>
          <TranslateIcon className="iconLook"></TranslateIcon>
        </div>
        {isComponentVisible ? (
          <div className="dropdownLan">
            <DropDownList items={genListOptions()} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  } else {
    return isMobile ? (
      <div className="languageDDContainerActive" ref={ref}>
        <div className="languageDDCurrentItemContainer" onClick={toggleVisibility}>
          <div className="languageDDCurrentItem">
            <span className="languageDDTextActive">{props.settings.activeLanguage.toUpperCase()}</span>
            <DropDownIcon className="dropDownIconActive" />
          </div>
        </div>

        {isComponentVisible ?
          <div className="dropDownList" >
            <DropDownList items={genListOptions()} />
          </div>
          :
          <div />
        }
      </div>
    ) : (
      <div className={`icon-containerlan ${isComponentVisible ? 'show' : ''}`} ref={ref}>
        <div className="acountDDCurrentItemContainer" onClick={toggleVisibility}>
          <TranslateIcon className="iconLook"></TranslateIcon>
        </div>
        {isComponentVisible ? (
          <div className="dropdownLan">
            <DropDownList items={genListOptions()} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
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


// LanguageDropDown: This component is placed in HorizontaMenuList.js. The component renders a container div with two nested divs. The first div represents the currently selected language and, when clicked,
//  displays the dropdown menu with the available language options. The second div contains the dropdown menu, which is a custom component called DropDownList that receives an array of options with text and
//  click handlers as props.