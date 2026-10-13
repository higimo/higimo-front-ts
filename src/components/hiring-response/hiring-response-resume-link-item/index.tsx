import { FunctionComponent } from 'preact'
import { LinkDataType } from 'utils.type'

import { copyToClipboard } from 'utils/browser/copy-to-clipboard'


type HiringResponseResumeLinkItemPropsType = LinkDataType & { copy: string }

export const HiringResponseResumeLinkItem: FunctionComponent<HiringResponseResumeLinkItemPropsType> = ({
	title,
	href,
	copy,
	pdf,
}) => {
	const handleCopyClick = () => copyToClipboard(copy)

	return (
		<span>
			<a href={href as string} className="nowrap">{title}</a>
			{pdf && (
				<a href={pdf}>{' '}[PDF]</a>
			)}
			{copy && (
				<span onClick={handleCopyClick}>{' '}(⧉)</span>
			)}
		</span>
	)
}
