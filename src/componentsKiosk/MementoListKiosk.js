import { useEffect, useState } from "react"
import { connect } from "react-redux"



import * as postService from "../services/posts"

import { deleteMemory, toggleVerifyMemento } from "../reducers/postReducer"
import { getImageURL } from "../services/images"
import "../styles/listView.css"
import "../styles/postList.css"
import "../styles/postView.css"


export const MementoList = (props) => {
  const [mementos, setMementos] = useState([])


  useEffect(() => {
      postService.getMemories(
          props.posts.projectId,
          props.posts.id
      ).then(data => {setMementos(data)})
  }, [props])



  return(
    <div className="postListContainer">
      <ul className="postListList">
         
        {mementos.map((memento,index) =>
            <li key={index} className="postListItem">
              <div className="postListItemImageContainer">
                <img className="postListImagePreview" src={getImageURL(memento.image)} alt=""></img>   
              </div>
              <div className="postListItemInfo">  
                <h2 className="postListTitle">{memento.title}</h2>
                <p className="normalText">{memento.story}</p>
              </div>
            </li>
    )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    settings: state.settings,
    currentProject: state.projects.active
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
 
  toggleVerifyMemento,
  deleteMemory
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MementoList)



// MementoList: This component is used in PostView.js, and PostViewLW.js. The component returns a list of memories to be rendered, with each memory being rendered as a list item (li element).
//  The details of each memory, such as the image, title, and story, are rendered within the list item. The component also conditionally renders buttons such as "Verify", "Unverify", and "Delete"
//  depending on the user's permissions and actions.