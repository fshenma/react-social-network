import { GameActionType } from 'constants/gameActionType'

/**
 *  Global action interface
 *
 * @export
 * @interface IGlobalAction
 */
export interface IGameAction {
  payload: any,
  type: GameActionType

}
