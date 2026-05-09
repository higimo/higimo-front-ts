import { PortfolioWorkerType } from 'api-types/portfolio.types'
import { FunctionComponent } from 'preact'

import { FieldError, useForm, UseFormReset } from 'react-hook-form'
import { Dispatch, StateUpdater, useState } from 'preact/hooks'

import { Message } from 'components/ui/message'
import { Tag } from 'components/ui/tag'

import './style.css'
import { HigimoServerResponse } from 'api-types/server-response.types'
import { ApiError } from 'utils/send-request'
import { toast } from 'toast'

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

// TODO: [LIGHT] вынести в отдельный общий компонент
const ShowError = ({ error }: { error: FieldError | null }) => {
	if (!error) {
		return null
	}
	return (
		<span className="error-message">{error.message}</span>
	)
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
		formState: { errors },
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
									{[worker.full_name, worker.login].filter(Boolean).join(' ')}
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
				<button type="submit" className="submit-button">
					Сохранить роли
				</button>
			)}
		</form>
	)
}
