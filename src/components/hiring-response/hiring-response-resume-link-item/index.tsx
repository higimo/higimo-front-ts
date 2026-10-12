import { FunctionComponent, Fragment } from 'preact'
import { LinkDataType } from 'utils.type'

import { copyToClipboard } from 'utils/browser/copy-to-clipboard'


type HiringResponseResumeLinkItemPropsType = LinkDataType

export const HiringResponseResumeLinkItem: FunctionComponent<HiringResponseResumeLinkItemPropsType> = ({
	title,
	href,
	copy,
	pdf,
}) => {
	const handleCopyClick = () => {
		// TODO: [LIGHT] прокинуть тип, чтоб избавить от as string
		copyToClipboard(copy as string)
	}

	return (
		<Fragment>
			{/* TODO: [LIGHT] добавить в глобальный интрисинк этот тип и избавиться от as string */}
			<a href={href as string} className="nowrap">{title}</a>
			{pdf && (
				<a href={pdf}>{' '}[PDF]</a>
			)}
			{copy && (
				<span onClick={handleCopyClick}>{' '}(⧉)</span>
			)}
		</Fragment>
	)
}
