import { FunctionComponent } from 'preact'
import { PortfolioProjectTableFullType } from 'hook/data/use-table-project'

import cs from 'classnames'

import { formatValue } from 'utils/project/format-value'
import { getProjectKeys } from 'utils/project/get-project-keys'
import { getValueType } from 'utils/project/get-value-type'

import './style.css'

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
