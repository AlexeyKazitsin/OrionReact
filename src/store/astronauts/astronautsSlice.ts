import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	astronauts: [],
	query: "",
	sexquery: "" //УДАЛИТЬ
};

const astronautsSlice = createSlice({
	name: 'astronauts',
	initialState: initialState,
	reducers: {
		updateAstronauts(state, action) {
			state.astronauts = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		},
		updateSexQuery(state, action) {         //удалить
			state.sexquery = action.payload
		},
	}
})

export const {
	updateAstronauts,
	updateQuery,
	updateSexQuery          //удалить
} = astronautsSlice.actions;

export default astronautsSlice.reducer;