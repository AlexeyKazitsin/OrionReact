import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/flights/flightsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useFlights() {
	const status = useSelector(state => state.flights.status)
	const date_start = useSelector(state => state.flights.date_start)
	const date_end = useSelector(state => state.flights.date_end)
	const user = useSelector(state => state.flights.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchFlights = async () => {

		const {data} = await api.get(`flights/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(flight => flight.owner.name.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchFlights,
		setDateStart,
		setDateEnd,
		setUser
	};
}