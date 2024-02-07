import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	flight: undefined,
	flight_id: undefined,
	mission_name: undefined,
	objective: undefined
};

const flightSlice = createSlice({
	name: 'flight',
	initialState: initialState,
	reducers: {
		updateFlight(state, action) {
			state.flight = action.payload
		},
		updateFlightId(state, action) {
			state.flight_id = action.payload
		},
		updateMissionName(state, action) {
			state.mission_name = action.payload
		},
		updateObjective(state, action) {
			state.objective = action.payload
		},
		updateAstronaut(state, action) {
			const newTodos = state.flight.astronauts.filter(astronaut => astronaut.id !== action.payload.id)
			state.flight.astronauts = [action.payload, ...newTodos].sort(function(first, second) {
				return first.id - second.id;
			})
		}
	}
})

export const {
	updateFlight,
	updateMissionName,
	updateObjective,
	updateFlightId,
	updateAstronaut
} = flightSlice.actions;

export default flightSlice.reducer;