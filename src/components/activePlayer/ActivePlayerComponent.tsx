// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map, List as ImuList} from 'immutable'
 
import { withStyles } from '@material-ui/core/styles'
const { MDBCard,  MDBCardTitle, MDBCardText, MDBCardBody, MDBAvatar, MDBRotatingCard, MDBIcon} = require('mdbreact')
 
import { IActivePlayerComponentProps } from './IActivePlayerComponentProps'
import { IActivePlayerComponentState } from './IActivePlayerComponentState'
 
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
export class ActivePlayerComponent extends Component<IActivePlayerComponentProps, IActivePlayerComponentState> {
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
  constructor (props: IActivePlayerComponentProps) {
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
      disabledDoneCircles: true
    }    
  }

  /**
   * Handle follow user
   */
  handleDoneAddCircle = () => {
    const { userId, user, addUserToCircle, selectedCircles, deleteFollowingUser, avatar, fullName  } = this.props
    const { disabledDoneCircles } = this.state
    if (!disabledDoneCircles) {
      if (selectedCircles!.count() > 0) {
        addUserToCircle!(selectedCircles!, { avatar, userId, fullName })
      } else {
        deleteFollowingUser!(userId)
      }
    }
  }
   
  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const { disabledDoneCircles } = this.state
    const { 
      userId, 
      classes, 
      translate 
    } = this.props

    return (
      // <Paper key={userId} elevation={1} className={classNames('grid-cell', classes.paper)}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100%',
          position: 'relative',
          paddingTop: 20

        }}>
          
          {/* <Col style={{ maxWidth: '22rem' }}> */}
            <MDBCard style={{ width: '8rem' }}>
              <MDBCardBody className='text-center'>
                <MDBCardTitle  className={this.props.team === 'red' ? 'danger-color white-text' : 'cyan lighten-5'}>{this.props.playerNum!}</MDBCardTitle>
                <MDBCardText className='font-weight-bold'>{this.props.fullName!}</MDBCardText>
                {/* <Button href='#'>>Up</Button><Button href='#'>>Down</Button> */}
              </MDBCardBody>
            </MDBCard>
          {/* </Col> */}
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
const mapDispatchToProps = (dispatch: Function, ownProps: IActivePlayerComponentProps) => {
  return {
    // createCircle: (name: string) => dispatch(circleActions.dbAddCircle(name)),
    // addUserToCircle: (circleIds: ImuList<string>, user: UserTie) => dispatch(circleActions.dbUpdateUserInCircles(circleIds, user)),
    // saveActivePlayer: (userId: string, activePlayer: Player) => dispatch(playerActions.addActivePlayer(userId, activePlayer)),
    // deleteFollowingUser: (followingId: string) => dispatch(circleActions.dbDeleteFollowingUser(followingId)),
    // setSelectedCircles: (userId: string, circleList: string[]) => dispatch(circleActions.setSelectedCircles(userId, circleList)),
    // removeSelectedCircles: (userId: string, circleList: string[]) => dispatch(circleActions.removeSelectedCircles(userId)),
    // openSelectCircles: (userId: string) => dispatch(circleActions.openSelectCircleBox(userId)),
    // closeSelectCircles: (userId: string) => dispatch(circleActions.closeSelectCircleBox(userId)),
    goTo: (url: string) => dispatch(push(url))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IActivePlayerComponentProps) => {

  const uid = state.getIn(['authorize', 'uid'])
  const request = state.getIn(['server', 'request'])

  // const userBox = state.getIn(['user', 'info', ownProps.userId])
  const playerBox = state.getIn(['player','activePlayers', ownProps.userId])

  return {
    translate: getTranslate(state.get('locale')),
    avatar:  playerBox.avatar || '' ,
    fullName: playerBox.fullName || '',
    playerNum: playerBox.playerNumber || '',
    team: playerBox.team || '' 
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(ActivePlayerComponent as any) as any)
