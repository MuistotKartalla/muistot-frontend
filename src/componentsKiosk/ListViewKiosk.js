// By: Niklas Impiö
import { useEffect, useState } from "react"
import { connect } from "react-redux"

import { logout } from "../reducers/loginReducer"
import { notify } from "../reducers/notificationReducer"


import "../styles/listView.css"
import "../styles/postView.css"
import PostList from "../components/PostList"
import PostViewLWKiosk from "./PostViewLWKiosk"



export const ListView = (props) => {
  /*
    ListView main component for the listview that will be placed in the content section of the page.
    Will include PostList component and modified postview component atleast. There might also be inner components for the search and sort
  */

  const [posts, setPosts] = useState(props.posts)
  useEffect(() => {
    if(posts.length === 0){
      setPosts(props.posts)

    }


  }, [props, posts.length])

  const onItemClick = (post) => {
    props.history.push(`/kiosk/list-view/${post.id}`)
  }

/* Hakupalkki ennen listausta tilapäisesti pois käytöstä
        <div className="searchContainer">
          <form name="searchForm">
            <div className="searchInputContainer">
              <input name="username" className="input" placeholder={props.settings.strings["search"]} maxLength="32" autoComplete="off"/>
              <div className="inputFocusLine"/>
            </div>
          </form>
        </div>
*/

  //console.log("Listanäkymä")
  //console.log(props)
  return (

    <div className="listViewInnerContainer centerAlign">

      <div className="postListSectionContainer">

        <PostList posts={posts} click={onItemClick}/>
      </div>

      <PostViewLWKiosk match={props.match} history={props.history}/>


    </div>




  )
}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    settings: state.settings,
    posts: state.posts
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView)


// ListView:It is used in ContentArea.js. This is a React component named ListView which renders a list of posts. It uses useState and useEffect hooks to manage the state of posts and to update it when props
//  change. It also connects to the Redux store using connect function to map the state and dispatchers to the component props.
