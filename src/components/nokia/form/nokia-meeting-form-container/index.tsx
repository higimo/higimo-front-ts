import { FunctionComponent } from 'preact'
import { MentionSuggest } from 'components/mention-textarea/types'
import { NokiaMeetingSimpleType, NokiaPersonSimpleType, NokiaPersonType } from 'api-types/nokia.types'

import { useEffect } from 'preact/hooks'
import { MeetingFormValues, useMeetingForm } from 'components/nokia/form/hooks/use-meeting-form'

import { NokiaMeetingFields } from 'components/nokia/form/nokia-meeting-fields'
import { NokiaMeetingPersonFields } from 'components/nokia/form/nokia-meeting-person-fields'
import { ISOString } from 'utils.type'
import { createDateOnly } from 'utils/date/createDateOnly'

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
	const {
		formMethods,
		handleMeetingSubmit,
		handleAddPerson,
		handleRemovePerson,
		handleTextAssign,
		handleRemoveMeeting,
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
				// TODO: переделать типы
				values.date = createDateOnly(new Date()) as unknown as ISOString
			}
			if (!initialMeeting.type) {
				values.type = 'offline'
			}

			Object.assign(values, rest)
		}
		reset(values, { keepDefaultValues: true })
	}, [initialMeeting, initialPersons, reset])

	return (
		<form className="container nokia-form" onSubmit={handleSubmit(handleMeetingSubmit)}>
			{!!initialMeeting?.id && (
				<div className="nokia-form__action-bar">
					<button
						className="nokia-form__delete"
						type="button"
						onClick={handleRemoveMeeting(initialMeeting.id)}
					>
						Удалить
					</button>
				</div>
			)}
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
