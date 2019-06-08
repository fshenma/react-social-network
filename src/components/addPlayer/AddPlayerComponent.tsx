// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import InfiniteScroll from 'react-infinite-scroller'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'
// import { MDBInput } from 'mdbreact'

// - Import app components
import UserBoxList from 'components/userBoxList'
import LoadMoreProgressComponent from 'layouts/loadMoreProgress'

// - Import API

// - Import actions
import * as playerActions from 'store/actions/playerActions'
import { IAddPlayerComponentProps } from './IAddPlayerComponentProps'
import { IAddPlayerComponentState } from './IAddPlayerComponentState'
import { UserTie } from 'core/domain/circles/userTie'
import { Player } from 'core/domain/player'

const {MDBInput, MDBBtn, MDBIcon, MDBRow, MDBCol } = require('mdbreact')

/**
 * Create component class
 */
export class AddPlayerComponent extends Component<IAddPlayerComponentProps, IAddPlayerComponentState> {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IAddPlayerComponentProps) {
    super(props)

        // Defaul state
        this.state = {
          fname: '',
          lname: '',
          email: '',
          city: '',
          state: '',
          zip: ''
        }

    // Binding functions to `this`
    this.submitHandler = this.submitHandler.bind(this)
  } 

  submitHandler = (event: any) => {
    event.preventDefault()
    event.target.className += ' was-validated'

    const { update } = this.props

    update!({
      fullName: this.state.fname + ' ' + this.state.lname,
      tagLine: '',
      avatar: '',
      banner: '',
      companyName: '',
      webUrl: '',
      twitterId: '',
      email: this.state.email,
      creationDate: Date.now(),
      birthday: 0 , // selectedBirthday > 0 ? selectedBirthday : ((info && info.birthday) ? info!.birthday! : 0)
      playerNumber: this.state.playerNumber
    })
  }

  changeHandler = (e: any) => {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }
  
    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    // const {hasMorePeople, translate} = this.props
    // // const users = this.getTestUsers()
    // const peopleInfo = // users //
    //                   Map<string, UserTie>(this.props.peopleInfo!)
    return (
      <div className='form-group'>
      <form
          className='needs-validation'
          onSubmit={this.submitHandler}
          noValidate
        >
        <MDBRow>
            <MDBCol md='4'>
              <MDBInput
                value={this.state.fname}
                name='fname'
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterNameEx'
                label='First name'
                required
              >
                <div className='valid-tooltip'>Looks good!</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                value={this.state.lname}
                name='lname'
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterEmailEx2'
                label='Last name'
                required
              >
                <div className='valid-tooltip'>Looks good!</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                value={this.state.email}
                onChange={this.changeHandler}
                type='email'
                id='materialFormRegisterConfirmEx3'
                name='email'
                label='Email address'
              >
              </MDBInput>
            </MDBCol>
          </MDBRow>
          {/* 
            <MDBRow>
            <MDBCol md='4'>
              <MDBInput
                value={this.state.city}
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterPasswordEx4'
                name='city'
                label='City'
                required
              >
                <div className='invalid-tooltip'>
                  Please provide a valid city.
                </div>
                <div className='valid-tooltip'>Looks good!</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                value={this.state.state}
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterPasswordEx4'
                name='state'
                label='State'
                required
              >
                <div className='invalid-tooltip'>
                  Please provide a valid state.
                </div>
                <div className='valid-tooltip'>Looks good!</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                value={this.state.zip}
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterPasswordEx4'
                name='zip'
                label='zip'
                required
              >
                <div className='invalid-tooltip'>
                  Please provide a valid zip.
                </div>
                <div className='valid-tooltip'>Looks good!</div>
              </MDBInput>
            </MDBCol>
          </MDBRow> */}
          <MDBRow>
            <MDBCol md='4'>
              <MDBInput
                value={this.state.playerNumber}
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterPasswordEx4'
                name='playerNumber'
                label='Player Number'
                required
              >
                <div className='invalid-tooltip'>
                  Please provide a player number.
                </div>
                <div className='valid-tooltip'>Looks good!</div>
              </MDBInput>
            </MDBCol>             
          </MDBRow>
       
        <MDBBtn color='primary' type='submit'>
          <MDBIcon icon='magic' className='mr-1' /> Save
        </MDBBtn>
        </form>
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
const mapDispatchToProps = (dispatch: any, ownProps: IAddPlayerComponentProps) => {
  return {
    loadPeople: (page: number, limit: number) => dispatch(playerActions.dbGetPeopleInfo(page, limit)),
    update: (playerInfo: Player) => dispatch(playerActions.dbAddPlayerInfo(playerInfo)),
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IAddPlayerComponentProps) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(AddPlayerComponent as any)
