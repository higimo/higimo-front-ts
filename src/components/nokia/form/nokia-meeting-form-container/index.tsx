import { FunctionComponent } from 'preact'
import { NokiaMeetingSimpleType, NokiaPersonSimpleType, NokiaPersonType } from 'api-types/nokia.types'

import { useEffect } from 'preact/hooks'
import { useMeetingForm } from 'components/nokia/form/hooks/use-meeting-form'

import { MeetingApiService } from 'components/nokia/form/person-api'
import { NokiaMeetingFields } from 'components/nokia/form/nokia-meeting-fields'
import { NokiaMeetingPersonFields } from 'components/nokia/form/nokia-meeting-person-fields'
import { ShowFormResult } from 'components/form/show-form-result'

import '../../nokia-style.css'

interface NokiaMeetingFormContainerProps {
	meetingApi: MeetingApiService
	initialData: NokiaMeetingSimpleType | undefined
	initialPersons: NokiaPersonSimpleType[]
	isEditMode: boolean
	peoplesSuggest: string[]
	topPersons: NokiaPersonType[]
	persons: NokiaPersonType[]
}

export const NokiaMeetingFormContainer: FunctionComponent<NokiaMeetingFormContainerProps> = ({
	meetingApi,
	initialData,
	initialPersons,
	isEditMode,
	peoplesSuggest,
	topPersons,
	persons,
}) => {
	const {
		formMethods,
		status,
		isSubmitting,
		isSubmitted,
		handleMeetingSubmit,
		handleAddPerson,
		handleRemovePerson,
		handleTextAssign,
	} = useMeetingForm({ meetingApi, isEditMode, persons })

	const { handleSubmit, setValue, reset } = formMethods

	useEffect(() => {
		if (initialData) {
			Object.entries(initialData).forEach(([key, value]) => {
				if (key === 'date') {
					// @ts-ignore TODO: [HARD] небось, тут дата приходит
					setValue(key, new Date(value * 1000).toISOString().substring(0, 10))
				} else {
					// @ts-ignore TODO: тут ключи оригинального типа и FormValue нужно синхронизировать
					setValue(key, value)
				}
			})
		}
		if (initialPersons) {
			setValue('persons', initialPersons)
		}
	}, [initialData, initialPersons, setValue])

	return (
		<form className="container nokia-form" onSubmit={handleSubmit(handleMeetingSubmit)}>
			<NokiaMeetingFields
				formMethods={formMethods}
				peoplesSuggest={peoplesSuggest}
				handleTextAssign={handleTextAssign}
			/>
			<hr />
			<NokiaMeetingPersonFields
				formMethods={formMethods}
				topPersons={topPersons}
				persons={persons}
				handleAddPerson={handleAddPerson}
				handleRemovePerson={handleRemovePerson}
			/>

			<div className="form__button">
				<button
					type="submit"
					className="default-form__submit"
					disabled={isSubmitting || isSubmitted}
				>
					{isSubmitting ? 'Сохранение…' : 'Сохранить'}
				</button>

				{(isSubmitted || isSubmitting) && (
					<ShowFormResult
						status={status}
						reset={() => reset(/*{date: date}*/)}
					/>
				)}
			</div>
		</form>
	)
}
