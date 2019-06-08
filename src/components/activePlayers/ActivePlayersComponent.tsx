// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import Paper from '@material-ui/core/Paper'
import InfiniteScroll from 'react-infinite-scroller'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
// import {Map} from 'immutable'

// - Import app components
import ActivePlayersBoxList from 'components/activePlayersBoxList'
import LoadMoreProgressComponent from 'layouts/loadMoreProgress'
// const {Button, Card, CardBody, CardImage, CardTitle, CardText, Col} = require('mdbreact')

// - Import API

// - Import actions
import * as playerActions from 'store/actions/playerActions'
import { IActivePlayersComponentProps } from './IActivePlayersComponentProps'
import { IActivePlayersComponentState } from './IActivePlayersComponentState'
// import { UserTie } from 'core/domain/circles/userTie'

/**
 * Create component class
 */
export class ActivePlayersComponent extends Component<IActivePlayersComponentProps, IActivePlayersComponentState> {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IActivePlayersComponentProps) {
    super(props)

        // Defaul state
    this.state = {

    }

  }

  /**
   * Scroll loader
   */
  scrollLoad = (page: number) => {
    const {loadPeople} = this.props
    loadPeople!(page, 10)
  }
 
    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    const {hasMorePeople, translate} = this.props
    // const users = this.getTestUsers()
    const playerInfo = // users //
                      this.props.activePlayers!
    return (
            <div>
                <InfiniteScroll
                pageStart={0}
                loadMore={this.scrollLoad}
                hasMore={hasMorePeople}
                useWindow={true}
                loader={<LoadMoreProgressComponent key='find-people-load-more-progress' />}
                >

                <div className='tracks'>
                {playerInfo ? (<div>     
                  <ActivePlayersBoxList activePlayers={playerInfo} />           
                                
                <div style={{ height: '24px' }}></div>
                </div>) : (<div className='g__title-center'>
                {translate!('people.nothingToShowLabel')}
               </div>)}
                </div>
            </InfiniteScroll>
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
const mapDispatchToProps = (dispatch: any, ownProps: IActivePlayersComponentProps) => {
  return {
    loadPeople: (page: number, limit: number) => dispatch(playerActions.dbGetPeopleInfo(page, limit))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IActivePlayersComponentProps) => {
  const people = state.getIn(['user', 'people'])
  const hasMorePeople = state.getIn(['user', 'people', 'hasMoreData' ], true)
  const info: any = state.getIn(['player','activePlayers'])
  return {
    translate: getTranslate(state.get('locale')),
    activePlayers: info,
    hasMorePeople
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ActivePlayersComponent as any)
