import { FunctionComponent } from 'preact'
import { YoutubeGalery } from 'components/youtube/youtube-galery/YoutubeGalery'

export const YoutubePage: FunctionComponent = () => {
	document.title = 'Избранные видосы'

	return <YoutubeGalery />
}
