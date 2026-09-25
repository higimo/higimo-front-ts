import { ApiError } from 'errors/higimo-api-error'
import { NokiaMeetingSimpleType, NokiaPersonSimpleType } from 'api-types/nokia.types'

import { useCallback, useEffect, useState } from 'preact/hooks'
import { useForm } from 'react-hook-form'
import { useRoute } from 'preact-iso'

import { MeetingApiRepository } from 'repositories/meeting-api.repository'

import { toast } from 'toast'
import { MentionSuggest } from 'components/mention-textarea/types'

export type MeetingFormValues = NokiaMeetingSimpleType & {
	persons: NokiaPersonSimpleType[]
}

export interface UseMeetingFormProps {
	meetingApi: MeetingApiRepository
	isEditMode: boolean
	persons: NokiaPersonSimpleType[]
}

export interface UseMeetingFormReturn {
	formMethods: ReturnType<typeof useForm<MeetingFormValues>>
	status: any[]
	isSubmitting: boolean
	isSubmitted: boolean
	handleMeetingSubmit: (data: MeetingFormValues) => Promise<void>
	resetForm: () => void
	handleRemovePerson: (person: NokiaPersonSimpleType) => void
	handleTextAssign: (newMentionList: MentionSuggest[]) => void
}

export const useMeetingForm = ({
	meetingApi,
	isEditMode,
	persons,
}: UseMeetingFormProps): UseMeetingFormReturn => {
	const { path } = useRoute()
	const formMethods = useForm<MeetingFormValues>()

	const [status, setStatus] = useState<any[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const handleMeetingSubmit = useCallback(async (data: MeetingFormValues) => {
		setIsSubmitting(true)

		try {
			// TODO: поработать над репозиторием
			const resultMeeting = await meetingApi.createOrUpdate({
				id:          data.id,
				type:        data.type,
				date:        data.date,
				date_start:  data.date_start,
				date_end:    data.date_end,
				description: data.description,
			})

			const meetingId = resultMeeting.id || data.id

			if (!meetingId) {
				throw new Error('Meeting ID not found')
			}

			let resultPerson = null
			if (data.persons && data.persons.length > 0) {
				resultPerson = await meetingApi.syncPerson(meetingId, data.persons)
			}

			setStatus(prev => [
				...prev,
				{
					type: 'meeting',
					data: resultMeeting,
				},
				...(resultPerson ? [{
					type: 'persons',
					data: resultPerson,
				}] : [])
			])

			if (resultMeeting.id) {
				formMethods.setValue('id', resultMeeting.id)
			}

			setIsSubmitted(true)
		} catch (error) {
			const apiError = error as ApiError
			toast.show(apiError.message)
			setStatus(prev => prev.concat([{ apiError }]))
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

	const handleRemovePerson = useCallback((person: NokiaPersonSimpleType) => {
		const currentPersons = formMethods.getValues('persons') || []
		const updatedPersons = currentPersons.filter(i => i.id !== person.id)
		formMethods.setValue('persons', updatedPersons)
	}, [formMethods])

	const handleTextAssign = useCallback((newMentionList: MentionSuggest[]) => {
		// @ts-ignore
		const foundedPersons: NokiaPersonSimpleType[] = newMentionList.map(item =>
			persons.find(person => person.id === item.id)
		).filter(Boolean)
		formMethods.setValue('persons', foundedPersons)
	}, [persons])

	useEffect(resetForm, [path, resetForm])

	return {
		formMethods,
		status,
		isSubmitting,
		isSubmitted,
		handleMeetingSubmit,
		resetForm,
		handleRemovePerson,
		handleTextAssign,
	}
}
