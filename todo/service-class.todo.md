# Proposal: Service-классы для REST API

## Структура файлов

```
src/
	api/
		send-request.ts
		base-service.ts
		use-api-service.ts
	about/
		about-schema.ts
		about-service.ts
	components/
		about-list/
			index.tsx
		about-detail/
			index.tsx
		create-about-form/
			index.tsx
```

---

## `src/api/send-request.ts`

```ts
import httpBuildQuery from 'http-build-query'

declare global {
	interface ErrorConstructor {
		captureStackTrace(targetObject: object, constructorOpt?: Function): void;
	}
}

export class ApiError extends Error {
	public status: number
	public url?: string
	public response?: any

	constructor(message: string, status: number, url?: string, response?: any) {
		super(message)

		this.name = 'ApiError'
		this.status = status
		this.url = url
		this.response = response

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError)
		}
	}

	public toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			url: this.url,
			response: this.response,
			stack: this.stack
		}
	}
}

export interface SendRequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	values?: Record<string, any>
}

export interface PaginationMeta {
	total: number
	page: number
	perPage: number
	lastPage: number
}

export interface ApiResponse<T = any> {
	data: T
	meta?: PaginationMeta
}

const FREEZE_META = {} as const

export const sendRequest = <T = any>(
	url: string,
	{
		method = 'GET',
		values = {}
	}: SendRequestOptions = {}
): Promise<ApiResponse<T>> => new Promise((resolve, reject) => {
	if (typeof window !== 'undefined') {
		var xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && [200, 201].includes(this.status)) {
				let json
				let meta
				try {
					let jsonObj = JSON.parse(this.responseText)

					json = jsonObj.data
					meta = jsonObj.meta || FREEZE_META
				} catch {
					json = this.responseText
				}
				resolve({ data: json, meta })
			}
			if (this.readyState == 4 && (this.status !== 200 && this.status !== 201)) {
				let errorData;
				let errorMessage = this.statusText;

				try {
					const parsedResponse = JSON.parse(this.responseText);
					errorData = parsedResponse;

					if (parsedResponse.message) {
						errorMessage = parsedResponse.message;
					} else if (parsedResponse.errors) {
						const errorMessages = Object.values(parsedResponse.errors).flat();
						errorMessage = errorMessages.join(', ');
					}
				} catch (e) {
					errorData = this.responseText;
				}

				const error = new ApiError(errorMessage, this.status, url, errorData);
				console.error(error, {
					status: this.status,
					url,
					errorData
				})
				reject(error)
			}
		}

		xhttp.open(
			method,
			(method === 'GET' ? url + (Object.keys(values).length ? '?' + httpBuildQuery(values) : '') : url),
			true
		)

		xhttp.setRequestHeader('Accept', 'application/json')
		xhttp.setRequestHeader('Content-Type', method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded')

		xhttp.send(httpBuildQuery(values))
	}
})
```

---

## `src/api/base-service.ts`

```ts
import { ApiError, sendRequest, type SendRequestOptions, type ApiResponse } from './send-request'

export interface RetryOptions {
	retries?: number
	delay?: number
	backoff?: number
	retryOn?: (error: ApiError) => boolean
}

export class BaseService {
	protected http = sendRequest
	protected baseUrl: string

	constructor(baseUrl = '/api') {
		this.baseUrl = baseUrl
	}

	protected request = async <T = any>(
		method: NonNullable<SendRequestOptions['method']>,
		url: string,
		values: Record<string, any> = {}
	): Promise<T> => {
		try {
			const response = await this.http<T>(`${this.baseUrl}${url}`, { method, values })
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	protected requestRaw = async <T = any>(
		method: NonNullable<SendRequestOptions['method']>,
		url: string,
		values: Record<string, any> = {}
	): Promise<ApiResponse<T>> => {
		try {
			return await this.http<T>(`${this.baseUrl}${url}`, { method, values })
		} catch (error) {
			throw this.handleError(error)
		}
	}

	protected requestBoolean = async (
		method: NonNullable<SendRequestOptions['method']>,
		url: string,
		values: Record<string, any> = {}
	): Promise<boolean> => {
		try {
			await this.http(`${this.baseUrl}${url}`, { method, values })
			return true
		} catch (error) {
			throw this.handleError(error)
		}
	}

	protected requestWithRetry = async <T = any>(
		method: NonNullable<SendRequestOptions['method']>,
		url: string,
		values: Record<string, any> = {},
		options: RetryOptions = {}
	): Promise<T> => {
		const {
			retries = 0,
			delay = 300,
			backoff = 2,
			retryOn = (err) => err.status >= 500 || err.status === 0
		} = options

		let attempt = 0
		let wait = delay

		while (true) {
			try {
				const response = await this.http<T>(`${this.baseUrl}${url}`, { method, values })
				return response.data
			} catch (error) {
				const apiError = this.handleError(error)
				if (attempt >= retries || !retryOn(apiError)) {
					throw apiError
				}
				attempt++
				await new Promise(res => setTimeout(res, wait))
				wait *= backoff
			}
		}
	}

	protected handleError = (error: unknown): ApiError => {
		if (error instanceof ApiError) return error
		return new ApiError('Неизвестная ошибка', 0)
	}
}
```

---

## `src/api/use-api-service.ts`

```ts
import { useState, useCallback } from 'preact/hooks'
import { ApiError } from './send-request'

export const useApiService = <T, Args extends any[]>(
	serviceMethod: (...args: Args) => Promise<T>
) => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<ApiError | null>(null)

	const fetch = useCallback(async (...args: Args) => {
		setLoading(true)
		setError(null)
		try {
			const result = await serviceMethod(...args)
			setData(result)
			return result
		} catch (err) {
			setError(err as ApiError)
			throw err
		} finally {
			setLoading(false)
		}
	}, [serviceMethod])

	return [data, fetch, { loading, error }] as const
}
```

---

## `src/about/about-schema.ts`

```ts
import { z } from 'zod'

export const AboutCreateSchema = z.object({
	title: z.string().min(1).max(120),
	description: z.string().max(2000).optional(),
	tags: z.array(z.string()).default([])
})

export type AboutCreateInput = z.infer<typeof AboutCreateSchema>

export const AboutListQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	perPage: z.coerce.number().int().min(1).max(100).default(20),
	sort: z.enum(['created_at', '-created_at', 'title', '-title']).default('-created_at'),
	search: z.string().optional()
})

export type AboutListQuery = z.infer<typeof AboutListQuerySchema>
```

---

## `src/about/about-service.ts`

```ts
import { BaseService } from '../api/base-service'
import { ApiError, type ApiResponse } from '../api/send-request'
import {
	AboutCreateSchema,
	AboutListQuerySchema,
	type AboutCreateInput,
	type AboutListQuery
} from './about-schema'

export interface AboutData {
	id: number
	title: string
	description?: string
	tags: string[]
	created_at: string
}

class AboutServiceClass extends BaseService {
	get = async (id: number): Promise<AboutData> => {
		return this.requestWithRetry<AboutData>('GET', `/about/${id}`, {}, {
			retries: 3,
			delay: 300,
			backoff: 2
		})
	}

	create = async (input: AboutCreateInput): Promise<AboutData> => {
		const parsed = AboutCreateSchema.safeParse(input)
		if (!parsed.success) {
			throw new ApiError(parsed.error.issues.map(i => i.message).join(', '), 422)
		}
		return this.request<AboutData>('POST', '/about', parsed.data)
	}

	list = async (query: Partial<AboutListQuery> = {}): Promise<ApiResponse<AboutData[]>> => {
		const parsed = AboutListQuerySchema.safeParse(query)
		if (!parsed.success) {
			throw new ApiError(parsed.error.issues.map(i => i.message).join(', '), 422)
		}
		return this.requestRaw<AboutData[]>('GET', '/about', parsed.data)
	}

	remove = async (id: number): Promise<boolean> => {
		return this.requestBoolean('DELETE', `/about/${id}`)
	}
}

export const AboutService = new AboutServiceClass()
```

---

## `src/components/about-detail/index.tsx`

```tsx
import { useEffect } from 'preact/hooks'
import { AboutService } from '../../about/about-service'
import { useApiService } from '../../api/use-api-service'

interface Props {
	id: number
}

export const AboutDetail = ({ id }: Props) => {
	const [data, fetch, { loading, error }] = useApiService(AboutService.get)

	useEffect(() => {
		fetch(id)
	}, [fetch, id])

	if (loading) return <p>Загрузка...</p>
	if (error) return <p>{error.message}</p>
	if (!data) return null

	return <h1>{data.title}</h1>
}
```

---

## `src/components/about-list/index.tsx`

```tsx
import { useState, useEffect } from 'preact/hooks'
import { AboutService, type AboutData } from '../../about/about-service'
import type { PaginationMeta } from '../../api/send-request'

export const AboutList = () => {
	const [items, setItems] = useState<AboutData[]>([])
	const [meta, setMeta] = useState<PaginationMeta | null>(null)
	const [page, setPage] = useState(1)
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('-created_at')

	useEffect(() => {
		let cancelled = false
		AboutService.list({ page, perPage: 20, search, sort }).then(res => {
			if (cancelled) return
			setItems(res.data)
			setMeta(res.meta ?? null)
		})
		return () => { cancelled = true }
	}, [page, search, sort])

	return (
		<div>
			<input
				value={search}
				onInput={e => {
					setSearch((e.target as HTMLInputElement).value)
					setPage(1)
				}}
			/>
			<select value={sort} onChange={e => setSort((e.target as HTMLSelectElement).value)}>
				<option value="-created_at">Сначала новые</option>
				<option value="created_at">Сначала старые</option>
				<option value="title">По названию</option>
			</select>

			<ul>{items.map(i => <li key={i.id}>{i.title}</li>)}</ul>

			<button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Назад</button>
			<span>{page} / {meta?.lastPage ?? 1}</span>
			<button
				disabled={page >= (meta?.lastPage ?? 1)}
				onClick={() => setPage(p => p + 1)}
			>Вперёд</button>
		</div>
	)
}
```

---

## `src/components/create-about-form/index.tsx`

```tsx
import { useState } from 'preact/hooks'
import { AboutService } from '../../about/about-service'

export const CreateAboutForm = () => {
	const [error, setError] = useState<string | null>(null)

	const onSubmit = async (e: Event) => {
		e.preventDefault()
		setError(null)
		const fd = new FormData(e.target as HTMLFormElement)
		try {
			await AboutService.create({
				title: String(fd.get('title') ?? ''),
				description: String(fd.get('description') ?? ''),
				tags: String(fd.get('tags') ?? '').split(',').map(t => t.trim()).filter(Boolean)
			})
		} catch (err) {
			setError((err as Error).message)
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<input name="title" />
			<textarea name="description" />
			<input name="tags" />
			<button type="submit">Создать</button>
			{error && <p>{error}</p>}
		</form>
	)
}
```

---

## Итог

| Возможность | Где реализована |
|---|---|
| Базовый шаблон запроса | `BaseService.request` / `requestRaw` / `requestBoolean` |
| Повторные попытки с backoff | `BaseService.requestWithRetry` |
| Валидация входных данных | `about-schema.ts` + `safeParse` в методах сервиса |
| Пагинация, фильтрация, сортировка | `AboutListQuerySchema` + `list()` + `meta` |
| Типизация ответов | дженерики `request<T>` / `useApiService<T, Args>` |
| 201/200 → `bool` | `requestBoolean` |
| Создание ресурса → объект | `request<T>` |
| Обработка ошибок | `ApiError` + `handleError` |
| Состояние в компоненте | `useApiService` |
