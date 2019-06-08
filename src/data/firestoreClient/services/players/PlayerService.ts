// - Import react components
import firebase, {  firebaseAuth, db } from 'data/firestoreClient'
import moment from 'moment/moment'

import { SocialError } from 'core/domain/common'
import { Player, PlayerProvider } from 'core/domain/player'
import { IPlayerService } from 'core/services/players'
import { injectable } from 'inversify'

import { UserTie } from 'core/domain/circles/userTie'

/**
 * Firbase user service
 *
 * @export
 * @class UserService
 * @implements {IUserService}
 */
@injectable()
export class PlayerService implements IPlayerService {
 
  /**
   * Get player profile
   */
  public getPlayerProfile: (userId: string)
    => Promise<Player> = (userId) => {      
      
      return new Promise<Player>((resolve, reject) => {
        let userProfileRef = db.doc(`userInfo/${userId}`)
        userProfileRef.get().then((result) => {
          if (!result.exists) {
            this.getUserProviderData(userId).then((providerData: PlayerProvider) => {
              if (!PlayerProvider || !providerData.email) {
                reject(reject(new SocialError(`firestore/providerdata`, 'firestore/getUserProfile : Provider data or email of provider data is empty!')))
              }
              const {avatar,fullName, email} = providerData
              const userProfile = new Player(avatar,fullName && fullName !== '' ? fullName : email ,'','',moment().unix(),email, -1, '', '', '')
              resolve(userProfile)
              this.updatePlayerProfile(userId,userProfile)
            })
          } else {
            resolve(result.data() as Player)
          }

        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/getUserProfile :' + error.message)))
      })
    }

  /**
   * Add Player
   *
   * @memberof CommentService
   */
  public addPlayer: (player: Player)
  => Promise<string> = (player) => {
    return new Promise<string>((resolve,reject) => {
      let playerRef = db.collection('playerInfo')
      playerRef.add({...player, state: 'active'}).then((result) => {
        resolve(result.id)
      })
      .catch((error: any) => {
        reject(new SocialError(error.code,error.message))
      })
    })
  }

    /**
     * Update user profile
     */
  public updatePlayerProfile: (userId: string, profile: Player)
    => Promise<void> = (userId, profile) => {
      return new Promise<void>((resolve, reject) => {
        const batch = db.batch()
        const profileRef = db.doc(`playerInfo/${userId}`)

        batch.set(profileRef,{...profile, id: userId, state: 'active'})
        batch.commit().then(() => {
          resolve()
        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/updatePlayerProfile' + error.message)))
      })
    }

    /**
     * Get users profile
     */
  public getPlayersProfile: (userId: string, lastUserId?: string, page?: number, limit?: number)
    => Promise<{ users: { [userId: string]: Player }[], newLastUserId: string }> = (userId, lastUserId, page, limit = 10) => {
      return new Promise<{ users: { [userId: string]: Player }[], newLastUserId: string }>((resolve, reject) => {
        let parsedData: { [userId: string]: Player }[] = []

        let query = db.collection('playerInfo').where('state', '==', 'active')
        if (lastUserId && lastUserId !== '') {
          query = query.orderBy('id').orderBy('creationDate', 'desc').startAfter(lastUserId)
        }
        if (limit) {
          query = query.limit(limit)
        }

        query.get().then((users) => {
          let newLastUserId = users.size > 0 ? users.docs[users.docs.length - 1].id : ''
          users.forEach((result) => {
            const user = result.data() as Player
            parsedData = [
              ...parsedData,
              {
                [result.id]: {
                  ...user
                }
              }

            ]
          })
          resolve({ users: parsedData, newLastUserId })
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }

    /**
     * Get uesr provider data
     */
  private getUserProviderData = (userId: string) => {
    return new Promise<PlayerProvider>((resolve,reject) => {
      let userProviderRef = db.doc(`userProviderInfo/${userId}`)
      userProviderRef.get().then((snapshot) => {
        if (snapshot.exists) {
          let userProvider: PlayerProvider = snapshot.data() as PlayerProvider || {}
          resolve(userProvider)
        } else {
          throw new SocialError(`firestore/getUserProviderData/notExist `, `document of userProviderRef is not exist `)
        }
      })
      .catch((error: any) => {
        reject(new SocialError(error.code, 'firestore/getUserProviderData ' + error.message))
      })
    })

  }

}
