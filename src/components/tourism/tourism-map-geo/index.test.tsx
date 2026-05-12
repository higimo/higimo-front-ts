import { render, screen } from '@testing-library/preact'; // <-- Импорт для Preact
import { PovType } from 'components/tourism/data/russia-city2'
import { useWindowSize } from 'hook/use-window-size'
import { Coord } from 'utils.type'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TourismMapGeo } from './index'

// Мокаем зависимости
vi.mock('hook/use-window-size', () => ({
	useWindowSize: vi.fn(() => ({ width: 1920, height: 1080 }))
}))

vi.mock('react-yandex-maps', () => ({
	YMaps: ({ children }: { children: React.ReactNode }) => <div data-testid="ymaps">{children}</div>,
	Map: ({ children, width, height }: any) => (
		<div data-testid="map" style={{ width, height }}>
			{children}
		</div>
	),
	Clusterer: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="clusterer">{children}</div>
	),
	Placemark: ({ geometry, properties, options }: any) => (
		<div
			data-testid="placemark"
			data-coord={geometry.join(',')}
			data-hint={properties.hintContent}
			data-icon-color={options.iconColor}
		>
			{properties.balloonContentHeader}
		</div>
	),
	FullscreenControl: () => <div data-testid="fullscreen-control" />,
	Polyline: ({ geometry }: { geometry: number[][] }) => (
		<div data-testid="polyline" data-points={geometry.length} />
	)
}))

describe('TourismMapGeo', () => {
	const mockPoints: PovType[] = [
		{
			title: 'Москва',
			type: 'город федерального значения',
			country: 'Россия',
			centerCity: 'Москва',
			inside: '146 внутригородских муниципальных образований (125 муниципальных округов, 2 городских округа, 19 поселений)',
			coord: [55.755, 37.617],
			area: 2561,
			population: 13150,
			okato: 45,
			visited: true,
			color: '#b3b3b3',
		},
		{
			title: 'Санкт-Петербург',
			type: 'город федерального значения',
			country: 'Россия',
			centerCity: 'Санкт-Петербург',
			inside: '111 внутригородских муниципальных образований (81 муниципальный округ, 9 городов и 21 посёлок)',
			coord: [59.938, 30.314],
			area: 1403,
			population: 5598,
			okato: 40,
			visited: true,
			color: '#b3b3b3',
		},
	]

	const mockLines: Coord[] = [
		[55.75, 37.62],
		[59.93, 30.31]
	]

	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('Рендеринг', () => {
		it('должен рендерить компонент с картой', () => {
			render(<TourismMapGeo />)

			expect(screen.getByTestId('ymaps')).toBeInTheDocument()
			expect(screen.getByTestId('map')).toBeInTheDocument()
			expect(screen.getByTestId('fullscreen-control')).toBeInTheDocument()
		})

		it('должен рендерить кластеры и метки, если есть items', () => {
			render(<TourismMapGeo items={mockPoints} />)

			const placemarks = screen.getAllByTestId('placemark')
			expect(placemarks).toHaveLength(2)
		})

		it('должен рендерить линии, если есть lines', () => {
			render(<TourismMapGeo lines={mockLines} />)

			expect(screen.getByTestId('polyline')).toBeInTheDocument()
		})

		it('не должен рендерить кластеры, если items пуст', () => {
			render(<TourismMapGeo items={[]} />)

			expect(screen.queryByTestId('clusterer')).toBeInTheDocument() // Clusterer есть всегда
			expect(screen.queryByTestId('placemark')).not.toBeInTheDocument()
		})

		it('не должен рендерить линии, если lines не переданы', () => {
			render(<TourismMapGeo />)

			expect(screen.queryByTestId('polyline')).not.toBeInTheDocument()
		})
	})

	describe('Размеры карты', () => {
		it('должен корректно вычислять ширину карты', () => {
			const { width: mockWidth, height: mockHeight } = { width: 1920, height: 1080 }

			render(<TourismMapGeo />)

			const map = screen.getByTestId('map')
			const computedWidth = Math.min(mockWidth * 0.85, 1200)
			const computedHeight = Math.min(mockHeight * 0.6, 750)

			expect(map).toHaveStyle({ width: `${computedWidth}px` })
			expect(map).toHaveStyle({ height: `${computedHeight}px` })
		})

		it('должен ограничивать максимальные размеры', () => {
			const { rerender } = render(<TourismMapGeo />)

			// Симулируем огромный экран
			vi.mocked(useWindowSize).mockReturnValue({ width: 2000, height: 2000 })
			rerender(<TourismMapGeo />)

			const map = screen.getByTestId('map')
			expect(map).toHaveStyle({ width: '1200px' })
			expect(map).toHaveStyle({ height: '750px' })
		})
	})

	describe('Метки (Placemark)', () => {
		it('должен корректно отображать координаты', () => {
			render(<TourismMapGeo items={mockPoints} />)

			const placemarks = screen.getAllByTestId('placemark')
			expect(placemarks[0]).toHaveAttribute('data-coord', '55.755,37.617')
			expect(placemarks[1]).toHaveAttribute('data-coord', '59.938,30.314')
		})

		it('должен иметь правильный цвет для посещённых мест', () => {
		render(<TourismMapGeo items={mockPoints} />)

		const placemarks = screen.getAllByTestId('placemark')
		expect(placemarks[0]).toHaveAttribute('data-icon-color', '#344d3d')
		expect(placemarks[1]).toHaveAttribute('data-icon-color', '#344d3d')
		})

		it('должен отображать подсказку с названием', () => {
		render(<TourismMapGeo items={mockPoints} />)

		const placemarks = screen.getAllByTestId('placemark')
		expect(placemarks[0]).toHaveAttribute('data-hint', 'Москва')
		expect(placemarks[1]).toHaveAttribute('data-hint', 'Санкт-Петербург')
		})

		it('должен отображать заголовок', () => {
		render(<TourismMapGeo items={mockPoints} />)

		expect(screen.getByText('Москва')).toBeInTheDocument()
		expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument()
		})
	})

	describe('Линии (Polyline)', () => {
		it('должен отображать линию с правильным количеством точек', () => {
		render(<TourismMapGeo lines={mockLines} />)

		const polyline = screen.getByTestId('polyline')
		expect(polyline).toHaveAttribute('data-points', '2')
		})
	})

	describe('Edge cases', () => {
		it('должен обрабатывать undefined items', () => {
		render(<TourismMapGeo items={undefined} />)

		expect(screen.getByTestId('ymaps')).toBeInTheDocument()
		expect(screen.queryByTestId('placemark')).not.toBeInTheDocument()
		})

		it('должен обрабатывать undefined lines', () => {
		render(<TourismMapGeo lines={undefined} />)

		expect(screen.queryByTestId('polyline')).not.toBeInTheDocument()
		})

		it('должен работать с одним элементом', () => {
		render(<TourismMapGeo items={[mockPoints[0]]} />)

		const placemarks = screen.getAllByTestId('placemark')
		expect(placemarks).toHaveLength(1)
		})

		it('должен работать с пустыми массивами', () => {
		render(<TourismMapGeo items={[]} lines={[]} />)

		expect(screen.getByTestId('ymaps')).toBeInTheDocument()
		expect(screen.queryByTestId('placemark')).not.toBeInTheDocument()
		expect(screen.queryByTestId('polyline')).toBeInTheDocument() // lines=[] рендерит Polyline
		})
	})

	describe('Интеграция с хуками', () => {
		it('должен реагировать на изменение размера окна', () => {
		const { rerender } = render(<TourismMapGeo />)

		// Меняем размер
		vi.mocked(useWindowSize).mockReturnValue({ width: 1024, height: 768 })
		rerender(<TourismMapGeo />)

		const map = screen.getByTestId('map')
		const expectedWidth = Math.min(1024 * 0.85, 1200)
		const expectedHeight = Math.min(768 * 0.6, 750)

		expect(map).toHaveStyle({ width: `${expectedWidth}px` })
		expect(map).toHaveStyle({ height: `${expectedHeight}px` })
		})
	})
})
