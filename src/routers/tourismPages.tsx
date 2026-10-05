import { Route } from 'preact-iso'

import { NasheIndexPage } from 'pages/tourism/nashe/nashe-page'
import { NasheSinglePage } from 'pages/tourism/nashe/nashe-single-page'
import { TourismChecklistPage } from 'pages/tourism/tourism-checklist-page'
import { TourismCityStarPage } from 'pages/tourism/tourism-city-star-page'
import { TourismFatherTrackPage } from 'pages/tourism/tourism-father-track-page'
import { TourismIndexPage } from 'pages/tourism/tourism-index'
import { TourismMapsPage } from 'pages/tourism/tourism-maps-page'
import { TourismMoscowBarPage } from 'pages/tourism/tourism-ya-maps/tourism-moscow-bar'
import { TourismMoscowMuseumPage } from 'pages/tourism/tourism-moscow-museum-page'
import { TourismMoscowWalkaroundPage } from 'pages/tourism/tourism-ya-maps/tourism-moscow-walkaround-page'
import { TourismVisitedPage } from 'pages/tourism/tourism-visited-page'
import { TourismWalkSinglePage } from 'pages/tourism/tourism-walk-single-page'
import { TourismYaMapsRegionPage } from 'pages/tourism/tourism-ya-maps/tourism-ya-maps-region-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Туризм
export const tourismPages = [
	<Route path={ROUTE_LINKS.tourismIndex} component={TourismIndexPage} />,
	<Route path={ROUTE_LINKS.tourismChecklist} component={TourismChecklistPage} />,
	<Route path={ROUTE_LINKS.tourismCityIndex} component={TourismCityStarPage} />,
	<Route path={ROUTE_LINKS.tourismFatherTrack} component={TourismFatherTrackPage} />,
	<Route path={ROUTE_LINKS.tourismMaps} component={TourismMapsPage} />,
	<Route path={ROUTE_LINKS.tourismMapsMoscowBar} component={TourismMoscowBarPage} />,
	<Route path={ROUTE_LINKS.tourismMapsMoscowWalkaround} component={TourismMoscowWalkaroundPage} />,
	<Route path={ROUTE_LINKS.tourismMapsRegion} component={TourismYaMapsRegionPage} />,
	<Route path={ROUTE_LINKS.tourismNashe_CONST} component={NasheSinglePage} />,
	<Route path={ROUTE_LINKS.tourismNashe} component={NasheIndexPage} />,
	<Route path={ROUTE_LINKS.tourismVisited} component={TourismVisitedPage} />,
	<Route path={ROUTE_LINKS.tourismMoscowMuseum} component={TourismMoscowMuseumPage} />,
	<Route path={ROUTE_LINKS.tourismWalkDetail_CONST} component={TourismWalkSinglePage} />,
]
