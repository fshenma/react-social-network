import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { IGameSchedulerComponentProps } from './IGameSchedulerComponentProps'
import { IGameSchedulerComponentState } from './IGameSchedulerComponentState'
import {Map} from 'immutable'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import moment from 'moment/moment'
import { gameActions } from 'src/store/actions'

const styles = (theme: any) => ({
  container: {
    display: 'flex',     
    flexDirection: 'column', 
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {    
    width: 200,
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
})

// const propTypes = {
//   classes: PropTypes.object.isRequired,
// }

export class GameSchedulerComponent extends Component<IGameSchedulerComponentProps,IGameSchedulerComponentState> {
 
  constructor (props: IGameSchedulerComponentProps) {   
    super(props)
        
    const curDate = moment(new Date).format('YYYY-MM-DDTHH:mm')
    this.state = {
      isHidden: this.props.isHidden || true,
      gameDateTime: curDate // '2017-05-24T10:30'
    }          
  }

  // saveNewGameEvent = (newEvent: any) => {
  // }

  handleSubmit = (event: any) => {
    const { saveGameEvent } = this.props 
    event.preventDefault()
              // 'Saturday, 3/2/2019@12:40pm$ JayPeak, VT$ Hockey Tournament Game$'
              // moment(today).format('dddd')
    const data = moment(this.state.gameDateTime).format('dddd') + ', ' + this.state.gameDateTime + '$ ' + this.state.gameLocation + '$ ' + this.state.gameDesc + '$'
    
    saveGameEvent!(data)
    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // });
  }

  stringifyFormData = (fd: any) => {
    const data = {}
    for (let key of fd.keys()) {
      data[key] = fd.get(key)
    }
    return JSON.stringify(data, null, 2)
  }

  handleChange = (e: any) => {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit} className={this.props.classes.container} hidden={this.props.isHidden} noValidate>
        <TextField
          id='gameDesc'
          name='gameDesc'
          label='Schedule New Game'
          multiline
          rowsMax='2'
          // value=''// {this.state.multiline}
          onChange={this.handleChange}
          className={this.props.classes.textField}
          margin='normal'
          // helperText='hello'
          // variant='filled'
        />

        <TextField
          id='gameDatetime'
          name='gameDateTime'
          label='Date: time'
          type='datetime-local'
          defaultValue={this.state.gameDateTime}
          onChange={this.handleChange}
          className={this.props.classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
       
        <TextField
          id='gameLocation'
          name='gameLocation'
          label='Location:'
          multiline
          rowsMax='2'
          // value=''// {this.state.multiline}
          onChange={this.handleChange}
          className={this.props.classes.textField}
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          // helperText='hello'
          // variant='filled'
        />

        <Button size='small' type='submit' fullWidth={false} className={this.props.classes.button}  >
            <SaveIcon className={classNames(this.props.classes.leftIcon, this.props.classes.iconSmall)} />
            Save
        </Button>
        
      </form>
           
    </div>
    )
  }  
}

const mapStateToProps = (state: Map<string, any>, ownProps: IGameSchedulerComponentProps) => {
  const isAddShow = state.getIn(['game', 'show_add_event_button'],true)

  return {
    isHidden: isAddShow 

  }
}

const mapDispatchToProps = (dispatch: any, ownProps: IGameSchedulerComponentProps) => {
  return {
    saveGameEvent : (gameEventInfo: any) => dispatch(gameActions.dbSaveGameEvent(gameEventInfo))
      // setHiddenAddEventButton : (showButton: boolean) => dispatch(globalActions.AddEventButton(showButton))
  }
}

// export default withStyles(styles as any)(DateAndTimePickerComponent)
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(GameSchedulerComponent as any) as any)  