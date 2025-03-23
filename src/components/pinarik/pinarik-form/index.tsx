import { FunctionComponent } from 'preact'

import cs from 'classnames'

import { FormProvider, useForm } from 'react-hook-form'
import { Dispatch, StateUpdater }  from 'preact/hooks'

import { useAuth } from '../../../hook/use-auth'
import { useFormStatus } from '../../../hook/use-form-status'

import sendRequest from '../../../utils/send-request'
import { getAuthPair } from '../../../utils/get-auth-pair'

import { FormButton } from '../../form/form-button'
import { ShowFormResult } from '../../form/show-form-result'

import './style.css'

const onSubmit = addStatus => values => {
	const { login, pass } = getAuthPair()

	sendRequest('/api/v1/pinarik', {
		method: 'POST',
		values,
		auth: { login, pass },
	}).then(addStatus)
}

type FormValues = {
	date: string;
	score: string;
	description: string;
}

type PinarikFormPropsType = {
	forceUpdate: Dispatch<StateUpdater<boolean>>
}
export const PinarikForm: FunctionComponent<PinarikFormPropsType> = () => {
	const { isAuth } = useAuth()
	const formMethods = useForm<FormValues>({
		defaultValues: {
			date: (new Date()).toISOString().substr(0, 10),
			score: '',
			description: '',
		},
	})

	const { register, handleSubmit, setValue, watch, formState, reset } = formMethods
	const [ status, addStatus ] = useFormStatus()

	const setScore = value => () => setValue('score', value)
	const score = watch('score')

	if (!isAuth) {
		return null
	}

	return (
		<FormProvider {...formMethods}>
			<form className="container pinarik-form" onSubmit={handleSubmit(onSubmit(addStatus))}>
				<label>Дата</label>
				<input {...register('date')} name="date" type="date" />
				<label>Оценка</label>
				<div className="score">
					<div className={cs('score__item', { active: score === '-1' })} onClick={setScore('-1')} />
					<div className={cs('score__item', { active: score === '0' })} onClick={setScore('0')} />
					<div className={cs('score__item', { active: score === '1' })} onClick={setScore('1')} />
					<input {...register('score')} name="score" type="hidden" />
				</div>
				<label>Описание</label>
				<textarea {...register('description')} name="description" />
				<div className="form__button">
					<FormButton>Записать</FormButton>
					{(formState.isSubmitted || formState.isSubmitting) && (
						<ShowFormResult<FormValues> status={status} reset={() => reset()} />
					)}
				</div>
			</form>
		</FormProvider>
	)
}
