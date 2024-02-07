import {useAstronauts} from "../../../hooks/astronauts/useAstronauts";
import {useQuery} from "react-query";
import AstronautsTable from "./AstronautsTable/AstronautsTable";
import {useEffect} from "react";
import {useAuth} from "../../../hooks/users/useAuth";
import {useNavigate} from "react-router-dom"

const AstronautsTableWrapper = () => {

    const {searchAstronauts} = useAstronauts()

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["astronauts"],
        () => searchAstronauts(),
        {
            keepPreviousData: true,
        }
    )

    useEffect(() => {
        if (!is_moderator) {
            navigate("/")
        }
    }, [])

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="astronauts-wrapper">
            <AstronautsTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default AstronautsTableWrapper