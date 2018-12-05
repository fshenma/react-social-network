// - Import react components
import { HomeRouter } from 'routes'
import { Map } from 'immutable'
import React, { Component } from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
// import config from 'src/config'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import HomeHeader from 'src/components/homeHeader'
import styles from './homeStyles'
import SideBar from './SideBar'
// - Import API

// - Import actions
import {
  authorizeActions,
  imageGalleryActions,
  postActions,
  commentActions,
  voteActions,
  userActions,
  globalActions,
  circleActions,
  notifyActions
} from 'src/store/actions'

import { IHomeComponentProps } from './IHomeComponentProps'
import { IHomeComponentState } from './IHomeComponentState'

// - Create Home component class
export class HomeComponent extends Component<IHomeComponentProps, IHomeComponentState> {

  // Constructor
  constructor(props: IHomeComponentProps) {
    super(props)

    // Default state
    this.state = {
      drawerOpen: false
    }

    // Binding function to `this`

  }

  /**
   * Handle drawer toggle
   */
  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  componentWillMount() {
    const { global, clearData, loadData, authed, defaultDataEnable, isVerifide, goTo } = this.props
    if (!authed) {
      goTo!('/login')
      return
    }
    if (!isVerifide) {
      goTo!('/emailVerification')

    } else if (!global.get('defaultLoadDataStatus')) {

      clearData!()
      loadData!()
      defaultDataEnable!()
    }
  }

  /**
   * RenderDOM component
   *
   * @returns DOM
   * 
   * @memberof Home
   */
  render() {
    const HR = HomeRouter
    const { loaded, authed, loadDataStream, mergedPosts, hasMorePosts, showSendFeedback, translate, classes, theme } = this.props
    const { drawerOpen } = this.state
    
    const anchor = theme.direction === 'rtl' ? 'right' : 'left'
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <HomeHeader onToggleDrawer={this.handleDrawerToggle} drawerStatus={this.state.drawerOpen} />
          <SideBar translate={this.props.translate} profileUrl={`/${this.props.uid}`} 
              drawerOpen={this.state.drawerOpen} 
              handleDrawerToggle={this.handleDrawerToggle} 
              classes={this.props.classes} />                    
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: drawerOpen,
              [classes[`contentShift-${anchor}`]]: drawerOpen,
            })}
          >          
            <HR enabled={loaded!} data={{ mergedPosts, loadDataStream, hasMorePosts }} />
          </main>
        </div>
      </div>

    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IHomeComponentProps) => {

  return {
    loadDataStream:
      (page: number, limit: number) => dispatch(postActions.dbGetPosts(page, limit)),
    loadData: () => {
      dispatch(postActions.dbGetPosts())
      dispatch(imageGalleryActions.dbGetImageGallery())
      dispatch(userActions.dbGetUserInfo())
      dispatch(notifyActions.dbGetNotifications())
      dispatch(circleActions.dbGetCircles())
      dispatch(circleActions.dbGetUserTies())
      dispatch(circleActions.dbGetFollowers())

    },
    clearData: () => {
      dispatch(imageGalleryActions.clearAllData())
      dispatch(postActions.clearAllData())
      dispatch(userActions.clearAllData())
      dispatch(notifyActions.clearAllNotifications())
      dispatch(circleActions.clearAllCircles())
      dispatch(globalActions.clearTemp())

    },
    defaultDataDisable: () => {
      dispatch(globalActions.defaultDataDisable())
    },
    defaultDataEnable: () => {
      dispatch(globalActions.defaultDataEnable())
    },
    goTo: (url: string) => dispatch(push(url)),
    showSendFeedback: () => dispatch(globalActions.showSendFeedback()),
    hideSendFeedback: () => dispatch(globalActions.hideSendFeedback())

  }

}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IHomeComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], {})
  const global = state.get('global', {})
  let mergedPosts = Map({})
  const circles = state.getIn(['circle', 'circleList'], {})
  const followingUsers: Map<string, any> = state.getIn(['circle', 'userTies'], {})
  const posts = state.getIn(['post', 'userPosts', uid ], {})
  const hasMorePosts = state.getIn(['post', 'stream', 'hasMoreData' ], true)
  followingUsers.forEach((user, userId) => {
    let newPosts = state.getIn(['post', 'userPosts', userId], {})
   mergedPosts = mergedPosts.merge(newPosts)
  })
  mergedPosts = mergedPosts.merge(posts)
  return {
    authed: state.getIn(['authorize', 'authed'], false),
    isVerifide: state.getIn(['authorize', 'isVerifide'], false),
    translate: getTranslate(state.get('locale')),
    currentLanguage: getActiveLanguage(state.get('locale')).code,
    mergedPosts,
    global,
    hasMorePosts,
    loaded: state.getIn(['user', 'loaded']) && state.getIn(['imageGallery', 'loaded']) && state.getIn(['notify', 'loaded']) && state.getIn(['circle', 'loaded'])
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(HomeComponent as any) as any)) as typeof HomeComponent
