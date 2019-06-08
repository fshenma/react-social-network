/// import { Player } from 'core/domain/player'

/**
 * game service interface
 *
 * @export
 * @interface IGameService
 */
export interface IGameService {
//  getPlayerProfile: (userId: string) => Promise<Player>
  getGames: () => Promise<string>
  
  saveGame: (newGame: any) => Promise<string>
 // updatePlayerProfile: (userId: string, profile: Player) => Promise<void>
//  getPlayersProfile: (userId: string, lastUserId?: string, page?: number, limit?: number)
//  => Promise<{ users: { [userId: string]: Player }[], newLastUserId: string }>

  updateGame: (gameId: any, gameData: any) => Promise<string>

}
