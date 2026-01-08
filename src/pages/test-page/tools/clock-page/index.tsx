import { Fragment, FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { TextContainer } from 'components/ui/text-container'
import { Clock } from 'components/data/clock'

import { clockData } from './data'
	
export const ClockPage: FunctionComponent = () => {
	usePageTitle('Часы русского судного дня')

	return (
		<Fragment>
			<TextContainer>
				<h1>Часы русского судного дня</h1>
			</TextContainer>
			<TextContainer>
				<h2>Памятка автору</h2>
				<p>
					Когда выходит меньше миллиона по стране это даже не 22 часа, это херня.
				</p>
				<p>
					Когда гражданская война это полночь
				</p>
			</TextContainer>
			<Clock hour={11} minute={45} />
			<TextContainer>
				<table>
					<tbody>
						{clockData.map(item => (
							<tr>
								<td>{item.time}</td>
								<td>{item.date}</td>
								<td>{item.description}</td>
							</tr>
						))}
					</tbody>
				</table>
			</TextContainer>
		</Fragment>
	)
}
