import { FunctionComponent, Fragment } from 'preact'
import { ResumeLinkType } from 'data/RESUME_LINKS'

import { copyToClipboard } from 'utils/browser/copy-to-clipboard'


type HiringResponseResumeLinkPropsType = ResumeLinkType

export const HiringResponseResumeLink: FunctionComponent<HiringResponseResumeLinkPropsType> = ({
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
