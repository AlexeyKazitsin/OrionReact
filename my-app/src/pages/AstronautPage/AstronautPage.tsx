import "./AstronautPage.sass" 
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iAstronautsMock, requestTime} from "../../utils/consts";
import {Astronaut} from "../../utils/types";
import mockImage from "/src/assets/mock.png"

const AstronautPage = ({ selectedAstronaut, setSelectedAstronaut }: { selectedAstronaut:Astronaut | undefined, setSelectedAstronaut: Dispatch<Astronaut| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/astronauts/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Astronaut = await response.json()

            setSelectedAstronaut(service)

            setIsMock(false)

        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedAstronaut(iAstronautsMock.find((service:Astronaut) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/astronauts/${id}/image/`

    if (selectedAstronaut == undefined) {
        return (
            <div className="page-details-wrapper">

                <Link className="return-link" to="/">
                    Назад
                </Link>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name"> Имя: {selectedAstronaut.name}</h2>

               

                    <h2>Возраст: {selectedAstronaut.age}</h2>

                    

                    <h2>Пол: {selectedAstronaut.sex}</h2>

                    

                    <h2>Страна: {selectedAstronaut.country}</h2>

                    
                    <br/>
                    <h2>Опыт работы:</h2>
                    <br/>
                    <h3>{selectedAstronaut.experience}</h3>

                    <br />




                </div>

            </div>

        </div>
    )
}

export default AstronautPage;