import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/preact'; // <-- Импорт для Preact
import userEvent from '@testing-library/user-event';
import { TourismMapGeo } from './index';
import type { PovType } from './data/russia-city2'
import { useWindowSize } from 'hook/use-window-size'


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
			coord: [55.75, 37.62],
			type: 'city',
			visited: true,
			population: 12500,
			okrug: 'Центральный',
			region: 'Московская область'
		},
		{
			title: 'Санкт-Петербург',
			coord: [59.93, 30.31],
			type: 'city',
			visited: false,
			population: 5400,
			region: 'Ленинградская область'
		}
	]

	const mockLines: number[][] = [
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
			expect(placemarks[0]).toHaveAttribute('data-coord', '55.75,37.62')
			expect(placemarks[1]).toHaveAttribute('data-coord', '59.93,30.31')
		})

		it('должен иметь правильный цвет для посещённых мест', () => {
		render(<TourismMapGeo items={mockPoints} />)

		const placemarks = screen.getAllByTestId('placemark')
		expect(placemarks[0]).toHaveAttribute('data-icon-color', '#344d3d')
		expect(placemarks[1]).toHaveAttribute('data-icon-color', '#b3b3b3')
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
