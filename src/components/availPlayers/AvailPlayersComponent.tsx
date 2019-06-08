// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import Paper from '@material-ui/core/Paper'
import InfiniteScroll from 'react-infinite-scroller'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'

// - Import app components
import AvailPlayersBoxList from 'components/availPlayersBoxList'
import LoadMoreProgressComponent from 'layouts/loadMoreProgress'
// const {Button, Card, CardBody, CardImage, CardTitle, CardText, Col} = require('mdbreact')

// - Import API

// - Import actions
import * as playerActions from 'store/actions/playerActions'
import { IAvailPlayersComponentProps } from './IAvailPlayersComponentProps'
import { IAvailPlayersComponentState } from './IAvailPlayersComponentState'
import { UserTie } from 'core/domain/circles/userTie'

/**
 * Create component class
 */
export class AvailPlayersComponent extends Component<IAvailPlayersComponentProps, IAvailPlayersComponentState> {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IAvailPlayersComponentProps) {
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
    const peopleInfo = // users //
                      Map<string, UserTie>(this.props.peopleInfo!)
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
                {peopleInfo && peopleInfo.count() > 0 ? (<div>     
                  <AvailPlayersBoxList availPlayers={peopleInfo} />           
                {/* <UserBoxList users={peopleInfo}/> */}
                {/* <Col style={{ maxWidth: '22rem' }}>
                <Card>
                  <CardBody>
                      <CardTitle>Standby</CardTitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button href='#'>>Red</Button><Button href='#'>>White</Button>
                  </CardBody>
                </Card>
                </Col> */}
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
const mapDispatchToProps = (dispatch: any, ownProps: IAvailPlayersComponentProps) => {
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
const mapStateToProps = (state: any, ownProps: IAvailPlayersComponentProps) => {
  const people = state.getIn(['user', 'people'])
  const hasMorePeople = state.getIn(['user', 'people', 'hasMoreData' ], true)
  const info: Map<string, UserTie> = state.getIn(['user', 'info'])
  return {
    translate: getTranslate(state.get('locale')),
    peopleInfo: info,
    hasMorePeople
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(AvailPlayersComponent as any)
