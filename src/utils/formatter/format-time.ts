import { UnixTime } from 'utils.type'

// TODO: [LIGHT] добавить JSDoc
export const formatTime = (timestamp: UnixTime) => new Date(timestamp).toTimeString().substring(0, 5)
