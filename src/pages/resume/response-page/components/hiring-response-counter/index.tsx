import { FunctionComponent } from 'preact';
import { PasteApiType } from '../../types';
import { getStartOfWeek } from '../../utils/getStartOfWeek';
import { getYesterday } from '../../utils/getYesterday';
import { getNowDay } from '../../utils/getNowDay';
import { FactoidRow } from 'components/ui/factoid-row';

type HiringResponseCounterPropsType = {
	data: PasteApiType[];
};

export const HiringResponseCounter: FunctionComponent<HiringResponseCounterPropsType> = ({ data }) => {
	const startOfWeek = getStartOfWeek(new Date()).toISOString().substr(0, 10);
	const yesterday = getYesterday(new Date()).toISOString().substr(0, 10);
	const day = getNowDay(new Date()).toISOString().substr(0, 10);

	const dataStartOfWeek = data.filter(d => d.date >= startOfWeek);
	const dataYesterDay = data.filter(d => d.date >= yesterday);
	const dataNowDay = data.filter(d => d.date >= day);

	return (
		<div>
			<h3>Откликов</h3>
			<FactoidRow
				mini
				countInRow={5}
				factoids={[
					{
						description: 'сегодня',
						digit: dataNowDay.length,
					},
					{
						description: 'вчера',
						digit: dataYesterDay.length,
					},
					{
						description: 'за неделю',
						digit: dataStartOfWeek.length,
					},
				]}
			/>
		</div>
	);
};
