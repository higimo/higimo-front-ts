import { UnixTime } from 'utils.type'

import { describe, it, expect } from 'vitest'
import { getDateFromTimestamp } from 'utils/date/get-date-from-timestamp'

describe('[utils] getDateFromTimestamp', () => {
	it('Возвращает дату числом', () => {
		const unixtime = (new Date(2026, 10, 10)).getTime() as UnixTime
		expect(getDateFromTimestamp(unixtime)).toBe(10)
	})
})
