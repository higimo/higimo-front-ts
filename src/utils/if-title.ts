import { DEFAULT_ID } from 'config/DEFAULT-ID'

export const ifTitle = (value: string, success: string, fallback: string): string =>
	value == DEFAULT_ID ? success : fallback
