import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FromContainer } from 'components/form/form-container'

import { as } from 'utils/types/as'
import { handleApiError } from 'utils/api/handle-errors/handle-api-error'
import { handleFormError } from 'utils/api/handle-errors/handle-form-error'
import { pasteApi } from 'repositories/paste-api.repository'
import { smoothScroll } from 'utils/browser/smooth-scroll'
import { toast } from 'toast'

import { ANCHOR_LINK } from 'dic/route/ANCHOR_LINK'

import './style.css'

type FormValues = Partial<PasteApiType>

type HiringResponseCardFormPropsType = {
	initialData: PasteApiType | null
	fetchUpdate: () => void
}

export const HiringResponseCardForm: FunctionComponent<HiringResponseCardFormPropsType> = ({
	initialData,
	fetchUpdate,
}) => {
	const formMethods = useForm<FormValues>({
		defaultValues: initialData || {}
	})

	const handleSubmit = async (values: FormValues) => {
		try {
			let result
			if (as<PasteApiType>(values, ['id'])) {
				result = await pasteApi.edit(values)
			} else {
				result = await pasteApi.create(values)
			}
			if (!result) {
				toast.success(`Сохранено`)
			}
			await fetchUpdate()
			smoothScroll(ANCHOR_LINK.hiringResponseGallery)()
		} catch (error) {
			handleFormError(error, formMethods.setError)
			handleApiError(error)
		}
	}

	return (
		<FromContainer variant="inner">
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
		</FromContainer>
	)
}
