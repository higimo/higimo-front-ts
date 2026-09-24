import { UnixTime } from 'utils.type'

/**
 * Форматирует Unix-время в строку вида `HH:MM`.
 *
 * Берёт только часы и минуты, секунды и часовой пояс отбрасываются.
 * Результат зависит от локальной таймзоны устройства (используется
 * `Date.prototype.toTimeString`, а не UTC-методы).
 *
 * @param timestamp - Unix-время. Ожидается в милисекундах
 * @returns Строка времени в формате `HH:MM`, например `"09:05"`.
 *
 * @example
 * formatTime(1700000000) // => "23:13" (зависит от таймзоны)
 * formatTime(0)          // => "03:00" (в MSK, UTC+3)
 *
 * @remarks
 * - Не бросает исключений на некорректных значениях: `NaN` даст `"NaN:"`.
 * - Для локализованного вывода лучше `Intl.DateTimeFormat`.
 */
export const formatTime = (timestamp: UnixTime) => new Date(timestamp).toTimeString().substring(0, 5)
