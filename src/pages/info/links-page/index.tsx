import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { LinksList } from 'components/info-service/links/links-list'

export const LinksPage: FunctionComponent = () => {
	usePageTitle('Избранные ссылки')

	return (
		<div className="links-page">
			<TextContainer>
				<h2>Избранные ссылки</h2>
				<p>
					Собираю ссылки, которые впечатлили меня. Хочу чтобы про них знало побольше людей.
				</p>
			</TextContainer>
			<LinksList />
		</div>
	)
}
