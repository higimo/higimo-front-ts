import { ApiResponse } from 'api-types/fetch-api.types';
import { isEnvelope } from 'utils/types/is-envelope'

/**
 * Достаёт `data` из контракт-конверта Laravel `{ data: ... }`.
 * Если конверта нет — возвращает то, что распарсилось (или сырой текст).
 */
export const extractEnvelope = <T, M>(
	parsed: unknown,
	text: string
): ApiResponse<T, M> => {
	if (isEnvelope(parsed)) {
		const envelope = parsed as { data: T; meta?: M; }
		return envelope.meta !== undefined
			? { data: envelope.data, meta: envelope.meta }
			: { data: envelope.data }
	}

	if (parsed !== undefined) {
		return { data: parsed as T }
	}

	return { data: text as unknown as T }
}
