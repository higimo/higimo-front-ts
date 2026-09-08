import { PetProjectType } from 'api-types/petproject.types'
import { HigimoServerResponse } from 'api-types/server-response.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useForm } from 'react-hook-form'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useRoute } from 'preact-iso'
import { useState, useEffect } from 'preact/hooks'
import useApi from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { Message } from 'components/ui/message'
import { NotFoundData } from 'components/ui/not-found-data'
import { ShowFormResult } from 'components/form/show-form-result'

import sendRequest, { ApiError } from 'utils/api/send-request'
import { toast } from 'toast'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

type FormValues = {
	id: PetProjectType['id']
	name: PetProjectType['name']
	description: PetProjectType['description']
}

type HandlePetprojectSubmitType = (addStatus: (val: HigimoServerResponse) => void) =>
	(values: FormValues) => Promise<void>
const handlePetprojectSubmit: HandlePetprojectSubmitType = setStatus => async values => {
	try {
		const { data: serverResult } = await sendRequest(
			API_ROUTE.probbiSingle({ projectId: values.id.toString() }),
			{
				method: 'POST',
				values,
			}
		)
		setStatus(serverResult)
	} catch (error) {
		const apiError = error as ApiError
		toast.error(apiError.message)
	}
}

const DEFAULT_ID = '-1'

// Запоминать ник автора
// Запрашивать проекты, учитывая ник
// Ис админ заменить на разграничения прав

export const PetProjectForm = () => {
	const { params: { projectId = DEFAULT_ID } } = useRoute()
	// TODO: [HARD] заменить на EmptyObject
	const[ probbiSingle ] = useApi<PetProjectType | {}>(API_ROUTE.probbiSingle({ projectId })) // TODO: [HARD] типизация такая на самом деле
	const isLoading = useLoadingState([probbiSingle.status])
	const isEmpty = useEmptyDataState(probbiSingle.data)

	const { register, handleSubmit, formState, setValue, reset } = useForm<FormValues>()
	const [ status, setStatus ] = useState(null)

	useEffect(() => {
		if (probbiSingle.data && 'id' in probbiSingle.data) {
			setValue('id', probbiSingle.data.id)
			setValue('name', probbiSingle.data.name)
			setValue('description', probbiSingle.data.description)
		}
	}, [projectId, probbiSingle.data])

	if (isLoading) {
		return <Loading />
	}
	if (isEmpty && projectId !== DEFAULT_ID) {
		return <NotFoundData />
	}

	return (
		<div className="pet-project">
			<form className="container" onSubmit={handleSubmit(handlePetprojectSubmit(setStatus))}>
				<div>
					<label htmlFor="id">id</label>
				</div>
				<div>
					<input {...register('id')} readOnly name="id" />
				</div>
				<div>
					<label htmlFor="name">name</label>
				</div>
				<div>
					<input {...register('name')} name="name" />
				</div>
				<div>
					<label htmlFor="description">description</label>
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
						{formState.isSubmitting ? 'Сохранение…' : 'Сохранить'}
					</button>
				</div>
				{(formState.isSubmitted || formState.isSubmitting) && (
					<ShowFormResult status={status} reset={reset}>
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
