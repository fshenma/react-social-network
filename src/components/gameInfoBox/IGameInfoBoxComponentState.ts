
export interface IGameInfoBoxComponentState {

  /**
   * mode of game info page, true is for edit
   *
   * @type boolean
   * @memberof IGameInfoBoxComponentState
   */
   isEditMode: boolean 

   /**
    * game detail state data
    * @type any
    */
   gameDetail?: any

   /**
    * game event id
    * @type any  
    */
   gameEventId?: any
}
