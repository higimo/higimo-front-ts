/**
 * Состояние загрузки любого SDK
 */
export type SdkStateType<T> =
	| { status: 'INIT'; data: null; error: null }
	| { status: 'LOADING'; data: null; error: null }
	| { status: 'LOADED'; data: T; error: null }
	| { status: 'ERROR'; data: null; error: Error }
