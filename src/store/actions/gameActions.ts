// - Import react components
import { provider } from 'src/socialEngine'
import { Map } from 'immutable'

// - Import domain
import { SocialError } from 'src/core/domain/common'

// - Import action types
import { GameActionType } from 'constants/gameActionType'

// - Import actions
import * as globalActions from 'store/actions/globalActions'

import { IGameService } from 'src/core/services/game'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
 
/**
 * Get service providers
 */
const gameService: IGameService = provider.get<IGameService>(SocialProviderTypes.GameService)

/* _____________ CRUD DB _____________ */
 
/**
 * if to show add Game Event button
 */
export const AddEventButton = (showButton: boolean) => {
  return {
    type: GameActionType.ADD_EVENT_BUTTON,
    payload: showButton
  }

}
 
export const GetGameEvent = (eventInfo: any) => {
  return {
    type: GameActionType.GET_GAME_EVENT,
    payload: eventInfo
  } 

}

/**
 * Updata Player information
 * @param {object}  
 */
export const dbGetGames = () => {
  return (dispatch: any) => {
    
    return gameService.getGames ().then((eventInfo: any) => {

      dispatch(GetGameEvent(eventInfo))
       
    })
    .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

  }

}

/**
 * Updata Player information
 * @param {object} newInfo
 */
export const dbSaveGameEvent = (eventInfo: any) => {
  return (dispatch: any) => {
    
    return gameService.saveGame (eventInfo).then((result) => {

      dispatch(SaveGameEvent(result + '$ ' + eventInfo))
      dispatch(dbGetGames())
       
    })
    .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

  }

}

/**
 * save Game Event
 */
export const SaveGameEvent = (eventInfo: any) => {
  return {
    type: GameActionType.SAVE_GAME_EVENT,
    payload: eventInfo
  } 

}
 
/**
 * Updata Player information
 * @param {object}  
 */
export const selectGameEvent = (evtId: string, evtTitle: string) => {
  return {
    type: GameActionType.SELECTED_GAME_EVENT,
    payload: {gameEventId: evtId, gameEventTitle: evtTitle}
  } 
}

/**
 * dbSaveGameDetails
 * @param {object} eventInfo
 */
export const dbSaveGameDetails = (eventId: any, eventInfo: any) => {
  return (dispatch: any) => {
    
    return gameService.updateGame (eventId, eventInfo).then(() => {

      dispatch(SaveGameEvent(eventInfo))
       
    })
    .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

  }

}