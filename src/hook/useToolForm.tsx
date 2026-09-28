import { useState, useCallback } from 'preact/hooks'

export const DEFAULT_STATE = {
	method: 'POST',
	uri: 'feedback/page',
	options: '{}',
}

export const useToolForm = () => {
	const [formData, setFormData] = useState(DEFAULT_STATE)
	const [response, setResponse] = useState('')

	const updateField = useCallback((name: string, value: string) => {
		setFormData(prev => ({ ...prev, [name]: value }))
	}, [])

	const resetForm = useCallback(() => {
		setFormData(DEFAULT_STATE)
		setResponse('')
	}, [])

	return {
		formData,
		response,
		updateField,
		setResponse,
		resetForm,
	}
}
