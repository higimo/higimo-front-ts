import { UnixTime } from 'utils.type'

export const getDateFromTimestamp = (timestamp: UnixTime) => new Date(timestamp).getDate()
