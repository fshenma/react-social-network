
export interface IActivePlayerComponentState {

  /**
   * Create new circle button is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPlayerBoxComponentState
   */
  disabledCreateCircle: boolean

  /**
   * The button of add user in a circle is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPlayerBoxComponentState
   */
  disabledAddToCircle: boolean

  /**
   * Circle name
   *
   * @type {string}
   * @memberof IPlayerBoxComponentState
   */
  circleName: string

  /**
   * active player list
   *
   * @type {array}
   * @memberof IPlayerBoxComponentState
   */
   activePlayers?: Array <any> 

  /**
   * Keep element
   *
   * @type {*}
   * @memberof IPlayerBoxComponentState
   */
  anchorEl?: any

  /**
   * Whether current user changed the selected circles for referer user
   *
   */
  disabledDoneCircles: boolean

}
