import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'
import { AUTH_STATUS_DIC, useAuth } from 'hook/use-auth'

import { TextContainer } from 'components/ui/text-container'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'

export const AdminPage: FunctionComponent = () => {
	usePageTitle('Настольные игры')

	const { isAuth, statusLoading, redirectToLogin } = useAuth()
	if (!isAuth && AUTH_STATUS_DIC.AUTHENTICATED === statusLoading) {
		redirectToLogin()
	}

	return (
		<div className="obuchenie-page">
			<TextContainer>
				<h1>Административная страница</h1>
				<a href={EXTERNAL_LINKS.canalRak}>Раковарня</a> (<a href={EXTERNAL_LINKS.canalRakAdmin}>Админка</a>)
				<br />
				<a href={EXTERNAL_LINKS.canalHigimo}>Хигимо</a>
				<br />
				<a href={EXTERNAL_LINKS.canalScreen}>Скриншотил</a>
			</TextContainer>
		</div>
	)
}
