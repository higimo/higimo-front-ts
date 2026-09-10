import { FunctionComponent } from 'preact'
import { PortfolioProjectTableFullType } from 'hook/data/use-table-project'

import cs from 'classnames'

import './style.css'

// TODO: [LIGHT] перенести в utils
export const getProjectKeys = <T extends object>(
	data: T,
	priorityKeys: string[] = []
): string[] => {
	const allKeys = Object.keys(data)

	const prioritySet = new Set(priorityKeys)
	const priority: string[] = []
	const other: string[] = []

	allKeys.forEach(key => {
		if (prioritySet.has(key)) {
			priority.push(key)
		} else {
			other.push(key)
		}
	})

	const sortedPriority = priority.sort((a, b) =>
		priorityKeys.indexOf(a) - priorityKeys.indexOf(b)
	)

	const sortedOther = other.sort()

	return sortedPriority.concat(sortedOther)
}

// TODO: [LIGHT] перенести в utils
export const formatValue = (value: any): string => {
	if (value === null || value === undefined) {
		return '—'
	}

	if (typeof value === 'boolean') {
		return value ? '✓' : '✗'
	}

	if (typeof value === 'number') {
		if (value > 1000000) return `${(value / 1000000).toFixed(1)}M`
		if (value > 1000) return `${(value / 1000).toFixed(1)}K`
		return value.toLocaleString()
	}

	if (typeof value === 'string') {
		if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
		return new Date(value).toLocaleDateString()
		}
		return value
	}

	if (Array.isArray(value)) {
		return value.join(', ')
	}

	if (typeof value === 'object') {
		return `{${Object.keys(value).length}}`
	}

	return String(value)
}

// TODO: [LIGHT] перенести в utils
export const getValueType = (value: any): string => {
	if (value === null || value === undefined) return 'empty'
	if (typeof value === 'number') return 'number'
	if (typeof value === 'boolean') return 'boolean'
	if (Array.isArray(value)) return 'array'
	if (typeof value === 'object') return 'object'
	if (/^\d{4}-\d{2}-\d{2}/.test(value)) return 'date'
	return 'string'
}

type PortfolioProjectTablePropsType = {
	tableProjects: PortfolioProjectTableFullType[]
}

export const PortfolioProjectTable: FunctionComponent<PortfolioProjectTablePropsType> = ({ tableProjects }) => {
	if (tableProjects.length === 0) {
		return (
			<div className="portfolio-table-empty">
				Нет данных для отображения
			</div>
		)
	}
	// @ts-ignore
	const allKeys = getProjectKeys(tableProjects[0], [
		'id', 'vendor', 'date',
		'isHide',
		'name', 'code',
		'cover_size', 'image',


		'cover_size',
		'tags',
		'credits',
		'description',
		'task',
		'announceText',

		'countParagraph',
		'countRealImg',
		'countVideo',
		'countPicture',
		'countPictureNote',
		'countCardTable',
		'countFactoidGallery',

		'checkLinkRaw',
		'checkMetricRaw',
		'checkUnitOfSenseRaw',
		'checkLink',
		'checkExistTags',
		'checkCover',
		'checkTask',
	])

	return (
		<div className="portfolio-table-container">
			<table className="portfolio-table">
				<thead>
					<tr className="portfolio-table-header">
						{allKeys.map((key) => (
							<th key={key} className="portfolio-table-column-header">
								{key}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tableProjects.map((project) => (
						<tr key={project.id} className="portfolio-table-row">
							{allKeys.map((key) => (
								<td
									key={`${project.id}-${key}`}
									className={cs(
										'portfolio-table-cell',
										`portfolio-table-cell--${getValueType(project[key])}`,
										`portfolio-table-cell--key-${key}`,
										{ 'portfolio-table-cell--fail': project[key] === 'fail' },
										{ 'portfolio-table-cell--pass': project[key] === 'pass' },
										{ 'portfolio-table-cell--show': project[key] === 'SHOW' },
										{ 'portfolio-table-cell--hide': project[key] === 'HIDE' },
									)}
								>
									{formatValue(project[key])}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
