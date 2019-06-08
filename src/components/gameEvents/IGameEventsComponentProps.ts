
export interface IGameEventsComponentProps {
 
    /**
     * Styles
     */
    classes?: any,

    logs: any,
    title?: string,
    clearBtnText: string,
    addBtnText: string,
    onSelect: (event: any, value: any) => any
    value: any    
    setHiddenAddEventButton?: (isHidden: boolean) => any
}
