import { isObject } from 'utils/types/is-object'

/**
 * Проверяет, что это контракт-конверт из Laravel
 */
export const isEnvelope = (v: unknown): v is { data: unknown; meta?: unknown; } =>
	isObject(v) && 'data' in v
