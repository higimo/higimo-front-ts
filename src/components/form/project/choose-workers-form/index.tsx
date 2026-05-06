import { PortfolioWorkerType } from 'api-types/portfolio.types'
import { FunctionComponent } from 'preact'

import { FieldError, useForm } from 'react-hook-form'
import { useState } from 'preact/hooks'

import { Message } from 'components/ui/message'
import { Tag } from 'components/ui/tag'

import './style.css'

type FormValues = {
	roles: Record<string, string> // { [workerId]: role }
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

	const handleFormSubmit = async (data: FormValues) => {
		const res = await onSubmit(data.roles)
		if (res) {
			reset()
			setError(null)
		} else {
			setError('Что-то пошло не так, сорян')
		}
	}

	const ShowError = ({ filerError }: { filerError?: FieldError }) => {
		if (!filerError) {
			return null
		}
		return (
			<span className="error-message">{filerError.message}</span>
		)
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="workers-form">
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
								<ShowError filerError={errors.roles?.[worker.id] || null} />
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
