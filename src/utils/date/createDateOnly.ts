import { DateOnlyString } from 'utils.type';


export const createDateOnly = (date: Date): DateOnlyString => date.toISOString().substring(0, 10) as DateOnlyString;
