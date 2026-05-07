import { NokiaPersonSimpleType } from 'api-types/nokia.types'

import { useCallback, useEffect, useState } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import { PersonApi } from 'components/nokia/form/person-api'
import { useRoute } from 'preact-iso'

export interface UsePersonFormProps {
	personApi: PersonApi
	isEditMode: boolean
}

export interface UsePersonFormReturn {
	formMethods: ReturnType<typeof useForm<NokiaPersonSimpleType>>
	status: any[]
	isSubmitting: boolean
	isSubmitted: boolean
	onSubmit: (data: NokiaPersonSimpleType) => Promise<void>
	resetForm: () => void
}

export const usePersonForm = ({
	personApi,
	isEditMode,
}: UsePersonFormProps): UsePersonFormReturn => {
	const { path } = useRoute()
	const formMethods = useForm<NokiaPersonSimpleType>({})

	const [status, setStatus] = useState<any[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const onSubmit = useCallback(async (data: NokiaPersonSimpleType) => {
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

	useEffect(resetForm, [path, resetForm])

	return {
		formMethods,
		status,
		isSubmitting,
		isSubmitted,
		onSubmit,
		resetForm,
	}
}
