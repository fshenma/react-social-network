import * as React from 'react'
import ActPlayerComponent from 'components/actPlayer'
import Grid from '@material-ui/core/Grid'
import { Player } from 'src/core/domain/player'
import ITeamRotateComponentProps from './ITeamRotateComponentProps'
import ITeamRotateComponentState from './ITeamRotateComponentState'
import { connect } from 'react-redux'
// - Import actions
import * as playerActions from 'store/actions/playerActions'

export class TeamRotateComponent extends React.Component<ITeamRotateComponentProps, ITeamRotateComponentState> {
  constructor(props: ITeamRotateComponentProps) {
    super(props)
    this.state = {
      activePlayers: [],
      dissmised: [],
      // teamConfig: []
      team: '',
      teamColor: ''
      // doRotate: false
    }
  }

  componentDidMount() {
    const { teamName, teamColor, loadedPlayer, runRotate } = this.props

    const activePlayers: any = []
    
    loadedPlayer.forEach((player: Player, key: string) => {
                    activePlayers.push({id: key, ...player})
                })

    this.setState({
      activePlayers: activePlayers,
      // teamConfig: confTeams,
      team: teamName,
      teamColor: teamColor,
      doRotate: runRotate
    })
  }

  componentDidUpdate() {
    if (this.props.runRotate) {
      this.rotate()
    }
  }

  move = (ar: any[], from: number,to: number) => {
    ar.splice(to,0,ar.splice(from,1)[0])
    return ar
  }

  moveUser = (userId: string, isUp: boolean) => {
    // const userId = e.currentTarget.parentElement.id
    const players = [...this.state.activePlayers]

    const element: any = players.find(p => p.userId === userId)
    const pos = players.indexOf(element)
    const newPos = isUp ? (pos === players.length ? pos : pos + 1) : ( pos === 0 ? 0 : pos - 1)
    const newPlayers = this.move(players, pos, newPos)
    this.setState({
      activePlayers: newPlayers
    })

  }

  moveUp = (e: any) => {
    const userId = e.currentTarget.parentElement.id
    this.moveUser(userId, true)
  }

  moveDown = (e: any) => {
    const userId = e.currentTarget.parentElement.id
    this.moveUser(userId, false)
  }
  
  dismiss = (e: any) => {
    const {deleteActivePlayer} = this.props

    const dissmisedTipId = e.currentTarget.parentElement.id
    // const dissmisedTip = this.state.activePlayers.filter(
    //   (t: any) => t.id === dissmisedTipId
    // )
    const activePlayers = this.state.activePlayers.filter(
      (t: any) => t.id !== dissmisedTipId
    )
    this.setState(prevState => ({
      activePlayers,
      // dissmised: [...prevState.dissmised, ...dissmisedTip]
    }))

    deleteActivePlayer!(dissmisedTipId)
  }

  appear = (e: any) => {
    const appearTipId = e.currentTarget.parentElement.id
    const appearTip = this.state.dissmised.filter(
      (t: any) => t.id === appearTipId
    )
    const dissmised = this.state.dissmised.filter(
      (t: any) => t.id !== appearTipId
    )
    this.setState(prevState => ({
      activePlayers: [...prevState.activePlayers, ...appearTip],
      dissmised
    }))
  }

  rotate = () => {
    const activePlayers = [...this.state.activePlayers].filter(
      p => p.team === this.state.team
    )
    const standbyPlayers = [...this.state.dissmised].filter(
      p => p.team === this.state.team
    )

    let firstActive =
      activePlayers && activePlayers.length > 0 ? activePlayers.shift() : null
    let firstDiss =
      standbyPlayers && standbyPlayers.length > 0
        ? standbyPlayers.shift()
        : null

    this.setState({
      activePlayers: firstDiss
        ? [...activePlayers, firstDiss]
        : [...activePlayers],
      dissmised: firstActive
        ? [...standbyPlayers, firstActive]
        : [...standbyPlayers]
    })
  }
  
  render() {
    const {teamColor, team} = this.state

    return (
      <div>
        <Grid
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
           
            {this.state.activePlayers
              .filter((p: any) => p.team === team)
              .map((m: any, i: number) => {
                return (
                  
                  <ActPlayerComponent
                    // delay={i * 200}
                    player={m}
                    key={m.userId}
                    appear={this.appear}
                    moveUp={this.moveUp}
                    moveDown={this.moveDown}
                    dismiss={this.dismiss}
                    teamColor={teamColor}
                  />
                )
              })}
          
        </Grid>
        <hr />
        <Grid
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
           
            {this.state.dissmised
              .filter((p: any) => p.team === this.state.team)
              .map((m: any, i: number) => {
                return (
                  <ActPlayerComponent
                    player={m}
                    key={m.id}
                    appear={this.appear}
                    moveUp={this.moveUp}
                    moveDown={this.moveDown}
                    dismiss={this.dismiss}
                    teamColor={this.state.teamColor}
                  />
                )
              })}
           
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: ITeamRotateComponentProps) => {
  return {
    deleteActivePlayer: (userId: string) => dispatch(playerActions.removeActivePlayer(userId)),     
  }
}

// to do
export default connect(null, mapDispatchToProps)(TeamRotateComponent as any)
// saveActivePlayer: (userId: string, activePlayer: Player) => dispatch(playerActions.addActivePlayer(userId, activePlayer)),