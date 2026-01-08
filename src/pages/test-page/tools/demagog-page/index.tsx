import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { TextContainer } from 'components/ui/text-container'
import { DemagogGalery } from 'components/info-service/demagog/demagog-galery'

import './style.css'

export const DemagogPage: FunctionComponent = () => {
	usePageTitle('Справочник демагога')

	return (
		<div className="demagog-page">
			<TextContainer>
				<p>
					Справочник демагога&nbsp;&mdash; это живой справочник полимических приемов. Этот справочник можно использовать во&nbsp;зло или во&nbsp;имя добра, склонять на&nbsp;свою сторону уловками и&nbsp;выводить оппонента на&nbsp;чистую воду. Ничто не&nbsp;истина, будьте осторожны и&nbsp;правы. Приветствуется распространение ссылок на&nbsp;справочник.
				</p>
			</TextContainer>
			<DemagogGalery />
		</div>
	)
}
