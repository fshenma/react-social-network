import { Player } from 'core/domain/player/player'
import { UserTie } from 'core/domain/circles'

export interface IAddPlayerComponentProps {

  /**
   * Update  player
   *
   * @memberof IAddPlayerComponentProps
   */
  update?: (player: Player) => void

  /**
   * Users' profile
   */
  peopleInfo?: Map<string, UserTie>

  /**
   * If there are more people {true} or not {false}
   */
  hasMorePeople?: boolean

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

}
