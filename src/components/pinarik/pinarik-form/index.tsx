import { ApiError } from 'errors/higimo-api-error'
import { FunctionComponent } from 'preact'
import { PinarikType } from 'api-types/pinarik.types'

import { FormProvider, useForm } from 'react-hook-form'

import { FormButton } from 'components/form/form-button'
import { TrafficLight } from 'components/pinarik/traffic-light'

import { pinarikApi } from 'repositories/pinarik-api.repository'
import { toast } from 'toast'

import './style.css'

type FormValues = {
	date: PinarikType['date']
	score: PinarikType['score']
	description: PinarikType['description']
}

const handlePinarikSubmit = async (values: FormValues): Promise<void> => {
	try {
		await pinarikApi.create(values)
	} catch (error) {
		const apiError = error as ApiError
		toast.error(apiError.message || 'Не получилось добавить пинарик')
	}
}

const DEFAULT_VALUE: FormValues = {
	// TODO: [LIGHT] здесь бы функцию, которая возвращает правильный тип
	date: (new Date()).toISOString().substr(0, 10) as PinarikType['date'],
	score: 0,
	description: '',
}

type PinarikFormPropsType = {
}

export const PinarikForm: FunctionComponent<PinarikFormPropsType> = () => {
	const formMethods = useForm<FormValues>({
		defaultValues: DEFAULT_VALUE,
	})

	const {
		register,
		handleSubmit,
		formState: {
			isDirty,
		},
		reset

	} = formMethods

	return (
		<FormProvider {...formMethods}>
			<form className="container nokia-form pinarik-form" onSubmit={handleSubmit(handlePinarikSubmit)}>
				<div className="form-row">
					<div>
						<label htmlFor="date">Дата</label>
					</div>
					<div>
						<input {...register('date')} name="date" type="date" />
					</div>
				</div>
				<div className="form-row">
					<div>
						<label htmlFor="score">Оценка</label>
					</div>
					<div>
						<TrafficLight<FormValues> name="score" />
					</div>
				</div>
				<div className="form-row">
					<div>
						<label htmlFor="description">Описание</label>
					</div>
					<div>
						<textarea {...register('description')} name="description" />
					</div>
				</div>
				<div className="form__button">
					<FormButton>Записать</FormButton>
					{isDirty && (
						<button type="reset" onClick={() => reset(DEFAULT_VALUE)}>Очистить</button>
					)}
				</div>
			</form>
		</FormProvider>
	)
}
