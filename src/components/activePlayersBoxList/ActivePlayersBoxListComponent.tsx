// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

// - Import app components
import ActivePlayerBox from 'components/activePlayerBox'
import PlayerBox from 'components/playerBox'

import { IActivePlayersBoxListComponentProps } from './IActivePlayersBoxListComponentProps'
import { IActivePlayersBoxListComponentState } from './IActivePlayersBoxListComponentState'
// import { UserTie } from 'core/domain/circles/userTie'
import { Player } from 'src/core/domain/player'
import { PlayerBoxComponent } from '../playerBox/PlayerBoxComponent'
 
// - Import API

// - Import actions

/**
 * Create component class
 */
export class ActivePlayersBoxListComponent extends Component<IActivePlayersBoxListComponentProps,IActivePlayersBoxListComponentState> {

  static propTypes = {
        /**
         * List of users
         */
    activePlayers: PropTypes.object
  }

  activeRedPlayerBoxList: any[] = []
  activeWhitePlayerBoxList: any[] = []

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IActivePlayersBoxListComponentProps) {
    super(props)

        // Defaul state
    this.state = {

    }

        // Binding functions to `this`

  }

  activePlayerList = () => {
    let { uid } = this.props
    const players = this.props.activePlayers
    // const activeRedPlayerBoxList: any[] = []
    // const activeWhitePlayerBoxList: any[] = []
    if (players) {
      players.forEach((player: Player, key: string) => {
        if (uid !== key) {     
          if (player.team === 'red') {
            this.activeRedPlayerBoxList.push(<ActivePlayerBox key={key} userId={key} />)
          } else {
            this.activeWhitePlayerBoxList.push(<ActivePlayerBox key={key} userId={key} />)
          }           
        }
      })
    }   
  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    {this.activePlayerList()}  
    const colStyle = {       
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        position: 'relative',
        paddingTop: 20,
        width: '10rem'      
    } as React.CSSProperties

    const colContainerStyle = {       
      display: 'grid',
      width: '100 %',
      gridTemplateColumns: '150px 1fr',
  } as React.CSSProperties
      
    return (
      <div style={colContainerStyle}>
        <div style={colStyle}>
          {this.activeRedPlayerBoxList}
        </div>

        <div style={colStyle}>
          {this.activeWhitePlayerBoxList}
        </div>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IActivePlayersBoxListComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IActivePlayersBoxListComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ActivePlayersBoxListComponent as any)
