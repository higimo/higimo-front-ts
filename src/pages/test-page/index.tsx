import { ComponentChildren, FunctionComponent } from 'preact'

import './style.css'

const CardGallery: FunctionComponent = ({ children }) => {
	return (
		<div className="card-gallery">
			{children}
		</div>
	)
}

const CardRow: FunctionComponent = ({ children }) => {
	return (
		<div className="card-row">
			{children}
		</div>
	)
}

type CardPropsType = {
	src: string
}
const Card: FunctionComponent<CardPropsType> = ({ src }) => {
	return (
		<div className="card">
			<img className="card__img" src={src} />
		</div>
	)
}

const Billboard: FunctionComponent = ({ children }) => {
	return (
		<div className="billboard">
			{children}
		</div>
	)
}

const BillboardRow: FunctionComponent = ({ children }) => {
	return (
		<div className="billboard-row">
			{children}
		</div>
	)
}

type BillboardCardPropsType = {
	src: string
}
const BillboardCard: FunctionComponent<BillboardCardPropsType> = ({ src }) => {
	return (
		<div className="billboard-card">
			<img className="billboard-card__img" src={src} />
		</div>
	)
}

type LayoutPropsType = {
	sidebar?: ComponentChildren
	content: ComponentChildren
}
const Layout: FunctionComponent<LayoutPropsType> = ({ sidebar, content }) => {
	return (
		<div className="layout">
			{sidebar && (
				<div className="layout__sidebar">
					{sidebar}
				</div>
			)}
			<div className="layout__content">
				{content}
			</div>
		</div>
	)
}

export const TestPage: FunctionComponent = props => (
	<div className="page">
		<Layout
			sidebar={(
				<div className="my-sidebar">
					<h2>Новости</h2>
					Игорь Николаев выпил за любовь
					<hr />
					Дочка Алсу оказалась поклонником пищевой соды
				</div>
			)}
			content={(
				<CardGallery>
					<CardRow>
						<Card src="https://placekitten.com/256/256" />
						<Card src="https://placekitten.com/256/256" />
						<Card src="https://placekitten.com/256/256" />
					</CardRow>
					<CardRow>
						<Card src="https://placekitten.com/256/256" />
						<Card src="https://placekitten.com/256/256" />
						<Card src="https://placekitten.com/256/256" />
					</CardRow>
				</CardGallery>
			)}
		/>
		<Layout
			content={(
				<Billboard>
					<BillboardRow>
						<BillboardCard src="https://placekitten.com/640/360" />
						<BillboardCard src="https://placekitten.com/640/360" />
						<BillboardCard src="https://placekitten.com/640/360" />
						<BillboardCard src="https://placekitten.com/640/360" />
					</BillboardRow>
					<BillboardRow>
						<BillboardCard src="https://placekitten.com/640/360" />
						<BillboardCard src="https://placekitten.com/640/360" />
						<BillboardCard src="https://placekitten.com/640/360" />
					</BillboardRow>
					<BillboardRow>
						<BillboardCard src="https://placekitten.com/900/360" />
						<BillboardCard src="https://placekitten.com/900/360" />
					</BillboardRow>
					<BillboardRow>
						<BillboardCard src="https://placekitten.com/620/360" />
						<BillboardCard src="https://placekitten.com/620/360" />
						<BillboardCard src="https://placekitten.com/620/360" />
						<BillboardCard src="https://placekitten.com/620/360" />
					</BillboardRow>
				</Billboard>
			)}
		/>
		{/*<LibraryAdmin />*/}
		{/*<LibraryGallery />*/}
		{/*<OnlyAdmin>*/}
			{/*<TextContainer><WorkerInput projectId={19} /></TextContainer>*/}
		{/*</OnlyAdmin>*/}
		{/*<RomaSchool />*/}
		{/*<NokiaInto />*/}
	</div>
)
