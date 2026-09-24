import { NokiaPersonSimpleType } from 'api-types/nokia.types'
import { MentionsInput } from 'components/mention-textarea/mention-input'
import { MentionSuggest } from 'components/mention-textarea/types'
import { MeetingFormValues } from 'components/nokia/form/hooks/use-meeting-form'
import { Loading } from 'components/ui/loading/Loading'
import { API_ROUTE } from 'dic/API_ROUTE'
import { useApi } from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { Fragment, FunctionComponent } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'
import { UseFormReturn } from 'react-hook-form'

import { Controller } from 'react-hook-form'

interface PersonMeetingFieldsProps {
	formMethods: UseFormReturn<MeetingFormValues>
	peoplesSuggest: MentionSuggest[]
	handleTextAssign: (trigger: string, slug: string) => string
}

// TODO: [HARD] Кажись, использовать https://github.com/yury-dymov/react-autocomplete-input/tree/master хуёвая идея, надо его переписать на свой компонент!
export const NokiaMeetingFields: FunctionComponent<PersonMeetingFieldsProps> = ({
	formMethods: { register, control },
	peoplesSuggest,
	handleTextAssign,
}) => {
	const [ personList ] = useApi<NokiaPersonSimpleType[]>(API_ROUTE.nokiaPerson)
	const [ mentionList, setMentionList ] = useState<MentionSuggest[]>([])
	const isLoading = useLoadingState([personList.status])
	const isEmpty = useEmptyDataState(personList.data)

	// const appendMentionList = useCallback((newMentionList: MentionSuggest[]) => {
	// 	console.log(newMentionList)
	// 	setMentionList(newMentionList)
	// }, [setMentionList])

	const suggestList: MentionSuggest[] = useMemo(() => {
		return personList.data.map(item => ({
			id: item.id,
			display: [item.name, item.alias, item.nick].filter(Boolean).join(' | '),
		}))
	}, [personList.data])

	if (isLoading) {
		return <Loading />
	}

	return (
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

					<pre>{JSON.stringify(mentionList, null, '\t')}</pre>
					<MentionsInput
						suggestList={peoplesSuggest}
						onMention={handleTextAssign}
					/>
					{/* <Controller
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
					/> */}
					<div class="support">
						<small>Упомяните пользователя через @</small>
					</div>
				</div>
			</div>
		</Fragment>
	)
}
