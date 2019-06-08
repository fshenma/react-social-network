// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

// - Import app components
import PlayerBox from 'components/playerBox'

import { IAvailPlayersBoxListComponentProps } from './IAvailPlayersBoxListComponentProps'
import { IAvailPlayersBoxListComponentState } from './IAvailPlayersBoxListComponentState'
import { UserTie } from 'core/domain/circles/userTie'

// - Import API

// - Import actions

/**
 * Create component class
 */
export class AvailPlayersBoxListComponent extends Component<IAvailPlayersBoxListComponentProps,IAvailPlayersBoxListComponentState> {

  static propTypes = {
        /**
         * List of users
         */
    AvailPlayers: PropTypes.object
  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IAvailPlayersBoxListComponentProps) {
    super(props)

        // Defaul state
    this.state = {

    }

        // Binding functions to `this`

  }

  AvailPlayerList = () => {
    let { uid } = this.props
    const users = this.props.availPlayers
    const AvailPlayerBoxList: any[] = []
    if (users) {
       users.forEach((user: UserTie, key: string) => {
        if (uid !== key) {           
          AvailPlayerBoxList.push(<PlayerBox key={key} userId={key} user={user} />)
           
        }
      })
    }
    return AvailPlayerBoxList
  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {

    const styles = {

    }

    return (

                <div className='grid grid__1of4 grid__space-around'>
                  {this.AvailPlayerList()}
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
const mapDispatchToProps = (dispatch: Function, ownProps: IAvailPlayersBoxListComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IAvailPlayersBoxListComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(AvailPlayersBoxListComponent as any)
