import { Store } from 'from-persist/types'

import { STORAGE_KEY, TTL_MS } from 'from-persist/config'

const readStore = (): Store => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) {
			return {}
		}

		const parsed = JSON.parse(raw)
		if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
			return parsed as Store
		}

		return {}
	} catch {
		try {
			localStorage.removeItem(STORAGE_KEY)
		} catch {
			/* quota, security */
		}

		return {}
	}
}

const writeStore = (store: Store): void => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
	} catch {
		// QuotaExceededError и прочее — не ломаем форму
	}
}

export const cleanupExpiredDrafts = (): void => {
	const store = readStore()
	const now = Date.now()
	let changed = false

	for (const key of Object.keys(store)) {
		const entry = store[key]
		if (!entry || typeof entry.expiresAt !== 'number' || entry.expiresAt <= now) {
			delete store[key]
			changed = true
		}
	}

	if (changed) {
		writeStore(store)
	}
}

export const getPersistValue = <T,>(
	url: string,
	initValue?: T | null,
	defaultValue?: T | null
): T | undefined => {
	const store = readStore()
	const entry = store[url]

	if (entry && typeof entry.expiresAt === 'number' && entry.expiresAt > Date.now()) {
		return entry.data as T
	}
	// протухший/битый — заодно вычищаем
	if (entry) {
		delete store[url]
		writeStore(store)
	}

	if (initValue != null) {
		return initValue
	}
	if (defaultValue != null) {
		return defaultValue
	}

	return undefined
}

export const saveDraft = (url: string, data: unknown): void => {
	const store = readStore()
	store[url] = { data, expiresAt: Date.now() + TTL_MS }
	writeStore(store)
}

export const removeDraft = (url: string): void => {
	const store = readStore()
	if (url in store) {
		delete store[url]
		writeStore(store)
	}
}
