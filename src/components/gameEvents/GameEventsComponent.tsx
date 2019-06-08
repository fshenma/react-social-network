import React, { Component } from 'react'
// import './styles/index.css'
import { IGameEventsComponentProps } from './IGameEventsComponentProps'
import { IGameEventsComponentState } from './IGameEventsComponentState'
import GameSchedulerComponent from 'src/components/gameScheduler'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
// - Import actions
import { gameActions } from 'src/store/actions'

const styles = (theme: any) => ({
        eventLogContainer: {            
            bottom: '0px',
            boxShadow: 'rgba(34, 36, 38, 0.15) 0px 1px 2px 0px',
            boxsizing: 'border-box',
            color: 'rgba(0, 0, 0, 0.87)',
            height: 'auto',
            left: '0px',
            position: 'relative',
            right: '0px',
            textDecoration: 'none solid rgba(0, 0, 0, 0.87)',
            textSizeAdjust: '100%',
            top: '0px',
            width: '100%',
            columnRuleColor: 'rgba(0, 0, 0, 0.87)',
            perspectiveOrigin: '252.562px 117.5px',
            transformOrigin: '252.562px 117.5px',
            caretColor: 'rgba(0, 0, 0, 0.87)',
            border: '1px solid rgba(34, 36, 38, 0.15)',
            borderRadius: '4px 4px 4px 4px',
            flexFlow: 'column nowrap',
            font: 'normal normal 400 normal 14px / 19.999px Lato, Arial, Helvetica, sans-serif',
            outline: 'rgba(0, 0, 0, 0.87) none 0px',                                          
        },
        eventLogHeader: { 
            left: '0px',
            height: '52px',             
            perspectiveOrigin: '251.562px 26px',
            transformOrigin: '251.562px 26px',
            background: 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box',
            border: '0px none rgba(0, 0, 0, 0.87)',
            borderRadius: '4px 4px 0 0',
            outline: 'rgba(0, 0, 0, 0.87) none 0px',
            flexFlow: 'column nowrap',
            font: 'normal normal 400 normal 14px / 19.999px Lato, Arial, Helvetica, sans-serif',
            padding: '14px',
        },
        eventLogNewButton: {            
            boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 1px inset, rgba(34, 36, 38, 0.15) 0px 0px 0px 0px inset',
            color: 'rgba(0, 0, 0, 0.6)',
            cursor: 'pointer',
            display: 'block',
            float: 'right',
            height: '28.3125px',
            minHeight: '13px',
            textDecoration: 'none solid rgba(0, 0, 0, 0.6)',
            columnRuleColor: 'rgba(0, 0, 0, 0.6)',
            perspectiveOrigin: '30.2812px 14.1562px',
            transformOrigin: '30.2812px 14.1562px',
            userSelect: 'none',
            caretColor: 'rgba(0, 0, 0, 0.6)',
            background: 'rgb(224, 225, 226) none repeat scroll 0% 0% / auto padding-box border-box',
            border: '0px none rgba(0, 0, 0, 0.6)',
            font: 'normal normal 700 normal 13px / 13px Lato, Arial, Helvetica, sans-serif',
            margin: '0px 0px 0px 3.25px',
            outline: 'rgba(0, 0, 0, 0.6) none 0px',       
            padding: '7.66071px 14.625px',
            transition: 'opacity 0.1s ease 0s, background-color 0.1s ease 0s, color 0.1s ease 0s, box-shadow 0.1s ease 0s, background 0.1s ease 0s',                           
        },
        eventLogNotification: {            
            color: 'rgba(0, 0, 0, 0.6)',
            display: 'inline-block',
            height: '24px',
            minHeight: '24px',
            minWidth: '24px',
            textAlign: 'center',
            width: '24px',
            textDecoration: 'none solid rgba(0, 0, 0, 0.6)',
            columnRuleColor: 'rgba(0, 0, 0, 0.6)',
            perspectiveOrigin: '12px 12px',
            transformOrigin: '12px 12px',
            caretColor: 'rgba(0, 0, 0, 0.6)',
            background: 'rgb(232, 232, 232) none repeat scroll 0% 0% / auto padding-box border-box',
            border: '0px solid rgba(0, 0, 0, 0)',
            borderRadius: '7000px 7000px 7000px 7000px',
            font: 'normal normal 700 normal 12px / 12px Lato, Arial, Helvetica, sans-serif',
            margin: '0px 0px 0px 1.71429px',
            outline: 'rgba(0, 0, 0, 0.6) none 0px',       
            padding: '6px',
            transition: 'background 0.1s ease 0s',                           
        },
        eventLogContent: {           
            bottom: '0px',
            color: 'rgba(0, 0, 0, 0.6)',
            height: 'auto',
            left: '0px',
            position: 'relative',
            right: '0px',
            textDecoration: 'none solid rgba(0, 0, 0, 0.6)',
            top: '0px',
            textAlign: 'center',
            width: '100%',
            columnRuleColor: 'rgba(0, 0, 0, 0.6)',
            perspectiveOrigin: '251.562px 90.5px',
            transformOrigin: '251.562px 90.5px',
            caretColor: 'rgba(0, 0, 0, 0.6)',
            background: 'rgb(243, 244, 245) none repeat scroll 0% 0% / auto padding-box border-box',
            borderTop: '1px solid rgba(34, 36, 38, 0.15)',
            borderRight: '0px none rgba(0, 0, 0, 0.6)',
            borderBottom: '0px none rgba(0, 0, 0, 0.6)',
            borderLeft: '0px none rgba(0, 0, 0, 0.6)',
            borderRadius: '0 0 4px 4px',
            font: 'normal normal 400 normal 14px / 19.999px Lato, Arial, Helvetica, sans-serif',
            outline: 'rgba(0, 0, 0, 0.6) none 0px',                   
            padding: '14px',
        },
        eventLogMessageContainer: {           
            bottom: '0px',
            color: 'rgba(0, 0, 0, 0.6)',
            height: 'auto',            
            textDecoration: 'none solid rgba(0, 0, 0, 0.6)',
            textSizeAdjust: '100%',
            width: '100%',
            columnRuleColor: 'rgba(0, 0, 0, 0.6)',
            perspectiveOrigin: '237.562px 76px',
            transformOrigin: '237.562px 76px',
            caretColor: 'rgba(0, 0, 0, 0.6)',
            border: '0px solid rgba(0, 0, 0, 0)',
            font: 'normal normal 400 normal 14px / 19.999px monospace, monospace',
            margin: '0px',
            outline: 'rgba(0, 0, 0, 0.6) none 0px',                   
            overflow: 'hidden',
        },
        eventLogMessageText: {           
            color: 'rgba(0, 0, 0, 0.6)',
            textDecoration: 'none solid rgba(0, 0, 0, 0.6)',
            textSizeAdjust: '100%',
            whiteSpace: 'pre',
            width: '100%',
            columnRuleColor: 'rgba(0, 0, 0, 0.6)',
            perspectiveOrigin: '237.562px 9.5px',
            transformOrigin: '237.562px 9.5px',
            caretColor: 'rgba(0, 0, 0, 0.6)',
            border: '0px none rgba(0, 0, 0, 0.6)',
            font: 'normal normal 400 normal 14px / 19.999px monospace, monospace',
            marginBottom: '10px',
            outline: 'rgba(0, 0, 0, 0.6) none 0px',                   
            cursor: 'pointer',
        },       
        eventLogMessageSeparator: {
            border: '0',
            height: '0',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        }

})

export class GameEventsComponent extends Component <IGameEventsComponentProps,IGameEventsComponentState> {

    constructor (props: IGameEventsComponentProps) {   
        super(props)

        this.state = {
            // logs: props.logs || [],
            title: props.title || 'Event Log',
            clearBtnText: props.clearBtnText || 'Clear',
            addBtnText: props.addBtnText || 'Add',
            hideAddButton: true,
        }

        this.clearLogs = this.clearLogs.bind(this)

    }

    clearLogs = (eveOfClearLogs: any) => {

        eveOfClearLogs.stopPropagation()
        eveOfClearLogs.preventDefault()

        this.setState({
            // logs: [],
        })

    }     
    
    newEvent = (eveAdd: any) => {       
        const { setHiddenAddEventButton } = this.props 
        eveAdd.stopPropagation()
        eveAdd.preventDefault()

        setHiddenAddEventButton!(false)
    }     

    retrieveEvent = (eventLog: string) => {
        const gameEvents = eventLog.split('$')
        const [evtId, evtTime, evtLoc, evtTitle] = gameEvents
        return <div id={evtId} title={eventLog}><b>{evtTitle}</b><br/> {evtTime}  at:{evtLoc} < hr className={this.props.classes.eventLogMessageSeparator}/></div>
    }

    render() {
        const {classes, onSelect, value, logs} = this.props
         
        return (
            <div className={classes.eventLogContainer}>
                <div className={classes.eventLogHeader}>
                    {/* <button id='event-log-clear-btn' onClick={this.clearLogs}>
                        {this.state.clearBtnText}
                    </button> */}
                    <button className={classes.eventLogNewButton} onClick={this.newEvent}>
                        {this.state.addBtnText}
                    </button>
                    <span> {this.state.title} </span>                    
                    <div className={classes.eventLogNotification} style={{backgroundColor: '#afd2c0'}}>
                        {this.props.logs.length}
                    </div>
                </div>
                <div className={classes.eventLogContent}>                    
                    <pre className={classes.eventLogMessageContainer}>
                    <GameSchedulerComponent />
                    </pre>
                </div>
                <div className={classes.eventLogContent}>                    
                    <pre className={classes.eventLogMessageContainer}>
                        {
                            this.props.logs.map((logText: string, logKey: number) => {

                                return (
                                    
                                    <div key={logKey} className={classes.eventLogMessageText} onClick={(e) => {
                                        onSelect(e, value)
                                   }}>{this.retrieveEvent(logText)}                                                                                                             
                                    </div>
                                    )

                            })
                        }

                    </pre>
                </div>
            </div>

        )

    }

}

const mapDispatchToProps = (dispatch: any, ownProps: IGameEventsComponentProps) => {
    return {
        setHiddenAddEventButton : (showButton: boolean) => dispatch(gameActions.AddEventButton(showButton))
    }
  }
  
  /**
   * Map state to props
   * @param  {object} state is the obeject from redux store
   * @param  {object} ownProps is the props belong to component
   * @return {object}          props of component
   */
  const mapStateToProps = (state: any, ownProps: IGameEventsComponentProps) => {
    
    // const newEvent = state.getIn(['global', 'new_game_event'])   

    return {
    //   log: newEvent
    //   title: 'info',
    //   clearBtnText: ''
    }
  }
  
  // - Connect component to redux store
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(GameEventsComponent as any) as any)
  
// export default {GameEventsComponent}