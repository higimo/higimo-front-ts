import { SITE_POSTFIX } from 'hook/use-page-title';

export const getTitle: () => string = () => {
	return document.title.replace(`| ${SITE_POSTFIX}`, '');
};
