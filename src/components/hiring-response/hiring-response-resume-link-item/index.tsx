import { FunctionComponent, Fragment } from 'preact'
import { ResumeLinkType } from 'data/resume-link'

import { copyToClipboard } from 'utils/browser/copy-to-clipboard'


type HiringResponseResumeLinkItemPropsType = ResumeLinkType

export const HiringResponseResumeLinkItem: FunctionComponent<HiringResponseResumeLinkItemPropsType> = ({
	title,
	href,
	copy,
	pdf,
}) => {
	const handleCopyClick = () => {
		copyToClipboard(copy)
	}

	return (
		<Fragment>
			<a href={href} className="nowrap">{title}</a>
			{pdf && (
				<a href={pdf}>{' '}[PDF]</a>
			)}
			{copy && (
				<span onClick={handleCopyClick}>{' '}(⧉)</span>
			)}
		</Fragment>
	)
}
