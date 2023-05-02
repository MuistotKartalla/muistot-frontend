// By: Niklas Impiö

import { connect } from "react-redux"
import { updateListView } from "../reducers/listViewReducer"
import "../styles/containers.css"


const PopUpContainer = (props) => {
  /*
  Container component for Pop Up windows/components.
  Alpha layer (modal?) background that closes the pop up if clicked.
  */

  const unfocusClick = (event) => {
    //background click
    if(event.target.id === "popUpBackground"){
      props.history.push("/")
      props.updateListView(0)
      //console.log("unfocus click")
    }
  }

  return(
    <div className="popUpContainer">
      <div id ="popUpBackground" className="popUpBackground" onClick={unfocusClick}>
        {props.children}
      </div>
    </div>
  )

}


const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    ListView: state.ListView

  }
}
const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  updateListView
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUpContainer)




// PopUpContainer: This component is used in ContentArea.js. The component renders a modal window with a semi-transparent background (popUpBackground) and a container (popUpContainer) for the popup's content.