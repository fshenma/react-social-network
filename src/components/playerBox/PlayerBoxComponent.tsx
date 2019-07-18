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
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
 
// - Import app components
import UserAvatar from 'components/userAvatar'

// - Import actions
import * as playerActions from 'store/actions/playerActions'

import { IPlayerBoxComponentProps } from './IPlayerBoxComponentProps'
import { IPlayerBoxComponentState } from './IPlayerBoxComponentState'
import { Player } from 'src/core/domain/player'

const styles = (theme: any) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
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
  }
})

/**
 * Create component class
 */
export class PlayerBoxComponent extends Component<IPlayerBoxComponentProps, IPlayerBoxComponentState> {
  /**
   * Fields
   */
  static propTypes = {
    /**
     * User identifier
     */
    userId: PropTypes.string,
    /**
     * User information
     */
    user: PropTypes.object

  }

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
  constructor (props: IPlayerBoxComponentProps) {
    super(props)
    const { userBelongCircles, circles, userId } = this.props
    
    // Defaul state
    this.state = {

      /**
       * The value of circle input
       */
      circleName: ``,

      activePlayers: [],
 
      /**
       * It will be true if the text field for adding group is empty
       */
      disabledCreateCircle: true,
      /**
       * The button of add user in a circle is disabled {true} or not {false}
       */
      disabledAddToCircle: true,
      /**
       * Whether current user changed the selected circles for referer user
       */
      disabledDoneCircles: true,

      selectedTeam: ''
    }    
  }

  componentWillMount () {
    const {team} = this.props
    this.setState({selectedTeam: '' + team})
  }

  /**
   * Handle follow user
   */
  handleDoneAddCircle = () => {
    const { userId, user, addUserToCircle, selectedCircles, deleteFollowingUser, avatar, fullName  } = this.props
    const { disabledDoneCircles} = this.state
    if (!disabledDoneCircles) {
      if (selectedCircles!.count() > 0) {
        addUserToCircle!(selectedCircles!, { avatar, userId, fullName })
      } else {
        deleteFollowingUser!(userId)
      }
    }
  }

  /**
   * Handle add player to red team
   */
  onAddPlayer = (event: any) => {
    // This prevents ghost click
    event.preventDefault()
    const { isFollowed, saveActivePlayer, userId, user, followRequest, avatar, fullName } = this.props

    const team: string = '' + event.currentTarget.name

    this.setState({selectedTeam: team})

    const activePlayer: Player = {
      avatar: '',
      banner: '',
      tagLine: '',
      fullName: user.fullName!,
      creationDate: user.creationDate!,
      playerNumber: user.playerNumber,
      team: team
    }

    saveActivePlayer!(userId, activePlayer)
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const { selectedTeam} = this.state
    const { 
      userId, 
      classes, 
      translate 
    } = this.props

    const emptyStyle = {backgroundColor: ''}
    const redStyle = {backgroundColor: '#00bcd4', color: 'red'}
    const whiteStyle = {backgroundColor: '#00bcd4', color: 'white'}

    return (
      <Paper key={userId} elevation={1} className={classNames('grid-cell', classes.paper)}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100%',
          position: 'relative',
          paddingTop: 20

        }}>
          <div onClick={() => this.props.goTo!(`/${this.props.userId}`)} style={{ cursor: 'pointer' }}>
            <UserAvatar
              fullName={this.props.fullName!}
              fileName={this.props.avatar!}
              playerNum={this.props.playerNum!}
              size={90}
            />
          </div>
          <div onClick={() => this.props.goTo!(`/${this.props.userId}`)} className='people__name' style={{ cursor: 'pointer' }}>
            <div>
              {this.props.fullName}
            </div>
          </div>
          <div style={this.styles.followButton as any}>
            <Button name='red' style={selectedTeam === 'red' ? redStyle : emptyStyle}
              color='primary'
              onClick={this.onAddPlayer}              
            > > Red</Button>
            <Button name='white' style={selectedTeam === 'white' ? whiteStyle : emptyStyle}
              color='primary'
              onClick={this.onAddPlayer}              
            > > White </Button>
          {/* } */}
          </div>
        </div>
       </Paper>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IPlayerBoxComponentProps) => {
  return {
    saveActivePlayer: (userId: string, activePlayer: Player) => dispatch(playerActions.addActivePlayer(userId, activePlayer)),
    goTo: (url: string) => dispatch(push(url))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IPlayerBoxComponentProps) => {

  const uid = state.getIn(['authorize', 'uid'])
  const request = state.getIn(['server', 'request'])  
  const isSelecteCirclesOpen = state.getIn(['circle', 'openSelecteCircles', ownProps.userId], [])
  const userBox = state.getIn(['user', 'info', ownProps.userId])
  const playerBox = state.getIn(['player','activePlayers', ownProps.userId])

  return {
    translate: getTranslate(state.get('locale')),
    isSelecteCirclesOpen,
    avatar: userBox ? userBox.avatar : playerBox.avatar || '' ,
    fullName: userBox ? userBox.fullName : playerBox.fullName || '',
    playerNum: userBox ? userBox.playerNumber : playerBox.playerNumber || '',
    team: playerBox ? playerBox.team : ''
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(PlayerBoxComponent as any) as any)
