// - Import action types
import { PlayerActionType } from 'constants/playerActionType'
import { Map } from 'immutable'

// - Import domain
import { User, Profile } from 'src/core/domain/users'

import { PlayerState } from './PlayerState'
import { IPlayerAction } from './IPlayerAction' 

/**
 * User reducer
 */
export let playerReducer = (state = Map(new PlayerState()), action: IPlayerAction) => {
  const { payload } = action
  
  switch (action.type) {
    case PlayerActionType.USER_INFO:
      return state
        .setIn(['info', payload.uid], payload.info)

    case PlayerActionType.ADD_PLAYER_INFO:
      return state
        .setIn(['info', payload.uid], payload.info)
        .set('loaded', true)

    case PlayerActionType.ADD_PEOPLE_INFO:
      return state
        .mergeIn(['info'], payload)

    case PlayerActionType.UPDATE_PLAYER_INFO:
      return state
        .mergeIn(['info', payload.uid], payload.info)

    case PlayerActionType.ADD_ACTIVE_PLAYER:
      return state
        .setIn(['activePlayers', payload.uid], payload.activePlayer)

    case PlayerActionType.REMOVE_ACTIVE_PLAYER:
      return state
        .deleteIn(['activePlayers', payload.uid])
    
    case PlayerActionType.CLEAR_ALL_DATA_USER:
      return Map(new PlayerState())

    case PlayerActionType.CLOSE_EDIT_PROFILE:
      return state
        .set('openEditProfile', false)

    case PlayerActionType.OPEN_EDIT_PROFILE: 
      return state
        .set('openEditProfile', true)

    case PlayerActionType.HAS_MORE_DATA_PEOPLE:
      return state
        .setIn(['people', 'hasMoreData'], true)

    case PlayerActionType.NOT_MORE_DATA_PEOPLE:
      return state
        .setIn(['people', 'hasMoreData'], false)

    case PlayerActionType.REQUEST_PAGE_PEOPLE:
      return state
        .setIn(['people', 'lastPageRequest'], payload.page)

    case PlayerActionType.LAST_USER_PEOPLE:
      return state
        .setIn(['people', 'lastUserId'], payload.lastUserId)

    default:
      return state
  }
}
