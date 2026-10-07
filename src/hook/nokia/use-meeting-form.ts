import { ApiError } from 'errors/higimo-api-error'
import { DateTimeInputType, ISOString } from 'utils.type'
import { MentionSuggest } from 'components/mention-textarea/types'
import { NokiaMeetingSimpleType, NokiaPersonSimpleType } from 'api-types/nokia.types'

import { useCallback, useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'
import { useRoute } from 'preact-iso'

import { as } from 'utils/types/as'
import { createDateOnly } from 'utils/date/create-date-only'
import { meetingApi } from 'repositories/meeting-api.repository'
import { toast } from 'toast'

export type MeetingFormValues = NokiaMeetingSimpleType & {
	persons: NokiaPersonSimpleType[]
	date_end: DateTimeInputType
	date_start: DateTimeInputType
}

interface UseMeetingFormProps {
	persons: NokiaPersonSimpleType[]
}

interface UseMeetingFormReturn {
	formMethods: ReturnType<typeof useForm<MeetingFormValues>>
	handleMeetingSubmit: (data: MeetingFormValues) => Promise<void>
	handleAddPerson: (person: NokiaPersonSimpleType) => () => void
	handleRemovePerson: (person: NokiaPersonSimpleType) => () => void
	handleRemoveMeeting: (id: NokiaMeetingSimpleType['id']) => () => void
	handleTextAssign: (newMentionList: MentionSuggest[]) => void
}

export const useMeetingForm = ({
	persons,
}: UseMeetingFormProps): UseMeetingFormReturn => {
	const { path } = useRoute()
	const formMethods = useForm<MeetingFormValues>({
		defaultValues: {
			// TODO: [BACKEND] переделать типы
			date: createDateOnly(new Date()) as unknown as ISOString
		}
	})

	const handleMeetingSubmit = useCallback(async (values: MeetingFormValues) => {
		try {
			let backendEntity: NokiaMeetingSimpleType | null = null

			const { persons, ...meeting } = values

			if (as<NokiaMeetingSimpleType>(values, ['id'])) {
				backendEntity = await meetingApi.edit(meeting)
			} else {
				backendEntity = await meetingApi.create(meeting)
			}

			if (!backendEntity) {
				return undefined
			}

			toast.success(`Сохранено`)

			const meetingId = backendEntity.id

			let resultPerson = null
			if (values.persons && values.persons.length > 0) {
				resultPerson = await meetingApi.syncPerson(meetingId, values.persons)
			}

			formMethods.reset({
				...(backendEntity || {}),
				persons: resultPerson
			}, { keepDefaultValues: true })
		} catch (error) {
			console.log('error', error)
			const apiError = error as ApiError
			toast.error(apiError.message)
		}
	}, [meetingApi])

	const handleAddPerson = useCallback((person: NokiaPersonSimpleType) => () => {
		const currentPersons = formMethods.getValues('persons') ?? []
		const alreadyExists = currentPersons.some(i => i.id === person.id)

		if (alreadyExists) {
			return
		}

		formMethods.setValue('persons', currentPersons.concat(person), {
			shouldDirty: true,
			shouldValidate: true,
		})
	}, [formMethods])

	const handleRemovePerson = useCallback((person: NokiaPersonSimpleType) => () => {
		const currentPersons = formMethods.getValues('persons') || []
		const updatedPersons = currentPersons.filter(i => i.id !== person.id)
		formMethods.setValue('persons', updatedPersons, {
			shouldDirty: true,
			shouldValidate: true,
		})
	}, [formMethods])

	const handleTextAssign = useCallback((newMentionList: MentionSuggest[]) => {
		formMethods.setValue(
			'persons',
			newMentionList.map(item => item.person),
			{
				shouldDirty: true,
				shouldValidate: true,
			}
		)
	}, [persons])

	const handleRemoveMeeting = useCallback((id: NokiaMeetingSimpleType['id']) => () => {
		meetingApi.delete(id)
	}, [])

	useEffect(() => formMethods.reset(), [path, formMethods.reset])

	return {
		formMethods,
		handleMeetingSubmit,
		handleAddPerson,
		handleRemovePerson,
		handleTextAssign,
		handleRemoveMeeting
	}
}
