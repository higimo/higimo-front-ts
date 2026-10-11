import { FunctionComponent } from 'preact'

import { useLocation } from 'preact-iso'

import { MaybeLink } from 'components/ui/maybe-link'

import { compareRoute } from 'utils/url-route/compare-route'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import avatar from './img/avatar.jpg'

import './style.css'

export const Logotype: FunctionComponent = () => {
	const { path } = useLocation()

	return (
		<div className="logotype-mini">
			<MaybeLink className="logotype-mini__text" href={ROUTE_LINK.index} isHref={!compareRoute(ROUTE_LINK.index, path)}>
				<img className="main-header__avatar" src={avatar} />
				Хиги́мо
			</MaybeLink>
		</div>
	)
}
