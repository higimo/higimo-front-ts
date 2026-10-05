import { PortfolioWorkerType } from 'api-types/portfolio.types'
import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { Tag } from 'components/ui/tag'

import './style.css'

type FormValues = {
	roles: Record<string, string> // { [workerId]: role }
}

type ChooseWorkersFormPropsType = {
	workers: PortfolioWorkerType[]
	onRemoveWorker: (worker: PortfolioWorkerType) => void
	onSubmit: (roles: Record<PortfolioWorkerType['id'], string>) => Promise<boolean>
}

export const ChooseWorkersForm: FunctionComponent<ChooseWorkersFormPropsType> = ({
	workers,
	onRemoveWorker,
	onSubmit,
}) => {
	const formMethods = useForm<FormValues>()

	return (
		<form onSubmit={formMethods.handleSubmit(onSubmit)} className="workers-form">
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
								<FormProvider {...formMethods}>
									<FiledForm
										name={`roles.${worker.id}`}
										label="Роль в проекте"
										placeholder="Введите роль"
									/>
									<ButtonGroup variant="gap">
										<FormButton
											type="submit"
											variant="default"
											disabled={formMethods.formState.isSubmitting}
										>
											{formMethods.formState.isSubmitting ? 'Отправка…' : 'Сохранить роли'}
										</FormButton>
									</ButtonGroup>
								</FormProvider>
							</div>
						</div>
					))}
				</div>
			)}
		</form>
	)
}
