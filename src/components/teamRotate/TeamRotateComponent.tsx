import * as React from 'react'
import ActPlayerComponent from 'components/actPlayer'
import Grid from '@material-ui/core/Grid'
import { Player } from 'src/core/domain/player'
import ITeamRotateComponentProps from './ITeamRotateComponentProps'
import ITeamRotateComponentState from './ITeamRotateComponentState'
 
export default class TeamRotateComponent extends React.Component<ITeamRotateComponentProps, ITeamRotateComponentState> {
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
                    activePlayers.push({userId: key, ...player})
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

  dismiss = (e: any) => {
    const dissmisedTipId = e.currentTarget.parentElement.id
    const dissmisedTip = this.state.activePlayers.filter(
      (tip: any) => tip.id === +dissmisedTipId
    )
    const activePlayers = this.state.activePlayers.filter(
      (tip: any) => tip.id !== +dissmisedTipId
    )
    this.setState(prevState => ({
      activePlayers,
      dissmised: [...prevState.dissmised, ...dissmisedTip]
    }))
  }

  appear = (e: any) => {
    const appearTipId = e.currentTarget.id
    const appearTip = this.state.dissmised.filter(
      (tip: any) => tip.id === +appearTipId
    )
    const dissmised = this.state.dissmised.filter(
      (tip: any) => tip.id !== +appearTipId
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
      <div className='team'>
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
                    tip={m}
                    key={m.userId}
                    appear={this.appear}
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
                    tip={m}
                    key={m.id}
                    appear={this.appear}
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
