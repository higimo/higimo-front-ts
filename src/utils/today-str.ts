import { DateOnlyString } from 'utils.type'

export const todayStr = (): DateOnlyString => new Date().toISOString().substring(0, 10) as DateOnlyString
