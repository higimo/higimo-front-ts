import { useEffect } from 'preact/hooks'

import { formatTime } from 'utils/format-time'
import { getDateFromTimestamp } from 'utils/get-date-from-timestamp'

interface TableRowProps {
    time: number
    name: string
    visit: number
    currentDay: number | null
    onDayChange: (day: number) => void
}

/**
 * Компонент для отображения строки таблицы
 */
export const TableRow: React.FC<TableRowProps> = ({ time, name, visit, currentDay, onDayChange }) => {
    const day = getDateFromTimestamp(time)
    const showDay = currentDay !== day
    
    useEffect(() => {
        if (showDay) {
            onDayChange(day)
        }
    }, [showDay, day, onDayChange])
    
    return (
        <tr>
            <td className="date">{showDay ? day : ''}</td>
            <td className="time">{formatTime(time)}</td>
            <td className="artist-name">{visit ? '★' : ''} {name}</td>
        </tr>
    )
}