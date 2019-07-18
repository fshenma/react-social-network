
export default interface ITeamRotateComponentProps {
    teamName: string
    teamColor: string
    loadedPlayer: any
    runRotate: any

    deleteActivePlayer?: (userId: string) => any
}