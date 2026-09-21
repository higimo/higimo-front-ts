import { FunctionComponent } from 'preact'
import { HigimoServerResponse } from 'api-types/server-response.types'
import { PinarikType } from 'api-types/pinarik.types'

import { FormProvider, useForm } from 'react-hook-form'

import { useFormStatus } from 'hook/utils/use-form-status'

import { FormButton } from 'components/form/form-button'
import { ShowFormResult } from 'components/form/show-form-result'
import { TrafficLight } from '../traffic-light'

import { sendRequest, ApiError } from 'utils/api/send-request'
import { toast } from 'toast'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

type FormValues = {
	date: PinarikType['date']
	score: PinarikType['score']
	description: PinarikType['description']
}

type HandlePinarikSubmitType = (addStatus: (val: HigimoServerResponse) => void) =>
	(values: FormValues) => Promise<void>
const handlePinarikSubmit: HandlePinarikSubmitType = addStatus => async values => {
	try {
		const { data: serverPostResult } = await sendRequest(API_ROUTE.pinarik, {
			method: 'POST',
			values,
		})

		addStatus(serverPostResult)
	} catch (error) {
		const apiError = error as ApiError
		toast.error(apiError.message || 'Не получилось добавить пинарик')
	}
}

type PinarikFormPropsType = {
}

export const PinarikForm: FunctionComponent<PinarikFormPropsType> = () => {
	const formMethods = useForm<FormValues>({
		defaultValues: {
			date: (new Date()).toISOString().substr(0, 10),
			score: 0,
			description: '',
		},
	})

	const { register, handleSubmit, formState, reset } = formMethods
	// TODO: надо иначе сообщать об успехе
	const [ status, addStatus ] = useFormStatus()

	return (
		<FormProvider {...formMethods}>
			<form className="container nokia-form pinarik-form" onSubmit={handleSubmit(handlePinarikSubmit(addStatus))}>
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
					{(formState.isSubmitted || formState.isSubmitting) && (
						<ShowFormResult status={status} reset={() => reset()} />
					)}
				</div>
			</form>
		</FormProvider>
	)
}
