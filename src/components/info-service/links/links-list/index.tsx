import { LinksType } from "../../../../types"

import useApi, { API_STATUS } from "../../../../hook/use-api"

import { TextContainer } from "../../../ui/text-container"
import { LinksElement } from "../links-element"
import { Loading } from "../../../accord/accord-single"
import { NotFoundData } from "../../../ui/not-found-data"


import { API_ROUTE } from "../../../../api-route"

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
