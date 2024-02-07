import "./AstronautsList.sass"
import AstronautCard from "../../../components/AstronautCard/AstronautCard";
import {useAstronauts} from "../../../hooks/astronauts/useAstronauts";
import {useQuery} from "react-query";
import AstronautsFilters from "../AstronautsFilters/AstronautsFilters";

const AstronautsList = () => {

    const {searchAstronauts} = useAstronauts()

    const { isLoading, data, refetch } = useQuery(
        ["astronauts"],
        () => searchAstronauts(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(astronaut  => (
        <AstronautCard astronaut={astronaut} key={astronaut.id} refetch={refetch}/>
    ))

    return (
        <div className="astronauts-wrapper">
            <div className="astronauts-list-wrapper">

                <AstronautsFilters refetch={refetch}/>

                <div className="astronauts-list">
                    { cards }
                </div>

            </div>
        </div>
    )
}

export default AstronautsList;