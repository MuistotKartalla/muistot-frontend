// By: Santtu Käpylä
import {useState, useEffect, useRef} from "react"

//https://stackoverflow.com/questions/53090432/react-hooks-right-way-to-clear-timeouts-and-intervals

import React, {Component} from "react"

export default class Timer extends Component {


    state = {
        minutes: 3, seconds: 0,
    }


    componentDidMount() {
        this.myInterval = setInterval(() => {
            const {minutes, seconds} = this.state
            if (seconds > 0) {
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }))
            } else if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({minutes}) => ({
                        minutes: minutes - 1, seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    render() {
        const {minutes, seconds} = this.state

        return (
            <div>
                {minutes === 0 && seconds === 0
                    ? <h1>Aika loppui</h1>
                    : <h1>Time Remaining: {
                        minutes < 10 ? `0${minutes}` : {minutes}
                    }:{
                        seconds < 10 ? `0${seconds}` : {seconds}
                    }</h1>}
            </div>
        )
    }
}
