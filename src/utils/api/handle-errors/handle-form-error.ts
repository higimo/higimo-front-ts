import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

import { ValidationFailError } from 'errors/validation-fail-error'

import { isAbortError } from 'utils/types/is-abort-error'
import { isLaravelErrorBody } from 'utils/types/is-laravel-error-body'
import { toast } from 'toast'

/**
 * Обработка ошибкок работы репозитория
 * - ValidationFailError → тост с message + ошибки полей в setError
 * - остальное → handleApiError (тост)
 */
export const handleFormError = <T extends FieldValues>(
	error: unknown,
	setError: UseFormSetError<T>,
): void => {
	// Отмена — не ошибка, молчим
	if (isAbortError(error)) {
		return
	}

	if (error instanceof ValidationFailError) {
		// error.response: LaravelErrorBody | string | undefined
		const response = error.response
		if (isLaravelErrorBody(response) && response.errors) {
			for (const [field, messages] of Object.entries(response.errors)) {
				if (!messages?.length) continue
				setError(field as Path<T>, {
					type: 'server',
					message: messages[0],
				})
			}
		}
		toast.error(error.message || 'Проверьте введённые данные')
		return
	}
}
