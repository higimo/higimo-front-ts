import { ApiError } from 'errors/higimo-api-error'
import { DateTimeInputType, ISOString } from 'utils.type'
import { MentionSuggest } from 'components/mention-textarea/types'
import { NokiaMeetingSimpleType, NokiaPersonSimpleType } from 'api-types/nokia.types'

import { useCallback, useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'
import { useRoute } from 'preact-iso'

import { meetingApi } from 'repositories/meeting-api.repository'
import { toast } from 'toast'
import { createDateOnly } from 'utils/date/createDateOnly'

export type MeetingFormValues = NokiaMeetingSimpleType & {
	persons: NokiaPersonSimpleType[]
	date_end: DateTimeInputType
	date_start: DateTimeInputType
}

export interface UseMeetingFormProps {
	persons: NokiaPersonSimpleType[]
}

export interface UseMeetingFormReturn {
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
			// TODO: переделать типы
			date: createDateOnly(new Date()) as unknown as ISOString
		}
	})

	const handleMeetingSubmit = useCallback(async (values: MeetingFormValues) => {
		try {
			let backendEntity: NokiaMeetingSimpleType | null = null
			// TODO: мб, всё же шаблон createOrUpdate?
			if (values.id) {
				backendEntity = await meetingApi.edit({
					id: values.id,
					date: values.date,
					date_start: values.date_start,
					date_end: values.date_end,
					description: values.description,
					type: values.type,
				})
				if (!backendEntity) {
					throw new ApiError('Бекенд не отредактировал', 400)
				}
				toast.success(`[${backendEntity.id}] встреча отредактирована`)
			} else {
				backendEntity = await meetingApi.create({
					date: values.date,
					date_start: values.date_start,
					date_end: values.date_end,
					description: values.description,
					type: values.type,
				})
				// TODO: написать guard type функцию, после которой точно задаётся существование сущности в переменно
				if (!backendEntity) {
					console.log('backendEntity', backendEntity)
					throw new ApiError('Бекенд не создал', 400)
				}
				toast.success(`[${backendEntity.id}] встреча создана`)
			}

			console.log('backendEntity,', backendEntity)
			const meetingId = backendEntity!.id

			let resultPerson = null
			if (values.persons && values.persons.length > 0) {
				resultPerson = await meetingApi.syncPerson(meetingId, values.persons)
			}

			formMethods.setValue('id', meetingId)
			// TODO: добавить
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
