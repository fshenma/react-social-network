import { PlayerActionType } from 'constants/playerActionType'

/**
 *  User action interface
 *
 * @export
 * @interface IPlayerAction
 */
export interface IPlayerAction {
  payload: any,
  type: PlayerActionType

}
