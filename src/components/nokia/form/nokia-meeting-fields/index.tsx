import { MeetingFormValues } from 'components/nokia/form/hooks/use-meeting-form'
import { Fragment, FunctionComponent } from 'preact'
import { UseFormReturn } from 'react-hook-form'

import TextInput from 'react-autocomplete-input'
import { Controller } from 'react-hook-form'

interface PersonMeetingFieldsProps {
	formMethods: UseFormReturn<MeetingFormValues>
	peoplesSuggest: string[]
	handleTextAssign: (trigger: string, slug: string) => string
}

// TODO: [HARD] Кажись, использовать https://github.com/yury-dymov/react-autocomplete-input/tree/master хуёвая идея, надо его переписать на свой компонент!
export const NokiaMeetingFields: FunctionComponent<PersonMeetingFieldsProps> = ({
	formMethods: { register, control },
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
				<Controller
					name="description"
					control={control}
					defaultValue=""
					render={({ field }) => (
						// @ts-ignore
						<TextInput
							{...field}
							trigger="@"
							maxOptions={0}
							regex={'.'}
							options={peoplesSuggest}
							changeOnSelect={handleTextAssign}
						/>
					)}
				/>
				<div class="support">
					<small>Упомяните пользователя через @</small>
				</div>
			</div>
		</div>
	</Fragment>
)
