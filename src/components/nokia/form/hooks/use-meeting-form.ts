import { NokiaMeetingApiType, NokiaPersonApiType } from 'types'

import { useCallback, useState } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import { MeetingApiService } from 'components/nokia/form/person-api'

export type MeetingFormValues = NokiaMeetingApiType & {
	persons: NokiaPersonApiType[]
}

export interface UseMeetingFormProps {
	meetingApi: MeetingApiService
	isEditMode: boolean
	persons: NokiaPersonApiType[]
}

export interface UseMeetingFormReturn {
	formMethods: ReturnType<typeof useForm<MeetingFormValues>>
	status: any[]
	isSubmitting: boolean
	isSubmitted: boolean
	onSubmit: (data: MeetingFormValues) => Promise<void>
	resetForm: () => void
	handleAddPerson: (person: NokiaPersonApiType) => void
	handleRemovePerson: (person: NokiaPersonApiType) => void
	handleTextAssign: (trigger: string, slug: string) => string
}

export const useMeetingForm = ({
	meetingApi,
	isEditMode,
	persons,
}: UseMeetingFormProps): UseMeetingFormReturn => {
	const formMethods = useForm<MeetingFormValues>()

	const [status, setStatus] = useState<any[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const onSubmit = useCallback(async (data: MeetingFormValues) => {
		setIsSubmitting(true)
		try {
			const result = await meetingApi.createOrUpdate(data)
			setStatus(prev => [...prev, result])
			setIsSubmitted(true)
		} catch (error) {
			setStatus(prev => [...prev, { error }])
		} finally {
			setIsSubmitting(false)
		}
	}, [meetingApi])

	const resetForm = useCallback(() => {
		if (!isEditMode) {
			formMethods.reset()
		}
		setStatus([])
		setIsSubmitted(false)
	}, [formMethods, isEditMode])

	const handleAddPerson = useCallback((person: NokiaPersonApiType) => {
		const currentPersons = formMethods.getValues('persons') || []

		const isAlreadyAdded = currentPersons.some(i => i.id === person.id)
		if (!isAlreadyAdded) {
			formMethods.setValue('persons', [...currentPersons, person])
		}
	}, [formMethods])

	const handleRemovePerson = useCallback((person: NokiaPersonApiType) => {
		const currentPersons = formMethods.getValues('persons') || []
		const updatedPersons = currentPersons.filter(i => i.id !== person.id)
		formMethods.setValue('persons', updatedPersons)
	}, [formMethods])

	const handleTextAssign = useCallback((trigger: string, slug: string) => {
		// Парсим slug (например: "Иван Петров [123]")
		const match = slug.match(/^(.*?)\s*\[(\d+)\]$/)

		if (match) {
			const [_, name, personId] = match

			const person = persons.find(i => i.id === parseInt(personId, 10))

			if (person) {
				handleAddPerson(person)
				return trigger + name
			}
		}

		return trigger // Если не нашли, возвращаем как есть
	}, [handleAddPerson, persons])

	return {
		formMethods,
		status,
		isSubmitting,
		isSubmitted,
		onSubmit,
		resetForm,
		handleAddPerson,
		handleRemovePerson,
		handleTextAssign,
	}
}
