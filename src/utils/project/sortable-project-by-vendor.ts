import { PortfolioProjectTableFullType } from 'api-types/portfolio.types'

export const sortableProjectByVendor = (a: PortfolioProjectTableFullType, b: PortfolioProjectTableFullType) => {
	return a.vendor.localeCompare(b.vendor) || b.date.localeCompare(a.date)
}
