import { FormScheme } from 'api-types/form.types'
import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FromContainer } from 'components/form/form-container'
import { RenderFormScheme } from 'components/form/render-form-scheme'

export type FormValues = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	uri: string
	options: string
}

const DEFAULT_STATE = {
	method: 'GET',
	uri: 'feedback/page',
	options: '{}',
} as const satisfies FormValues

type SidebarPropsType = {
	onSubmit: (values: FormValues) => void
}

const formScheme: FormScheme<FormValues> = {
	method: {
		title: 'method',
		type: 'select',
		values: [
			'GET',
			'POST',
			'PUT',
			'DELETE',
		],
	},
	uri: { title: 'URI', },
	options: { title: 'options', type: 'textarea', },
}


export const SidebarForm: FunctionComponent<SidebarPropsType> = ({ onSubmit }) => {
	// здесь будут значения по умолчанию всегда
	const formMethods = useForm<FormValues>({
		defaultValues: DEFAULT_STATE
	})

	return (
		<FromContainer variant="inner">
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(onSubmit)}
					autocomplete="off"
				>
					<RenderFormScheme<FormValues> formScheme={formScheme} />
					<ButtonGroup variant="gap">
						<FormButton
							type="submit"
							variant="default"
							disabled={formMethods.formState.isSubmitting}
						>
							{formMethods.formState.isSubmitting ? 'Отправляю…' : 'Отправить'}
						</FormButton>
					</ButtonGroup>
				</form>
			</FormProvider>
		</FromContainer>
	)
}
