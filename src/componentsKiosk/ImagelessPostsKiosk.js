import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"

import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import { getImageURL } from "../services/images"
import "../styles/buttons.css"
import "../styles/myPosts.css"
import "../styles/texts.css"


export const ImagelessPosts = (props) => {
  /*
  Component that shows list of all posts that don't have a picture.
  Clicking a post in the list redirects to the post page.
  Out of focus click closes the pop up.
  */

  const posts = props.posts.filter(post => post.image === 'placeholder.jpg')

  const closeClick = (event) => {
      //go back to the previous page
      event.preventDefault()
      props.history.push("/")
  }


    /* const getDateFromUnixStamp = (unix) => {
    const date = new Date(unix)
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }*/

  const onPostClick = (post) => {
    //event handler for post marker clicks. Routes to post view.
    //console.log(`Clicked post: ${post}`, post)
    props.history.push(`/post-view/${post.id}/`)
  }

  if(posts && posts.length > 0){
    //if there are unverified posts render the list

    return(
      <div className="myPostsContainer centerAlignWithPadding">
        <div className="postTitleContainer">
        <h1 className="titleText centerAlignWithPadding">{props.settings.strings["imageless_posts"]}</h1>
        <ClearIcon className="clearIcon rightAlignWithPadding" onClick={closeClick}/>
        </div>
        <ul className="myPostsList">
          {posts.map((post,index) =>
            <li key={index} className="postViewListItem" onClick={() => onPostClick(post)}>
              <div className="postListItemImageContainer">
                <img className="postListImagePreview" src={getImageURL(post.image)} alt=""></img>
              </div>
              <div className="postListItemInfo">
                <h2 className="postListTitle">{post.title}</h2>
                <p className="postListText">{post.author}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
  //if user doesn't have any posts, tell them
  return(
    <div className="myPostsContainer centerAlignWithPadding">
      <h1 className="headerText">{props.settings.strings["imageless_posts"]}</h1>
      <ul className="myPostsList">
        <li>
          <h2 className="headerText">{props.settings.strings["empty_list"]}</h2>
        </li>
      </ul>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    posts: state.posts,
    settings: state.settings

  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagelessPosts)



// ImagelessPost: It is used in ContentArea.js. This is a React component that displays a list of posts that do not have an image. It first filters the props.posts array to only include posts that
//  have a placeholder image (placeholder.jpg). Then it renders the list of these imageless posts using posts.map() function. When the user clicks on a post, it redirects them to the post view page
//  using props.history.push(). If there are no imageless posts to display, it informs the user that the list is empty.
