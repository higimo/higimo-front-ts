import { FunctionComponent } from 'preact'
import { LinkDataType } from 'utils.type'

import { copyToClipboard } from 'utils/browser/copy-to-clipboard'


type HiringResponseResumeLinkItemPropsType = LinkDataType

export const HiringResponseResumeLinkItem: FunctionComponent<HiringResponseResumeLinkItemPropsType> = ({
	title,
	href,
	pdf,
}) => {
	const handleCopyClick = () => copyToClipboard(href as string)

	return (
		<span>
			<a href={href as string} className="nowrap">{title}</a>
			{pdf && (
				<a href={pdf}>{' '}[PDF]</a>
			)}
			<span onClick={handleCopyClick}>{' '}(⧉)</span>
		</span>
	)
}
