import { FormScheme } from 'api-types/form.types'
import { FunctionComponent } from 'preact'
import { NestedListItemFullType, NestedListItemType } from 'api-types/listlist.types'

import { useForm } from 'react-hook-form'
import { useFormPersist } from 'from-persist/use-form-persist'

import { ButtonGroup } from 'components/form/button-group'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FromContainer } from 'components/form/form-container'
import { RenderFormScheme } from 'components/form/render-form-scheme'

import { as } from 'utils/types/as'
import { getDefaultUri, getPersistValue } from 'from-persist/index'
import { nestedListApi } from 'repositories/nested-list-api.repository'
import { toast } from 'toast'
import { handleFormError } from 'utils/api/handle-errors/handle-form-error'
import { handleApiError } from 'utils/api/handle-errors/handle-api-error'

export type FormValues = Partial<NestedListItemType>

export const formScheme: FormScheme<NestedListItemType> = {
	id: { type: 'number', title: 'ид', readonly: true, },
	parent_id: { type: 'number', title: 'ид родителя', },
	title: {
		type: 'textarea',
		title: 'Название',
		description: 'Указав имена с переносом строки, из каждой строки будет создан отдельный айтем',
	},
	code: { title: 'код', },
}

type NestedListFormPropsType = {
	initialData: NestedListItemFullType | null
}

export const NestedListForm: FunctionComponent<NestedListFormPropsType> = ({
	initialData,
}) => {
	const uri = getDefaultUri()
	const formMethods = useForm<FormValues>({
		defaultValues: getPersistValue<Partial<FormValues>>(uri, initialData, {}),
	})
	useFormPersist(uri, formMethods)

	const handleListListSubmit = async (values: FormValues): Promise<void> => {
		try {
			if (as<NestedListItemType>(values, ['id'])) {
				const res = await nestedListApi.edit(values)
				if (res) {
					toast.success(`[${values.id}] ${values.title} отредактирован`)
				}
				return
			}

			const titles = (values.title ?? '').split('\n').map(t => t.trim()).filter(Boolean)
			if (titles.length > 1) {
				titles.map(async title => {
					const result = await nestedListApi.create({
						title,
						code: values.code || '',
						parent_id: values.parent_id as NestedListItemType['parent_id'],
					})
					if (as<NestedListItemType>(result, ['id'])) {
						toast.success(`[${result.id}] ${result.title} создан`)
					}
				})
				return
			}

			if (as<NestedListItemType>(values, ['title', 'parent_id', 'code'])) {
				const result = await nestedListApi.create(values)
				if (as<NestedListItemType>(result, ['id'])) {
					toast.success(`[${result.id}] ${result.title} создан`)
				}
			}
			return
		} catch (error) {
			handleFormError(error, formMethods.setError)
			handleApiError(error)
		}
	}

	return (
		<FromContainer variant="full">
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(handleListListSubmit)}
					autocomplete="off"
				>
					<RenderFormScheme<FormValues> formScheme={formScheme} />
					<ButtonGroup variant="gap">
						<FormButton
							type="submit"
							variant="default"
							disabled={formMethods.formState.isSubmitting}
						>
							{formMethods.formState.isSubmitting ? 'Добавление…' : 'Добавить'}
						</FormButton>
					</ButtonGroup>
				</form>
			</FormProvider>
		</FromContainer>
	)
}
