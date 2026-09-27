import { EmptyObject } from 'utils.type'
import { PetProjectType } from 'api-types/petproject.types'

import { useApi } from 'hook/fetch/use-api'
import { useEffect } from 'preact/hooks'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useForm } from 'react-hook-form'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useRoute } from 'preact-iso'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { probbiApi } from 'repositories/probbi-api.repository'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

type FormValues = PetProjectType

const handlePetprojectSubmit = async (values: FormValues) => {
	if (values.id) {
		probbiApi.edit(values)
	} else {
		probbiApi.create(values)
	}
}

const DEFAULT_ID = '-1'

// Запоминать ник автора
// Запрашивать проекты, учитывая ник
// Ис админ заменить на разграничения прав
export const PetProjectForm = () => {
	const { params: { projectId = DEFAULT_ID } } = useRoute()
	const[ probbiSingle ] = useApi<PetProjectType | EmptyObject>(API_ROUTE.probbiSingle({ projectId }))
	const isLoading = useLoadingState([probbiSingle.status])
	const isEmpty = useEmptyDataState(probbiSingle.data)

	const {
		register,
		handleSubmit,
		formState,
		setValue,
		reset
	} = useForm<FormValues>()

	useEffect(() => {
		// TODO: [MIDDLE] можно ли это через дефолты задавать? Хотябы предварительно собрать объект
		// TODO: [MIDDLE] в соседних формах заполнения дефолтами лучше сделано
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
			<form className="container" onSubmit={handleSubmit(handlePetprojectSubmit)}>
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
					{formState.isDirty && (
						<button type="reset" onClick={() => reset()}></button>
					)}
				</div>
			</form>
		</div>
	)
}
