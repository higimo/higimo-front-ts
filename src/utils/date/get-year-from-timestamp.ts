import { ISOString, UnixTime } from 'utils.type'

export const getYearFromTimestamp = (timestamp: UnixTime | ISOString | Date) => new Date(timestamp).getFullYear()
