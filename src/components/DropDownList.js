// By: Niklas Impiö
import "../styles/dropDownList.css"



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