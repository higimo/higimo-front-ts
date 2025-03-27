import { FunctionComponent, JSX } from 'preact';

import { useCallback, useState } from 'preact/hooks';

import { isMention } from './utils/isMention';
import { ChangeEvent } from 'preact/compat';
import { getWrittenMention } from './utils/getWrittenMention';

import { MentionSuggest, MetionSelector } from './types';
import { MentionList } from './MentionList';

import './style.css'

type MentionsInputPropsType = {
	suggestList: MentionSuggest[];
	onMention: (MentionSuggest) => void
}
export const MentionsInput: FunctionComponent<MentionsInputPropsType> = (props) => {
	const [ value, setValue ] = useState<string>('')
	const [ mentions, setMentions ] = useState<MentionSuggest>(null)
	const [ showSuggestion, setShowSuggestion ] = useState<boolean>(false)
	const [ selectedSuggest, setSelectedSuggest ] = useState<number>(0)
	const [ filtredSuggestList, setFiltredSuggestList ] = useState<MentionSuggest[]>(props.suggestList)

	const handleKeyDown = useCallback((event: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) => {
		if (!showSuggestion) {
			return null
		}
		if (KEY.ESC === event.code) {
			event.preventDefault()
			setShowSuggestion(false)
		}
		if (KEY.UP === event.code) {
			event.preventDefault()
			setSelectedSuggest(getShiftSuggest(selectedSuggest, -1, filtredSuggestList))
		}
		if (KEY.DOWN === event.code) {
			event.preventDefault()
			setSelectedSuggest(getShiftSuggest(selectedSuggest, 1, filtredSuggestList))
		}
		if (KEY.TAB === event.code || (KEY.ENTER === event.code)) {
			event.preventDefault()
			setShowSuggestion(false)
			// @ts-ignore
			const mention = getWrittenMention(event.target.value, event.target.selectionStart)

			const targetMention = filtredSuggestList[selectedSuggest]
			const resultValue = [
				// @ts-ignore
				event.target.value.substring(0, mention.start),
				`@{${targetMention.display.replace(' ', '_')}}`,
				// @ts-ignore
				event.target.value.substring(mention.end),
			].join('')
			setValue(resultValue)
			setMentions(targetMention) // Вроде и не нужно ни для чего
			props.onMention(targetMention)
		}
	}, [showSuggestion, selectedSuggest, setSelectedSuggest, setShowSuggestion, setMentions, filtredSuggestList, setValue, props.onMention])

	const filterSuggestion = useCallback((filter: MetionSelector) => {
		if (!!filter) {
			setFiltredSuggestList(props.suggestList)
		}
		const regex = new RegExp(filter.text.split('').join('.*'), 'i')
		const newList = props.suggestList.filter(item => { return regex.test(item.display) })
		setFiltredSuggestList(
			newList
		)
		setSelectedSuggest(0)
	}, [])

	const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (isMention(event.currentTarget.value, event.currentTarget.selectionStart)) {
			setShowSuggestion(true)
			filterSuggestion(
				getWrittenMention(event.currentTarget.value, event.currentTarget.selectionStart)
			)
		}
		setValue(event.currentTarget.value)
	}, [setValue, setShowSuggestion, filterSuggestion])

	const handleBlur = useCallback(() => setShowSuggestion(false), [setShowSuggestion])

	return (
		<div className="mentions-input">
			<div>{JSON.stringify(mentions, null, '\t')}</div>
			<textarea
				className="mentions-input__field"
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onBlur={handleBlur}
			/>
			{showSuggestion && (
				<MentionList
					suggestList={filtredSuggestList}
					selectedSuggest={selectedSuggest}
					onSelect={(value: MentionSuggest) => setMentions(value)}
				/>
			)}
		</div>
	)
}