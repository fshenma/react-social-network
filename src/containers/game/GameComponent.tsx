// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { grey, cyan } from '@material-ui/core/colors'
import { push } from 'react-router-redux'
import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'

// - Import app components 
import AvailPlayers from 'src/components/availPlayers'
import ActivePlayers from 'src/components/activePlayers'
import GameInfoBox from 'src/components/gameInfoBox'
import GameScoreBox from 'src/components/gameScoreBox'

// - Import API

// - Import actions
// import * as circleActions from 'src/store/actions/circleActions'
import * as globalActions from 'src/store/actions/globalActions'
import { IGameComponentProps } from './IGameComponentProps'
import { IGameComponentState } from './IGameComponentState'

const TabContainer = (props: any) => {
  return (
    <Typography component='div' style={{ padding: 0 }}>
      {props.children}
    </Typography>
  )
}

/**
 * Create component class
 */
export class GameComponent extends Component<IGameComponentProps,IGameComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IGameComponentProps) {
    super(props)
    const {tab} = this.props.match.params
    // Defaul state
    this.state = {
      tabIndex: 0 // this.getTabIndexByNav(tab)
    }

    // Binding functions to `this`

  }

  /**
   * Hadle on tab change
   */
  handleChangeTab = (event: any, value: any) => {
    const {goTo, setHeaderTitle} = this.props
    this.setState({ tabIndex: value })
    switch (value) {
      case 0:
        goTo!('/game/Info')
        // setHeaderTitle!('Schedule')
        break
      case 1:
        goTo!('/game/Score')
        // setHeaderTitle!('Schedule')
        break
      case 2:
        goTo!('/game/Onourt')
        setHeaderTitle!('Players On Court')
        break
      case 3:
        goTo!('/game/PlayersAvail')
        setHeaderTitle!('Players Available')
        break

      default:
        break
    }
  }

  componentWillMount () {
    const { setHeaderTitle} = this.props
    const {tab} = this.props.match.params
    switch (tab) {
      case undefined:
      case '':
        // setHeaderTitle!('Game')
        break
      case '':
        setHeaderTitle!('Players On Court')
        break
      case 'followers':
        setHeaderTitle!('Players Available')
        break
      default:
        break
    }

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
  /**
   * Component styles
   */
    const styles = {
      people: {
        margin: '0 auto'
      },
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      },
      slide: {
        padding: 10
      }
    }

    const {circlesLoaded, goTo, setHeaderTitle, translate} = this.props
    const {tabIndex} = this.state
    return (
      <div style={styles.people}>
      <AppBar position='static' color='default'>
        {/* <Toolbar>
        <Typography color='inherit'>
          Game event
        </Typography>
        </Toolbar> */}
      <Tabs indicatorColor={grey[50]}
      onChange={this.handleChangeTab}
      value={tabIndex}  
      textColor='primary'
       >
        <Tab label={translate!('game.infoTab')} />
        <Tab label={translate!('game.scoreTab')} />
        <Tab label={translate!('game.onCourtTab')} />
        <Tab label={translate!('game.standbyTab')} />
        {/* <Tab label={translate!('game.scoreTab')} />
        <Tab label={translate!('game.rotationTab')} /> */}
      </Tabs>
      </AppBar>
      {tabIndex === 0 && <TabContainer>
        {/* <span>Info</span> */}
        <GameInfoBox />
      </TabContainer>}
      {tabIndex === 1 && <TabContainer>
        <GameScoreBox />
      </TabContainer>}
      {tabIndex === 2 && <TabContainer>
        <span>Rotation</span>
        <ActivePlayers />
      </TabContainer>}
      {tabIndex === 3 && <TabContainer>
         <AvailPlayers />            
      </TabContainer>}
      </div>
    )
  }

  /**
   * Get tab index by navigation name
   */
  // private getTabIndexByNav: (navName: string) => number = (navName: string) => {
  //   let tabIndex = 0
  //   switch (navName) {
  //     case 'circles':
  //       return 1
  //     case 'followers':
  //       return 2
  //     default:
  //       return 0
  //   }
  // }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IGameComponentProps) => {

  return {
    goTo: (url: string) => dispatch(push(url)),
    setHeaderTitle : (title: string) => dispatch(globalActions.setHeaderTitle(title))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IGameComponentProps) => {

  return {
    translate: getTranslate(state.get('locale')),
    uid: state.getIn(['authorize', 'uid'], 0),
    circlesLoaded: state.getIn(['circle', 'loaded'])

  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameComponent as any) as any)
