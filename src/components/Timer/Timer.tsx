import React, { Component } from 'react'
// import { duration } from 'moment';
import moment from 'moment'
import Display from './Display'
import Controls from './Controls'
// import './styles/timer.css'
// require('./styles/timer.css')

interface Props {
    // startDate: any,
    // endDate: any,
    // interval: any
}

interface State {
    time: any,
    seconds: any,
    status: any,
     
}

export default class CountdownTimerComponent extends Component<Props, State> {
    interval: any
   
    constructor(props: Props, state: State) {
        super(props, state)
        this.state = {
            seconds: 180,
            time: 180 * 1000,
            status: null,
        }

        this.onSecondsChanged = this.onSecondsChanged.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }

    componentWillMount() {
        clearInterval(this.interval)
    }

    componentWillUnmount() {
        this.setState ( {
            seconds: 0,
            time: 0,
            status: null
        })
    }

    onSecondsChanged(seconds: any) {
        seconds = parseInt(seconds, 10)

        if (seconds && typeof seconds === 'number') {
            if (seconds <= 359999) {
                this.setState( { seconds: seconds, time: seconds * 1000 })
            }
        } else {
            this.setState({ seconds: 0, time: 0 })
        }
    }

    startTimer() {
        if (this.state.status !== 'started') {
            this.interval = setInterval(() => {
                if (this.state.time !== 0) {
                    this.setState( { time: this.state.time - 10 })
                } else {
                    this.setState( { seconds: 0, status: null, time: 0 })

                    clearInterval(this.interval)
                }
            }, 10)

            this.setState( { status: 'started' })
        }
    }
    stopTimer() {
        if (this.state.status && this.state.status === 'started') {

            clearInterval(this.interval)

            this.setState(  
                 {
                    status: 'stopped',
                    seconds: Math.floor(this.state.time / 1000)
                } )
        }
    }

    resetTimer() {
        clearInterval(this.interval)

        this.setState({ seconds: 0, status: null, time: 0 })
    }

    render() {
        return (
            // <span> {this.state.days > 0 ? '${this.state.days} Days ' : null}
            //           {this.state.hours} Hrs {this.state.minutes} Mins 
            //           {this.state.days === 0 &&
            //             this.state.hours === 0 &&
            //             this.state.minutes === 0 ? ` ${this.state.seconds} secs` : null}

            //    </span>
            <div style={{display: 'flex', maxWidth: '500px'}}>
                <Display seconds={this.state.seconds}
                    status={this.state.status}
                    time={this.state.time}
                    onSecondsChanged={this.onSecondsChanged}>
                    <div>
                        <Controls startTimer={this.startTimer}
                            stopTimer={this.stopTimer}
                            resetTimer={this.resetTimer}
                            status={this.state.status}
                            canStart={this.state.seconds > 0} />
                    </div>
                </Display>
            </div>
        )  
    }
}