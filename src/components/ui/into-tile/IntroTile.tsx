import { FunctionComponent } from 'preact'
import { IntroImageMappingType, IntroLinkDataType } from 'utils.type'

import { useAuth } from 'hook/fetch/use-auth'

import { MaybeLink } from 'components/ui/maybe-link'

import cs from 'classnames'

import './style.css'

type IntoTilePropsType = IntroLinkDataType & {
	imageMapping?: IntroImageMappingType
	className?: string
}

export const IntoTile: FunctionComponent<IntoTilePropsType> = ({
	imageMapping,
	imgId,
	description,
	href,
	title,
	isAdmin,
	isArchive,
	isInactive,
	className,
}) => {
	const { isAuth, isAuthLoaded } = useAuth()
	if (isAdmin && (isAuthLoaded && !isAuth)) {
		return null
	}

	return (
		<MaybeLink
			href={href as string}
			className={cs(
				'intro-tile__item',
				{ 'tile-element--inactive': isInactive },
				{ 'tile-element--isarchive': isArchive },
				className,
			)}
		>
			{!!imgId && !!imageMapping && (
				<div className="tile-element__image-container">
					<img
						className="tile-element__img"
						src={imageMapping[imgId]}
					/>
				</div>
			)}
			<div className="intro-tile__anons">
				<div className="intro-tile__name">
					<span
						className="intro-tile__title"
						dangerouslySetInnerHTML={{ __html: title }}
					/>
				</div>
				<div
					className="intro-tile__description"
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			</div>
		</MaybeLink>
	)
}
