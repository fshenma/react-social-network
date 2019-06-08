export interface IUserAvatarComponentProps {

    /**
     * Use for getting url address from server
     */
  fileName: string
    /**
     * User full name
     */
  fullName: string
    /**
     * User Player number
     */
  playerNum?: number
    /**
     * Avatar style
     */
  style?: {}
    /**
     * Avatar size
     */
  size?: number
    /**
     * Trigger on touch tap
     */
  onClick?: (event: any) => any
}
