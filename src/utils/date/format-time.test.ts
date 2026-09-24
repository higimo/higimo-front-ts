import { UnixTime } from 'utils.type'

import { describe, it, expect } from 'vitest'
import { formatTime } from 'utils/date/format-time'

describe('[utils] formatTime', () => {
	it('Показывает только время из DateTime', () => {
		expect(formatTime(1789413153073 as UnixTime)).toBe('22:12')
		expect(formatTime(1789413153074 as UnixTime)).toBe('22:12')
		expect(formatTime(1789413111074 as UnixTime)).toBe('22:11')
	})
})
