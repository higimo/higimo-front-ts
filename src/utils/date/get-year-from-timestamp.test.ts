import { UnixTime } from 'utils.type'

import { describe, it, expect } from 'vitest'
import { getYearFromTimestamp } from 'utils/date/get-year-from-timestamp'

describe('[utils] getYearFromTimestamp', () => {
	it('отдаёт числом номер года от Рождества Христова', () => {
		expect(getYearFromTimestamp(1789413464934 as UnixTime)).toBe(2026)
	})
})
