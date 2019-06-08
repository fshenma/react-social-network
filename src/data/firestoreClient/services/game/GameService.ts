import { FileResult } from 'models/files/fileResult'
// - Import react components
import { firebaseAuth, storageRef, db } from 'data/firestoreClient'

import { SocialError } from 'core/domain/common'
import { IGameService } from 'core/services/game'
import { IStorageService } from 'core/services/files'
import { IServiceProvider, ServiceProvide } from 'core/factories'
import { injectable } from 'inversify'
 
/**
 * Firbase image gallery service
 *
 * @export
 * @class GameService
 * @implements {IGameService}
 */
@injectable()
export class GameService implements IGameService {

  private readonly storageService: IStorageService
  private readonly serviceProvider: IServiceProvider

  constructor () {
    this.serviceProvider = new ServiceProvide()
    this.storageService = this.serviceProvider.createStorageService()
  }

  public getGames: ()
    => Promise<string> = () => {
      return new Promise<any>((resolve,reject) => {
        let query = db.collection('games')
        let parsedData: string [] = []

        query.get().then((games) => {
           
          games.forEach((result) => {
            const game = result.id + '$ ' + result.data().gameDesc as string
            parsedData = [
              ...parsedData,
              game
            ]
          })
          resolve({ games: parsedData })
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }

  public getGame: (gameId: string)
    => Promise<string> = (gameId) => {
      return new Promise<any>((resolve,reject) => {
        let gameRef = db.doc(`games/${gameId}`).collection('gameDesc')

        gameRef.get().then((snapshot) => {
          let parsedData: any [] = []
          snapshot.forEach((result) => {
            parsedData.push({
              // id: result.id,
              ...result.data() as any
            })
          })
          resolve(parsedData)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }

  public saveGame: (newGame: any)
    => Promise<string> = (newGame) => {
      return new Promise<string>((resolve,reject) => {

        let gameRef = db.collection(`games`).add({gameDesc: newGame})
        gameRef.then((result) => {
          resolve(result.id!)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }

  public updateGame: (eventId: any, eventInfo: any)
    => Promise<string> = (eventId, eventInfo) => {
      return new Promise<string>((resolve,reject) => {
        // const batch = db.batch()
        // const gameRef = db.doc(`games/${eventId}`)

        // batch.set(gameRef,{...eventInfo, id: eventId})
        db.collection(`games`).doc(eventId).update('gameDesc', eventInfo).then(() => {
            resolve()
          })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
        
        // batch.commit().then(() => {
        //   resolve()
        // })
        // .catch((error: any) => {
        //   reject(new SocialError(error.code, error.message))
        // })

      })
    }

  public deleteImage: (userId: string, imageId: string)
    => Promise<void> = (userId, imageId) => {
      return new Promise<void>((resolve,reject) => {
        const batch = db.batch()
        const imageRef = db.doc(`users/${userId}/images/${imageId}`)

        batch.delete(imageRef)
        batch.commit().then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }

  public uploadImage: (image: any, imageName: string, progressCallback: (percentage: number, status: boolean) => void)
    => Promise<FileResult> = (image, imageName, progressCallback) => {
      return new Promise<FileResult>((resolve,reject) => {
        this.storageService.uploadFile(image,imageName,progressCallback)
        .then((result: FileResult) => {
          resolve(result)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })
      })
    }

  public downloadImage: (fileName: string)
    => Promise<string> = (fileName) => {
      return new Promise<string>((resolve,reject) => {

        // Create a reference to the file we want to download
        let starsRef: any = storageRef.child(`images/${fileName}`)

        // Get the download URL
        starsRef.getDownloadURL().then((url: string) => {
          resolve(url)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })
      })
    }
}
