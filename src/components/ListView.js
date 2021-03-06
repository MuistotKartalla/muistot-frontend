// By: Niklas Impiö
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"

import {logout} from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"


import "../styles/listView.css"
import "../styles/postView.css"
import PostViewLW from "./PostViewLW"
import PostList from "./PostList"



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
    props.history.push(`/list-view/${post.id}`)
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

      <PostViewLW match={props.match} history={props.history}/>


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
