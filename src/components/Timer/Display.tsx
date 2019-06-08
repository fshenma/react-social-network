import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Time from './Time'

interface Props {
    children: any,    
    seconds: number
    status: any
    time: number
    onSecondsChanged: (e: any) => any
}
    
interface State {
         
}
    
export default class Display extends Component<Props, State> {
// const Display = (props) => {
    // static propTypes = {
    //     children: PropTypes.element,
    //     seconds: PropTypes.number.isRequired,
    //     status: PropTypes.string,
    //     time: PropTypes.number,
    //     onSecondsChanged: PropTypes.func
    // }
    static defaultProps = {
        seconds: 0,
        status: null,
        time: 0,
        onSecondsChanged: (e: any) => console.log(e.target.value)
    }

    time = new Time()  
    
    onChange = (e: any) => {
        this.props.onSecondsChanged(e.target.value)
    }

    // runningDisplayStyle = {
    //     position: 'absolute',
    //     top: 100,
    //     color: this.props.time <= 10000 ? '#FE5C5C' : ''
    // };

    render() {
        const getTimeStyle = {       
            position: 'absolute', top: 30, maxLength: 6
        } as React.CSSProperties

        return (
            
            <div className='display' style={{ position: 'relative' }}>
                {
                    this.props.status === 'started'
                    && <div className='display-time align-self-center' 
                        style={{position: 'absolute',
                        top: 20,
                        color: this.props.time <= 10000 ? '#FE5C5C' : ''}}>                        
                    {this.time.getTime(this.props.time)}
                    </div>
                }
                {
                    this.props.status !== 'started' &&
                    <div className='d-flex flex-column'>
                        <div className='text-info h6 align-self-center' style={{ position: 'absolute', top: 10 }}>
                            {this.time.getTime(this.props.time)}
                        </div>
                        <input className='display-time align-self-center' style={getTimeStyle}
                             value={this.props.seconds}
                            onChange={this.onChange} />
                    </div>
                }
                <div style={{ position: 'absolute', bottom: 0, left: '-10px' }}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

// export default Display;