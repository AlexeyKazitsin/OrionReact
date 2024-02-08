import "./AstronautPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useAstronaut} from "../../hooks/astronauts/useAstronaut";

const AstronautPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {astronaut, fetchAstronaut, setAstronaut} = useAstronaut()
    
    useEffect(() => {
        id && fetchAstronaut(id)
        return () => {
            setAstronaut(undefined)
        }
    }, [])

    if (astronaut == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/astronauts/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                <h2>Назад</h2>
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>Имя: {astronaut.name}</h2>

                    <br />

                    <h2>Возраст: {astronaut.age}</h2>
                    
                    <br />

                    <h2>Пол: {astronaut.sex}</h2>

                    <br />

                    <h2>Страна: {astronaut.country}</h2>

                    <br />

                    <h2>Опыт: <span>{astronaut.experience}</span></h2>

                    

                </div>

            </div>

        </div>
    )
}

export default AstronautPage;