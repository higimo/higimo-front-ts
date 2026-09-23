import { ChangeEvent } from 'utils.type'
import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useCallback } from 'preact/hooks'
import { useApi } from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading/Loading'

import { debounce } from '@github/mini-throttle'
import { toast } from 'toast'
import { pasteApi } from 'repositories/pasteApi'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

const getUriTimestamp = () => new Date().toISOString().replace(/\D/g, '-').substring(0, 23)

export const HiringResponseTodoController: FunctionComponent = () => {
	const [ data ] = useApi<PasteApiType[]>(API_ROUTE.paste, {
		filter: {
			key: 'hiring-todo'
		}
	})

	const handleChange = useCallback(() => {
		const debouncedEdit = debounce(
			async (content: string) => {
				if (data.status !== 'LOADED' && !data.data.length) {
					toast.warning('Что-то там не прогрузилось, попробуй обновить что-ли?')
				}
				await pasteApi.create({ key: `hiring-todo/${getUriTimestamp()}`, content })
				const result = await pasteApi.edit({
					id: data.data[0]?.id,
					key: 'hiring-todo',
					content,
				})
				if (!!result) {
					toast.success('Сохранилось')
				}
			},
			1500 // 1,5 секунды
		)

		return (event: ChangeEvent) => {
			debouncedEdit(event.currentTarget.value)
		}
	}, [data.status])

	if (data.status !== 'LOADED') {
		return <Loading />
	}

	return (
		<textarea
			name="content"
			className="hiring-todo"
			onChange={handleChange()}
		>
			{data.data[0]?.content}
		</textarea>
	)
}
