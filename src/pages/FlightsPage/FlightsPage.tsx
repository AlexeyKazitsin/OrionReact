import FlightsTable from "./FlightsTable/FlightsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const FlightsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/astronauts-list")
        }
    }, [])

    return (
        <div>
            <FlightsTable />
        </div>
    )
}

export default FlightsPage;

