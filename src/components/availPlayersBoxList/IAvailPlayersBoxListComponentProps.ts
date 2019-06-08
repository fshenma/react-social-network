import { User } from 'core/domain/users'
import { UserTie } from 'core/domain/circles'
import {Map} from 'immutable'

export interface IAvailPlayersBoxListComponentProps {

    /**
     * Users in the circle
     *
     * @type {{[userId: string]: AvailPlayers}}
     * @memberof IAvailPlayersBoxListComponentProps
     */
  availPlayers: Map<string, UserTie>

    /**
     * User identifier
     *
     * @type {string}
     * @memberof IAvailPlayersBoxListComponentProps
     */
  uid?: string

    /**
     * isGame
     *
     * @type {boolean}
     * @memberof IAvailPlayersBoxListComponentProps
     */
    isGame?: boolean
}
