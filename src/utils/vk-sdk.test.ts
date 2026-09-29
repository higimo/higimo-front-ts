import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'

// vi.mock поднимается в начало файла — конфиг будет подменён до импорта модуля.
vi.mock('config/VK-API-ID', () => ({
	VK_API_ID: 1234567,
	VK_API_VERSION: '5.199',
	VK_SCOPE: 'friends,photos',
}))

const initMock = vi.fn()
const loginMock = vi.fn()

vi.stubGlobal('VK', {
	init: initMock,
	Auth: { login: loginMock },
})

import { VK_API_ID, VK_API_VERSION, VK_SCOPE } from 'config/VK-API-ID'
import { startVkSdk } from 'utils/vk-sdk'
import { VkAuthResultType } from 'api-types/vk.types'

describe('startVkSdk', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterAll(() => {
		vi.unstubAllGlobals()
	})

	it('инициализирует VK SDK с apiId и apiVersion из конфига', () => {
		startVkSdk(vi.fn())

		expect(initMock).toHaveBeenCalledTimes(1)
		expect(initMock).toHaveBeenCalledWith({
			apiId: VK_API_ID,
			apiVersion: VK_API_VERSION,
		})
	})

	it('вызывает VK.Auth.login с переданным колбэком и scope', () => {
		const onAuth = vi.fn()

		startVkSdk(onAuth)

		expect(loginMock).toHaveBeenCalledTimes(1)
		expect(loginMock).toHaveBeenCalledWith(onAuth, VK_SCOPE)
	})

	it('соблюдает порядок вызовов: сначала init, затем Auth.login', () => {
		const order: string[] = []
		initMock.mockImplementationOnce(() => void order.push('init'))
		loginMock.mockImplementationOnce(() => void order.push('login'))

		startVkSdk(vi.fn())

		expect(order).toEqual(['init', 'login'])
	})

	it('прокидывает результат авторизации в переданный колбэк', () => {
		const session = {
			user: { id: 42 },
		} as unknown as VkAuthResultType['session']
		const onAuth = vi.fn<(r: VkAuthResultType) => void>()

		loginMock.mockImplementationOnce((cb: typeof onAuth) => {
			cb({ status: 'connected', session })
		})

		startVkSdk(onAuth)

		expect(onAuth).toHaveBeenCalledTimes(1)
		expect(onAuth).toHaveBeenCalledWith({ status: 'connected', session })
	})

	it('не вызывает колбэк синхронно, если VK.Auth.login его не вызывает', () => {
		const onAuth = vi.fn()

		startVkSdk(onAuth)

		expect(onAuth).not.toHaveBeenCalled()
	})
})
