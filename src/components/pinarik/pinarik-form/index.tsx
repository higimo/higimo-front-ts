import { FunctionComponent } from 'preact'
import { PinarikType } from 'api-types/pinarik.types'
import { HigimoServerResponse } from 'api-types/server-response.types'

import cs from 'classnames'

import { FormProvider, useForm } from 'react-hook-form'
import { Dispatch, StateUpdater }  from 'preact/hooks'

import { useAuth } from 'hook/use-auth'
import { useFormStatus } from 'hook/use-form-status'

import sendRequest, { ApiError } from 'utils/api/send-request'
import { toast } from 'toast'

import { FormButton } from 'components/form/form-button'
import { ShowFormResult } from 'components/form/show-form-result'

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
		// TODO: [BACKEND] бэк не принимает такие запросы
		const serverPostResult = await sendRequest(API_ROUTE.pinarik, {
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
	forceUpdate: Dispatch<StateUpdater<boolean>>
}
export const PinarikForm: FunctionComponent<PinarikFormPropsType> = () => {
	const { isAuth, redirectToLogin } = useAuth()
	const formMethods = useForm<FormValues>({
		defaultValues: {
			date: (new Date()).toISOString().substr(0, 10),
			score: 0,
			description: '',
		},
	})

	const { register, handleSubmit, setValue, watch, formState, reset } = formMethods
	const [ status, addStatus ] = useFormStatus()

	const setScore = (value: PinarikType['score']) => () => setValue('score', value)
	const score = watch('score')

	if (!isAuth) {
		redirectToLogin()
		return null
	}

	return (
		<FormProvider {...formMethods}>
			<form className="container pinarik-form" onSubmit={handleSubmit(handlePinarikSubmit(addStatus))}>
				<label htmlFor="date">Дата</label>
				<input {...register('date')} name="date" type="date" />
				<label htmlFor="fewfwe">Оценка</label>
				<div className="score">
					<div className={cs('score__item', { active: score === -1 })} onClick={setScore(-1)} />
					<div className={cs('score__item', { active: score === 0 })} onClick={setScore(0)} />
					<div className={cs('score__item', { active: score === 1 })} onClick={setScore(1)} />
					<input {...register('score')} name="score" type="hidden" />
				</div>
				<label htmlFor="description">Описание</label>
				<textarea {...register('description')} name="description" />
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
