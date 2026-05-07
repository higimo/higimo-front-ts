import { Brand, ISOString, UnixTime } from "utils.type";

type NokiaTagId     = Brand<number, 'TagId'>
type NokiaPersonId  = Brand<number, 'PersonId'>
type NokiaMeetingId = Brand<number, 'MeetingId'>
type NokiaNoteId    = Brand<number, 'NoteId'>

export type NokiaTagGroupType = string;

export type NokiaTagType = {
	id: NokiaTagId
	name: string
	group: NokiaTagGroupType
};
export type NokiaPersonSimpleType = {
	id: NokiaPersonId
	name: string
	alias: string
	nick: string
	description: string
};
export type NokiaMeetingSimpleType = {
	id: NokiaMeetingId;
	/** 'meeting' 'tg' 'offline' */
	type: string;
	/** unixtime / 1000 */
	date: UnixTime; // TODO: [BACKEND] заменить на бэке на date
	date_start: ISOString;
	date_end: ISOString;
	description: string;
};
export type NokiaRichMeetingType = NokiaMeetingSimpleType & {
	person: NokiaPersonType[];
};
export type NokiaNoteType = {
	id: NokiaNoteId;
	text: string;
	person_id: NokiaPersonId;
};
export type NokiaMeetingFullType = NokiaMeetingSimpleType & {
	person: NokiaPersonSimpleType[];
};
export type NokiaPersonType = NokiaPersonSimpleType & {
	tags: NokiaTagType[];
};
export type NokiaPersonFullType = NokiaPersonSimpleType & {
	tags: NokiaTagType[];
	notes: NokiaNoteType[];
	meetings: NokiaMeetingFullType[];
};
export type NokiaMeetingStatisticType = {
	id: number;
	date: number;
	type: string;
};
