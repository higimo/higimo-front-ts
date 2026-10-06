import { FormValues, formScheme } from 'components/list/nested-list-form/FormValues'
import { FunctionComponent } from 'preact'
import { NestedListItemFullType, NestedListItemType } from 'api-types/listlist.types'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'

import { as } from 'utils/types/as'
import { nestedListApi } from 'repositories/nested-list-api.repository'
import { toast } from 'toast'

import './style.css'

const handleListListSubmit = async (values: FormValues): Promise<void> => {
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
}

type NestedListFormPropsType = {
	values: NestedListItemFullType | undefined
}

export const NestedListForm: FunctionComponent<NestedListFormPropsType> = ({ values }) => {
	const formMethods = useForm<FormValues>({
		defaultValues: values,
	})

	return (
		<FullpageFormContainer>
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(handleListListSubmit)}
					autocomplete="off"
				>
					{Object.entries(formScheme).map(([code, scheme]) => (
						<FiledForm
							key={code}
							name={code}
							type={scheme.type}
							readonly={scheme.readonly}
							label={scheme.title}
							description={scheme.description}
						/>
					))}
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
		</FullpageFormContainer>
	)
}
