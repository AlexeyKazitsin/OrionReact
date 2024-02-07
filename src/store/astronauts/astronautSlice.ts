import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	astronaut: undefined,
};

const astronautSlice = createSlice({
	name: 'astronaut',
	initialState: initialState,
	reducers: {
		updateAstronaut(state, action) {
			state.astronaut = action.payload
		},
		updateName(state, action) {
			state.astronaut.name = action.payload
		},
		updateExperience(state, action) {
			state.astronaut.experience = action.payload
		},
		updateAge(state, action) {
			state.astronaut.age = action.payload
		},
		updateCountry(state, action) {
			state.astronaut.country = action.payload
		},
		updateSex(state, action) {
			state.astronaut.sex = action.payload
		},
		updateImage(state, action) {
			state.astronaut.image = action.payload
		}
	}
})

export const {
	updateAstronaut,
	updateName,
	updateExperience,
	updateAge,
	updateCountry,
	updateSex,
	updateImage
} = astronautSlice.actions;

export default astronautSlice.reducer;