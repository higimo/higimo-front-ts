import { UnixTime } from 'utils.type'

export const getYearFromTimestamp = (timestamp: UnixTime) => new Date(timestamp).getFullYear()
