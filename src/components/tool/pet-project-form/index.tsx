import { FunctionComponent } from 'preact'
import { PetProjectType } from 'api-types/petproject.types'

import { useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import { isDefined } from 'utils/types/is-defined'
import { probbiApi } from 'repositories/probbi-api.repository'

import './style.css'

type FormValues = PetProjectType

const handlePetprojectSubmit = async (values: FormValues) => {
	if (values.id) {
		probbiApi.edit(values)
	} else {
		probbiApi.create(values)
	}
}

type PetProjectFormPropsType = Partial<PetProjectType>

// Запоминать ник автора
// Запрашивать проекты, учитывая ник
// Ис админ заменить на разграничения прав
export const PetProjectForm: FunctionComponent<PetProjectFormPropsType> = (probbi) => {
	// TODO: [FORM] тут форма
	const {
		register,
		handleSubmit,
		formState,
		reset
	} = useForm<FormValues>()

	useEffect(() => {
		if (isDefined(probbi.id)) {
			reset(probbi)
		}
	}, [probbi])

	// TODO: [FORM] тут форма
	return (
		<div className="pet-project">
			<form className="container" onSubmit={handleSubmit(handlePetprojectSubmit)}>
				<div>
					<label htmlFor="id">id</label>
				</div>
				<div>
					<input {...register('id')} readOnly />
				</div>
				<div>
					<label htmlFor="name">name</label>
				</div>
				<div>
					<input {...register('name')} />
				</div>
				<div>
					<label htmlFor="description">description</label>
				</div>
				<div>
					<textarea {...register('description')} />
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
