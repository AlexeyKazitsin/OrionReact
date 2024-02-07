import "./FlightConstructor.sass"
import {useFlight} from "../../hooks/flights/useFlight";
import {Link} from "react-router-dom";

const FlightConstructor = () => {

    const {flight_id} = useFlight()

    if (!flight_id) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новый полет</span>
            </div>
        )
    }

    return (
        <Link to={`/flights/${flight_id}`} className="constructor-container">
            <span className="title">Новый полет</span>
        </Link>
    )
}

export default FlightConstructor