export const YMaps = ({ children }: { children: React.ReactNode }) => (
	<div data-testid="ymaps">{children}</div>
)

export const Map = ({ children, width, height }: any) => (
	<div data-testid="map" style={{ width, height }}>
		{children}
	</div>
)

export const Clusterer = ({ children }: { children: React.ReactNode }) => (
	<div data-testid="clusterer">{children}</div>
)

export const Placemark = ({ geometry, properties, options }: any) => (
	<div
		data-testid="placemark"
		data-coord={geometry?.join(',')}
		data-hint={properties?.hintContent}
		data-icon-color={options?.iconColor}
	>
		{properties?.balloonContentHeader}
	</div>
)

export const FullscreenControl = () => <div data-testid="fullscreen-control" />

export const Polyline = ({ geometry }: { geometry: number[][] }) => (
	<div data-testid="polyline" data-points={geometry?.length} />
)
