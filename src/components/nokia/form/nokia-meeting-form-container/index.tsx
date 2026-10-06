import { FunctionComponent } from 'preact'
import { ISOString } from 'utils.type'
import { MeetingFormValues } from 'hook/nokia/use-meeting-form'
import { MentionSuggest } from 'components/mention-textarea/types'
import { NokiaMeetingSimpleType, NokiaPersonSimpleType, NokiaPersonType } from 'api-types/nokia.types'

import { useEffect } from 'preact/hooks'
import { useMeetingForm } from 'hook/nokia/use-meeting-form'

import { ButtonGroup } from 'components/form/button-group'
import { CollapseSection } from 'components/ui/collapse-section/CollapseSection'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'
import { MentionsInput } from 'components/mention-textarea/mention-input'
import { NokiaPersonTag } from 'components/nokia/nokia-person-tag'

import { createDateOnly } from 'utils/date/create-date-only'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

interface NokiaMeetingFormContainerProps {
	initialMeeting: NokiaMeetingSimpleType | undefined
	initialPersons: NokiaPersonSimpleType[]
	peoplesSuggest: MentionSuggest[]
	topPersons: NokiaPersonType[]
	persons: NokiaPersonType[]
}

// TODO: [MIDDLE] задавать бы ещё значение по умолчанию
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

	useEffect(() => {
		if (!initialMeeting && !initialPersons) {
			return
		}
		// TODO: [MIDDLE] попробуй без ифов это сделать
		let values: Partial<MeetingFormValues> = {
			persons: initialPersons ?? [],
		}
		if (initialMeeting) {
			const { date, ...rest } = initialMeeting

			if (date) {
				// TODO: [BACKEND] переделать типы
				values.date = createDateOnly(new Date()) as unknown as ISOString
			}
			if (!initialMeeting.type) {
				values.type = 'offline'
			}

			Object.assign(values, rest)
		}
		formMethods.reset(values, { keepDefaultValues: true })
	}, [initialMeeting, initialPersons, formMethods.reset])

	const selectedPersons = formMethods.watch('persons') || []

	const selectedPersonIds = selectedPersons.map(i => i.id)

	return (
<>
		<FullpageFormContainer>
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(handleMeetingSubmit)}
					autocomplete="off"
				>
					{!!initialMeeting?.id && (
						<ButtonGroup variant="gap">
							<FormButton
								type="button"
								onClick={handleRemoveMeeting(initialMeeting.id)}
							>
								Удалить
							</FormButton>
						</ButtonGroup>
					)}
					<FiledForm name="id" label="id" type="number" readonly />
					<FiledForm name="date" label="Когда?" type="date" required />
					<FiledForm
						name="date_start"
						label="Начало"
						type="datetime-local"
						description="Можно оставить пустым"
					/>
					<FiledForm
						name="date_end"
						label="Окончание"
						type="datetime-local"
						description="Можно оставить пустым, помогает рассчёту потраченного времени"
					/>
					<FiledForm
						name="type"
						label="Тип встречи"
						labelDescription="Нпрмр, offline, work, net, tg"
						description="Поможет для построения красивых статистических графиков"
					/>
					<label>Как прошло?</label>
					<MentionsInput
						suggestList={peoplesSuggest}
						onMention={handleTextAssign}
					/>
					<small>Упоминать персон через @</small>
					<hr />
					<a href={ROUTE_LINKS.nokiaPeopleForm}>[Создать персону]</a>

					<label>С кем </label>
					<div className="single-row">
						{!!selectedPersons.length && (
							<div>
								{selectedPersons.map(person => (
									<NokiaPersonTag
										onRemove={handleRemovePerson(person)}
										person={person}
									/>
								))}
							</div>
						)}
					</div>
					<div className="single-row">
						Самые частые
						<br />
						<small>Можно кликать</small>
						<div className="person-selector">
							{topPersons.map(person => {
								if (selectedPersonIds.includes(person.id)) {
									return null
								}
								return (
									<NokiaPersonTag
										onClick={handleAddPerson(person)}
										person={person}
									/>
								)
							})}
						</div>
					</div>
					<div className="single-row">
						<CollapseSection fold={true} header="Все подряд">
							<div className="person-selector">
								{persons.map(person => {
									if (selectedPersonIds.includes(person.id)) {
										return null
									}
									return (
										<NokiaPersonTag
											onClick={handleAddPerson(person)}
											person={person}
										/>
									)
								})}
							</div>
						</CollapseSection>
					</div>
					<ButtonGroup variant="gap">
						<FormButton
							type="submit"
							variant="default"
							disabled={formMethods.formState.isSubmitting}
						>
							{formMethods.formState.isSubmitting ? 'Добавление…' : 'Добавить'}
						</FormButton>
						{/* {formMethods.formState.isDirty && (
							<FormButton
								type="button"
								onClick={() => formMethods.reset(getResetValues(defaultValues, true))}
								variant="outline"
							>
								Очистить
							</FormButton>
						)} */}
						{/* {!!defaultValues?.id && (
							<FormButton
								type="button"
								onClick={handleRemove(defaultValues.id)}
								variant="outline"
							>
								Удалить
							</FormButton>
						)} */}
					</ButtonGroup>
				</form>
			</FormProvider>
		</FullpageFormContainer>
</>
	)
}
