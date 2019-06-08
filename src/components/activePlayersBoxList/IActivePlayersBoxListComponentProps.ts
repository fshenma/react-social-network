import { User } from 'core/domain/users'
import { UserTie } from 'core/domain/circles'
import {Map} from 'immutable'

export interface IActivePlayersBoxListComponentProps {

    /**
     * Users in the circle
     *
     * @type {{[userId: string]: ActivePlayers}}
     * @memberof IActivePlayersBoxListComponentProps
     */
  activePlayers: any

    /**
     * User identifier
     *
     * @type {string}
     * @memberof IActivePlayersBoxListComponentProps
     */
  uid?: string

    /**
     * isGame
     *
     * @type {boolean}
     * @memberof IActivePlayersBoxListComponentProps
     */
    isGame?: boolean
}
