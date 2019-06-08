
export interface IGameScoreBoxComponentState {

  /**
   * mode of game info page, true is for edit
   *
   * @type boolean
   * @memberof IGameInfoBoxComponentState
   */
   homeScore: number

   /**
    * game detail state data
    * @type any
    */
   awayScore: number

   /**
    * game event id
    * @type any  
    */
   gameEventId?: any
}
