import { FunctionComponent } from "preact";
import { Baidge, BAIDGE_COLOR } from "../../ui/baidge/Baidge";
import { filterKey } from "../utils";

type AccordBaidgeGalleryPropsType = {
    handleFilter: (string) => () => void;
    filter: string;
}
export const AccordBaidgeGallery: FunctionComponent<AccordBaidgeGalleryPropsType> = ({ handleFilter, filter }) => {
    return (
        <div>
            {[
                <Baidge onClick={handleFilter(filterKey.new)} color={BAIDGE_COLOR.green}>нью</Baidge>,
                <Baidge onClick={handleFilter(filterKey.pop)} color={BAIDGE_COLOR.yellow}>популярно</Baidge>,
                <Baidge onClick={handleFilter(filterKey.liric)} color={BAIDGE_COLOR.blue}>лирика</Baidge>,
                <Baidge onClick={handleFilter(filterKey.scream)} color={BAIDGE_COLOR.blue}>поорать</Baidge>,
                <Baidge onClick={handleFilter(filterKey.korol)} color={BAIDGE_COLOR.blue}>Король и шут</Baidge>,
                <Baidge onClick={handleFilter(filterKey.funny)} color={BAIDGE_COLOR.blue}>смешное</Baidge>,
                <Baidge onClick={handleFilter(filterKey.rap)} color={BAIDGE_COLOR.blue}>речитатив</Baidge>,
                <Baidge onClick={handleFilter(filterKey.old)} color={BAIDGE_COLOR.blue}>Старинное</Baidge>,
                <Baidge onClick={handleFilter(filterKey.ussr)} color={BAIDGE_COLOR.blue}>СССР</Baidge>,
                <Baidge onClick={handleFilter(filterKey.lacky)} color={BAIDGE_COLOR.blue}>зайдёт</Baidge>,
                <Baidge onClick={handleFilter(filterKey.newschool)} color={BAIDGE_COLOR.blue}>ньюскул</Baidge>,
                <Baidge onClick={handleFilter(filterKey.bard)} color={BAIDGE_COLOR.blue}>барды</Baidge>,
                <Baidge onClick={handleFilter(filterKey.noList)} color={BAIDGE_COLOR.blue}>Без списков</Baidge>,
                <Baidge onClick={handleFilter(filterKey.manyList)} color={BAIDGE_COLOR.blue}>во многих списках</Baidge>,
            ].map(i => ([i, ' ']))}
            {!!filter.length && [' ', <Baidge onClick={handleFilter('')} color={BAIDGE_COLOR.gray}>скинуть</Baidge>]}
        </div>
    )
}