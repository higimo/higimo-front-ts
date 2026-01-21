import { FunctionComponent } from 'preact'

import { useCallback } from 'preact/hooks'
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form'

import './style.css'

const defaultInputs = (register: UseFormRegister<FieldValues>) => (
	<input
		{...register('newItem')}
		name="newItem"
		className="choose-input-create__input"
		placeholder="Вписать новый"
		autocomplete="off"
	/>
)

type CreateNewChooseItemPropsType = {
	onSubmit: any
	getInputs: any
}
export const CreateNewChooseItem: FunctionComponent<CreateNewChooseItemPropsType> = ({
	onSubmit,
	getInputs = defaultInputs,
}) => {
	const { register, reset, handleSubmit } = useForm()

	const handleOnSubmit = useCallback((values) => {
		onSubmit(values)
		reset()
	}, [onSubmit, reset])

	return (
		<form onSubmit={handleSubmit(handleOnSubmit)} className="choose-input-create">
			<div className="choose-input-create__container">
				{getInputs(register)}
			</div>
			<button className="choose-input__button">Добавить</button>
		</form>
	)
}
