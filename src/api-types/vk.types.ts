import { UnixTime } from "utils.type";

export type VKAlbumSizesType = {
	type: 'x' | 's';
	src: string;
};

export type VKAlbumType = {
	id: string;
	privacy_view: {
		type: 'all' | 'private';
	};
	title: string;
	size: string;
	description: string;
	sizes: VKAlbumSizesType[];
};

export type VkPhotoOrigType = {
	height: number;
	width: number;
	type: 'base';
	url: string;
};

export type VkPhotoSizesType = {
	height: number;
	width: number;
	type: 'm' | 'o' | 'p' | 'q' | 'r' | 's' | 'w' | 'x' | 'y' | 'z';
	url: string;
};

export type VkPhotoType = {
	album_id: number;
	date: UnixTime; // timestamp
	id: number;
	owner_id: number; // user_id
	sizes: VkPhotoSizesType[];
	text: string;
	web_view_token: string;
	has_tags: boolean;
	orig_photo: VkPhotoOrigType;
};

export type VkAlbumType = {
	id: number; // album id
	owner_id: number; // userId
	size: number; // count photos
	title: string; // Название альбома
	feed_disabled: number; // bool? вижу 0
	feed_has_pinned: number; // bool? вижу 0
	created: number; // timestamp
	description: string;
	can_delete: boolean;
	can_include_to_feed: boolean;
	is_locked: boolean;
	privacy_comment: {
		category: 'all';
		lists: {
			allowed: [];
			excluded: [];
		};
		owners: {
			allowed: [];
			excluded: [];
		};
	};
	privacy_view: {
		category: string; // 'only_me',
		lists: {
			allowed: [];
			excluded: [];
		};
		owners: {
			allowed: [];
			excluded: [];
		};
	};
	sizes: VkPhotoSizesType[];
	thumb_id: number;
	thumb_is_last: number; // bool? вижу 1
	updated: number; // timestamp
};
