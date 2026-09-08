import { FunctionComponent } from 'preact'

export const TourismAdventureEmpty: FunctionComponent = () => (
	<div className="tourism-adventure tourism-adventure--future">
		<div className="tourism-adventure__options">
			{[
				{ title: 'участников', value: 'двое' },
				{ title: 'транспорт', value: 'Портальная пушка' },
				{ title: 'назначение', value: 'Огурчик Рик' },
			].map(option => (
				<div className="tourism-adventure__option-item">
					<div className="tourism-adventure-option__title">
						{option.title}
					</div>
					<div className="tourism-adventure-option__value">
						{option.value}
					</div>
				</div>
			))}
		</div>
		<div className="tourism-adventure__title">
			Очередное приключение на 20 минут
		</div>
		<div className="tourism-adventure__description">
			Познай, насколько можно отвергать терапию
		</div>
		<div className="tourism-adventure__tear-off-stub tear-off-stub">
			<div className="tear-off-stub__meta">
				<div className="tear-off-stub__memory">
					Электронный билет
				</div>
				<div className="tear-off-stub__id">
					№ C1
				</div>
			</div>
			<div className="tear-off-stub__title">
				Очередное приключение на 20 минут
			</div>
			<div className="tear-off-stub__advent">
				Всё будет в порядке, Дима, зашли и вышли
			</div>
		</div>
	</div>
)
