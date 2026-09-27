import { ISOString } from 'utils.type';


export const toISOString = (date: Date): ISOString => date.toISOString() as ISOString;
