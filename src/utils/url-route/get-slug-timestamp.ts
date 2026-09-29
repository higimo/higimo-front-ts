// TODO: [LIGHT] написать тесты, документировать JSDoc
export const getSlugTimestamp = () =>
	new Date().toISOString().replace(/\D/g, '-').substring(0, 23)
