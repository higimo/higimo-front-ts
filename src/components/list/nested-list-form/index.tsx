import { FormValues, formScheme } from './FormValues'
import { FunctionComponent, h } from 'preact'
import { NestedListItemFullType } from 'api-types/listlist.types'

import { useForm } from 'react-hook-form'

import { toast } from 'toast'
import { nestedListApi } from './nestedListApi'

import './style.css'

const handleListListSubmit = async (values: FormValues): Promise<void> => {
	// TODO: отрабатывать бы ошибки создания
	if (values.id) {
		const res = await nestedListApi.edit(values)
		if (!!res) {
			toast.success(`[${values.id}] ${values.title} отредактирован`)
		}
		return
	}

	const titles = (values.title ?? '').split('\n').map(t => t.trim()).filter(Boolean)
	if (titles.length > 1) {
		titles.map(async title => {
			const res = await nestedListApi.create({
				title,
				code: values.code,
				parent_id: values.parent_id,
			})
			if (!!res) {
				toast.success(`[${res.id}] ${res.title} создан`)
			}
		})
		return
	}

	const res = await nestedListApi.create(values)
	if (!!res) {
		toast.success(`[${res.id}] ${res.title} создан`)
	}
	return
}

type NestedListFormPropsType = {
	values: NestedListItemFullType | undefined
}

export const NestedListForm: FunctionComponent<NestedListFormPropsType> = ({ values }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, isDirty },
	} = useForm<FormValues>({
		defaultValues: values,
	})

	return (
		<div className="form-container">
			<form className="container" onSubmit={handleSubmit(handleListListSubmit)}>
				{formScheme.map(schemeElement => [
					<label htmlFor={schemeElement.code}>{schemeElement.title}</label>,
					h(
						schemeElement.input,
						{
							...register(schemeElement.code),
							name: schemeElement.code,
							defaultValue: (values && values[schemeElement.code]) || '',
							className: schemeElement.input,
						}
					),
					!!schemeElement.description && (
						<div className="form__description">
							{schemeElement.description}
						</div>
					)
				])}
				<div className="form__button">
					<button type="submit" className="default-form__submit" disabled={isSubmitting}>
						{isSubmitting ? 'Сохранение…' : 'Сохранить'}
					</button>
					{isDirty && (
						<button type="reset" onClick={() => reset(values)}>Очистить форму</button>
					)}
				</div>
			</form>
		</div>

	)
}
