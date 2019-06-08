import { Player } from 'core/domain/player'

/**
 * User service interface
 *
 * @export
 * @interface IUserService
 */
export interface IPlayerService {
  getPlayerProfile: (userId: string) => Promise<Player>
  addPlayer: (player: Player) => Promise<string>
  updatePlayerProfile: (userId: string, profile: Player) => Promise<void>
  getPlayersProfile: (userId: string, lastUserId?: string, page?: number, limit?: number)
  => Promise<{ users: { [userId: string]: Player }[], newLastUserId: string }>
}
