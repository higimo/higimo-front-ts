import { ApiError } from 'errors/higimo-api-error'
import { PortfolioWorkerType } from 'api-types/portfolio.types'
import { FunctionComponent } from 'preact'

import { useForm, UseFormReset } from 'react-hook-form'
import { Dispatch, StateUpdater, useState } from 'preact/hooks'

import { Message } from 'components/ui/message'
import { Tag } from 'components/ui/tag'
import { ShowError } from 'components/ui/show-error'

import { isDefined } from 'utils/is-defined'
import { toast } from 'toast'

import './style.css'

type FormValues = {
	roles: Record<string, string> // { [workerId]: role }
}

type HandleChooseWorkerSubmitType = (
	onSubmit: (roles: Record<string, string>) => Promise<boolean>,
	reset: UseFormReset<FormValues>,
	setError: Dispatch<StateUpdater<string | null>>
) =>
	(values: FormValues) => Promise<void>
const handleChooseWorkerSubmit: HandleChooseWorkerSubmitType = (onSubmit, reset, setError) => async data => {
	try {
		const serverResult = await onSubmit(data.roles)
		if (serverResult) {
			reset()
			setError(null)
		} else {
			setError('Что-то пошло не так, сорян')
			toast.show('Что-то пошло не так, сорян')
		}
	} catch (error) {
		const apiError = error as ApiError
		toast.show(apiError.message)
	}
}

type ChooseWorkersFormPropsType = {
	workers: PortfolioWorkerType[]
	onRemoveWorker: (worker: PortfolioWorkerType) => void
	onSubmit: (roles: Record<string, string>) => Promise<boolean>
}
export const ChooseWorkersForm: FunctionComponent<ChooseWorkersFormPropsType> = ({
	workers,
	onRemoveWorker,
	onSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormValues>()
	const [error, setError] = useState<null | string>(null)

	return (
		<form onSubmit={handleSubmit(handleChooseWorkerSubmit(onSubmit, reset, setError))} className="workers-form">
			<h3>Добавляемые работники</h3>
			<p>
				Нажимай на теги, чтобы удалить лишних. Если добавил — перезагрузи страницу
			</p>

			{workers.length === 0 ? (
				<p>Нет выбранных работников</p>
			) : (
				<div className="workers-list">
					{workers.map(worker => (
						<div key={worker.id} className="worker-item">
							<div className="worker-info">
								<Tag
									className="worker-tag"
									onClick={() => onRemoveWorker(worker)}
								>
									{[worker.full_name, worker.login].filter(isDefined).join(' ')}
								</Tag>
							</div>
							<div className="worker-role">
								<label>Его роль:</label>
								<input
									{...register(`roles.${worker.id}`, { required: 'Обязательное поле' })}
									placeholder="Введите роль"
								/>
								<ShowError error={errors.roles?.[worker.id] || null} />
							</div>
						</div>
					))}
				</div>
			)}

			{error && (
				<Message error text={error} />
			)}

			{workers.length > 0 && (
				<button type="submit" className="submit-button" disabled={isSubmitting}>
					{isSubmitting ? 'Отправка…' : 'Сохранить роли'}
				</button>
			)}
		</form>
	)
}
