export interface IPlayerComponentProps {

  /**
   * Router match
   *
   * @type {*}
   * @memberof IPlayerComponentProps
   */
  match?: any

  /**
   * Circles loaded {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPeopleComponentProps
   */
  circlesLoaded?: boolean

  /**
   * Rediret to another route
   *
   * @memberof IPlayerComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Set title of top bar
   *
   * @memberof IPlayerComponentProps
   */
  setHeaderTitle?: (title: string) => any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
