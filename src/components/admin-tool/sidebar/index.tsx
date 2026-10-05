import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { InnerFromContainer } from 'components/form/inner-from-container'

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

export const Sidebar: FunctionComponent<SidebarPropsType> = ({ onSubmit }) => {
	const formMethods = useForm<FormValues>({
		defaultValues: DEFAULT_STATE
	})

	return (
		<InnerFromContainer>
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(onSubmit)}
					autocomplete="off"
				>
					<select {...formMethods.register('method')}>
						<option value="GET">GET</option>
						<option value="POST">POST</option>
						<option value="PUT">PUT</option>
						<option value="DELETE">DELETE</option>
					</select>
					<FiledForm name="uri" label="URI" required />
					<FiledForm name="options" label="options" type="textarea" />
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
		</InnerFromContainer>
	)
}
