import {useDispatch, useSelector} from 'react-redux';
import {
	updateAstronauts,
	updateQuery,
	updateSexQuery                                     //удалить
} from "../../store/astronauts/astronautsSlice";
import {api} from "../../utils/api";
import {useFlight} from "../flights/useFlight";
import {useToken} from "../users/useToken";

export function useAstronauts() {
	const astronauts = useSelector(state => state.astronauts.astronauts);
	const query = useSelector(state => state.astronauts.query);
	const sexquery = useSelector(state => state.astronauts.sexquery); //удалить

	const {access_token} = useToken()

	const {setFlightId} = useFlight()

	const dispatch = useDispatch()

	const setAstronauts = (value) => {
		dispatch(updateAstronauts(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}
	
	const setSexQuery = (value) => { //удалить
		dispatch(updateSexQuery(value))
	}
	const searchAstronauts = async () => {

		const {data} = await api.get(`astronauts/search/`, {
			params: {
				query: query,
				sexquery: sexquery           //удалить
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_flight_id = data["draft_flight_id"]
		setFlightId(draft_flight_id)

		return data["astronauts"]
	}

	const deleteAstronaut = async (astronaut) => {

		await api.delete(`astronauts/${astronaut.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

	}

	return {
		astronauts,
		setAstronauts,
		query,
		sexquery,        //удалить
		setQuery,
		setSexQuery,          //удалить
		deleteAstronaut,
		searchAstronauts
	};
}