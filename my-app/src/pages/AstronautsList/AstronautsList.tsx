import "./AstronautsList.sass"
import SearchBar from "../../components/SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import AstronautCard from "./AstronautCard/AstronautCard";
import {iAstronautsMock, requestTime} from "../../utils/consts";
import {Astronaut} from "../../utils/types";

import SexFilter from "../../components/SearchBar/SexFilter";

const AstronautsList = () => {

    const [Astronauts, setAstronauts] = useState<Astronaut[]>([]);

    const [query, setQuery] = useState<string>("");

    const [sexquery, setSexQuery] = useState<string>("")

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchAstronauts = async () => {

        try {

            const response = await fetch(`http://localhost:8000/api/astronauts/search/?&query=${query}&sexquery=${sexquery}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const astronauts: Astronaut[] = raw["astronauts"]

            setAstronauts(astronauts)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setAstronauts(iAstronautsMock.filter(astronaut => astronaut.name.toLowerCase().includes(query.toLowerCase()) && astronaut.sex.toLowerCase().includes(sexquery.toLowerCase())))
        //setAstronauts(iAstronautsMock.filter(astronaut => astronaut.sex.toLowerCase().includes(sexquery.toLowerCase()) ))

    }

    useEffect(() => {
        searchAstronauts()
    }, [])

    const cards = Astronauts.map(astronaut  => (
        <AstronautCard astronaut={astronaut} key={astronaut.id} isMock={isMock}/>
    ))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        searchAstronauts()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={(e) => handleSubmit(e)}>

                <h2>Поиск астронавтов</h2>
                <SexFilter sexquery={sexquery} setSexQuery={setSexQuery}/>
                <SearchBar query={query} setQuery={setQuery} />
                
            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default AstronautsList;