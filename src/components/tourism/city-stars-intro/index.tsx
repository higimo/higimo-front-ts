import { useEffect, useState } from "preact/hooks"
import { TextContainer } from "../../ui/text-container"
import { CityStarElement } from "../city-star-element"
import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS"

export const CityStarsIntro = () => {
    const [cityList, setCitys] = useState([])

    useEffect(() => {
        fetch('/json/city.json')
            .then(r => r.json())
            .then(data => {
                setCitys(data)
            })
    }, [])

    const filtredCityList = cityList.filter(city => city.star.length === 5)

    return (
        <TextContainer>
            <h2><a href={ROUTE_LINKS.tourismCityIndex}>Оценка городов</a></h2>
            <div className="city-stars-gallery city-stars-gallery--card">
                {filtredCityList.map(city => (
                    <CityStarElement title={city.title} star={city.star} />
                ))}
            </div>
        </TextContainer>
    )
}