import { NokiaPersonApiType } from 'types'

import { useCallback, useState } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import { PersonApi } from 'components/nokia/form/person-api'

export interface UsePersonFormProps {
	personApi: PersonApi
	isEditMode: boolean
}

export interface UsePersonFormReturn {
	formMethods: ReturnType<typeof useForm<NokiaPersonApiType>>
	status: any[]
	isSubmitting: boolean
	isSubmitted: boolean
	onSubmit: (data: NokiaPersonApiType) => Promise<void>
	resetForm: () => void
}

export const usePersonForm = ({
	personApi,
	isEditMode,
}: UsePersonFormProps): UsePersonFormReturn => {
	const formMethods = useForm<NokiaPersonApiType>({})

	const [status, setStatus] = useState<any[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const onSubmit = useCallback(async (data: NokiaPersonApiType) => {
		setIsSubmitting(true)
		try {
			const result = await personApi.createOrUpdate(data)
			setStatus(prev => prev.concat([result]))
			setIsSubmitted(true)
		} catch (error) {
			setStatus(prev => prev.concat([{ error }]))
		} finally {
			setIsSubmitting(false)
		}
	}, [personApi])

	const resetForm = useCallback(() => {
		if (!isEditMode) {
			formMethods.reset()
		}
		setStatus([])
		setIsSubmitted(false)
	}, [formMethods, isEditMode])

	return {
		formMethods,
		status,
		isSubmitting,
		isSubmitted,
		onSubmit,
		resetForm,
	}
}
