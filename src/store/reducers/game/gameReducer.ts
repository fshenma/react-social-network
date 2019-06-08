// - Import action types
import { GameActionType } from 'constants/gameActionType'

import { GameState } from './GameState'
import { IGameAction } from './IGameAction'
import { Map, fromJS } from 'immutable'

/**
 * Global reducer
 * @param {object} state
 * @param {object} action
 */
export const gameReducer = (state = Map(new GameState()), action: IGameAction) => {
  const { payload } = action
  switch (action.type) {
     
    case GameActionType.ADD_EVENT_BUTTON:
      return state
        .set('show_add_event_button', action.payload)

    case GameActionType.SAVE_GAME_EVENT:
      return state
       .set('new_game_event', action.payload)
       .set('show_add_event_button', true)

    case GameActionType.GET_GAME_EVENT:
       return state
         .set('get_game_event', action.payload)

    case GameActionType.SELECTED_GAME_EVENT:
      return state
          .set('game_event_title', action.payload)
         
    default:
      return state
  }

}
