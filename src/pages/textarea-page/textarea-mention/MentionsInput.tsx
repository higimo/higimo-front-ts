import { FunctionComponent, JSX } from 'preact';

import { useCallback, useRef, useState } from 'preact/hooks';

import { MentionList } from './MentionList';

import { KEY } from './KEY'

import './style.css'
import { MentionSuggest, MetionSelector } from './types';
import { getWrittenMention } from './utils/getWrittenMention';
import { getMentionList } from './utils/getMentionList';
import { isMention } from './utils/isMention';
import { getShiftSuggest } from './utils/getShiftSuggest';

type MentionsInputPropsType = {
	suggestList: MentionSuggest[];
	onMention: (mentionList: MentionSuggest[]) => void
}
// TODO: добавить в нокиа
export const MentionsInput: FunctionComponent<MentionsInputPropsType> = (props) => {
	const [ inputValue, setInputValue ] = useState<string>('')
	const [ showSuggestion, setShowSuggestion ] = useState<boolean>(false)
	const [ selectedSuggest, setSelectedSuggest ] = useState<number>(0)
	const [ filtredSuggestList, setFiltredSuggestList ] = useState<MentionSuggest[]>(props.suggestList)
	const refTextarea = useRef<HTMLTextAreaElement>(null)

	const handleMentionSelect = useCallback((targetMention: MentionSuggest) => {
		setShowSuggestion(false)

		const mention = getWrittenMention(refTextarea.current.value, refTextarea.current.selectionStart)
		const resultValue = [
			refTextarea.current.value.substring(0, mention.start),
			`@{${targetMention.display.replace(' ', '_')}}`,
			refTextarea.current.value.substring(mention.end),
		].join('')
		setInputValue(resultValue)

		setTimeout(handleMentionValidation, 0)
	}, [setShowSuggestion, setInputValue, refTextarea])

	const handleMentionValidation = useCallback(() => {
		const list = getMentionList(refTextarea.current.value)
		const mentionList = list.map(item => {
			const cleanName = item.replace(/[}{]/g, '').replace('_', ' ')
			for (const mentionItem of filtredSuggestList) {
				if (mentionItem.display === cleanName) {
					return mentionItem
				}
			}
		})
		props.onMention(mentionList)
	}, [props.onMention, refTextarea, filtredSuggestList])

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
			const targetMention = filtredSuggestList[selectedSuggest]

			handleMentionSelect(targetMention)
		}
	}, [
		showSuggestion,
		selectedSuggest,
		setSelectedSuggest,
		setShowSuggestion,
		filtredSuggestList,
		setInputValue
	])

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

	const handleChange = useCallback(() => {
		if (isMention(refTextarea.current.value, refTextarea.current.selectionStart)) {
			setShowSuggestion(true)
			filterSuggestion(
				getWrittenMention(refTextarea.current.value, refTextarea.current.selectionStart)
			)
		}
		setInputValue(refTextarea.current.value)
		setTimeout(handleMentionValidation, 0)
	}, [setInputValue, setShowSuggestion, filterSuggestion])

	const handleBlur = useCallback(() => {
		setTimeout(() => setShowSuggestion(false), 200)
	}, [setShowSuggestion])

	return (
		<div className="mentions-input">
			<textarea
				ref={refTextarea}
				className="mentions-input__field"
				value={inputValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onBlur={handleBlur}
			/>
			{showSuggestion && (
				<MentionList
					suggestList={filtredSuggestList}
					selectedSuggest={selectedSuggest}
					onSelect={(value: MentionSuggest) => handleMentionSelect(value)}
				/>
			)}
		</div>
	)
}