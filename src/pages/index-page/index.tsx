import { AboutInvite } from "../../components/intro/about-invite"
import { BlogInvite } from "../../components/intro/blog-invite"
import { BugreportOfDay } from "../../components/intro/bugreport-of-day"
import { ContactList } from "../../components/intro/contact-list"
import { DonatIntro } from "../../components/intro/donat-intro"
import { LastUpdates } from "../../components/intro/last-updates"
import { LogismSingle } from "../../components/intro/logism-single"
import { LookedThis } from "../../components/intro/looked-this"
import { MainIntro } from "../../components/intro/main-intro"
import { ProjectListShort } from "../../components/intro/project-list-short"
import { RightNowIDo } from "../../components/intro/right-now-i-do"
import { ShareKnowledge } from "../../components/intro/share-knowledge"
import { ToolsIntro } from "../../components/intro/tools-intro"
import { TravelInvite } from "../../components/intro/travel-invite"
import { OnlyAdmin } from "../../components/util/only-admin"

// import AccordLink           from 'components/intro/accord-link'
// import ApocalypseClock      from 'components/intro/apocalypse-clock'
// import BugreportOfDay       from 'components/intro/bugreport-of-day'
// import CinemaGallery        from 'components/intro/cinema-gallery'
// import FaqGallery           from 'components/intro/faq-gallery'
// import LectionGallery       from 'components/intro/lection-gallery'
// import LinkOfDay            from 'components/intro/link-of-day'
// import MyItemsInvite        from 'components/intro/my-items-invite'
// import NokiaInto            from 'components/intro/nokia-into'
// import RomaSchool           from 'components/intro/roma-school'
// import TourismCityStar      from 'components/intro/tourism-city-star'
// import WhishList            from 'components/intro/whish-list'
// import YoutubeOfDay         from 'components/intro/youtube-of-day'

// import { FunctionComponent } from 'preact';
// import './style.css';
// import { useRoute } from 'preact-iso/router';

// type ResourceProps = {
// 	href: string,
// 	title: string,
// 	description: string
// }

// const Resource: FunctionComponent<ResourceProps> = (props) => {
// 	return (
// 		<a href={props.href} target="_blank" class="resource">
// 			<h2>{props.title}</h2>
// 			<p>{props.description}</p>
// 		</a>
// 	);
// }

export const IndexPage = () => {
	if (typeof window !== 'undefined') {
		document.title = 'higimo — программист на Java Script'
	}

	return [
		<MainIntro />,
		<LastUpdates />,
		<OnlyAdmin><RightNowIDo /></OnlyAdmin>,
		<ProjectListShort />,
		<ContactList />,
		<ShareKnowledge />,
		<BlogInvite />,
		<TravelInvite />,
		<ToolsIntro />,
		<AboutInvite />,
		<LookedThis />,
		<BugreportOfDay />,
		<LogismSingle />,
		<OnlyAdmin><DonatIntro /></OnlyAdmin>,

		// <WhishList />,
		// <OnlyAdmin><TourismCityStar /></OnlyAdmin>,
		// <YoutubeOfDay />,
		// <CinemaGallery />,
		// <OnlyAdmin><RomaSchool /></OnlyAdmin>,
		// <LinkOfDay />,
		// <LectionGallery />,
		// <FaqGallery />,
		// <AccordLink />,
		// <OnlyAdmin><NokiaInto /></OnlyAdmin>,
		// <ApocalypseClock />,
		// <MyItemsInvite />,
	]
}
