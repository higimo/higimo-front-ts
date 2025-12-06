import { ProjectType } from 'types'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'preact/hooks'
import useApi from 'hook/use-api'
import { useRoute } from 'preact-iso'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Message } from 'components/ui/message'
import { NotFoundData } from 'components/ui/not-found-data'
import { Loading } from 'components/ui/loading'
import { ShowFormResult } from 'components/form/show-form-result'

import sendRequest from 'utils/send-request'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

const onSubmit = setStatus => async values => {
	const res = await sendRequest(
		`/api/v1/probbi/${values.id}`,
		{
			method: 'POST',
			values,
		}
	)
	setStatus(res)
}

// Поставить ссылку на создание и редактирование
// Запоминать ник автора
// Запрашивать проекты, учитывая ник
// Ис админ заменить на разграничения прав

type FormValues = {
	id: number;
	name: string;
	description: string;
}

export const PetProjectForm = () => {
	const { params: { projectId = '-1'} } = useRoute()
	const[ probbiSingle ] = useApi<ProjectType>(API_ROUTE.probbiSingle({ projectId }))
	const isLoading = useLoadingState([probbiSingle.status])
	const isListEmpty = useEmptyDataState(probbiSingle.data)
			
	if (isLoading) {
		return <Loading />
	}
	
	if (isListEmpty) {
		return <NotFoundData />
	}

	let defaultValues: Partial<ProjectType> = {}
	const { register, handleSubmit, formState, setValue, reset } = useForm<FormValues>({
		defaultValues
	})
	const [ status, setStatus ] = useState(null)

	useEffect(() => {
		if (probbiSingle.data[0]) {
			setValue('id', probbiSingle.data[0].id || null)
			setValue('name', probbiSingle.data[0].name || null)
			setValue('description', probbiSingle.data[0].description || null)
		}
	}, [projectId, probbiSingle.data[0]])

	return (
		<div className="pet-project">
			<form className="container" onSubmit={handleSubmit(onSubmit(setStatus))}>
				<div>
					<label>id</label>
				</div>
				<div>
					<input {...register('id')} readOnly name="id" />
				</div>
				<div>
					<label>name</label>
				</div>
				<div>
					<input {...register('name')} name="name" />
				</div>
				<div>
					<label>description</label>
				</div>
				<div>
					<textarea {...register('description')} name="description" />
				</div>
				<div className="test">
					<button
						type="submit"
						className="default-form__submit"
						disabled={formState.isSubmitted || formState.isSubmitting}
					>
						Сохранить
					</button>
				</div>
				{(formState.isSubmitted || formState.isSubmitting) && (
					<ShowFormResult<FormValues> status={status} reset={() => reset()}>
						<Message
							result
							text={[
								'Если цифра — всё прекрасно, это айдишник.',
								'Если не цифра — я ничего не сохраню и кнопка ресета просто очистит форму.',
								'Кнопка сохранения блочится до очистки формы, чтоб исключить дубли.'
							].join(' ')}
						/>
					</ShowFormResult>
				)}
			</form>
		</div>
	)
}
