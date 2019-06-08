import { User } from 'core/domain/users'
import { Circle } from 'core/domain/circles/circle'
import { UserTie } from 'core/domain/circles'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { ServerRequestModel } from 'models/server/serverRequestModel'
import {Map, List} from 'immutable'
import { Player } from 'src/core/domain/player'

export interface IGameInfoBoxComponentProps {
  /**
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any

  /**
   * Styles
   */
  classes?: any

  /**
   * game event id
   */
  gameEventId?: string

  /**
   * game event title
   */
  gameTitle?: string

  /**
   * game event time
   */
  gameTime?: string

  /**
   * game event title
   */
  gameLocation?: string

  /**
   * game detail
   */
  gameDetail?: any

  /**
   * save game event detail function
   */
  saveGameEventDetail?: (gameDetail: any) => any

  /**
   * call to save game event detail to database
   */
  saveGameEventDetailData?: (gameEventId: any, gameDetail: any) => any
}
