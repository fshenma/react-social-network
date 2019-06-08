import { User } from 'core/domain/users'
import { Circle } from 'core/domain/circles/circle'
import { UserTie } from 'core/domain/circles'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { ServerRequestModel } from 'models/server/serverRequestModel'
import {Map, List} from 'immutable'
import { Player } from 'src/core/domain/player'

export interface IGameScoreBoxComponentProps {
  /**
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any,

  /**
   * Styles
   */
  classes?: any,

}