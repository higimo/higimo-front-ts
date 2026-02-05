import { FunctionComponent } from 'preact';
import { PortfolioTag } from 'types';

import { useMemo } from 'preact/hooks';

import { ProjectTag } from 'components/project/project-tag';

import { filterType } from 'components/project/project-tag-group-gallery/filter-type';
import { TAG_CATEGORY_MAP } from 'components/project/project-tag-group-gallery/consts';

type MappedCategory = {
	title: string;
	tags: PortfolioTag[];
};

export const ProjectTagCategory: FunctionComponent<{ tags: PortfolioTag[]; }> = (props) => {
	// TODO как сделать категорию тегов ДРУГОЕ?
	const mappedTags: MappedCategory[] = useMemo(() => {
		const tagCategories = Object.keys(TAG_CATEGORY_MAP);

		let tmpMappedTags = {};
		for (const tag of props.tags) {
			for (const tagCategory of tagCategories) {
				if (TAG_CATEGORY_MAP[tagCategory].includes(tag.title)) {
					if (!tmpMappedTags[tagCategory]) {
						tmpMappedTags[tagCategory] = {
							title: tagCategory,
							tags: [],
						};
					}
					tmpMappedTags[tagCategory].tags.push(tag);
				}
			}
		}

		return Object.values(tmpMappedTags);
	}, [props.tags]);

	return mappedTags.map(mappedCategory => (
		<div className="project-tag__category-group">
			<div className="project-tag__list">
				<div className="project-tag__category-name">{mappedCategory.title}</div>
				{mappedCategory.tags.map(tag => (
					<ProjectTag filterName={filterType.FILTER_TAG}>{tag.title}</ProjectTag>
				))}
			</div>
		</div>
	));
};
