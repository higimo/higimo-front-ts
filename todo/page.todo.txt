page.todo.txt
Постоянно повторяю

const [ cinema ] = useApi<CinemaType[]>(API_ROUTE.cinemaShort)
const isLoading = useLoadingState([cinema.status])
const isListEmpty = useEmptyDataState(cinema.data)

if (isLoading) {
	return <Loading />
}
if (isListEmpty) {
	return <NotFoundPage />
}



Это надо вынести в отдельный компонент и внедрить его везде

<Layout title={'Мой заголовок страницы'} loading={[cinema, other]}>
	Content
</Layout>


const Layout = ({ title, loading }) => {
	usePageTitle(title)

	const allIsLoading = loading.some(i = loading.isLoading)

	if (allIsLoading) {
		return <Loading />
	}

	if (allIsLoading) {
		return <Loading />
	}
}


isEmpty надо докрутить, чтобы показывал единый компонент
const EmptyData = () => (
	Тут пока нихуя нет
)

В случае isError
Отправлял мне в бекенд сообщение, что что-то сломалось
