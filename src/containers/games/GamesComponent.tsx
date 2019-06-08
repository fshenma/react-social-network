// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { grey, cyan } from '@material-ui/core/colors'
import { push } from 'react-router-redux'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'
// import moment from 'moment/moment'

// - Import app components
import Followers from 'src/components/followers'

// - Import API

// - Import actions
import * as globalActions from 'src/store/actions/globalActions'
import * as gameActions from 'src/store/actions/gameActions'
import { IGamesComponentProps } from './IGamesComponentProps'
import { IGamesComponentState } from './IGamesComponentState'

// import InfiniteCalendar from 'react-infinite-calendar'
// import 'react-infinite-calendar/styles.css' // only needs to be imported once
// import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda'
const {ReactAgenda , ReactAgendaCtrl , guid ,  Modal} = require('react-agenda')
import GameEvents from 'src/components/gameEvents'
// const {EventLogList} = require('react-event-list')

const TabContainer = (props: any) => {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

var colors = {
  'color-1': 'rgba(102, 195, 131 , 1)' ,
  'color-2': 'rgba(242, 177, 52, 1)' ,
  'color-3': 'rgba(235, 85, 59, 1)'
}
 
var now = new Date()
 
var items = [
  {
   _id            : guid(),
    name          : 'Meeting , dev staff!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1'
  },
  {
   _id            : guid(),
    name          : 'Working lunch , Holly',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 13, 0),
    classes       : 'color-2 color-3'
  },
 
]

/**
 * Create component class
 */
export class GamesComponent extends Component<IGamesComponentProps,IGamesComponentState> {

  static propTypes = {

  }

  // static defaultProps = {
  //   gameEvents: ['Saturday, 3/2/2019@12:40pm$ JayPeak, VT$ Hockey Tournament Game$']
  // }
  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IGamesComponentProps) {
    super(props)
    const {tab} = this.props.match.params    

    // Defaul state
    this.state = {
      tabIndex: this.getTabIndexByNav(tab),
      items: items,
      selected: [],
      cellHeight: 30,
      showModal: false,
      // locale: 'fr',
      // rowsPerHour: 2,
      // numberOfDays: 4,
      startDate: new Date(),
      msgTitle: '' 
     // eventLogs: eveLogs
    }  

    // this.setState({eventLogs : eveLogs})
    
  }  

  /** 
   * Hadle on tab change
   */
  handleChangeTab = (event: any, value: any) => {
    const {circlesLoaded, goTo, setHeaderTitle} = this.props
    this.setState({ tabIndex: value })
    switch (value) {
      case 0:
        goTo!('/games')
        setHeaderTitle!('Games')
        break
      case 1:
        goTo!('/Games')
        setHeaderTitle!('Games')
        break
      case 2:
        goTo!('/people/followers')
        setHeaderTitle!('Followers')
        break

      default:
        break
    }
  }

  /**
   * Hadle calendar select
   */
  onSelectDay = (e: any, value: any) => {
    const {goTo, setHeaderTitle, selectGameEvent} = this.props
    const evtId = e.target.id 
    const evtTitle = e.target.title
    
    selectGameEvent!(evtId, evtTitle)
    goTo!('/Game')    
    setHeaderTitle!('Game on ' + value )
  }

  handleCellSelection = (item: any) => {
    console.log('handleCellSelection',item)
  }
  handleItemEdit = (item: any) => {
    console.log('handleItemEdit', item)
  }
  handleRangeSelection = (item: any) => {
    console.log('handleRangeSelection', item)
  }

  componentWillMount () {
    // this.setState({items: })
    // Binding functions to `this`
    // this.setState({ msgTitle: msgTitleVal })

    const { setHeaderTitle, loadGames} = this.props
    const {tab} = this.props.match.params
    switch (tab) {
      case undefined:
      case '':
        setHeaderTitle!('Games')
        loadGames!()
        break
      case 'circles':
        setHeaderTitle!('Circles')
        break
      case 'followers':
        setHeaderTitle!('Followers')
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
    
    const {circlesLoaded, goTo, setHeaderTitle, gameEvents, translate} = this.props
    const {tabIndex} = this.state
    
    const today = new Date()
    // const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    const msgTitleVal = 'Games Scheduled' // moment(today).format('dddd') + ', ' + today.toLocaleDateString()
   
    return (
      <div style={styles.people}>
      <AppBar position='static' color='default'>
      <Tabs indicatorColor={grey[50]}
      onChange={this.handleChangeTab}
      value={tabIndex}  
      textColor='primary'
       >
        <Tab label={translate!('game.scheduleTab')} />
        <Tab label={translate!('game.locationTab')} />
        {/* <Tab label={translate!('game.scoreTab')} />
        <Tab label={translate!('game.rotationTab')} /> */}
      </Tabs>
      </AppBar>
      {tabIndex === 0 && <TabContainer>                    
          <div style={{ width: '80%', marginLeft: '10px', marginTop: '10px' }}>
            <GameEvents
              title={msgTitleVal}
              logs={gameEvents}
              onSelect={this.onSelectDay}  
              value={msgTitleVal}     
              clearBtnText={'Clear notifications'}
              addBtnText={'Add'}
            />
          </div>
      </TabContainer>}
      {tabIndex === 1 && <TabContainer>
         Load Game Locations ...
      </TabContainer>}
      {tabIndex === 2 && <TabContainer>{circlesLoaded ? <Followers /> : ''}</TabContainer>}
      </div>
    )
  }

  /**
   * Get tab index by navigation name
   */
  private getTabIndexByNav: (navName: string) => number = (navName: string) => {
    let tabIndex = 0
    switch (navName) {
      case 'circles':
        return 1
      case 'followers':
        return 2
      default:
        return 0
    }
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IGamesComponentProps) => {

  return {
    goTo: (url: string) => dispatch(push(url)),
    setHeaderTitle : (title: string) => dispatch(globalActions.setHeaderTitle(title)),
    loadGames: () => dispatch(gameActions.dbGetGames()),
    selectGameEvent: (evtId: string, evtTitle: string) => dispatch(gameActions.selectGameEvent(evtId, evtTitle))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IGamesComponentProps) => {

  let availGameEvents = state.getIn(['game', 'get_game_event'])
  let availGames = availGameEvents ? availGameEvents.games : ['deewsr12$Saturday, 3/2/2019T12:40pm$ JayPeak, VT$ Hockey Tournament Game$']
  
  // const existGames = state.getIn(['game', 'get_game_event'])  
  // const newGameEvent = state.getIn(['game', 'new_game_event'])   
  // const availGameEvents = existGames && existGames.games.length > 0 ? existGames.games : ['deewsr12$Saturday, 3/2/2019T12:40pm$ JayPeak, VT$ Hockey Tournament Game$']
  // if (newGameEvent) {
  //   // newGameEvents.push(newEvent)
  //   availGameEvents.unshift(newGameEvent)
  // }

  return {
    translate: getTranslate(state.get('locale')),
    uid: state.getIn(['authorize', 'uid'], 0),
    circlesLoaded: state.getIn(['circle', 'loaded']),
    gameEvents: availGames  
  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GamesComponent as any) as any)
