import { PortfolioWorkerType } from 'types'
import { FunctionComponent } from 'preact'
import { useMemo } from 'preact/hooks'

import './style.css'
import { Tag } from 'components/ui/tag'

type WorkerRoleGroup = {
	role: string
	workers: PortfolioWorkerType[]
}

type WorkerCompanyGroup = {
	company: string
	roles: WorkerRoleGroup[]
}

type WorkersTreeProps = {
	workers: PortfolioWorkerType[]
	onWorkerSelect: (worker: PortfolioWorkerType) => void
}

export const WorkersTree: FunctionComponent<WorkersTreeProps> = ({ workers, onWorkerSelect }) => {
	const workerTree = useMemo(() => {
		const workerCompanies = Array.from(new Set(workers.map(i => i.company)))

		return workerCompanies.map(workerCompany => {
			const companyWorkers = workers.filter(i => i.company === workerCompany)
			const workerRoles = Array.from(new Set(companyWorkers.map(i => i.role)))

			return {
				company: workerCompany || 'Без компании',
				roles: workerRoles.map(workerRole => {
					return {
						role: workerRole || 'Без роли',
						workers: companyWorkers.filter(worker => worker.role === workerRole),
					}
				}),
			}
		})
	}, [workers])

	const handleClickWorker = useMemo(
		() => (worker: PortfolioWorkerType) => {
			onWorkerSelect(worker)
		},
		[onWorkerSelect]
	)

	return (
		<div className="workers-tree">
			<h3>Выбрать человека</h3>
			{workerTree.length === 0 ? (
				<p>Нет доступных работников</p>
			) : (
				<div className="company-groups">
					{workerTree.map((companyGroup, companyIndex) => (
						<div key={`company-${companyIndex}`} className="company-group">
							<div className="company-name">{companyGroup.company}</div>

							<div className="role-groups">
								{companyGroup.roles.map((roleGroup, roleIndex) => (
									<div key={`role-${companyIndex}-${roleIndex}`} className="role-group">
										<div className="role-name">{roleGroup.role}</div>

										<div className="worker-tags">
											{roleGroup.workers.map(worker => (
												<Tag
													key={`worker-${worker.id}`}
													className="worker-tag"
													onClick={() => handleClickWorker(worker)}
												>
													{[worker.full_name, worker.login].filter(Boolean).join(' ')}
												</Tag>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
