import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'
import { API_ROUTE } from 'dic/api-route'
import useApi, { API_STATUS } from 'hook/use-api'
import { LinksType } from 'types'
import { LinksElement } from '../links-element'

export const LinksList = () => {
	const [ links ] = useApi<LinksType>(API_ROUTE.link)

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(links.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === links.status && !links.data.length) {
		return <NotFoundData />
	}

	return (
		<TextContainer>
			<ul>
				{links.data.map(item => <LinksElement {...item} />)}
			</ul>
		</TextContainer>
	)
}
