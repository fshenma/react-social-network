// - Import react components
import { provider } from 'src/socialEngine'
import { Map } from 'immutable'

// - Import domain
import { Profile } from 'src/core/domain/users'
import { SocialError } from 'src/core/domain/common'
import { Player } from 'src/core/domain/player'

// - Import action types
import { UserActionType } from 'constants/userActionType'
import { PlayerActionType } from 'constants/playerActionType'

// - Import actions
import * as globalActions from 'store/actions/globalActions'

import { IUserService } from 'src/core/services/users'
import { IPlayerService } from 'src/core/services/players'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'

/**
 * Get service providers
 */
const userService: IUserService = provider.get<IUserService>(SocialProviderTypes.UserService)
const playerService: IPlayerService = provider.get<IPlayerService>(SocialProviderTypes.PlayerService)

/* _____________ CRUD DB _____________ */

/**
 * Get user info from database
 */
export const dbGetUserInfo = () => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    if (uid) {
      return userService.getUserProfile(uid).then((userProfile: Profile) => {
        dispatch(addUserInfo(uid, {
          avatar: userProfile.avatar,
          email: userProfile.email,
          fullName: userProfile.fullName,
          banner: userProfile.banner,
          tagLine: userProfile.tagLine,
          creationDate: userProfile.creationDate,
          birthday: userProfile.birthday,
          companyName: userProfile.companyName,
          webUrl: userProfile.webUrl,
          twitterId: userProfile.twitterId,
        }))
      })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

    }
  }
}

/**
 *  Get user info from database
 */
export const dbGetUserInfoByUserId = (uid: string, callerKey: string) => {
  return (dispatch: Function, getState: Function) => {
    if (uid) {

      const state: Map<string, any>  = getState()
    let caller = state.getIn(['global', 'temp', 'caller'])
      if ( caller && caller.indexOf(`dbGetUserInfoByUserId-${uid}`) > -1) {
        return undefined
      }
      dispatch(globalActions.temp({caller: `dbGetUserInfoByUserId-${uid}`}))
      return userService.getUserProfile(uid).then((userProfile: Profile) => {

        dispatch(addUserInfo(uid, {
          avatar: userProfile.avatar,
          email: userProfile.email,
          fullName: userProfile.fullName,
          banner: userProfile.banner,
          tagLine: userProfile.tagLine,
          creationDate: userProfile.creationDate,
          birthday: userProfile.birthday,
          companyName: userProfile.companyName,
          webUrl: userProfile.webUrl,
          twitterId: userProfile.twitterId,
        }))

        switch (callerKey) {
          case 'header':
            dispatch(globalActions.setHeaderTitle(userProfile.fullName))

            break

          default:
            break
        }
      })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

    }
  }
}
/**
 * Updata user information
 * @param {object} newInfo
 */
export const dbUpdateUserInfo = (newProfile: Player) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])

    let profile: Profile = state.getIn(['user', 'info', uid])
    let updatedProfile: Player  = {
      avatar: newProfile.avatar || profile.avatar || '',
      banner: newProfile.banner || profile.banner || 'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57',
      email: newProfile.email || profile.email || '',
      fullName: newProfile.fullName || profile.fullName || '',
      tagLine: newProfile.tagLine || profile.tagLine || '',
      birthday: newProfile.birthday,
      companyName: newProfile.companyName || '',
      webUrl: newProfile.webUrl || '',
      twitterId: newProfile.twitterId || '',
      creationDate: newProfile.creationDate,
      playerNumber: newProfile.playerNumber
    }
    return userService.updateUserProfile(uid,updatedProfile).then(() => {

      dispatch(updateUserInfo(uid, updatedProfile))
      dispatch(closeEditProfile())
    })
    .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

  }

}

/**
 * Updata Player information
 * @param {object} newInfo
 */
export const dbUpdatePlayerInfo = (newPlayerfile: Player) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])

    let profile: Player = state.getIn(['user', 'info', uid])
    let updatedProfile: Player = {
      avatar: newPlayerfile.avatar || '', // profile.avatar || '',
      banner: newPlayerfile.banner || '', // || profile.banner || 'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57',
      email: newPlayerfile.email || profile.email || '',
      fullName: newPlayerfile.fullName || profile.fullName || '',
      tagLine: newPlayerfile.tagLine || profile.tagLine || '',
      birthday: newPlayerfile.birthday,
      companyName: newPlayerfile.companyName || '',
      webUrl: newPlayerfile.webUrl || '',
      twitterId: newPlayerfile.twitterId || '',
      creationDate: newPlayerfile.creationDate,
      playerNumber: newPlayerfile.playerNumber
    }
    return playerService.updatePlayerProfile(uid,updatedProfile).then(() => {

      dispatch(updatePlayerInfo(uid, updatedProfile))
      dispatch(closeEditProfile())
    })
    .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

  }

}

/**
 * Updata Player information
 * @param {object} newInfo
 */
export const dbAddPlayerInfo = (newPlayerfile: Player) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])

    let profile: Player = state.getIn(['user', 'info', uid])
    let updatedProfile: Player = {
      avatar: newPlayerfile.avatar || '', // profile.avatar || '',
      banner: newPlayerfile.banner || '', // || profile.banner || 'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57',
      email: newPlayerfile.email || profile.email || '',
      fullName: newPlayerfile.fullName || profile.fullName || '',
      tagLine: newPlayerfile.tagLine || profile.tagLine || '',
      birthday: newPlayerfile.birthday,
      companyName: newPlayerfile.companyName || '',
      webUrl: newPlayerfile.webUrl || '',
      twitterId: newPlayerfile.twitterId || '',
      creationDate: newPlayerfile.creationDate,
      playerNumber: newPlayerfile.playerNumber
    }
    return playerService.addPlayer(updatedProfile).then(() => {

      dispatch(addPlayerInfo(updatedProfile))
      dispatch(closeEditProfile())
    })
    .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

  }

}

// - Get people info from database
export const dbGetPeopleInfo = (page: number, limit: number) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any>  = getState()
    const people: Map<string, any> = state.getIn(['user', 'people'])
    const lastPageRequest = people.get('lastPageRequest')
    const lastUserId = people.get('lastUserId')

    let uid: string = state.getIn(['authorize', 'uid'])

    if (uid && lastPageRequest !== page) {

      return playerService.getPlayersProfile(uid, lastUserId, page, limit).then((result) => {
        if (!result.users || !(result.users.length > 0)) {
          return dispatch(notMoreDataPeople())
        }
        // Store last user Id
        dispatch(lastUserPeople(result.newLastUserId))

        let parsedData: Map<string, Profile> = Map({})
        result.users.forEach((user) => {
          const userId = Object.keys(user)[0]
          const userData = user[userId]
          parsedData = parsedData.set(userId, userData)
        })
        dispatch(addPeopleInfo(parsedData))
      })
        .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

    }
  }
}

/* _____________ CRUD State _____________ */

/**
 * Add active player
 */
export const addActivePlayer = (uid: string, activePlayer: Player) => {
  return {
    type: PlayerActionType.ADD_ACTIVE_PLAYER,
    payload: { uid, activePlayer}
  }
}

/* _____________ CRUD State _____________ */

/**
 * Add user information
 */
export const addUserInfo = (uid: string, info: Profile) => {
  return {
    type: UserActionType.ADD_USER_INFO,
    payload: { uid, info }
  }
}

/**
 * Add people information
 */
export const addPeopleInfo = (infoList: Map<string, Profile>) => {
  return {
    type: UserActionType.ADD_PEOPLE_INFO,
    payload: infoList
  }
}

/**
 * Update user information
 */
export const updateUserInfo = (uid: string, info: Profile) => {
  return {
    type: UserActionType.UPDATE_USER_INFO,
    payload: { uid, info }
  }
}

/**
 * Update user information
 */
export const addPlayerInfo = (info: Player) => {
  return {
    type: PlayerActionType.ADD_PLAYER_INFO,
    payload: { info }
  }
}

/**
 * Update user information
 */
export const updatePlayerInfo = (uid: string, info: Player) => {
  return {
    type: PlayerActionType.UPDATE_PLAYER_INFO,
    payload: { uid, info }
  }
}

export const clearAllData = () => {
  return {
    type: UserActionType.CLEAR_ALL_DATA_USER
  }
}

/**
 * Open edit profile
 */
export const openEditProfile = () => {
  return {
    type: UserActionType.OPEN_EDIT_PROFILE
  }

}

/**
 * Close edit profile
 */
export const closeEditProfile = () => {
  return {
    type: UserActionType.CLOSE_EDIT_PROFILE
  }

}

/**
 * Set profile posts has more data to show
 */
export const hasMoreDataPeople = () => {
  return {
    type: UserActionType.HAS_MORE_DATA_PEOPLE
  }

}

/**
 * Set profile posts has not data any more to show
 */
export const notMoreDataPeople = () => {
  return {
    type: UserActionType.NOT_MORE_DATA_PEOPLE
  }

}

/**
 * Set last page request of profile posts
 */
export const requestPagePeople = (page: number) => {
  return {
    type: UserActionType.REQUEST_PAGE_PEOPLE,
    payload: { page}
  }

}

/**
 * Set last user identification of find people page
 */
export const lastUserPeople = (lastUserId: string) => {
  return {
    type: UserActionType.LAST_USER_PEOPLE,
    payload: { lastUserId}
  }

}
