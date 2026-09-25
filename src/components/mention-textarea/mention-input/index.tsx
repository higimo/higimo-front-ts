import { FunctionComponent } from 'preact'
import { KeyDownEvent } from 'utils.type'

import { useCallback, useRef, useState } from 'preact/hooks'

import { MentionList } from 'components/mention-textarea/mention-list'
import { MentionSuggest, MetionSelector } from 'components/mention-textarea/types'

import { KEY } from 'components/mention-textarea/KEY'

import { getMentionList } from 'components/mention-textarea/utils/get-mention-list'
import { getShiftSuggest } from 'components/mention-textarea/utils/get-shift-suggest'
import { getWrittenMention } from 'components/mention-textarea/utils/get-written-mention'
import { isMention } from 'components/mention-textarea/utils/is-mention'
import { normalizeMentionList } from 'components/mention-textarea/utils/normalize-mention-list'

import '../style.css'

type MentionsInputPropsType = {
	suggestList: MentionSuggest[]
	onMention: (mentionList: MentionSuggest[]) => void
	register: any
}

export const MentionsInput: FunctionComponent<MentionsInputPropsType> = (props) => {
	const [ inputValue, setInputValue ] = useState<string>('')
	const [ showSuggestion, setShowSuggestion ] = useState<boolean>(false)
	const [ selectedSuggest, setSelectedSuggest ] = useState<number>(0)
	const [ filtredSuggestList, setFiltredSuggestList ] = useState<MentionSuggest[]>(props.suggestList)
	const refTextarea = useRef<HTMLTextAreaElement>(null)

	const handleMentionSelect = useCallback((targetMention: MentionSuggest) => {
		if (!refTextarea.current) {
			return undefined
		}

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
		if (!refTextarea.current) {
			return undefined
		}

		const mentionList = normalizeMentionList(
			getMentionList(refTextarea.current.value),
			filtredSuggestList
		)
		props.onMention(mentionList)
	}, [props.onMention, refTextarea, filtredSuggestList])

	const handleKeyDown = useCallback((event: KeyDownEvent) => {
		if (!showSuggestion) {
			return undefined
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

			if (!targetMention) {
				console.warn('targetMention из фильтрованного списка не выбрался')
				return undefined
			}
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
		const newList = props.suggestList.filter(item => regex.test(item.display))
		setFiltredSuggestList(
			newList
		)
		setSelectedSuggest(0)
	}, [])

	const handleChange = useCallback(() => {
		if (!refTextarea.current) {
			return undefined
		}

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
				{...props.register}
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
