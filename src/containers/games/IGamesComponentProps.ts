export interface IGamesComponentProps {

  /**
   * Router match
   *
   * @type {*}
   * @memberof IGamesComponentProps
   */
  match?: any

  /**
   * Circles loaded {true} or not {false}
   *
   * @type {boolean}
   * @memberof IGamesComponentProps
   */
  circlesLoaded?: boolean

  /**
   * Rediret to another route
   *
   * @memberof IGamesComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Set title of top bar
   *
   * @memberof IGamesComponentProps
   */
  setHeaderTitle?: (title: string) => any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
