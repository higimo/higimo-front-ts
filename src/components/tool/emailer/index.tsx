import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { InnerFromContainer } from 'components/form/inner-from-container'

import './style.css'

type FormValues = {
	url: string
}

export const Emailer: FunctionComponent = () => {
	const formMethods = useForm<FormValues>()

	const handleSubmit = () => {}

	return (
		<div className="emailer-tool">
			<ul className="main-menu">
				<li><a href="./?email">Сменить электропочту</a></li>
				<li><a href="./?may">Поддерживаемые сайты</a></li>
			</ul>
			<InnerFromContainer>
				<FormProvider {...formMethods}>
					<form
						onSubmit={formMethods.handleSubmit(handleSubmit)}
						autocomplete="off"
					>
						<FiledForm name="url" label="Статью по ссылке на почту" autofocus required />
						<ButtonGroup variant="gap">
							<FormButton
								type="submit"
								variant="default"
								disabled={formMethods.formState.isSubmitting}
							>
								{formMethods.formState.isSubmitting ? 'Отправляю…' : 'Получить'}
							</FormButton>
						</ButtonGroup>
					</form>
				</FormProvider>
			</InnerFromContainer>
		</div>
	)
}
