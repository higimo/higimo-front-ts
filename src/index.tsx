import { render } from 'preact'

import { Footer } from 'components/ui/footer'
import { Header } from 'components/ui/header'
import { LocationProvider, Router, Route, ErrorBoundary } from 'preact-iso'
import { ToastContainer } from 'toast'

import { NotFoundPage } from 'pages/not-found-page'

import { aboutPages } from 'routers/aboutPages'
import { accordPages } from 'routers/accordPages'
import { adminPages } from 'routers/adminPages'
import { funServicePages } from 'routers/funServicePages'
import { indexPages } from 'routers/indexPages'
import { infoPages } from 'routers/infoPages'
import { merchantPages } from 'routers/merchantPages'
import { nestedListPages } from 'routers/nestedListPages'
import { portfolioPages } from 'routers/portfolioPages'
import { resumePages } from 'routers/resumePages'
import { secretDevPages } from 'routers/secretDevPages'
import { servicePages } from 'routers/servicePages'
import { sweebePages } from 'routers/sweebePages'
import { tourismPages } from 'routers/tourismPages'
import { vkToolPages } from 'routers/vkToolPages'

import './style.css'

export function App() {
	return (
		<LocationProvider>
			<ErrorBoundary onError={(e) => console.log(e)}>
				<Header />
				<main>
					<Router>
						{indexPages}
						{merchantPages}
						{adminPages}
						{secretDevPages}
						{portfolioPages}
						{nestedListPages}
						{accordPages}
						{servicePages}
						{funServicePages}
						{resumePages}
						{infoPages}
						{aboutPages}
						{sweebePages}
						{vkToolPages}
						{tourismPages}

						<Route default component={NotFoundPage} />
					</Router>
				</main>
				<div id="vk_api_transport" />
				<ToastContainer />
				<Footer />
			</ErrorBoundary>
		</LocationProvider>
	)
}

// @ts-ignore
render(<App />, document.getElementById('app'))
