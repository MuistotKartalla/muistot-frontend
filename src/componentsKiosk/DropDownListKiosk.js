// By: Niklas Impiö
import "../styles/dropDownList.css"
import useComponentVisible from "../hooks/OutsideClick"



export const DropDownList = (props) => {
  // props should problbly have all the items and their click handlers. Like [{text: string/reference, "onClickHandler": [Function]}]

  //just a simple vertical list where all the entries are provided as props list with strings and event handlers on click.
  return(

    <div className="dropDownContainer">
      <ul className="dropDownList">
        {props.children}

        {props.items.map((element,index) =>
          <div key={index}>
            {element.divider?
              <div className="divider"></div>
              :
              <li key={index} className="dropDownListItem" onClick={element.onClickHandler}>
                <p className="dropDownItemText">{element.string}</p>
              </li>
            }
          </div>

        )}
      </ul>
    </div>

  )
}

export default DropDownList





// DropDownList: This is a component exported by default to be used in other components. Inside the component, 
//  a JSX structure is used to create the visual content of the component. The component has a div container with the class "dropDownContainer" that contains a ul list with the class "dropDownList". 
//  The list items are generated from the array of elements provided through the component's props.