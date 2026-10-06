import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { InnerFromContainer } from 'components/form/inner-from-container'

import { as } from 'utils/types/as'
import { pasteApi } from 'repositories/paste-api.repository'
import { smoothScroll } from 'utils/browser/smooth-scroll'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'

import './style.css'

type FormValues = Partial<PasteApiType>

type HiringResponseCardFormPropsType = {
	initialData: Partial<PasteApiType>
	fetchUpdate: () => void
}

export const HiringResponseCardForm: FunctionComponent<HiringResponseCardFormPropsType> = ({
	initialData,
	fetchUpdate,
}) => {
	const formMethods = useForm<FormValues>()

	useEffect(() => {
		formMethods.reset(initialData)
	}, [initialData, formMethods.reset])

	const handleSubmit = async (values: FormValues) => {
		if (as<PasteApiType>(values, ['id'])) {
			await pasteApi.edit(values)
		} else {
			await pasteApi.create(values)
		}
		await fetchUpdate()
		smoothScroll(ANCHOR_LINKS.hiringResponseGallery)()
	}

	return (
		<InnerFromContainer>
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(handleSubmit)}
					autocomplete="off"
				>
					<div className="hiring-response-form__meta">
						<FiledForm name="id" label="id" type="number" readonly />
						<FiledForm name="key" label="key" readonly required />
						<FiledForm name="date" label="date" required />
					</div>
					<FiledForm
						type="textarea"
						name="content"
						label="Содержание"
						placeholder="Содержание карточки…"
					/>
					<ButtonGroup variant="gap">
						<FormButton type="submit" variant="default">
							Сохранить
						</FormButton>
					</ButtonGroup>
				</form>
			</FormProvider>
		</InnerFromContainer>
	)
}
