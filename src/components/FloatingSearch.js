// By: Niklas Impiö
import React, {useState} from "react"
import {connect} from "react-redux"
import useComponentVisible from "../hooks/OutsideClick"

import "../styles/floatingSearch.css"

import PostList from "./PostList"
import {ReactComponent as ClearIcon} from "../resources/clear.svg"



export const FloatingSearch = (props) => {
  /*
  Dynamic search field that when search value lenght is greater than N and the last input
  was N seconds ago will request results from back end.

  Displays postlist for N closest matches.

  Placeholder just lists all posts there until we actually can query backend.

  Need to think about the placement
  */
  const [results, setResults] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [lastValueUpdate, setLastValueUpdate] = useState(null)

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

  const onClearClick = (event) => {
    event.preventDefault()
    setSearchValue("")
    setIsComponentVisible(false)
  }

  const onHover = (event) => {
    event.preventDefault()
    setIsComponentVisible(true)
  }

  const onSearchValueChange = (event) => {
    //console.log("onSearchValueChange")
    //console.log(event.target.value)
    event.preventDefault()
    setSearchValue(event.target.value)
    const time = new Date().getTime()

    if((event.target.value.length > 2)&&((lastValueUpdate === null)||(time - lastValueUpdate > 1000))){
      callSearch(event.target.value)
      setLastValueUpdate(time)
      const RE = new RegExp(event.target.value, 'i')
      setResults(props.posts.filter(function(post) { return(post.search.match(RE))}))
    }else if(event.target.value === ""){
      setResults([])
    }
  }
  const callSearch = (searchTerm) => {
    //TODO
    //console.log("Calling search with term", searchTerm )
  }

  const onItemClick = (post) => {
    //console.log("onItemClick")
    setIsComponentVisible(false)
    props.history.push(`/post-view/${post.id}/`)
  }

  //console.log("Hakunäkymä")
  //console.log(props)

  if(!isComponentVisible){
    return(
      <div className="floatingSearchContainer" ref={ref}>
        <div className="floatingSearchInputContainer">
          <div className="floatingSearchInputContainerInner">
            <input name="search" id="searchField" className="inputPrimary" placeholder={props.settings.strings["search"]} maxLength="32" autoComplete="off" onChange={onSearchValueChange} value={searchValue} onMouseEnter={onHover} />
            <div className="inputFocusLine"/>
          </div>
          <ClearIcon className="clearIcon" onClick={onClearClick}/>
        </div>
      </div>
    )
  }else{
    return(
      <div className="floatingSearchContainer" ref={ref}>
        <div className="floatingSearchInputContainer">
          <div className="floatingSearchInputContainerInner">
            <input name="search" id="searchField" className="inputPrimary" placeholder={props.settings.strings["search"]} maxLength="32" autoComplete="off" onChange={onSearchValueChange} value={searchValue} />
            <div className="inputFocusLine"/>
          </div>
          <ClearIcon className="clearIcon" onClick={onClearClick}/>
        </div>

        <div className="searchResultsContainer">
          {results.length !== 0?
            <PostList posts={results} click={onItemClick}/>
            :
            <div/>
          }
        </div>
      </div>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    user: state.user,
    posts: state.posts,
    settings: state.settings
  }
}


export default connect(
  mapStateToProps,
  null
)(FloatingSearch)
