//By Santtu Käpylä

import React from "react"
import {connect} from "react-redux"

import {notify} from "../reducers/notificationReducer"
import "../styles/activity.css"

import {logout} from "../reducers/loginReducer"
//import Notification from "../components/Notification"

const ReactMarkdown = require('react-markdown')


export const Activity = (props) => {

    //Calculate minutes and seconds from exp and now
    var time = 0
    if(props.user){
        time = props.user.exp - Date.now().valueOf() / 1000
    }
    
    const [minutes, setMinutes] = React.useState(Math.floor(time/60))
    const [seconds, setSeconds] = React.useState(Math.floor(time-minutes*60))
    const [res, setRes] = React.useState(false)
	const [ares, setAres] = React.useState(false)
	const [isShowing, setIsShowing] = React.useState(false)
	const [wait, setWait] = React.useState(false)
  

    React.useEffect(() => {
		
		//eventListeners used
		window.addEventListener('keydown', Action_confirm)
		window.addEventListener('wheel', Action_confirm)
		window.addEventListener('mousedown', Action_confirm)
		
        const myInterval = setTimeout( () => {
			if(ares){  //Saa yhden syklin joka auttaa ikkunan piilotuksessa, vähän on ghetto, mutta näyttää toimivan
				setAres(false)
			}
			
			if(seconds === 0 && minutes >= 2 && wait){     //renew ilman ikkunaa
				console.log("Aktiivisuus todistettu")
				props.renewlogin_silent(props.user.Tunnus)
				setRes(true)
				setWait(false)
			}
			
			
            if(!res){
				
				if ( seconds > 0 ) {   
						setSeconds(seconds-1);              //sekuntti alas
				}
				
				if (seconds === 0) {
					if (minutes === 0){
						//Aika loppui
						props.logout(props.notify)  //Kirjaudutaan ulos
						
					} 
					else {
						
						setMinutes(minutes-1);          //Minuutti alas ja sekuntti asetetaan "maksimiin"
						setSeconds(59);
						
					}
				 if (seconds < 0 || minutes < 0){   //Jos jossain mättää ja mentäisiin negatiiviisiin lukuihin 
					
					props.logout(props.notify)  //Kirjaudutaan ulos
					
				 }
				 
				 
				 if(minutes < 2 || (minutes == 2 && seconds == 0)){
					 setIsShowing(true)
				 }
				 else{
					setIsShowing(false)
				 }
				 
				}
			} else {
				time = 900 //Tried to use the exp - now, but somehow it broke sometimes
				setMinutes(Math.floor(time/60))
				setSeconds(Math.floor(time-minutes*60))
				setRes(false)
				setAres(true)
				setIsShowing(false)
			}
        }, 1000)
        
        return () => {
			window.removeEventListener('keydown', Action_confirm)
			window.removeEventListener('wheel', Action_confirm)
			window.removeEventListener('mousedown', Action_confirm)
            clearTimeout(myInterval)
        }
        
    },[minutes, seconds])
  
  const Action_confirm = (event) => {   
    if(!isShowing){
		setWait(true)
	}
  }

  const Active_confirm = (event) => {
    
    event.preventDefault()
    console.log("Aktiivisuus todistettu")
    props.renewlogin(props.user.Tunnus, props.notify)
	setRes(true)

  }

  if((minutes < 2 || (minutes == 2 && seconds == 0)) && !res && !ares)
  {
	return(
		<div className="activityContainer centerAlignWithPadding">
			<div className="titleContainer">
				<h1 className="titleText">{props.settings.strings["activity"]}</h1>
			</div>
			<div className="activityContentContainer">
				<h1 className="normalText"><ReactMarkdown source={props.settings.strings["activity_text"]} /></h1>
				{ (minutes === 0 && seconds === 0) || minutes < 0 || seconds < 0  //Added for the case of negative numbers if something went wrong
					? <h1 className="normalText"><ReactMarkdown source={props.settings.strings["TimeIsUp"]} /></h1>
					: <h1 className="normalText">{ minutes < 10 ? `0${ minutes }` :  minutes }:{ seconds < 10 ? `0${ seconds }` :  seconds }</h1>
				}
			</div>
		
			<div className="closeButtonContainer">
				<button className="rippleButton fillButton" onClick={Active_confirm}>{props.settings.strings["activity_confirm"]}</button>
			</div>
		</div>
    )
  }
  else{
	  return null
  }
}



const mapStateToProps = (state) => {
  return {
    //maps state to props, after this you can for example call props.notification
    settings: state.settings,
    minutes: state.minutes,
    seconds: state.seconds,
    notification: state.notification,
    user: state.user,
    strings: state.settings.strings,
  }
}

const mapDispatchToProps = {
  //connect reducer functions/dispatchs to props
  //notify (for example)
  notify,
  logout,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity)