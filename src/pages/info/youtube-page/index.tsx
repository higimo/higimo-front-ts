import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { YoutubeGalery } from 'components/youtube/youtube-galery/YoutubeGalery'

export const YoutubePage: FunctionComponent = () => {
	usePageTitle('Избранные видосы')

	return <YoutubeGalery />
}
