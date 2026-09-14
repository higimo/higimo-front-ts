import { UnixTime } from 'utils.type'

// TODO: добавить JSDoc
export const formatTime = (timestamp: UnixTime) => new Date(timestamp).toTimeString().substr(0, 5)
