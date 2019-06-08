import { Profile } from 'core/domain/users/profile'
import { UserTie } from 'core/domain/circles'
import { Player } from 'src/core/domain/player'

export interface IActivePlayersComponentProps {

  /**
   * Load users' profile
   *
   * @memberof IActivePlayersComponentProps
   */
  loadPeople?: (page: number, limit: number) => any

  /**
   * Users' profile
   */
  activePlayers?: Map<string, Player>

  /**
   * If there are more people {true} or not {false}
   */
  hasMorePeople?: boolean

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

}
