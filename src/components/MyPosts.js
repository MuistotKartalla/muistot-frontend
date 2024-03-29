// By: Niklas Impiö
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import { ReactComponent as ClearIcon } from "../resources/clear.svg"
import { getImageURL } from "../services/images"
import "../styles/buttons.css"
import "../styles/myPosts.css"
import "../styles/postList.css"
import "../styles/texts.css"

export const MyPosts = (props) => {
  /*
  Component that shows list of all components by the current user.
  Clicking a post in the list redirects to the post page.
  Out of focus click closes the pop up.
  */

  const posts = props.posts.filter(post => post.own === true)

  const closeClick = (event) => {
    //go back to the previous page
    event.preventDefault()
    props.history.push("/")
  }

  const onPostClick = (post) => {
    //event handler for post marker clicks. Routes to post view.
    //console.log(`Clicked post: ${post}`, post)
    props.history.push(`/post-view/${post.id}/`)
  }

  const redirectToLoginPage = () => {
    props.history.push("/login")
  }

  // If user is not logged in redirect to login page
  if (!props.user) {
    redirectToLoginPage()
    return <div />
  }

  if (posts.length > 0) {
    //if user has posts render the list
    return (
      <div className="myPostsContainer centerAlignWithPadding">
        <div className="postTitleContainer">
          <h1 className="titleText centerAlignWithPadding">{props.settings.strings["my_posts"]}</h1>
          <ClearIcon className="clearIcon rightAlignWithPadding" onClick={closeClick}/>
        </div>
        <ul className="myPostsList">
          {posts.map((post, index) =>
            <li key={index} className="postViewListItem" onClick={() => onPostClick(post)}>
              <div className="postListItemImageContainer">
                <img className="postListImagePreview" src={getImageURL(post.image)} alt=""></img>
              </div>
              <div className="postListItemInfo">
                <h2 className="postListTitle">{post.title}</h2>
                <p className="postListText">{props.user?.username}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
  //if user doesn't have any posts, tell them
  return (
    <div className="myPostsContainer centerAlignWithPaddingContainer">
      <div className="postTitleContainer">
        <h1 className="titleText centerAlignWithPadding">{props.settings.strings["my_posts"]}</h1>
        <ClearIcon className="clearIcon rightAlignWithPadding" onClick={closeClick}/>
      </div>
      <h2 className="headerText">{props.settings.strings["empty_list"]}</h2>
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
)(MyPosts)

// MyPosts: This is used in ContentArea.js. The MyPosts component receives props as an argument, which contains the user's posts, settings and history. It filters the user's posts to display only the ones that they own.
