import { useEffect } from 'preact/hooks'

import { cleanupExpiredDrafts } from 'from-persist/store'

let cleaned = false

/**
 * Компонент для роута, чтобы автоматически очищать localStorage
 * от протухших форм при первом входе на сайт
 */
export const PersistCleanupFrom = () => {
	useEffect(() => {
		if (cleaned) return
		cleaned = true
		cleanupExpiredDrafts()
	}, [])

	return null
}
