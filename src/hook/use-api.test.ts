import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/preact'
import sendRequest from 'utils/api/send-request'
import useApi, { API_STATUS, apiReducer } from 'hook/use-api'
import { API_ROUTE } from 'dic/API_ROUTE'

// TODO: move to hook/fetch
vi.mock('utils/api/send-request', () => ({
	default: vi.fn()
}))

const api = (obj) => ({ data: obj })

describe('useApi', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	beforeAll(() => {
		// @ts-ignore
		global.fetch = vi.fn().mockImplementation(() => {
			throw new Error('Real fetch called in test! Make sure to mock all API calls.')
		})

		// @ts-ignore
		global.XMLHttpRequest = vi.fn().mockImplementation(() => {
			throw new Error('Real XMLHttpRequest called in test! Make sure to mock all API calls.')
		}) as any
	})

	afterAll(() => {
		// @ts-ignore
		delete (global as any).fetch
		// @ts-ignore
		delete (global as any).XMLHttpRequest
	})

	describe('сетевые запросы', () => {
		it('не отправляет реальный HTTP-запрос', async () => {
			// @ts-ignore
			const fetchSpy = vi.spyOn(global, 'fetch')
			// @ts-ignore
			const xhrSpy = vi.spyOn(global, 'XMLHttpRequest')

			const mockSendRequest = vi.mocked(sendRequest)
			mockSendRequest.mockResolvedValue({ data: 'test' })

			renderHook(() => useApi(API_ROUTE.comoji))

			await waitFor(() => {
				expect(mockSendRequest).toHaveBeenCalled()
			})

			expect(fetchSpy).not.toHaveBeenCalled()
			expect(xhrSpy).not.toHaveBeenCalled()

			expect(mockSendRequest).toHaveBeenCalledWith(API_ROUTE.comoji, { values: {} })

			fetchSpy.mockRestore()
			xhrSpy.mockRestore()
		})

		it('точно используется мок sendRequest', () => {
			expect(vi.isMockFunction(sendRequest)).toBe(true)
		})
	})

	describe('инициализация', () => {
		it('при монтировании запрашивает данные', async () => {
			const mockData = { id: 1, name: 'Test' }
			vi.mocked(sendRequest).mockResolvedValue(api(mockData))

			const { result } = renderHook(() => useApi(API_ROUTE.comoji))

			expect(result.current[0].status).toBe(API_STATUS.LOADING)

			await waitFor(() => {
				expect(result.current[0].status).toBe(API_STATUS.LOADED)
			})

			expect(result.current[0].data).toEqual(mockData)
			expect(sendRequest).toHaveBeenCalledTimes(1)
		})

		it('начальный статус — загрузка', () => {
			const { result } = renderHook(() => useApi(API_ROUTE.comoji))

			expect(result.current[0].status).toBe(API_STATUS.LOADING)
		})

		it('должен передавать значения в запрос', async () => {
			const mockData = { id: 1 }
			const values = { filter: 'low' }
			vi.mocked(sendRequest).mockResolvedValue(api(mockData))

			renderHook(() => useApi(API_ROUTE.comoji, values))

			await waitFor(() => {
				expect(sendRequest).toHaveBeenCalledTimes(1)
				expect(sendRequest).toHaveBeenCalledWith(
					expect.any(String),
					{ values: { filter: 'low' } }
				)
			})
		})
	})

	describe('загрузка данных', () => {
		it('отрабатывает ответ с массивом', async () => {
			const mockData = [{ id: 1 }, { id: 2 }]
			vi.mocked(sendRequest).mockResolvedValue(api(mockData))

			const { result } = renderHook(() => useApi(API_ROUTE.comoji))

			await waitFor(() => {
				expect(result.current[0].status).toBe(API_STATUS.LOADED)
			})

			expect(result.current[0].data).toEqual(mockData)
			expect(result.current[0].status).toEqual(API_STATUS.LOADED)
			expect(result.current[0].error).toEqual(undefined)
		})

		it('отрабатывает ответ с объектом', async () => {
			const mockData = { user: { id: 1, name: 'John' } }
			vi.mocked(sendRequest).mockResolvedValue(api(mockData))

			const { result } = renderHook(() => useApi(API_ROUTE.comoji))

			await waitFor(() => {
				expect(result.current[0].status).toBe(API_STATUS.LOADED)
			})

			expect(result.current[0].data).toEqual(mockData)
			expect(result.current[0].status).toEqual(API_STATUS.LOADED)
			expect(result.current[0].error).toEqual(undefined)
		})
	})

	describe('обработка ошибок', () => {
		it('отрабатывает ошибки запроса', async () => {
			const mockError = new Error('Network error')
			vi.mocked(sendRequest).mockRejectedValue(mockError)

			const { result } = renderHook(() => useApi(API_ROUTE.comoji))

			await waitFor(() => {
				expect(result.current[0].status).toBe(API_STATUS.LOADED)
			})

			expect(result.current[0].data).toEqual([])
			expect(result.current[0].error).toEqual(mockError)
			expect(result.current[0].status).toEqual(API_STATUS.LOADED)
		})

		it('сохраняет ошибку в состоянии', async () => {
			const mockError = new Error('404 Not Found')
			vi.mocked(sendRequest).mockRejectedValue(mockError)

			const { result } = renderHook(() => useApi(API_ROUTE.comoji))

			await waitFor(() => {
				expect(result.current[0].error).toBeDefined()
			})

			expect(result.current[0].error?.message).toBe('404 Not Found')
		})
	})

	describe('пропуск запросов', () => {
		it('должен пропускать запрос если URL заканчивается на "-1"', async () => {
			const { result } = renderHook(() => useApi(API_ROUTE.accordSingle({ idcode: '-1' })))

			await waitFor(() => {
				expect(result.current[0].status).toBe(API_STATUS.LOADED)
			})

			expect(sendRequest).not.toHaveBeenCalled()
			expect(result.current[0].data).toEqual({})
			expect(result.current[0].status).toEqual(API_STATUS.LOADED)
			expect(result.current[0].error).toEqual(undefined)
		})

		it('должен возвращать пустой объект при пропуске запроса', async () => {
			const { result } = renderHook(() => useApi(API_ROUTE.accordSingle({ idcode: '-1' })))

			await waitFor(() => {
				expect(result.current[0].status).toBe(API_STATUS.LOADED)
			})

			expect(result.current[0].data).toEqual({})
			expect(result.current[0].status).toEqual(API_STATUS.LOADED)
			expect(result.current[0].error).toEqual(undefined)
		})
	})

	describe('повторная загрузка', () => {
		it('предоставляет функцию для повторной загрузки', async () => {
			const mockData1 = { id: 1, name: 'First' }
			const mockData2 = { id: 2, name: 'Second' }
			vi.mocked(sendRequest)
				.mockResolvedValueOnce(api(mockData1))
				.mockResolvedValueOnce(api(mockData2))

			const { result } = renderHook(() => useApi(API_ROUTE.comoji))

			await waitFor(() => {
				expect(result.current[0].data).toEqual(mockData1)
			})

			const [, refetch] = result.current

			await act(async () => {
				await refetch()
			})

			await waitFor(() => {
				expect(result.current[0].data).toEqual(mockData2)
			})

			expect(sendRequest).toHaveBeenCalledTimes(2)
		})

		it('устанавливает статус LOADING при повторной загрузке', async () => {
			vi.mocked(sendRequest).mockImplementation(
				() => new Promise(resolve => setTimeout(() => resolve({ data: 'test' }), 100))
			)

			const { result } = renderHook(() => useApi(API_ROUTE.comoji))

			await waitFor(() => {
				expect(result.current[0].status).toBe(API_STATUS.LOADING)
			})
		})
	})

	describe('зависимости от параметров', () => {
		it('повторно загружает при изменении URL', async () => {
			const mockData1 = { id: 1 }
			const mockData2 = { id: 2 }
			vi.mocked(sendRequest)
				.mockResolvedValueOnce(api(mockData1))
				.mockResolvedValueOnce(api(mockData2))

			const { result, rerender } = renderHook(
				({ url }) => useApi(url),
				{ initialProps: { url: API_ROUTE.comoji } }
			)

			await waitFor(() => {
				expect(result.current[0].data).toEqual(mockData1)
			})

			// @ts-ignore
			rerender({ url: API_ROUTE.accord })

			await waitFor(() => {
				expect(result.current[0].data).toEqual(mockData2)
			})

			expect(sendRequest).toHaveBeenCalledTimes(2)
			expect(sendRequest).toHaveBeenNthCalledWith(1, API_ROUTE.comoji, { values: {} })
			expect(sendRequest).toHaveBeenNthCalledWith(2, API_ROUTE.accord, { values: {} })
		})

		it('повторно загружает при изменении значений', async () => {
			const mockData1 = { id: 1 }
			const mockData2 = { id: 2 }
			vi.mocked(sendRequest)
				.mockResolvedValueOnce(api(mockData1))
				.mockResolvedValueOnce(api(mockData2))

			const { result, rerender } = renderHook(
				({ values }) => useApi(API_ROUTE.comoji, values),
				{ initialProps: { values: { id: 1 } } }
			)

			await waitFor(() => {
				expect(result.current[0].data).toEqual(mockData1)
			})

			rerender({ values: { id: 2 } })

			await waitFor(() => {
				expect(result.current[0].data).toEqual(mockData2)
			})
		})

		it('не загружает повторно при неизменных зависимостях', async () => {
			const mockData = { id: 1 }
			vi.mocked(sendRequest).mockResolvedValue(api(mockData))

			const { result, rerender } = renderHook(
				({ url, values }) => useApi(url, values),
				{ initialProps: { url: API_ROUTE.comoji, values: { id: 1 } } }
			)

			await waitFor(() => {
				expect(result.current[0].data).toEqual(mockData)
			})

			rerender({ url: API_ROUTE.comoji, values: { id: 1 } })

			expect(sendRequest).toHaveBeenCalledTimes(1)
		})
	})

	describe('статусы загрузки', () => {
		it('меняет статус LOADING -> LOADED', async () => {
			vi.mocked(sendRequest).mockImplementation(
				() => new Promise(resolve => setTimeout(() => resolve({ data: 'test' }), 50))
			)

			const { result } = renderHook(() => useApi(API_ROUTE.comoji))

			expect(result.current[0].status).toBe(API_STATUS.LOADING)

			await waitFor(() => {
				expect(result.current[0].status).toBe(API_STATUS.LOADED)
			})
		})

		it('устанавливает LOADING перед запросом', async () => {
			let resolvePromise: (value: any) => void
			const promise = new Promise(resolve => {
				resolvePromise = resolve
			})
			vi.mocked(sendRequest).mockReturnValue(promise as any)

			const { result } = renderHook(() => useApi(API_ROUTE.comoji))

			await waitFor(() => {
				expect(result.current[0].status).toBe(API_STATUS.LOADING)
			})

			resolvePromise!({ data: 'test' })
		})
	})

	describe('типизация', () => {
		it('корректно типизирует данные', async () => {
			interface User {
				id: number
				name: string
			}

			const mockUser: User = { id: 1, name: 'John' }
			vi.mocked(sendRequest).mockResolvedValue(api(mockUser))

			const { result } = renderHook(() => useApi<User>(API_ROUTE.comoji))

			await waitFor(() => {
				expect(result.current[0].data).toEqual(mockUser)
			})
		})
	})

	describe('крайние случаи', () => {
		it('обрабатывает undefined values к запросу', async () => {
			const mockData = { id: 1 }
			vi.mocked(sendRequest).mockResolvedValue(api(mockData))

			const { result } = renderHook(() => useApi(API_ROUTE.comoji, undefined as any))

			await waitFor(() => {
				expect(result.current[0].data).toEqual(mockData)
			})
		})

		it('поддерживает несколько хуков одновременно', async () => {
			const mockData1 = { id: 1 }
			const mockData2 = { id: 2 }
			vi.mocked(sendRequest)
				.mockResolvedValueOnce(api(mockData1))
				.mockResolvedValueOnce(api(mockData2))

			const { result: result1 } = renderHook(() => useApi(API_ROUTE.accord))
			const { result: result2 } = renderHook(() => useApi(API_ROUTE.comoji))

			await waitFor(() => {
				expect(result1.current[0].data).toEqual(mockData1)
				expect(result2.current[0].data).toEqual(mockData2)
			})
		})
	})
})

describe('apiReducer (редьюсер useApi)', () => {
	it('обрабатывает INIT действие', () => {
		const state = { status: API_STATUS.LOADING, data: [] }
		const action = { type: API_STATUS.INIT }

		const newState = apiReducer(state, action)

		expect(newState.status).toBe(API_STATUS.INIT)
		expect(newState.data).toStrictEqual([])
		expect(newState.error).not.toBeDefined()
	})

	it('обрабатывает LOADING действие', () => {
		const state = { status: API_STATUS.INIT, data: [] }
		const action = { type: API_STATUS.LOADING }

		const newState = apiReducer(state, action)

		expect(newState.status).toBe(API_STATUS.LOADING)
		expect(newState.data).toStrictEqual([])
		expect(newState.error).not.toBeDefined()
	})

	it('обрабатывает LOADED действие', () => {
		type PayloadType = { id: number, name: string }
		const state = { status: API_STATUS.LOADING, data: {} as PayloadType }
		const payload: PayloadType = { id: 1, name: 'Test' }
		const action = { type: API_STATUS.LOADED, payload }

		const newState = apiReducer<PayloadType>(state, action)

		expect(newState.status).toBe(API_STATUS.LOADED)
		expect(newState.data).toEqual(payload)
		expect(newState.error).not.toBeDefined()
	})

	it('обрабатывает ERROR действие', () => {
		const state = { status: API_STATUS.LOADING, data: [] }
		const error = new Error('Test error')
		const action = { type: API_STATUS.ERROR, payload: error }

		const newState = apiReducer(state, action)

		expect(newState.status).toBe(API_STATUS.LOADED)
		expect(newState.data).toStrictEqual([])
		expect(newState.error).toEqual(error)
	})

	it('бросает ошибку при неизвестном типе действия', () => {
		const state = { status: API_STATUS.INIT, data: [] }
		const action = { type: 'UNKNOWN' as any }

		expect(() => apiReducer(state, action)).toThrow('Unknown action type')
	})
})
