import { FunctionComponent } from 'preact'
import { MentionSuggest } from 'components/form/mention-textarea/types'
import { NokiaMeetingSimpleType, NokiaPersonSimpleType, NokiaPersonType } from 'api-types/nokia.types'

import { useMeetingForm } from 'hook/nokia/use-meeting-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FromContainer } from 'components/form/form-container'
import { MentionTextarea } from 'components/form/mention-textarea/mention-input'
import { NokiaPersonTag } from 'components/nokia/nokia-person-tag'

import { handleApiError } from 'utils/api/handle-errors/handle-api-error'
import { meetingApi } from 'repositories/meeting-api.repository'
import { toast } from 'toast'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

interface NokiaMeetingFormContainerProps {
	initialMeeting: NokiaMeetingSimpleType | undefined
	initialPersonList: NokiaPersonSimpleType[]
	personSuggestList: MentionSuggest[]
	topPersonList: NokiaPersonType[] | null
	personList: NokiaPersonType[] | null
}

const handleRemove = (id: NokiaMeetingSimpleType['id']) => async () => {
	try {
		// TODO: [BACKEND] чо придёт?
		const res = await meetingApi.delete(id)
		if (!!res) {
			toast.success(`Удалён [${id}]`)
		}
		toast.success('Удалено')
		// TODO: [FEATURE] после удаления перекидывать в список встреч
	} catch (error) {
		handleApiError(error)
	}
}

export const NokiaMeetingForm: FunctionComponent<NokiaMeetingFormContainerProps> = ({
	initialMeeting,
	initialPersonList,
	personSuggestList,
	topPersonList,
	personList,
}) => {
	if (!topPersonList || !personList) {
		return null
	}
	const {
		formMethods,
		handleMeetingSubmit,
		handleAddPerson,
		handleRemovePerson,
		handleTextAssign,
		handleRemoveMeeting,
	} = useMeetingForm({
		persons: personList,
		initialMeeting,
		initialPersonList,
	})

	const selectedPersons = formMethods.watch('persons') || []

	const selectedPersonIds = selectedPersons.map(i => i.id)

	return (
		<FromContainer variant="full">
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
					<label className="field__label">Как прошло?</label>
					<MentionTextarea
						name="description"
						suggestList={personSuggestList}
						onMention={handleTextAssign}
					/>
					<div className="field__description">Упоминать персон через @</div>
					<label className="field__label">С кем </label>
					<div className="nokia-with-person">
						{!!selectedPersons.length && (
							<div>
								{selectedPersons.map(person => (
									<NokiaPersonTag
										key={person.id}
										onRemove={handleRemovePerson(person)}
										person={person}
									/>
								))}
							</div>
						)}
					</div>
					<div className="single-row">
						<div className="field__label">
							Самые частые
							{' | '}<a href={ROUTE_LINK.nokiaPeopleForm}>Создать персону</a>
						</div>
						<div className="person-selector">
							{topPersonList.map(person => {
								if (selectedPersonIds.includes(person.id)) {
									return null
								}
								return (
									<NokiaPersonTag
										key={person.id}
										onClick={handleAddPerson(person)}
										person={person}
									/>
								)
							})}
						</div>
						<div className="field__description">
							Можно кликать
						</div>
					</div>
					<ButtonGroup variant="gap">
						<FormButton
							type="submit"
							variant="default"
							disabled={formMethods.formState.isSubmitting}
						>
							{formMethods.formState.isSubmitting ? 'Добавление…' : 'Добавить'}
						</FormButton>
						{formMethods.formState.isDirty && (
							<FormButton
								type="button"
								// onClick={() => formMethods.reset(getResetValues(defaultValues, true))}
								onClick={() => formMethods.reset()}
								variant="outline"
							>
								Очистить
							</FormButton>
						)}
						{!!initialMeeting?.id && (
							<FormButton
								type="button"
								onClick={handleRemove(initialMeeting.id)}
								variant="outline"
							>
								Удалить
							</FormButton>
						)}
					</ButtonGroup>
				</form>
			</FormProvider>
		</FromContainer>
	)
}
