import "./AstronautCard.sass"
import {Astronaut} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useFlight} from "../../hooks/flights/useFlight";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useState} from "react";
import CustomInput from "../CustomInput/CustomInput";
import {useAstronauts} from "../../hooks/astronauts/useAstronauts";

const AstronautCard = ({ astronaut, refetch }: {astronaut:Astronaut}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {searchAstronauts, deleteAstronaut} = useAstronauts()

    const {is_draft, addAstronautToFlight, deleteAstronautFromFlight, setAstronautValue} = useFlight()

    const handleAddAstronaut = async (e) => {
        e.preventDefault()
        await addAstronautToFlight(astronaut)
        await searchAstronauts()
    }

    const handleDeleteAstronautFromFlight = async (e) => {
        e.preventDefault()
        await deleteAstronautFromFlight(astronaut)
    }

    const [value, setValue] = useState()

    const updateValue = (value) => {
        const item = {
            id: astronaut.id,
            image: astronaut.image,
            experience: astronaut.experience,
            name: astronaut.name,
            status: astronaut.status,
            age: astronaut.age,
            country: astronaut.country,
            sex: astronaut.sex,
        }

        setValue(value)
        setAstronautValue(item)
    }

    const handleDeleteAstronaut = async (e) => {
        e.preventDefault()
        await deleteAstronaut(astronaut)
        refetch()
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={astronaut.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> Имя: {astronaut.name} </h3>
                    <h3 className="title"> Пол: {astronaut.sex} </h3>
                    <h3 className="title"> Возраст: {astronaut.age} </h3>
                    

                </div>

            

                <div className="content-bottom">

                    {!is_moderator &&
                        <Link to={`/astronauts/${astronaut.id}`}>
                            <CustomButton bg={variables.primary}>
                                Подробнее
                            </CustomButton>
                        </Link>
                    }

                    {is_authenticated && !is_moderator && location.pathname.includes("astronauts") &&
                        <CustomButton onClick={handleAddAstronaut} bg={variables.green}>Выбрать</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("flights") &&
                        <CustomButton onClick={handleDeleteAstronautFromFlight} bg={variables.red}>Удалить</CustomButton>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("astronauts-list") &&
                        <Link to={`/astronauts/${astronaut.id}/edit`}>
                            <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                        </Link>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("astronauts-list") &&
                        <CustomButton onClick={handleDeleteAstronaut} bg={variables.red}>Удалить</CustomButton>
                    }
                </div>

            </div>

        </div>
    )
}

export default AstronautCard;