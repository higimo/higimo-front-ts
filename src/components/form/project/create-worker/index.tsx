import { WorkerType } from 'types'
import { FunctionComponent } from 'preact';
import { FieldError, useForm } from 'react-hook-form';
import './style.css'
import { CollapseSection } from 'components/ui/collapse-section';

type CreateWorkerPropsType = {
	onSubmit: (roles: WorkerType) => Promise<boolean>;
}

// TODO: сейчас не сообщает, если какое-то поле забуду
export const CreateWorker: FunctionComponent<CreateWorkerPropsType> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm<WorkerType>()

	const ShowError = ({ filerError }: { filerError?: FieldError }) => {
		if (!filerError) {
			return null
		}
		return (
			<span className="error-message">{filerError.message}</span>
		)
	}
	
	const handleFormSubmit = async (data: WorkerType) => {
		const res = await onSubmit(data)
		if (res) {
			reset()
		} else {
			// TODO: Показать тост или Message?
			setError('company', { type: 'custom', message: 'При отправке произошла ошибка' })
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
							{...register('name', { required: 'Обязательное поле' })}
							className={errors.name ? 'error' : ''}
						/>
						<ShowError filerError={errors.name} />
					</div>
			
					<div className="form-group">
						<label htmlFor="family">Фамилия:</label>
						<input
							autocomplete="higimo"
							type="text"
							{...register('family', { required: 'Обязательное поле' })}
							className={errors.family ? 'error' : ''}
						/>
						<ShowError filerError={errors.family} />
					</div>
				
					<div className="form-group">
						<label htmlFor="image">Ссылка на фотку:</label>
						<input type="text" {...register('image')} />
						<ShowError filerError={errors.name} />
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
						<ShowError filerError={errors.login} />
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
						<ShowError filerError={errors.link} />
					</div>
					<ShowError filerError={errors.company} />
				
					<button type="submit" className="submit-button">Добавить человека</button>
				</form>
			</CollapseSection>
		</div>
	)
}