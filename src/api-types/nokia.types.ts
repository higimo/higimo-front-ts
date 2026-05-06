export type NokiaTagGroupType = string;

export type NokiaTagType = {
	id: number;
	name: string;
	group: NokiaTagGroupType;
};
export type NokiaPersonApiType = {
	id: number;
	name: string;
	alias: string;
	nick: string;
	description: string;
};
export type NokiaPersonType = NokiaPersonApiType & {
	tags: NokiaTagType[];
};
export type NokiaMeetingApiType = {
	id: number;
	/** 'meeting' 'tg' 'offline' */
	type: string;
	/** unixtime / 1000 */
	date: number; // TODO: [BACKEND] заменить на бэке на date

	/** "2024-01-15T10:00:00Z" */
	date_start: string;
	/** "2024-01-15T10:00:00Z" */
	date_end: string;
	description: string;
};
export type NokiaRichMeetingType = NokiaMeetingApiType & {
	person: NokiaPersonType[];
};
export type NokiaNoteType = {
	id: number;
	text: string;
	person_id: number;
};
// TODO: [MEDIUM] надо исправить см. NokiaMeetingApiType
export type NokiaMeetingWithPersonType = NokiaMeetingApiType & {
	person: NokiaPersonApiType[];
};
// TODO: [MEDIUM] надо исправить
export type NokiaPersonFullType = {
	id: number;
	name: string;
	alias: string;
	nick: string;
	description: string;
	tags: NokiaTagType[];
	notes: NokiaNoteType[];
	meetings: NokiaMeetingWithPersonType[];
};
export type NokiaMeetingStatisticType = {
	id: number;
	date: number;
	type: string;
};
