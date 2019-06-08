import { BaseDomain } from 'core/domain/common'

export class Player extends BaseDomain {
  constructor (
    public avatar: string,
    public fullName: string,
    public banner: string,
    public tagLine: string,
    public creationDate: number,
    public email?: string | null,
    public birthday?: number,
    public webUrl?: string,
    public companyName?: string,
    public twitterId?: string,
    public playerNumber?: number,
    public team?: string
  ) {
    super()

  }

}
