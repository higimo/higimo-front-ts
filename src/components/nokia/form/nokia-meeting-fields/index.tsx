import { Fragment, FunctionComponent } from 'preact'
import { MeetingFormValues } from 'components/nokia/form/hooks/use-meeting-form'
import { UseFormReturn } from 'react-hook-form'

import { MentionsInput } from 'components/mention-textarea/mention-input'
import { MentionSuggest } from 'components/mention-textarea/types'

interface PersonMeetingFieldsProps {
	formMethods: UseFormReturn<MeetingFormValues>
	peoplesSuggest: MentionSuggest[]
	handleTextAssign: (newMentionList: MentionSuggest[]) => void
}

export const NokiaMeetingFields: FunctionComponent<PersonMeetingFieldsProps> = ({
	formMethods: { register },
	peoplesSuggest,
	handleTextAssign,
}) => (
	<Fragment>
		<div className="form-row">
			<div>
				<label>id</label>
			</div>
			<div>
				<input {...register('id')} readOnly name="id" />
			</div>
		</div>

		<div className="form-row">
			<div>
				<label>Когда?</label>
			</div>
			<div>
				<input {...register('date')} type="date" name="date" />
			</div>
		</div>

		<div className="form-row">
			<div>
				<label>Начало</label>
			</div>
			<div>
				<input {...register('date_start')} type="datetime-local" name="date_start" />
				<div class="support">
					<small>Можно оставить пустым</small>
				</div>
			</div>
		</div>
		<div className="form-row">
			<div>
				<label>Окончание</label>
			</div>
			<div>
				<input {...register('date_end')} type="datetime-local" name="date_end" />
				<div class="support">
					<small>Можно оставить пустым, помогает рассчёту потраченного времени</small>
				</div>
			</div>
		</div>

		<div className="form-row">
			<div>
				<label>Тип встречи</label>
			</div>
			<div>
				<input type="text" {...register('type')} name="type" />
				<div class="support">
					<small>Нпрмр, offline, work, net, tg</small>
				</div>
				<div class="support">
					<small>Поможет для построения красивых статистических графиков</small>
				</div>
			</div>
		</div>

		<div className="form-row">
			<div class="single-row">
				<label>Как прошло?</label>
			</div>
			<div class="single-row">
				<MentionsInput
					register={register('description')}
					suggestList={peoplesSuggest}
					onMention={handleTextAssign}
				/>
				<div class="support">
					<small>Упоминать персон через @</small>
				</div>
			</div>
		</div>
	</Fragment>
)
