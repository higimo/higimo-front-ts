import { FunctionComponent, h } from 'preact'
import { HigimoServerResponse } from 'api-types/server-response.types'
import { ListerItem } from 'api-types/listlist.types'

import { useForm } from 'react-hook-form'
import { useState, useEffect, useCallback } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import { ShowFormResult } from 'components/form/show-form-result'

import sendRequest, { ApiError } from 'utils/api/send-request'
import { toast } from 'toast'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

const ListListScheme = ['id', 'title', 'parent', 'code'] as const
type ListListSchemeType = typeof ListListScheme[number]

type FormValues = {
	id: ListerItem['id']
	parent: ListerItem['parent']
	title: ListerItem['title']
	code: ListerItem['code']
}

type FormScheme<T extends string> = {
	code: T,
	type: string,
	input: 'textarea' | 'input',
	title: string,
	description?: string
}
// TODO: [HARD] хорошая практика делать фабрику формы
// TODO: [HARD] но с типами беда — если есть лишний, которого нет — не подсветит
const scheme: FormScheme<ListListSchemeType>[] = [
	{
		code: 'id',
		type: 'number',
		title: 'ид',
		input: 'input',
	},
	{
		code: 'title',
		type: 'string',
		title: 'Название',
		input: 'textarea',
		description: 'Указав имена с переносом строки, из каждой строки будет создан отдельный айтем'
	},
	{
		code: 'parent',
		type: 'number',
		title: 'ид родителя',
		input: 'input',
	},
	{
		code: 'code',
		type: 'string',
		title: 'код',
		input: 'input',
	},
]

type HandleListListSubmitType = (addStatus: (val: HigimoServerResponse) => void) =>
	(values: FormValues) => Promise<void>
const handleListListSubmit: HandleListListSubmitType = addStatus => async values => {
	const titles: string[] = values.title.split('\n').filter((title: string) => title.trim())

	if (titles.length === 0) {
		toast.warning('Нет заголовков для добавления')
		return
	}

	toast.show(`Добавление ${titles.length} элементов…`)

	try {
		const promises = titles.map(title =>
			sendRequest(API_ROUTE.lister + (values.id ? `/${values.id}` : ''), {
				method: 'POST',
				values: {
					...values,
					title: title.trim(),
				},
			})
		)

		const results = await Promise.allSettled(promises)

		// Подсчитываем успешные и неудачные запросы
		const successful = results.filter(result => result.status === 'fulfilled').length
		const failed = results.filter(result => result.status === 'rejected').length

		toast.success(`Добавлено ${successful}; не удалось ${failed}`)

		results.forEach(result => result.status === 'fulfilled' && addStatus(result.value))
	} catch (error) {
		const apiError = error as ApiError
		toast.error(apiError.message || 'Не получилось добавить элементы')
	}
}

export const ListListForm: FunctionComponent = () => {
	const { params: { idcode = '' } } = useRoute()
	// @ts-ignore TODO: [BACKEND] пока игнорируем ошибку, но надо получать данные с бэка и заполнять
	// см. ниже useEffect, он вроде делает
	const [ values, setValues ] = useState<ListerItem>({})
	const [ status, setStatus ] = useState<HigimoServerResponse[]>([])

	const addStatus = useCallback(
		(val: HigimoServerResponse) => setStatus(pState => pState.concat(val)),
		[setStatus]
	)

	useEffect(() => {
		sendRequest(API_ROUTE.listerItemSingle({ id: idcode }))
			.then(val => setValues(val.data[0]))
	}, [idcode])

	const {
		register,
		handleSubmit,
		formState,
		reset,
		formState: { isSubmitting },
	} = useForm<FormValues>({
		defaultValues: values,
	})

	return (
		<div className="form-container">
			<form className="container" onSubmit={handleSubmit(handleListListSubmit(addStatus))}>
				{scheme.map(schemeElement => [
					<label htmlFor={schemeElement.code}>{schemeElement.title}</label>,
					h(
						schemeElement.input,
						{
							...register(schemeElement.code),
							name: schemeElement.code,
							defaultValue: values[schemeElement.code] || '',
							className: schemeElement.input,
						}
					),
					!!schemeElement.description && (
						<div className="form__description">
							{schemeElement.description}
						</div>
					)
				])}
				<div className="form__button">
					<button type="submit" className="default-form__submit" disabled={isSubmitting}>
						{isSubmitting ? 'Сохранение…' : 'Сохранить'}
					</button>
					{(formState.isSubmitted || formState.isSubmitting) && (
						<ShowFormResult status={status} reset={reset} />
					)}
				</div>
			</form>
		</div>

	)
}
