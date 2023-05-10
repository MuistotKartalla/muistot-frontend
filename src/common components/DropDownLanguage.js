import { useLocation, useHistory } from 'react-router-dom';
import "../stylesKiosk/buttonStyle.css"
import "../styles/dropDownList.css"


export const DropDownList = (props) => {
  const activeIndex = props.items.findIndex((item) => item.isActive);
  const location = useLocation();
  const history = useHistory();
  const isKiosk = location.pathname.startsWith('/kiosk');

  return (
    <div className={isKiosk ? "dropDownContainerKiosk" : "dropDownContainer"}>
      <ul className="dropDownList">
        {props.items.map((item, index) => (
          <div key={index}>
            {item.divider ? (
              <div className="divider"></div>
            ) : (
              <li
                key={index}
                className={
                  index === activeIndex ? props.activeItemClassName : "dropDownListItem"
                }
                onClick={item.onClickHandler}
              >
                <img className={isKiosk ? "iconKiosk" : "icon"} src={item.bandera} alt={item.string} />
              </li>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DropDownList;






// DropDownList: This is a component exported by default to be used in other components. Inside the component, 
//  a JSX structure is used to create the visual content of the component. The component has a div container with the class "dropDownContainer" that contains a ul list with the class "dropDownList". 
//  The list items are generated from the array of elements provided through the component's props.