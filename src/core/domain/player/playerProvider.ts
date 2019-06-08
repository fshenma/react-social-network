/**
 * User provide data
 *
 * @export
 * @class PlayerProvider
 */
export class PlayerProvider {

  constructor (
       public userId: string,
       public email: string,
       public fullName: string,
       public avatar: string,
       public providerId: string,
       public provider: string,
       public accessToken: string
    ) {}
}
