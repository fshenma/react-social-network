export interface IGameComponentProps {

  /**
   * Router match
   *
   * @type {*}
   * @memberof IGameComponentProps
   */
  match?: any

  /**
   * Circles loaded {true} or not {false}
   *
   * @type {boolean}
   * @memberof IGameComponentProps
   */
  circlesLoaded?: boolean

  /**
   * Rediret to another route
   *
   * @memberof IGameComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Set title of top bar
   *
   * @memberof IGameComponentProps
   */
  setHeaderTitle?: (title: string) => any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
