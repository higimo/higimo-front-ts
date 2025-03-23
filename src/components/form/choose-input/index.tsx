import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'
import { useCallback, useState } from 'preact/hooks'

import './style.css'

const FORM_STATUS = {
	INIT: 'INIT',
	SUBMIT: 'SUBMIT',
	SUCCESS: 'SUCCESS',
	FAIL: 'FAIL',
} as const

type FormStatusType = typeof FORM_STATUS[keyof typeof FORM_STATUS]

const isChoose = <T extends { id: string },>(choosedArr: string, item: T): boolean => !!choosedArr.includes(item.id)

type UseChooseType = (choosed: any, setChoosed: any) => {
	choosed: any
	toggleChooseItem: any
}
const useChoose: UseChooseType = (choosed, setChoosed) => {
	const toggleChooseItem = useCallback((newItemId) => {
		setChoosed(
			'choose',
			(
				choosed.includes(newItemId)
				? choosed.filter(i => i !== newItemId)
				: [...choosed, newItemId]
			).join(',')
		)
	}, [choosed, setChoosed])

	return {choosed, toggleChooseItem}
}

type ChooseInputPropsType = {
	items: any;
	renderItem: any;
	onSave: any;
}
export const ChooseInput: FunctionComponent<ChooseInputPropsType> = ({
	items,
	// appendItem,
	renderItem,
	onSave,
	// onCreateNewChooseItem,
	// getInputs,
	// done,
	// setDone,
}) => {
	const [status, setStatus] = useState<FormStatusType>(FORM_STATUS.INIT)
	const { register, setValue, watch, reset, handleSubmit } = useForm({ defaultValues: { choose: '' } })

	const {choosed, toggleChooseItem} = useChoose(
		watch('choose').split(',').filter(Boolean).map(i => parseInt(i, 10)),
		setValue
	)

	const handleReset = () => {
		reset()
		setStatus(FORM_STATUS.INIT)
	}
	const handleSave = async (values) => {
		setStatus(FORM_STATUS.SUBMIT)
		setStatus(await onSave(values) ? FORM_STATUS.SUCCESS : FORM_STATUS.FAIL)
	}

	// const handleCreateNewChooseItem = useCallback((newItem) => {
	// 	onCreateNewChooseItem(newItem)
	// }, [onCreateNewChooseItem])

	// const [ doneStatus, setDoneStatus ] = useState(done)
	// useEffect(() => {
	// 	if (doneStatus !== done) {
	// 		if (done === null) {
	// 			reset()
	// 		}
	// 		setDoneStatus(done)
	// 	}
	// }, [done, setDone])

	return (
		<div className="choose-input">
			<form onSubmit={handleSubmit(handleSave)}>
				<div className="choose-input__choose">
					{items
						.filter(item => !isChoose(choosed, item))
						.map(item => renderItem(item, false, toggleChooseItem, register))}
				</div>
				<div className="choose-input__choosed">
					<input type="text" {...register('choose')} name="choose" />
					<div className="choose-input__title">
						выбрано:
					</div>
					{items
						.filter(item => isChoose(choosed, item))
						.map(item => renderItem(item, true, toggleChooseItem, register))}
				</div>
				<div className="choose-input__save">
					<button className="choose-input__button">Сохранить</button>
					<button className="choose-input__button" onClick={handleReset}>Очистить</button>
				</div>
				{status === FORM_STATUS.SUCCESS && <div className="choose-input__done">Сохранено (чисти)</div>}
				{status === FORM_STATUS.FAIL && <div className="choose-input__fail">Чет ошибка (пробуй заново)</div>}
			</form>
			{/*<CreateNewChooseItem
				onSubmit={handleCreateNewChooseItem}
				getInputs={getInputs}
			/>*/}
		</div>
	)
}
