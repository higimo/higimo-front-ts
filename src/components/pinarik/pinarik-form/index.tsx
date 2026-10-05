import { FunctionComponent } from 'preact'
import { PinarikType } from 'api-types/pinarik.types'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'
import { TrafficLight } from 'components/pinarik/traffic-light'

import { createDateOnly } from 'utils/date/create-date-only'
import { pinarikApi } from 'repositories/pinarik-api.repository'
import { toast } from 'toast'

import './style.css'

type FormValues = Omit<PinarikType, 'id'>

const handlePinarikSubmit = async (values: FormValues): Promise<void> => {
	const pinarik = await pinarikApi.create(values)
	if (!pinarik) {
		toast.error('Не получилось добавить пинарик')
	}
}

const DEFAULT_VALUE: FormValues = {
	date: createDateOnly(new Date()),
	score: 0,
	description: '',
}

type PinarikFormPropsType = {
}

export const PinarikForm: FunctionComponent<PinarikFormPropsType> = () => {
	const formMethods = useForm<FormValues>({
		defaultValues: DEFAULT_VALUE,
	})

	return (
		<FullpageFormContainer>
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(handlePinarikSubmit)}
					autocomplete="off"
				>
					<FiledForm name="date" label="Дата" type="date" />
					<label htmlFor="score">Оценка</label>
					<TrafficLight<FormValues> name="score" />
					<FiledForm name="description" label="Описание" type="textarea" />
					<ButtonGroup variant="gap">
						<FormButton
							type="submit"
							variant="default"
							disabled={formMethods.formState.isSubmitting}
						>
							{formMethods.formState.isSubmitting ? 'Сохраняю…' : 'Сохранить'}
						</FormButton>
						{formMethods.formState.isDirty && (
							<FormButton
								type="button"
								onClick={() => formMethods.reset(DEFAULT_VALUE)}
								variant="outline"
							>
								Очистить
							</FormButton>
						)}
					</ButtonGroup>
				</form>
			</FormProvider>
		</FullpageFormContainer>
	)
}
