import { PortfolioCreditsType, PortfolioWorkerId } from 'api-types/portfolio.types'

const portfolioWorkerId = 1 as PortfolioWorkerId

export const credits: PortfolioCreditsType[] = `\
	Артемий Лебедев      | худрук
	Павел Герасимчук     | арт-директор и дизайнер
	Эркен Кагаров        | тайный советник
	Светлана Ярошевич    | дизайнер
	Анна Савельева       | технический дизайнер
	Мария Павлова        | технический дизайнер
	Зоригто Сансараймаев | технический дизайнер
	Анастасия Шумакова   | менеджер
	Ангелина Загорская   | менеджер
	Егор Преженцев       | менеджер
	Татьяна Козлова      | переводчик
	Александр Носиков    | редактор
	Дмитрий Уткин        | бэкендер
	Олег Постоев         | фронтендер
	Дмитрий Муратов      | бета-тестер
	Станислав Щербаков   | фотограф
	Игорь Фаткин         | фотограф
`
	.split('\n')
	.map(line => {
		const [name, role] = line.split('|').map(item => item.replace(/\t/g, '').trim());
		return {
			role: role,
			worker: {
				id: portfolioWorkerId, full_name: name, company: '', image: null, login: 'login', role: 'few', link: '/',
			},
		};
	});
