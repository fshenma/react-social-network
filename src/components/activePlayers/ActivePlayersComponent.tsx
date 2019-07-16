// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

// - Import app components
// import ActivePlayersBoxList from 'components/activePlayersBoxList'
import TeamRotate from 'components/teamRotate'
// - Import API

// - Import actions
import * as playerActions from 'store/actions/playerActions'
import { IActivePlayersComponentProps } from './IActivePlayersComponentProps'
import { IActivePlayersComponentState } from './IActivePlayersComponentState'
// import { UserTie } from 'core/domain/circles/userTie'

// import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme: any) => ({
  button: {
    margin: theme.spacing.unit,
  },
   
})

const teamConfig = [
  {
    teamName: 'red',
    teamColor: 'red'
  },
  {
    teamName: 'white',
    teamColor: 'primary'
  }
]

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
      doRotate: false
    }

  }

  callRotate = () => {
    this.setState({ doRotate: true })
  }

  componentDidMount() {
    const { activeTeams } = this.props

    this.setState({ teamConfig: activeTeams })
  }

  componentDidUpdate() {
    if (this.state.doRotate) {
      this.setState({ doRotate: false })
    }
  }

  getTeamColor = (teamName: string) => {
    return this.state.teamConfig.find((t: any) => t.teamName === teamName).teamColor
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
    const {hasMorePeople, translate, classes,activePlayers } = this.props
    const { doRotate } = this.state

    // const users = this.getTestUsers()
    const playerInfo = // users //
                      this.props.activePlayers!
    return (
      <div>
        <Button onClick={e => this.callRotate()} className={classes.button}>
          Rotate
        </Button>
        <Divider
          style={{
            marginBottom: '2rem'
          }}
        />

          <div className='tracks'>
            {playerInfo ? (<div style={{width: '60%', display: 'inline-grid', gridTemplateColumns: 'auto auto auto'}}>
              {/* <ActivePlayersBoxList activePlayers={playerInfo} /> */}
              {teamConfig.map((team, i) => {
                return (
                  <TeamRotate
                    key={team.teamName}
                    teamName={team.teamName}
                    teamColor={team.teamColor}
                    loadedPlayer={activePlayers}
                    runRotate={doRotate}
                  />
                )
              })}

              <div style={{ height: '24px' }}></div>
            </div>) : (<div className='g__title-center'>
              {translate!('people.nothingToShowLabel')}
            </div>)}
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ActivePlayersComponent as any) as any)
