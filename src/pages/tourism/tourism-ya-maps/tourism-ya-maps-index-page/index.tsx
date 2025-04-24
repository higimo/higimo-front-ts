import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { TextContainer } from '../../../../components/ui/text-container'
import { Breadcrumps } from '../../../../components/ui/breadcrumps'
import { TourismMainMenu } from '../../../../components/tourism/tourism-main-menu'

import { ROUTE_LINKS } from '../../../../dic/ROUTE_LINKS'

import '../../tourism-style.css'

const data = [
    {
        href: ROUTE_LINKS.tourismMapsMoscowWalk,
        title: 'Я обхожу Москву (пока исключение не работает)',
    },
] as const

export const TourismYaMapsIndexPage: FunctionComponent = () => {
	const { path } = useRoute()

	document.title = 'На Яндекс картах'

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps path={path} />
			<TextContainer>
				<h1>На Яндекс картах</h1>
			</TextContainer>
			<TextContainer>
				<a href={ROUTE_LINKS.tourismMapsRegion}>Посещённые районы</a>
			</TextContainer>
			<TextContainer>
				<h2>Экспериментальная демонстрация</h2>
			</TextContainer>
            <TextContainer>
				<div className="tourism-walk-gallery__list">
                    {data.map(item => (
						<div className="tourism-walk-gallery__item">
							<a href={item.href}>{item.title}</a>
						</div>
					))}
				</div>
			</TextContainer>
		</div>
	)
}
