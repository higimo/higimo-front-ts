import { ApiError } from 'errors/higimo-api-error'
import { PortfolioWorkerType } from 'api-types/portfolio.types'
import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import { CollapseSection } from 'components/ui/collapse-section'
import { ShowError } from 'components/ui/show-error'

import { toast } from 'toast'

import './style.css'

type FormValues = PortfolioWorkerType

type CreateWorkerPropsType = {
	onSubmit: (roles: PortfolioWorkerType) => Promise<boolean>
}
// TODO: [HARD] сейчас не сообщает, если какое-то поле забуду
export const CreateWorker: FunctionComponent<CreateWorkerPropsType> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormValues>()

	const handleFormSubmit = async (data: PortfolioWorkerType) => {
		try {
			const res = await onSubmit(data)
			if (res) {
				toast.show('Сохранено')
				reset()
			} else {
				toast.error('При отправке произошла ошибка')
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.message)
		}
	}

	return (
		<div>
			<CollapseSection fold={true} header="Добавить человека">
				<form onSubmit={handleSubmit(handleFormSubmit)} className="person-form" autocomplete="off">
					<div className="form-group">
						<label htmlFor="name">Имя:</label>
						<input
							autocomplete="higimo"
							type="text"
							{...register('full_name', { required: 'Обязательное поле' })}
							className={errors.full_name ? 'error' : ''}
						/>
						<ShowError error={errors.full_name} />
					</div>

					<div className="form-group">
						<label htmlFor="family">Фамилия:</label>
						{/* <input
							autocomplete="higimo"
							type="text"
							{...register('family', { required: 'Обязательное поле' })}
							className={errors.family ? 'error' : ''}
						/>
						<ShowError error={errors.family} /> */}
					</div>

					<div className="form-group">
						<label htmlFor="image">Ссылка на фотку:</label>
						<input type="text" {...register('image')} />
						<ShowError error={errors.image} />
						{errors.image && <span className="error-message">{errors.image.message}</span>}
					</div>

					<div className="form-group">
						<label htmlFor="login">Ник:</label>
						<input
							autocomplete="higimo"
							type="text"
							{...register('login', { required: 'Обязательное поле' })}
							className={errors.login ? 'error' : ''}
						/>
						<ShowError error={errors.login} />
					</div>

					<div className="form-group">
						<label htmlFor="company">Где работал:</label>
						<input type="text" {...register('company')} />
					</div>

					<div className="form-group">
						<label htmlFor="role">Роль:</label>
						<input type="text" {...register('role')} />
					</div>

					<div className="form-group">
						<label htmlFor="link">Ссылка на хомяк:</label>
						<input
							type="text"
							{...register('link', {
								pattern: {
									value: /^(https?:\/\/).+$/i,
									message: 'Должна быть валидная ссылка'
								}
							})}
							className={errors.link ? 'error' : ''}
						/>
						<ShowError error={errors.link} />
					</div>

					<ShowError error={errors.company} />

					<button
						type="submit"
						className="submit-button"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Добавление…' : 'Добавить автора'}
					</button>
				</form>
			</CollapseSection>
		</div>
	)
}
