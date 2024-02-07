import {useDispatch, useSelector} from 'react-redux';
import {
	updateAstronaut,
	updateName,
	updateExperience,
	updateAge,
	updateCountry,
	updateSex,
	updateImage
} from "../../store/astronauts/astronautSlice";
import {api} from "../../utils/api";

export function useAstronaut() {
	const astronaut = useSelector(state => state.astronaut.astronaut);

	const dispatch = useDispatch()

	const setAstronaut = (value) => {
		dispatch(updateAstronaut(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setAge = (value) => {
		dispatch(updateAge(value))
	}
	
	const setCountry = (value) => {
		dispatch(updateCountry(value))
	}

	const setSex = (value) => {
		dispatch(updateSex(value))
	}

	const setExperience = (value) => {
		dispatch(updateExperience(value))
	}


	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchAstronaut = async (id) => {

		const {data} = await api.get(`astronauts/${id}`);

		setAstronaut(data)

	};

	return {
		astronaut,
		setAstronaut,
		fetchAstronaut,
		setName,
		setAge,
        setCountry,
        setSex,
		setExperience,
		setImage
	};
}