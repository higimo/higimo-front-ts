import { FunctionComponent } from 'preact'
import { MentionSuggest } from 'components/mention-textarea/types'
import { NokiaMeetingSimpleType, NokiaPersonSimpleType, NokiaPersonType } from 'api-types/nokia.types'

import { useEffect } from 'preact/hooks'
import { MeetingFormValues, useMeetingForm } from 'components/nokia/form/hooks/use-meeting-form'

import { NokiaMeetingFields } from 'components/nokia/form/nokia-meeting-fields'
import { NokiaMeetingPersonFields } from 'components/nokia/form/nokia-meeting-person-fields'
import { ISOString } from 'utils.type'

interface NokiaMeetingFormContainerProps {
	initialMeeting: NokiaMeetingSimpleType | undefined
	initialPersons: NokiaPersonSimpleType[]
	peoplesSuggest: MentionSuggest[]
	topPersons: NokiaPersonType[]
	persons: NokiaPersonType[]
}

export const NokiaMeetingFormContainer: FunctionComponent<NokiaMeetingFormContainerProps> = ({
	initialMeeting,
	initialPersons,
	peoplesSuggest,
	topPersons,
	persons,
}) => {
	// TODO: [LIGHT] вот бы удалять ещё научиться
	const {
		formMethods,
		handleMeetingSubmit,
		handleAddPerson,
		handleRemovePerson,
		handleTextAssign,
	} = useMeetingForm({ persons })

	const { handleSubmit, formState: { isSubmitting, isDirty }, reset } = formMethods

	// TODO: [HARD] идеально, бы сделать функцию/хук, которая заполняет любые формы
	useEffect(() => {
		if (!initialMeeting && !initialPersons) {
			return
		}
		let values: Partial<MeetingFormValues> = {
			persons: initialPersons ?? [],
		}
		if (initialMeeting) {
			const { date, ...rest } = initialMeeting

			if (date) {
				values.date = new Date(date).toISOString().substring(0, 10) as ISOString
			}
			if (!initialMeeting.type) {
				values.type = 'offline'
			}

			Object.assign(values, rest)
		}
		reset(values, { keepDefaultValues: true })
	}, [initialMeeting, initialPersons, reset])

	// Обновлять бы поле при изменении другого

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
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Сохранение…' : 'Сохранить'}
				</button>
				{isDirty && (
					<button type="reset" onClick={() => reset()}>Очистить</button>
				)}
			</div>
		</form>
	)
}
