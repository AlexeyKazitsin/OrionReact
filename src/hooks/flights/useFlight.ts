import {useDispatch, useSelector} from 'react-redux';
import {
	updateObjective,
	updateMissionName,
	updateFlight,
	updateFlightId, updateAstronaut
} from "../../store/flights/flightSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom";

export function useFlight() {

	const {access_token} = useToken()

	const flight = useSelector(state => state.flight.flight)
	const flight_id = useSelector(state => state.flight.flight_id)
	const mission_name = useSelector(state => state.flight.mission_name)
	const objective = useSelector(state => state.flight.objective)
	

	const navigate = useNavigate()

	const is_draft = flight?.status == 1

	const dispatch = useDispatch()

	const setFlight = (value) => {
		dispatch(updateFlight(value))
	}

	const setFlightId = (value) => {
		dispatch(updateFlightId(value))
	}

	const setMissionName = (value) => {
		dispatch(updateMissionName(value))
	}

	const setObjective = (value) => {
		dispatch(updateObjective(value))
	}

	const setAstronautValue = (value) => {
		dispatch(updateAstronaut(value))
	}

	const sendFlight = async () => {

		const response = await api.put(`flights/${flight.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setFlight(undefined)
			setMissionName(undefined)
			setObjective(undefined)
		}
	}

	const deleteFlight = async () => {

		const response = await api.delete(`flights/${flight.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setFlight(undefined)
			setMissionName(undefined)
			setObjective(undefined)
		}

	}

	const saveFlight = async () => {

		const form_data = new FormData()

		form_data.append('mission_name', mission_name)
		form_data.append('objective', objective)

		await api.put(`flights/${flight.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchFlight = async (flight_id) => {

		const {data} = await api.get(`flights/${flight_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setFlight(data)
		setMissionName(data["mission_name"])
		setObjective(data["objective"])
	}

	const addAstronautToFlight = async (astronaut) => {
		await api.post(`astronauts/${astronaut.id}/add_to_flight/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteAstronautFromFlight = async (astronaut) => {
		const response = await api.delete(`flights/${flight.id}/delete_astronaut/${astronaut.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200) {
			await fetchFlight(flight_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		flight,
		is_draft,
		flight_id,
		setFlight,
		setFlightId,
		setMissionName,
		setObjective,
		saveFlight,
		sendFlight,
		deleteFlight,
		fetchFlight,
		addAstronautToFlight,
		deleteAstronautFromFlight,
		setAstronautValue
	};
}