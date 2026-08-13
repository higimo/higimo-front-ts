import { ComponentChildren, FunctionComponent } from 'preact'

import cs from 'classnames'

import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'
import { CategoryTitle } from 'components/intro/blog-invite/category-title'

import './style.css'

/**
* @param id Ссылка для якоря, чтоб подскраливать
* @param title Название галереи
* @param left Контент слева
* @param right Контент справа, опционально
*/
type TilesGalleryProps = {
	className?: string
	id?: string
	title: string
	left: ComponentChildren
	right?: ComponentChildren
}

export const TilesGallery: FunctionComponent<TilesGalleryProps> = ({ id, title, left, right, className }) => (
	<PrecentationContainer className={cs('tiles-gallery', className)} id={id}>
		<TextContainer>
			{!!title && (
				<CategoryTitle className={cs('tiles-gallery__title', `${className}__title`)}>{title}</CategoryTitle>
			)}
		</TextContainer>
		<TextContainer className="tiles-gallery__content">
			<div
				className={cs(
					'tiles-gallery__columns',
					{ 'tiles-gallery__columns--single': !right }
				)}
			>
				<div class="tiles-gallery__container">
					{left}
				</div>
				{!!right && (
					<div class="tiles-gallery__container">
						{right}
					</div>
				)}
			</div>
		</TextContainer>
	</PrecentationContainer>
)
