import { FunctionComponent } from 'preact'

import { useLocation } from 'preact-iso'

import { MaybeLink } from 'components/ui/maybe-link/maybe-link';

import { compareRoute } from 'utils/compare-route'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import avatar from './avatar.jpg'

import './style.css'

export const Logotype: FunctionComponent = () => {
	const { path } = useLocation()

	return (
		<div className="logotype-mini">
			<MaybeLink className="logotype-mini__text" href={ROUTE_LINKS.index} isHref={!compareRoute(ROUTE_LINKS.index, path)}>
				<img className="main-header__avatar" src={avatar} />
				Хиги́мо
			</MaybeLink>
		</div>
	)
}
