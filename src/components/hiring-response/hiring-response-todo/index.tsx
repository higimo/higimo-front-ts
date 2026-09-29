import { ChangeEvent } from 'utils.type'
import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useCallback } from 'preact/hooks'

import { debounce } from '@github/mini-throttle'
import { getSlugTimestamp } from 'utils/url-route/get-slug-timestamp'
import { pasteApi } from 'repositories/paste-api.repository'
import { toast } from 'toast'

import './style.css'

type HiringResponseTodoControllerPropsType = {
	todo: PasteApiType[]
}

export const HiringResponseTodoController: FunctionComponent<HiringResponseTodoControllerPropsType> = ({
	todo,
}) => {
	const handleChange = useCallback(() => {
		const debouncedEdit = debounce(
			async (content: string) => {
				await pasteApi.create({ key: `hiring-todo/${getSlugTimestamp()}`, content })
				const result = await pasteApi.edit({
					id: todo[0]?.id,
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
	}, [todo])

	return (
		<textarea
			name="content"
			className="hiring-todo"
			onChange={handleChange()}
		>
			{todo[0]?.content}
		</textarea>
	)
}
