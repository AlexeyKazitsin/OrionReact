import {configureStore} from "@reduxjs/toolkit";

import astronautReducer from "./astronauts/astronautSlice"
import draftFlightReducer from "./flights/flightSlice"
import authReducer from "./users/authSlice"
import flightsReducer from "./flights/flightsSlice"
import astronautsReducer  from "./astronauts/astronautsSlice"

export default configureStore({
	reducer: {
		astronaut: astronautReducer,
		astronauts: astronautsReducer,
		flight: draftFlightReducer,
		flights: flightsReducer,
		user: authReducer
	}
});