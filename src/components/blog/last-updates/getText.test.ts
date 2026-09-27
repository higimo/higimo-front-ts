import { describe, it, expect } from 'vitest'
import { getText } from './getText'

describe('getText last-update', () => {
	it('Должен отдавать одинарную строку как есть', () => {
		expect(getText('higimo')).toBe('higimo')
	})

	it('Должен отдавать первую строку если разделитель только \\n', () => {
		expect(getText('higimo\ntwo')).toBe('higimo')
	})

	it('Должен отдавать первый абзац, если пришёл html с <p>', () => {
		expect(getText('<p>higimo</p>\n<p>two</p>')).toBe('higimo')
	})
})
