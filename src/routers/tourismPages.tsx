import { Route } from 'preact-iso'

import { NasheDetailPage } from 'pages/tourism/nashe/nashe-detail-page'
import { NasheListPage } from 'pages/tourism/nashe/nashe-list-page'
import { TourismChecklistPage } from 'pages/tourism/tourism-checklist-page'
import { TourismCityStarPage } from 'pages/tourism/tourism-city-star-page'
import { TourismFatherTrackPage } from 'pages/tourism/adventure/tourism-father-track-page'
import { TourismIndexPage } from 'pages/tourism/tourism-index-page'
import { TourismMapListPage } from 'pages/tourism/tourism-maps-page'
import { TourismMoscowBarPage } from 'pages/tourism/experiment/tourism-moscow-bar-page'
import { TourismMoscowMuseumPage } from 'pages/tourism/experiment/tourism-moscow-museum-page'
import { TourismMoscowWalkaroundPage } from 'pages/tourism/experiment/tourism-moscow-walkaround-page'
import { TourismVisitedPage } from 'pages/tourism/tourism-visited-page'
import { TourismWalkDetailPage } from 'pages/tourism/experiment/tourism-walk-detail-page'
import { TourismYaMapsRegionDetailPage } from 'pages/tourism/experiment/tourism-ya-maps-region-detail-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Туризм
export const tourismPages = [
	<Route path={ROUTE_LINK.tourismIndex} component={TourismIndexPage} />,
	<Route path={ROUTE_LINK.tourismChecklist} component={TourismChecklistPage} />,
	<Route path={ROUTE_LINK.tourismMaps} component={TourismMapListPage} />,
	<Route path={ROUTE_LINK.tourismWalkDetail_CONST} component={TourismWalkDetailPage} />,

	/* main info */
	<Route path={ROUTE_LINK.tourismCityIndex} component={TourismCityStarPage} />,
	<Route path={ROUTE_LINK.tourismVisited} component={TourismVisitedPage} />,

	/* adventure */
	<Route path={ROUTE_LINK.tourismFatherTrack} component={TourismFatherTrackPage} />,

	/* nashe */
	<Route path={ROUTE_LINK.tourismNashe_CONST} component={NasheDetailPage} />,
	<Route path={ROUTE_LINK.tourismNashe} component={NasheListPage} />,

	/* experiment */
	<Route path={ROUTE_LINK.tourismMapsMoscowWalkaround} component={TourismMoscowWalkaroundPage} />,
	<Route path={ROUTE_LINK.tourismMapsMoscowBar} component={TourismMoscowBarPage} />,
	<Route path={ROUTE_LINK.tourismMoscowMuseum} component={TourismMoscowMuseumPage} />,
	<Route path={ROUTE_LINK.tourismMapsRegion} component={TourismYaMapsRegionDetailPage} />,
]
