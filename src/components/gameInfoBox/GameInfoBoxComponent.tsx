// - Import react components
import React, { Component } from 'react'
import moment from 'moment/moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import classNames from 'classnames'
import {Map, List as ImuList} from 'immutable'

// - Material UI
// import Paper from '@material-ui/core/Paper'
// import Button from '@material-ui/core/Button'
// import RaisedButton from '@material-ui/core/Button'
// import MenuList from '@material-ui/core/MenuList'
// import MenuItem from '@material-ui/core/MenuItem'
// import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
// import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
// const {MDBCol, MDBRow, MDBCard, MDBCardUp,MDBCardTitle, MDBCardText, MDBCardBody, MDBAvatar, MDBRotatingCard, MDBIcon} = require('mdbreact')
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// - Import actions
import * as gameActions from 'src/store/actions/gameActions'

import { IGameInfoBoxComponentProps } from './IGameInfoBoxComponentProps'
import { IGameInfoBoxComponentState } from './IGameInfoBoxComponentState'

const styles = (theme: any) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '60rem',
  },
  paper: {
    height: 254,
    width: 243,
    margin: 10,
    textAlign: 'center',
    minWidth: 230,    
    maxWidth: '257px' 
  },
  dialogContent: {
    paddingTop: '5px',
    padding: '0px 5px 5px 5px'
  },
  circleName: {
    fontSize: '1rem'
  },
  space: {
    height: 20
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}) 

/**
 * Create component class
 */
export class GameInfoBoxComponent extends Component<IGameInfoBoxComponentProps, IGameInfoBoxComponentState> {
  
  styles = {
    followButton: {
      position: 'absolute',
      bottom: '30px',
      left: 0,
      right: 0
    },
    dialog: {
      width: '',
      maxWidth: '280px',
      borderRadius: '4px'
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IGameInfoBoxComponentProps) {
    super(props)
   // const { userBelongCircles, circles, userId } = this.props
    
    // Defaul state
    this.state = {

      /**
       * The value of circle input
       */
      isEditMode: false    
    }    
  }

  handleChange = (e: any) => {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
    this.setState({isEditMode : true})
  }

  /**
   * handle button for case to get external link
   * @return 
   */
  getEventLink = (e: any) => {
    // to do 
  }

  /**
   * save event detail to database, 
   * @return 
   */
  saveGameEventDetail = (e: any) => {
    // let gameDetail = this.state.gameDetail
    const {saveGameEventDetailData} = this.props

    const gameEventId = this.props.gameEventId
    const gameData =  this.props.gameTime + '$ ' + this.props.gameLocation + '$ ' + this.props.gameTitle + '$ ' + this.state.gameDetail + '$'
    
    saveGameEventDetailData!(gameEventId, gameData)
  }

  render () {
   const { 
      translate,
      classes,
      gameEventId,
      gameTitle,
      gameTime,
      gameLocation,
      gameDetail
    } = this.props

    const bull = <span className={classes.bullet}>•</span>

    return (
      // <Paper key={userId} elevation={1} className={classNames('grid-cell', classes.paper)}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        //  alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100%',
          position: 'relative',
          paddingTop: 20

        }}>
           <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}  gutterBottom>
        {gameTitle}  
        </Typography>
        {/* <Typography component='h2' color='textSecondary'>
          Time: {gameTime} 
           {bull} 
        </Typography> */}
        {/* <Typography className={classes.pos} color='textSecondary'>
           Location: {gameLocation}
        </Typography> */}
        <Typography className={classes.pos} color='textSecondary'>
        <TextField
          name='gameDateTime'
          label='Game Time'
          // type='datetime-local'
          defaultValue={gameTime}
          onChange={this.handleChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField          
          name='gameLocation'
          label='Game Location'           
          defaultValue={gameLocation}          
          onChange={this.handleChange}
          className={classes.textField}
          margin='normal'
          // helperText='hello'
          // variant='filled'
        />
        <TextField
          id={gameEventId}
          name='gameDetail'
          label='Game Detail'
          multiline
          rowsMax='4'
          defaultValue={gameDetail}
          // value=''// {this.state.multiline}
          onChange={this.handleChange}
          className={classes.textField}
          margin='normal'
          // helperText='hello'
          // variant='filled'
        />
        </Typography>
        {/* {!this.state.isEditMode ? <Typography component='p'>
          {gameDetail}
          <br />
          {'"a benevolent smile"'}
        </Typography> : ''} */}
      </CardContent>
      <CardActions>
      {!this.state.isEditMode ? <Button size='small' onClick={this.getEventLink}>Learn More</Button> : 
        <Button size='small' onClick={this.saveGameEventDetail}>Save</Button>}
      </CardActions>
    </Card>         
        </div>
      //  </Paper>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IGameInfoBoxComponentProps) => {
  return {
    // createCircle: (name: string) => dispatch(circleActions.dbAddCircle(name)),
    goTo: (url: string) => dispatch(push(url)),
    saveGameEventDetailData: (eventId: any, gameEventDetail: any) => dispatch (gameActions.dbSaveGameDetails(eventId, gameEventDetail))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IGameInfoBoxComponentProps) => {
  const _selectedGame = state.getIn(['game', 'game_event_title'],'Game Title')
  
  if (_selectedGame && _selectedGame.gameEventTitle) {
    const gameEvents = _selectedGame.gameEventTitle.split('$')
    const [evtId, evtTime, evtLoc, evtTitle, evtDetail] = gameEvents
     
    return {
      translate: getTranslate(state.get('locale')),
      gameEventId : evtId,
      gameTitle:  evtTitle ?  evtTitle : 'Game title',
      gameTime: evtTime ? evtTime : '',
      gameLocation: evtLoc ? evtLoc : '', 
      gameDetail: evtDetail ? evtDetail : ''
      
    }
  }  else {
    return {
      translate: getTranslate(state.get('locale')),
    }
  }
  
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(GameInfoBoxComponent as any) as any)
