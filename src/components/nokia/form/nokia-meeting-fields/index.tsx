import { Fragment, FunctionComponent } from 'preact'
import { MeetingFormValues } from 'components/nokia/form/hooks/use-meeting-form'
import { UseFormReturn } from 'react-hook-form'

import { MentionsInput } from 'components/mention-textarea/mention-input'
import { MentionSuggest } from 'components/mention-textarea/types'

interface PersonMeetingFieldsProps {
	formMethods: UseFormReturn<MeetingFormValues>
	peoplesSuggest: MentionSuggest[]
	handleTextAssign: (trigger: string, slug: string) => string
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
					suggestList={peoplesSuggest}
					onMention={handleTextAssign}
				/>
				<div class="support">
					<small>Упомяните пользователя через @</small>
				</div>
			</div>
		</div>
	</Fragment>
)
