import { NokiaPersonSimpleType } from 'api-types/nokia.types'
import { personApi } from 'repositories/person-api'

import { useCallback, useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'
import { useRoute } from 'preact-iso'

export interface UsePersonFormProps {
	isEditMode: boolean
}

export interface UsePersonFormReturn {
	formMethods: ReturnType<typeof useForm<NokiaPersonSimpleType>>
	handlePersonSubmit: (data: NokiaPersonSimpleType) => Promise<void>
	resetForm: () => void
}

export const usePersonForm = ({
	isEditMode,
}: UsePersonFormProps): UsePersonFormReturn => {
	const { path } = useRoute()
	const formMethods = useForm<NokiaPersonSimpleType>({})

	const handlePersonSubmit = useCallback(async (data: NokiaPersonSimpleType) => {
		await personApi.create(data)
	}, [personApi])

	const resetForm = useCallback(() => {
		formMethods.reset()
	}, [formMethods, isEditMode])

	useEffect(resetForm, [path, resetForm])

	return {
		formMethods,
		handlePersonSubmit,
		resetForm,
	}
}
