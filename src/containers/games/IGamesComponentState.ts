import { DateTime } from 'aws-sdk/clients/glacier'
import { dateType } from 'aws-sdk/clients/iam'

export interface IGamesComponentState {

  /**
   * Tab index
   */
  tabIndex: number,
  items: any,
  selected: any,
  cellHeight: number,
  showModal: boolean,
  // locale: string,
  // rowsPerHour: number,
  // numberOfDays: number,
  startDate: dateType,
  msgTitle: string,
  // eventLogs: any
  // newEvent?: string
}
